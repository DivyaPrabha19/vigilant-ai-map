import { useEffect, useRef, useState, useCallback } from "react";
import { useEmergencyContacts } from "@/contexts/EmergencyContactsContext";
import { toast } from "@/hooks/use-toast";

const DISTRESS_KEYWORDS = ["help", "bachao", "save me", "emergency", "danger", "please help"];

export const useVoiceDetection = (enabled: boolean) => {
  const [isListening, setIsListening] = useState(false);
  const [lastDetected, setLastDetected] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const { contacts, userLocation } = useEmergencyContacts();

  const triggerEmergency = useCallback((keyword: string) => {
    setLastDetected(keyword);

    toast({
      title: "🚨 Distress Detected!",
      description: `Keyword "${keyword}" detected. Alerting emergency contacts...`,
      variant: "destructive",
    });

    // Get current location and send SMS via tel: links
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://maps.google.com/maps?q=${latitude},${longitude}`;
          const message = `🚨 EMERGENCY ALERT! I need help! My location: ${locationUrl}`;

          contacts.forEach((contact) => {
            const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent(message)}`;
            window.open(smsUrl, "_blank");
          });
        },
        () => {
          // Fallback without precise location
          const message = `🚨 EMERGENCY ALERT! I need help! Location unavailable.`;
          contacts.forEach((contact) => {
            const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent(message)}`;
            window.open(smsUrl, "_blank");
          });
        },
        { enableHighAccuracy: true }
      );
    }
  }, [contacts, userLocation]);

  useEffect(() => {
    if (!enabled) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      // Auto-restart if still enabled
      if (enabled) {
        try { recognition.start(); } catch {}
      } else {
        setIsListening(false);
      }
    };

    recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript.toLowerCase().trim();
        for (const keyword of DISTRESS_KEYWORDS) {
          if (transcript.includes(keyword)) {
            triggerEmergency(keyword);
            return;
          }
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error !== "aborted" && enabled) {
        setTimeout(() => {
          try { recognition.start(); } catch {}
        }, 1000);
      }
    };

    try {
      recognition.start();
    } catch {}

    recognitionRef.current = recognition;

    return () => {
      try { recognition.stop(); } catch {}
      recognitionRef.current = null;
    };
  }, [enabled, triggerEmergency]);

  return { isListening, lastDetected };
};
