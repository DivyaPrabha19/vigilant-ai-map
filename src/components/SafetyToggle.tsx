import { motion } from "framer-motion";
import { Power } from "lucide-react";

interface SafetyToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

const SafetyToggle = ({ enabled, onToggle }: SafetyToggleProps) => {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      className="relative w-44 h-44 rounded-full flex items-center justify-center"
    >
      {/* Outer ring */}
      <div className={`absolute inset-0 rounded-full transition-all duration-700 ${
        enabled
          ? "border-2 border-neon-cyan/40 neon-glow-cyan"
          : "border-2 border-muted"
      }`} />

      {/* Pulse rings when active */}
      {enabled && (
        <>
          <div className="absolute inset-[-8px] rounded-full border border-neon-cyan/20 animate-pulse-ring" />
          <div className="absolute inset-[-8px] rounded-full border border-neon-cyan/20 animate-pulse-ring" style={{ animationDelay: "1s" }} />
        </>
      )}

      {/* Inner circle */}
      <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center gap-2 transition-all duration-700 ${
        enabled
          ? "gradient-neon shadow-[0_0_40px_hsla(185,100%,50%,0.3)]"
          : "bg-muted"
      }`}>
        <Power className={`w-8 h-8 transition-colors duration-500 ${
          enabled ? "text-primary-foreground" : "text-muted-foreground"
        }`} />
        <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${
          enabled ? "text-primary-foreground" : "text-muted-foreground"
        }`}>
          {enabled ? "Active" : "Start"}
        </span>
      </div>
    </motion.button>
  );
};

export default SafetyToggle;
