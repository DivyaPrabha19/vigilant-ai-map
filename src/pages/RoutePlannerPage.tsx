import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Shield, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockRoutes = [
  {
    id: 1,
    label: "Safest Route",
    risk: "Low",
    color: "hsl(145, 100%, 42%)",
    duration: "28 min",
    distance: "12.3 km",
    score: 15,
    note: "This route avoids high crime zones near Erode center.",
    via: "Via NH544 → Kavindapadi Bypass → Bhavani Road",
  },
  {
    id: 2,
    label: "Moderate Route",
    risk: "Medium",
    color: "hsl(45, 100%, 55%)",
    duration: "22 min",
    distance: "9.8 km",
    score: 55,
    note: "Passes through moderate risk area near bus stand. Recommended during daytime only.",
    via: "Via Erode Bus Stand → Perundurai Road",
  },
  {
    id: 3,
    label: "Shortest Route",
    risk: "High",
    color: "hsl(0, 100%, 55%)",
    duration: "18 min",
    distance: "8.1 km",
    score: 82,
    note: "Passes through high crime zone. Multiple theft incidents reported. Avoid at night.",
    via: "Via Market Street → Old Town → Station Road",
  },
];

const RoutePlannerPage = () => {
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [showRoutes, setShowRoutes] = useState(false);

  const handlePlan = () => {
    if (source && destination) setShowRoutes(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="relative z-20 flex items-center gap-3 p-4 glass-strong">
        <button onClick={() => navigate("/home")} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold font-display gradient-neon-text">Safe Routes</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">AI-Powered Route Planning</p>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Input */}
        <div className="glass rounded-xl p-4 space-y-3">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon-green" />
            <input
              type="text"
              placeholder="Source (e.g., Erode Bus Stand)"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon-red" />
            <input
              type="text"
              placeholder="Destination (e.g., Kavindapadi)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 rounded-lg bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handlePlan}
            className="w-full py-2.5 rounded-lg gradient-neon text-primary-foreground text-sm font-semibold"
          >
            Find Safe Routes
          </motion.button>
        </div>

        {/* Routes */}
        {showRoutes && (
          <div className="space-y-3">
            {mockRoutes.map((route, i) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-xl p-4"
                style={{ borderLeft: `3px solid ${route.color}` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-foreground">{route.label}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{
                        backgroundColor: `${route.color}20`,
                        color: route.color,
                      }}>
                        {route.risk} Risk
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">{route.via}</p>
                  </div>
                  {/* Mini risk meter */}
                  <div className="relative w-10 h-10">
                    <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="16" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                      <circle cx="20" cy="20" r="16" fill="none" stroke={route.color} strokeWidth="3" strokeDasharray={`${(route.score / 100) * 100} 100`} strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold font-display" style={{ color: route.color }}>{route.score}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{route.duration}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{route.distance}</span>
                </div>

                <div className="mt-3 p-2 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-start gap-2">
                    <Shield className="w-3 h-3 text-neon-cyan mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-muted-foreground">{route.note}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutePlannerPage;
