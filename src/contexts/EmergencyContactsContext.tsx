import { createContext, useContext, useState, ReactNode } from "react";

export type EmergencyContact = {
  label: string;
  name: string;
  phone: string;
};

type EmergencyContactsContextType = {
  contacts: EmergencyContact[];
  setContacts: (contacts: EmergencyContact[]) => void;
  userLocation: { lat: number; lng: number } | null;
  setUserLocation: (loc: { lat: number; lng: number } | null) => void;
};

const EmergencyContactsContext = createContext<EmergencyContactsContextType>({
  contacts: [],
  setContacts: () => {},
  userLocation: null,
  setUserLocation: () => {},
});

export const useEmergencyContacts = () => useContext(EmergencyContactsContext);

export const EmergencyContactsProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContactsState] = useState<EmergencyContact[]>(() => {
    const saved = localStorage.getItem("emergency_contacts");
    return saved ? JSON.parse(saved) : [];
  });
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const setContacts = (newContacts: EmergencyContact[]) => {
    setContactsState(newContacts);
    localStorage.setItem("emergency_contacts", JSON.stringify(newContacts));
  };

  return (
    <EmergencyContactsContext.Provider value={{ contacts, setContacts, userLocation, setUserLocation }}>
      {children}
    </EmergencyContactsContext.Provider>
  );
};
