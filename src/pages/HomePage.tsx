import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ShieldCheck, Map, Newspaper, Route, AlertTriangle, Menu, X, Mic, MicOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SafetyToggle from "@/components/SafetyToggle";
import StatusPanel from "@/components/StatusPanel";
import { useVoiceDetection } from "@/hooks/useVoiceDetection";
import { useLocationTracking } from "@/hooks/useLocationTracking";

const HomePage = () => {
  const [safetyMode, setSafetyMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isListening, lastDetected } = useVoiceDetection(safetyMode);
  useLocationTracking(safetyMode);

  const navItems = [
    { icon: <Map className="w-5 h-5" />, label: "Crime Map", path: "/map" },
    { icon: <Route className="w-5 h-5" />, label: "Safe Routes", path: "/routes" },
    { icon: <Newspaper className="w-5 h-5" />, label: "News Feed", path: "/news" },
    { icon: <AlertTriangle className="w-5 h-5" />, label: "Emergency", path: "/emergency" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-neon-cyan/3 blur-[150px]" />
        {safetyMode && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-neon-cyan/10 animate-pulse-ring" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-neon-cyan/10 animate-pulse-ring" style={{ animationDelay: "0.7s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-neon-cyan/10 animate-pulse-ring" style={{ animationDelay: "1.4s" }} />
          </motion.div>
        )}
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-neon flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display gradient-neon-text">TRUVIA PATH</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Safety System</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Voice indicator */}
          {safetyMode && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isListening ? "bg-neon-cyan/10 text-neon-cyan" : "bg-destructive/10 text-destructive"
              }`}
            >
              {isListening ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
            </motion.div>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-foreground">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 right-4 z-30 glass-strong rounded-xl p-2 min-w-[200px]"
          >
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-8 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={safetyMode ? "active" : "inactive"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mb-12"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 ${
              safetyMode ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" : "bg-muted text-muted-foreground"
            }`}>
              {safetyMode ? <ShieldCheck className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
              {safetyMode ? "Truvia Path is Active" : "Safety Mode Off"}
            </div>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              {safetyMode
                ? "Monitoring your surroundings in real-time. Voice, motion, and location sensors are active."
                : "Enable Safety Mode to activate AI-powered protection."}
            </p>
            {safetyMode && lastDetected && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-destructive text-xs mt-2 font-semibold"
              >
                ⚠️ Last distress keyword detected: "{lastDetected}"
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        <SafetyToggle enabled={safetyMode} onToggle={() => setSafetyMode(!safetyMode)} />

        <AnimatePresence>
          {safetyMode && <StatusPanel />}
        </AnimatePresence>
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 glass-strong border-t border-border">
        <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default HomePage;
