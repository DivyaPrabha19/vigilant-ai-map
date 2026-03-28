import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, Search, AlertTriangle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Mock crime data for Tamil Nadu
const crimeData = [
  { lat: 11.3410, lng: 77.7172, type: "Theft", location: "Erode", intensity: 85, count: 12, details: "Multiple chain snatching incidents reported near bus stand area." },
  { lat: 11.0168, lng: 76.9558, type: "Assault", location: "Coimbatore", intensity: 72, count: 8, details: "Night-time assault cases in the industrial zone." },
  { lat: 13.0827, lng: 80.2707, type: "Robbery", location: "Chennai Central", intensity: 90, count: 15, details: "High frequency of mobile snatching near railway station." },
  { lat: 9.9252, lng: 78.1198, type: "Harassment", location: "Madurai", intensity: 65, count: 6, details: "Eve-teasing incidents near college area." },
  { lat: 10.7905, lng: 78.7047, type: "Burglary", location: "Trichy", intensity: 55, count: 4, details: "Residential area break-ins during festival season." },
  { lat: 11.1271, lng: 78.6569, type: "Theft", location: "Namakkal", intensity: 45, count: 3, details: "Vehicle theft cases." },
  { lat: 11.6643, lng: 78.1460, type: "Murder", location: "Salem", intensity: 78, count: 2, details: "Gang rivalry incidents." },
  { lat: 8.0883, lng: 77.5385, type: "Theft", location: "Nagercoil", intensity: 40, count: 3, details: "Petty theft cases." },
  { lat: 12.9165, lng: 79.1325, type: "Assault", location: "Vellore", intensity: 60, count: 5, details: "Road rage incidents." },
  { lat: 10.3624, lng: 77.9695, type: "Harassment", location: "Dindigul", intensity: 50, count: 4, details: "Public harassment cases." },
  { lat: 11.3614, lng: 77.5874, type: "Theft", location: "Kavindapadi, Erode", intensity: 82, count: 9, details: "Repeated chain snatching and theft in market area. Mostly at night." },
  { lat: 13.1289, lng: 80.2083, type: "Robbery", location: "Ambattur, Chennai", intensity: 75, count: 7, details: "Industrial area robberies targeting late-night workers." },
  { lat: 12.8185, lng: 80.0414, type: "Burglary", location: "Tambaram, Chennai", intensity: 68, count: 5, details: "Residential break-ins in new housing areas." },
];

const getColor = (intensity: number) => {
  if (intensity >= 70) return "hsl(0, 100%, 55%)";
  if (intensity >= 50) return "hsl(45, 100%, 55%)";
  return "hsl(145, 100%, 42%)";
};

const getRiskLabel = (intensity: number) => {
  if (intensity >= 70) return "High";
  if (intensity >= 50) return "Medium";
  return "Low";
};

const CrimeMapPage = () => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selectedCrime, setSelectedCrime] = useState<typeof crimeData[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
    }).setView([11.1271, 78.6569], 7);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    // Add crime markers
    crimeData.forEach((crime) => {
      const color = getColor(crime.intensity);
      const size = Math.max(20, crime.intensity / 2);

      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: ${color};
          opacity: 0.7;
          box-shadow: 0 0 ${size}px ${color}, 0 0 ${size * 2}px ${color}40;
          animation: pulse 2s ease-in-out infinite;
          cursor: pointer;
        "></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      L.marker([crime.lat, crime.lng], { icon })
        .addTo(map)
        .on("click", () => setSelectedCrime(crime));
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  const handleSearch = () => {
    const found = crimeData.find((c) =>
      c.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (found && mapInstance.current) {
      mapInstance.current.flyTo([found.lat, found.lng], 13, { duration: 1.5 });
      setSelectedCrime(found);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="relative z-20 flex items-center gap-3 p-4 glass-strong">
        <button onClick={() => navigate("/home")} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold font-display gradient-neon-text">Crime Heatmap</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Tamil Nadu · Live</p>
        </div>
      </header>

      {/* Search */}
      <div className="relative z-20 px-4 py-2">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search location (e.g., Kavindapadi)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="px-4 rounded-xl gradient-neon text-primary-foreground text-sm font-semibold"
          >
            Go
          </motion.button>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <div ref={mapRef} className="absolute inset-0" />

        {/* Legend */}
        <div className="absolute top-4 left-4 z-[1000] glass rounded-xl p-3">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Risk Level</p>
          <div className="space-y-1.5">
            {[
              { color: "bg-neon-red", label: "High Risk" },
              { color: "bg-neon-yellow", label: "Medium Risk" },
              { color: "bg-neon-green", label: "Low Risk" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-xs text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected crime panel */}
        {selectedCrime && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-4 left-4 right-4 z-[1000] glass-strong rounded-2xl p-5"
          >
            <button
              onClick={() => setSelectedCrime(null)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>

            <div className="flex items-start gap-4">
              {/* Risk meter */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
                    <circle
                      cx="32" cy="32" r="28"
                      fill="none"
                      stroke={getColor(selectedCrime.intensity)}
                      strokeWidth="4"
                      strokeDasharray={`${(selectedCrime.intensity / 100) * 176} 176`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold font-display" style={{ color: getColor(selectedCrime.intensity) }}>
                    {selectedCrime.intensity}
                  </span>
                </div>
                <span className="text-[10px] font-semibold uppercase mt-1" style={{ color: getColor(selectedCrime.intensity) }}>
                  {getRiskLabel(selectedCrime.intensity)}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-base font-bold text-foreground">{selectedCrime.location}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{
                    backgroundColor: `${getColor(selectedCrime.intensity)}20`,
                    color: getColor(selectedCrime.intensity),
                  }}>
                    {selectedCrime.type}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{selectedCrime.count} incidents</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{selectedCrime.details}</p>

                <div className="mt-3 p-2.5 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-neon-cyan mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      This area is marked <span className="font-semibold" style={{ color: getColor(selectedCrime.intensity) }}>{getRiskLabel(selectedCrime.intensity).toLowerCase()} risk</span> due to recent {selectedCrime.type.toLowerCase()} cases and repeated incidents in the same area.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CrimeMapPage;
