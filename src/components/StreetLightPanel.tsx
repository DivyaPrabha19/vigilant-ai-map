import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb, Clock } from "lucide-react";
import { StreetLight, getLightColor, getLightLabel } from "../data/crimeData";

interface Props {
  light: StreetLight;
  onClose: () => void;
}

const StreetLightPanel = ({ light, onClose }: Props) => {
  const color = getLightColor(light.status);
  const label = getLightLabel(light.status);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-4 left-4 right-4 z-[1000] glass-strong rounded-2xl p-5"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
      >
        ✕
      </button>

      <div className="flex items-start gap-4">
        {/* Lighting score meter */}
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke={color}
                strokeWidth="4"
                strokeDasharray={`${(light.lightingScore / 100) * 176} 176`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" style={{ color }} />
            </span>
          </div>
          <span className="text-[10px] font-semibold uppercase mt-1" style={{ color }}>
            {label}
          </span>
        </div>

        <div className="flex-1">
          <h3 className="text-base font-bold text-foreground">{light.street}</h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{
                backgroundColor: `${color}20`,
                color,
              }}
            >
              {light.status === "working" ? "✓ Working" : light.status === "dim" ? "◐ Dim" : "✕ Broken"}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="w-3 h-3" />
              {light.lastChecked}
            </span>
          </div>

          {/* Lighting score bar */}
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Lighting Score</span>
              <span className="text-xs font-bold font-display" style={{ color }}>{light.lightingScore}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${light.lightingScore}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: color }}
              />
            </div>
          </div>

          {light.status !== "working" && (
            <div className="mt-2.5 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-warning/10 border border-warning/20">
              <AlertTriangle className="w-3.5 h-3.5 text-warning flex-shrink-0" />
              <span className="text-[11px] text-warning font-semibold">
                {light.status === "broken"
                  ? "Street light non-functional — Increases night-time risk"
                  : "Street light dim — Reduced visibility in this area"}
              </span>
            </div>
          )}

          <div className="mt-2.5 p-2.5 rounded-lg bg-muted/30 border border-border">
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {light.status === "working"
                ? "This street has adequate lighting. Night-time visibility is good."
                : light.status === "dim"
                ? "Reduced lighting increases risk by ~10%. Caution advised during night hours."
                : "No functional lighting detected. Risk score elevated by ~15%. Avoid this street at night."}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StreetLightPanel;
