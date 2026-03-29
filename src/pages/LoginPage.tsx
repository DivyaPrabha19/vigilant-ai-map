import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Mail, Lock, User, Eye, EyeOff, Phone, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEmergencyContacts } from "@/contexts/EmergencyContactsContext";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherPhone, setFatherPhone] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherPhone, setMotherPhone] = useState("");
  const [otherName, setOtherName] = useState("");
  const [otherPhone, setOtherPhone] = useState("");
  const navigate = useNavigate();
  const { setContacts } = useEmergencyContacts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      const emergencyContacts = [];
      if (fatherPhone.trim()) emergencyContacts.push({ label: "Father", name: fatherName || "Father", phone: fatherPhone.trim() });
      if (motherPhone.trim()) emergencyContacts.push({ label: "Mother", name: motherName || "Mother", phone: motherPhone.trim() });
      if (otherPhone.trim()) emergencyContacts.push({ label: "Other", name: otherName || "Other Contact", phone: otherPhone.trim() });
      setContacts(emergencyContacts);
    }
    navigate("/permissions");
  };

  const handleGoogleLogin = () => {
    navigate("/permissions");
  };

  const inputClasses = "w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-magenta/5 blur-[120px] animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-purple/3 blur-[150px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--neon-cyan)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--neon-cyan)) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-neon mb-3 neon-glow-cyan">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold font-display gradient-neon-text">AI GUARDIAN</h1>
          <p className="text-muted-foreground mt-1 text-sm">Your AI-Powered Safety Companion</p>
        </motion.div>

        {/* Glass card */}
        <div className="glass rounded-2xl p-6 neon-glow-cyan">
          {/* Tab switcher */}
          <div className="flex rounded-xl bg-muted/50 p-1 mb-5">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                isLogin ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                !isLogin ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              {!isLogin && (
                <>
                  {/* Full Name */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} required />
                  </div>
                </>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} required />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClasses} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Emergency Contacts - only on Sign Up */}
              {!isLogin && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-neon-cyan" />
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Emergency Contacts</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground -mt-2">These contacts will be alerted during emergencies with your live location.</p>

                  {/* Father */}
                  <div className="glass rounded-lg p-3 space-y-2">
                    <p className="text-xs font-semibold text-neon-cyan">Father's Details</p>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input type="text" placeholder="Father's Name" value={fatherName} onChange={(e) => setFatherName(e.target.value)} className={inputClasses} />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input type="tel" placeholder="Father's Phone (+91...)" value={fatherPhone} onChange={(e) => setFatherPhone(e.target.value)} className={inputClasses} required />
                    </div>
                  </div>

                  {/* Mother */}
                  <div className="glass rounded-lg p-3 space-y-2">
                    <p className="text-xs font-semibold text-neon-magenta">Mother's Details</p>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input type="text" placeholder="Mother's Name" value={motherName} onChange={(e) => setMotherName(e.target.value)} className={inputClasses} />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input type="tel" placeholder="Mother's Phone (+91...)" value={motherPhone} onChange={(e) => setMotherPhone(e.target.value)} className={inputClasses} required />
                    </div>
                  </div>

                  {/* Other Contact */}
                  <div className="glass rounded-lg p-3 space-y-2">
                    <p className="text-xs font-semibold text-neon-purple">Other Contact</p>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input type="text" placeholder="Name (Friend / Sibling)" value={otherName} onChange={(e) => setOtherName(e.target.value)} className={inputClasses} />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input type="tel" placeholder="Phone Number (+91...)" value={otherPhone} onChange={(e) => setOtherPhone(e.target.value)} className={inputClasses} />
                    </div>
                  </div>
                </div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl gradient-neon text-primary-foreground font-semibold text-sm tracking-wide neon-glow-cyan transition-all"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google login */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            className="w-full py-3 rounded-xl glass border border-border flex items-center justify-center gap-3 text-foreground hover:border-primary/30 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-sm font-medium">Continue with Google</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
