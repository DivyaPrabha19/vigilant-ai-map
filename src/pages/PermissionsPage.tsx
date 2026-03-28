import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mic, Activity, ChevronRight, Shield, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Permission = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  granted: boolean;
};

const PermissionsPage = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<Permission[]>([
    { id: "location", icon: <MapPin className="w-6 h-6" />, title: "Location Access", description: "Track your position for real-time safety monitoring", granted: false },
    { id: "microphone", icon: <Mic className="w-6 h-6" />, title: "Microphone", description: "Detect distress calls and panic keywords", granted: false },
    { id: "motion", icon: <Activity className="w-6 h-6" />, title: "Motion Sensors", description: "Detect sudden movements or phone snatching", granted: false },
  ]);

  const handleGrant = (id: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, granted: true } : p))
    );
  };

  const allGranted = permissions.every((p) => p.granted);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background px-4">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-neon-cyan/5 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-neon-purple/5 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-neon mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold font-display gradient-neon-text">Enable Permissions</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            AI Guardian needs these to protect you
          </p>
        </div>

        <div className="space-y-4">
          {permissions.map((perm, i) => (
            <motion.div
              key={perm.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`glass rounded-xl p-4 flex items-center gap-4 transition-all duration-500 ${
                perm.granted ? "border-primary/30 neon-glow-cyan" : ""
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                perm.granted ? "gradient-neon text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {perm.granted ? <Check className="w-6 h-6" /> : perm.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-foreground">{perm.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{perm.description}</p>
              </div>
              {!perm.granted && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleGrant(perm.id)}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
                >
                  Allow
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/home")}
          disabled={!allGranted}
          className={`w-full mt-8 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-500 ${
            allGranted
              ? "gradient-neon text-primary-foreground neon-glow-cyan"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          Continue <ChevronRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PermissionsPage;
