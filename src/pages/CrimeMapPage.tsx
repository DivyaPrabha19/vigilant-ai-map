import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, AlertTriangle, Info, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  crimeData, CrimeEntry, StreetLight,
  getColor, getRiskLabel, getLightColor, getAdjustedRisk,
} from "../data/crimeData";
import { tamilNaduDistricts, getDistrictColor } from "../data/districtCrimeData";
import { getAllStreetLights } from "../data/streetLightData";
import StreetLightPanel from "../components/StreetLightPanel";

const CrimeMapPage = () => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selectedCrime, setSelectedCrime] = useState<CrimeEntry | null>(null);
  const [selectedLight, setSelectedLight] = useState<StreetLight | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLights, setShowLights] = useState(true);
  const lightMarkersRef = useRef<L.Marker[]>([]);

  const selectCrime = (crime: CrimeEntry) => {
    setSelectedLight(null);
    // Compute adjusted intensity based on nearby lights
    const nearby = streetLights.filter(
      (l) => Math.abs(l.lat - crime.lat) < 0.05 && Math.abs(l.lng - crime.lng) < 0.05
    );
    const adjusted = getAdjustedRisk(crime.intensity, nearby);
    setSelectedCrime({ ...crime, intensity: adjusted });
  };

  const selectLight = (light: StreetLight) => {
    setSelectedCrime(null);
    setSelectedLight(light);
  };

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, { zoomControl: false }).setView([11.1271, 78.6569], 7);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);

    // District markers (clickable → graph page)
    tamilNaduDistricts.forEach((dist) => {
      const color = getDistrictColor(dist.intensity);
      const size = Math.max(22, dist.intensity / 2.5);
      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};opacity:0.75;box-shadow:0 0 ${size}px ${color},0 0 ${size * 2}px ${color}40;animation:pulse 2s ease-in-out infinite;cursor:pointer;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:7px;font-weight:700;color:#000;text-transform:uppercase;letter-spacing:0.5px;pointer-events:none;">${dist.district.slice(0, 3)}</span>
        </div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
      L.marker([dist.lat, dist.lng], { icon }).addTo(map).on("click", () => {
        navigate(`/district/${dist.district.toLowerCase().replace(/\s+/g, "-")}`);
      });
    });

    // Crime markers (individual incidents)
    crimeData.forEach((crime) => {
      const color = getColor(crime.intensity);
      const size = Math.max(14, crime.intensity / 3);
      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};opacity:0.6;box-shadow:0 0 ${size}px ${color};cursor:pointer;"></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
      L.marker([crime.lat, crime.lng], { icon }).addTo(map).on("click", () => selectCrime(crime));
    });

    // Street light markers
    const markers: L.Marker[] = [];
    streetLights.forEach((light) => {
      const c = getLightColor(light.status);
      const glow = light.status === "working" ? `0 0 8px ${c}, 0 0 16px ${c}40` : light.status === "dim" ? `0 0 6px ${c}80` : "none";
      const icon = L.divIcon({
        className: "street-light-marker",
        html: `<div style="width:14px;height:14px;border-radius:3px;background:${c};opacity:0.9;box-shadow:${glow};border:1.5px solid ${c};cursor:pointer;display:flex;align-items:center;justify-content:center;">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="hsl(220,20%,4%)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
        </div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      const m = L.marker([light.lat, light.lng], { icon }).addTo(map).on("click", () => selectLight(light));
      markers.push(m);
    });
    lightMarkersRef.current = markers;

    mapInstance.current = map;
    return () => { map.remove(); mapInstance.current = null; };
  }, []);

  // Toggle street light visibility
  useEffect(() => {
    lightMarkersRef.current.forEach((m) => {
      const el = m.getElement();
      if (el) el.style.display = showLights ? "" : "none";
    });
  }, [showLights]);

  const handleSearch = () => {
    const q = searchQuery.toLowerCase();
    // Search districts first
    const dist = tamilNaduDistricts.find((d) => d.district.toLowerCase().includes(q) || d.mainTowns.some((t) => t.toLowerCase().includes(q)));
    if (dist && mapInstance.current) {
      mapInstance.current.flyTo([dist.lat, dist.lng], 11, { duration: 1.5 });
      navigate(`/district/${dist.district.toLowerCase().replace(/\s+/g, "-")}`);
      return;
    }
    // Search in crimes
    const found = crimeData.find((c) => c.location.toLowerCase().includes(q));
    if (found && mapInstance.current) {
      mapInstance.current.flyTo([found.lat, found.lng], 13, { duration: 1.5 });
      selectCrime(found);
      return;
    }
    // Search in street lights
    const light = streetLights.find((l) => l.street.toLowerCase().includes(q));
    if (light && mapInstance.current) {
      mapInstance.current.flyTo([light.lat, light.lng], 16, { duration: 1.5 });
      selectLight(light);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="relative z-20 flex items-center gap-3 p-4 glass-strong">
        <button onClick={() => navigate("/home")} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold font-display gradient-neon-text">Crime Heatmap</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Tamil Nadu · Live</p>
        </div>
        {/* Street Light Toggle */}
        <button
          onClick={() => setShowLights(!showLights)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${showLights ? "bg-neon-green/20 text-neon-green border border-neon-green/30" : "glass text-muted-foreground"}`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          Lights
        </button>
      </header>

      <div className="relative z-20 px-4 py-2">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search location or street (e.g., DB Road)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleSearch} className="px-4 rounded-xl gradient-neon text-primary-foreground text-sm font-semibold">
            Go
          </motion.button>
        </div>
      </div>

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
          {showLights && (
            <>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-3 mb-2">Street Lights</p>
              <div className="space-y-1.5">
                {[
                  { color: "bg-neon-green", label: "Working" },
                  { color: "bg-neon-yellow", label: "Dim" },
                  { color: "bg-neon-red", label: "Broken" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-sm ${item.color}`} />
                    <span className="text-xs text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Crime detail panel */}
        {selectedCrime && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-4 left-4 right-4 z-[1000] glass-strong rounded-2xl p-5"
          >
            <button onClick={() => setSelectedCrime(null)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">✕</button>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
                    <circle cx="32" cy="32" r="28" fill="none" stroke={getColor(selectedCrime.intensity)} strokeWidth="4" strokeDasharray={`${(selectedCrime.intensity / 100) * 176} 176`} strokeLinecap="round" />
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
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: `${getColor(selectedCrime.intensity)}20`, color: getColor(selectedCrime.intensity) }}>
                    {selectedCrime.type}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{selectedCrime.count} incidents</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{selectedCrime.details}</p>

                {selectedCrime.isDark && (
                  <div className="mt-2 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-warning/10 border border-warning/20">
                    <AlertTriangle className="w-3.5 h-3.5 text-warning flex-shrink-0" />
                    <span className="text-[11px] text-warning font-semibold">Poorly lit area — Low street lighting detected</span>
                  </div>
                )}

                <div className="mt-3 p-2.5 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-neon-cyan mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      This area is marked <span className="font-semibold" style={{ color: getColor(selectedCrime.intensity) }}>{getRiskLabel(selectedCrime.intensity).toLowerCase()} risk</span> due to recent {selectedCrime.type.toLowerCase()} cases and repeated incidents in the same area.
                      {selectedCrime.isDark && " Risk score adjusted (+) due to poor street lighting conditions."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Street light detail panel */}
        {selectedLight && (
          <StreetLightPanel light={selectedLight} onClose={() => setSelectedLight(null)} />
        )}
      </div>
    </div>
  );
};

export default CrimeMapPage;
