import { motion } from "framer-motion";
import { MapPin, Mic, Activity, Wifi } from "lucide-react";

const sensors = [
  { icon: <MapPin className="w-4 h-4" />, label: "GPS", status: "Active" },
  { icon: <Mic className="w-4 h-4" />, label: "Audio", status: "Listening" },
  { icon: <Activity className="w-4 h-4" />, label: "Motion", status: "Tracking" },
  { icon: <Wifi className="w-4 h-4" />, label: "Network", status: "Connected" },
];

const StatusPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.3 }}
      className="mt-12 w-full max-w-sm"
    >
      <div className="grid grid-cols-2 gap-3">
        {sensors.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="glass rounded-xl p-3 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 flex items-center justify-center text-neon-cyan">
              {s.icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">{s.label}</p>
              <p className="text-[10px] text-neon-cyan animate-glow-pulse">{s.status}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatusPanel;
