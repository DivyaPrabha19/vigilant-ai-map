import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Phone, MapPin, Shield, AlertTriangle, Send, UserPlus, Siren } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmergencyPage = () => {
  const navigate = useNavigate();
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [contacts] = useState([
    { name: "Mom", phone: "+91 98765 43210" },
    { name: "Dad", phone: "+91 98765 43211" },
    { name: "Friend - Priya", phone: "+91 98765 43212" },
  ]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="relative z-20 flex items-center gap-3 p-4 glass-strong">
        <button onClick={() => navigate("/home")} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold font-display gradient-neon-text">Emergency</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Quick Response System</p>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* SOS Button */}
        <motion.div className="flex justify-center py-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setAlertTriggered(true)}
            className="relative w-36 h-36 rounded-full flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse-ring" />
            <div className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse-ring" style={{ animationDelay: "1s" }} />
            <div className="w-28 h-28 rounded-full bg-destructive flex flex-col items-center justify-center gap-1 shadow-[0_0_40px_hsla(0,85%,55%,0.4)]">
              <Siren className="w-8 h-8 text-destructive-foreground" />
              <span className="text-xs font-bold text-destructive-foreground uppercase tracking-wider">SOS</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Alert status */}
        <AnimatePresence>
          {alertTriggered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-xl p-4 border border-destructive/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-destructive animate-glow-pulse" />
                <div>
                  <h3 className="text-sm font-bold text-destructive">Emergency Detected</h3>
                  <p className="text-[10px] text-muted-foreground">Help has been notified</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p className="flex items-center gap-2"><Send className="w-3 h-3 text-neon-cyan" /> SMS sent to 3 emergency contacts</p>
                <p className="flex items-center gap-2"><MapPin className="w-3 h-3 text-neon-cyan" /> Live location shared</p>
                <p className="flex items-center gap-2"><Shield className="w-3 h-3 text-neon-cyan" /> Alert: Location + Timestamp + Risk reason</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setAlertTriggered(false)}
                className="w-full mt-3 py-2 rounded-lg bg-muted text-foreground text-xs font-semibold"
              >
                Cancel Alert
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Emergency contacts */}
        <div>
          <h2 className="text-sm font-bold text-foreground mb-3 font-display">Emergency Contacts</h2>
          <div className="space-y-2">
            {contacts.map((contact, i) => (
              <motion.div
                key={contact.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{contact.name}</p>
                  <p className="text-[11px] text-muted-foreground">{contact.phone}</p>
                </div>
                <button className="w-9 h-9 rounded-lg bg-neon-cyan/10 flex items-center justify-center text-neon-cyan">
                  <Phone className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full mt-3 py-2.5 rounded-xl glass border border-dashed border-border flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <UserPlus className="w-4 h-4" /> Add Contact
          </motion.button>
        </div>

        {/* Quick dial */}
        <div className="glass rounded-xl p-4">
          <h2 className="text-sm font-bold text-foreground mb-3 font-display">Quick Dial</h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Police", number: "100" },
              { label: "Ambulance", number: "108" },
              { label: "Women Helpline", number: "1091" },
            ].map((item) => (
              <button
                key={item.number}
                className="py-3 rounded-lg glass text-center hover:border-primary/30 transition-all"
              >
                <p className="text-lg font-bold font-display text-neon-cyan">{item.number}</p>
                <p className="text-[10px] text-muted-foreground">{item.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
