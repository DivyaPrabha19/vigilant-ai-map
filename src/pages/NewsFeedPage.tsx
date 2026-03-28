import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, Clock, MapPin, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const newsItems = [
  {
    id: 1,
    title: "Chain snatching incidents rise in Kavindapadi market area",
    location: "Kavindapadi, Erode",
    district: "Erode",
    type: "Theft",
    time: "2 hours ago",
    breaking: true,
    summary: "Police report 3 chain snatching incidents in the last 48 hours near the main market area. Suspects fled on two-wheelers.",
  },
  {
    id: 2,
    title: "Night assault case reported near Erode bus stand",
    location: "Erode Bus Stand",
    district: "Erode",
    type: "Assault",
    time: "5 hours ago",
    breaking: false,
    summary: "A 32-year-old man was assaulted by unknown persons near the bus stand at 11 PM. Police investigating CCTV footage.",
  },
  {
    id: 3,
    title: "Mobile snatching gang busted in Chennai Central",
    location: "Chennai Central",
    district: "Chennai",
    type: "Robbery",
    time: "8 hours ago",
    breaking: true,
    summary: "A gang of 5 involved in mobile phone snatching near railway station arrested. 42 stolen phones recovered.",
  },
  {
    id: 4,
    title: "Residential burglary attempt foiled in Tambaram",
    location: "Tambaram, Chennai",
    district: "Chennai",
    type: "Burglary",
    time: "12 hours ago",
    breaking: false,
    summary: "Alert neighbors helped prevent a burglary attempt in a residential colony. One suspect apprehended.",
  },
  {
    id: 5,
    title: "Eve-teasing complaint filed near Madurai college",
    location: "Anna Nagar, Madurai",
    district: "Madurai",
    type: "Harassment",
    time: "1 day ago",
    breaking: false,
    summary: "A college student filed a complaint about repeated harassment near the campus entrance. Police patrol increased.",
  },
];

const getTypeColor = (type: string) => {
  const map: Record<string, string> = {
    Theft: "hsl(var(--neon-yellow))",
    Assault: "hsl(var(--neon-red))",
    Robbery: "hsl(var(--neon-red))",
    Burglary: "hsl(var(--neon-magenta))",
    Harassment: "hsl(var(--neon-purple))",
    Murder: "hsl(var(--neon-red))",
  };
  return map[type] || "hsl(var(--neon-cyan))";
};

const NewsFeedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-20 flex items-center gap-3 p-4 glass-strong">
        <button onClick={() => navigate("/home")} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold font-display gradient-neon-text">Crime News</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Tamil Nadu · Real-time</p>
        </div>
      </header>

      <div className="p-4 space-y-3">
        {newsItems.map((news, i) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-4"
          >
            {news.breaking && (
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3 h-3 text-neon-red" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-neon-red animate-glow-pulse">Breaking</span>
              </div>
            )}

            <h3 className="text-sm font-semibold text-foreground leading-snug">{news.title}</h3>

            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{
                backgroundColor: `${getTypeColor(news.type)}15`,
                color: getTypeColor(news.type),
              }}>
                {news.type}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <MapPin className="w-3 h-3" />{news.location}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" />{news.time}
              </span>
            </div>

            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{news.summary}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeedPage;
