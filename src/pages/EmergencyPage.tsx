import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Phone, MapPin, Shield, AlertTriangle, Send, UserPlus, Siren, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEmergencyContacts } from "@/contexts/EmergencyContactsContext";

const EmergencyPage = () => {
  const navigate = useNavigate();
  const [alertTriggered, setAlertTriggered] = useState(false);
  const { contacts, setContacts } = useEmergencyContacts();
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const triggerSOS = () => {
    setAlertTriggered(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://maps.google.com/maps?q=${latitude},${longitude}`;
          const message = `🚨 EMERGENCY SOS! I need help urgently! My live location: ${locationUrl}`;

          contacts.forEach((contact) => {
            const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent(message)}`;
            window.open(smsUrl, "_blank");
          });
        },
        () => {
          const message = `🚨 EMERGENCY SOS! I need help urgently! Location unavailable.`;
          contacts.forEach((contact) => {
            const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent(message)}`;
            window.open(smsUrl, "_blank");
          });
        },
        { enableHighAccuracy: true }
      );
    }
  };

  const addContact = () => {
    if (newName.trim() && newPhone.trim()) {
      setContacts([...contacts, { label: "Custom", name: newName.trim(), phone: newPhone.trim() }]);
      setNewName("");
      setNewPhone("");
      setShowAddForm(false);
    }
  };

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
            onClick={triggerSOS}
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
                <p className="flex items-center gap-2"><Send className="w-3 h-3 text-neon-cyan" /> SMS sent to {contacts.length} emergency contacts</p>
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
          {contacts.length === 0 && (
            <p className="text-xs text-muted-foreground mb-3">No contacts saved. Add contacts during sign up or below.</p>
          )}
          <div className="space-y-2">
            {contacts.map((contact, i) => (
              <motion.div
                key={`${contact.name}-${i}`}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-3 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-neon-cyan font-semibold">{contact.label}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{contact.name}</p>
                  <p className="text-[11px] text-muted-foreground">{contact.phone}</p>
                </div>
                <a href={`tel:${contact.phone}`} className="w-9 h-9 rounded-lg bg-neon-cyan/10 flex items-center justify-center text-neon-cyan">
                  <Phone className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>

          {/* Add contact form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="glass rounded-xl p-3 mt-3 space-y-2"
              >
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text" placeholder="Contact Name" value={newName} onChange={(e) => setNewName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="tel" placeholder="Phone (+91...)" value={newPhone} onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <button onClick={addContact} className="w-full py-2 rounded-lg gradient-neon text-primary-foreground text-xs font-semibold">Save Contact</button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full mt-3 py-2.5 rounded-xl glass border border-dashed border-border flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <UserPlus className="w-4 h-4" /> {showAddForm ? "Cancel" : "Add Contact"}
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
              <a
                key={item.number}
                href={`tel:${item.number}`}
                className="py-3 rounded-lg glass text-center hover:border-primary/30 transition-all block"
              >
                <p className="text-lg font-bold font-display text-neon-cyan">{item.number}</p>
                <p className="text-[10px] text-muted-foreground">{item.label}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
