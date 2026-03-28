export interface CrimeEntry {
  lat: number;
  lng: number;
  type: string;
  location: string;
  intensity: number;
  count: number;
  details: string;
  isDark: boolean;
}

export interface StreetLight {
  lat: number;
  lng: number;
  street: string;
  status: "working" | "broken" | "dim";
  lastChecked: string;
  lightingScore: number; // 0-100, higher = better lit
}

export const crimeData: CrimeEntry[] = [
  { lat: 11.3410, lng: 77.7172, type: "Theft", location: "Erode", intensity: 85, count: 12, details: "Multiple chain snatching incidents reported near bus stand area.", isDark: true },
  { lat: 11.0168, lng: 76.9558, type: "Assault", location: "Coimbatore", intensity: 72, count: 8, details: "Night-time assault cases in the industrial zone.", isDark: true },
  { lat: 13.0827, lng: 80.2707, type: "Robbery", location: "Chennai Central", intensity: 90, count: 15, details: "High frequency of mobile snatching near railway station.", isDark: false },
  { lat: 9.9252, lng: 78.1198, type: "Harassment", location: "Madurai", intensity: 65, count: 6, details: "Eve-teasing incidents near college area.", isDark: true },
  { lat: 10.7905, lng: 78.7047, type: "Burglary", location: "Trichy", intensity: 55, count: 4, details: "Residential area break-ins during festival season.", isDark: false },
  { lat: 11.1271, lng: 78.6569, type: "Theft", location: "Namakkal", intensity: 45, count: 3, details: "Vehicle theft cases.", isDark: false },
  { lat: 11.6643, lng: 78.1460, type: "Murder", location: "Salem", intensity: 78, count: 2, details: "Gang rivalry incidents.", isDark: true },
  { lat: 8.0883, lng: 77.5385, type: "Theft", location: "Nagercoil", intensity: 40, count: 3, details: "Petty theft cases.", isDark: false },
  { lat: 12.9165, lng: 79.1325, type: "Assault", location: "Vellore", intensity: 60, count: 5, details: "Road rage incidents.", isDark: false },
  { lat: 10.3624, lng: 77.9695, type: "Harassment", location: "Dindigul", intensity: 50, count: 4, details: "Public harassment cases.", isDark: true },
  { lat: 11.3614, lng: 77.5874, type: "Theft", location: "Kavindapadi, Erode", intensity: 82, count: 9, details: "Repeated chain snatching and theft in market area. Mostly at night.", isDark: true },
  { lat: 13.1289, lng: 80.2083, type: "Robbery", location: "Ambattur, Chennai", intensity: 75, count: 7, details: "Industrial area robberies targeting late-night workers.", isDark: true },
  { lat: 12.8185, lng: 80.0414, type: "Burglary", location: "Tambaram, Chennai", intensity: 68, count: 5, details: "Residential break-ins in new housing areas.", isDark: false },
];

// Coimbatore street light nodes
export const streetLights: StreetLight[] = [
  // RS Puram area
  { lat: 11.0060, lng: 76.9520, street: "DB Road, RS Puram", status: "working", lastChecked: "2 hrs ago", lightingScore: 85 },
  { lat: 11.0045, lng: 76.9485, street: "Oppanakara St, RS Puram", status: "dim", lastChecked: "5 hrs ago", lightingScore: 40 },
  { lat: 11.0080, lng: 76.9550, street: "TV Samy Road, RS Puram", status: "working", lastChecked: "1 hr ago", lightingScore: 90 },

  // Gandhipuram
  { lat: 11.0180, lng: 76.9670, street: "Cross Cut Road, Gandhipuram", status: "broken", lastChecked: "12 hrs ago", lightingScore: 5 },
  { lat: 11.0200, lng: 76.9640, street: "Nehru Street, Gandhipuram", status: "dim", lastChecked: "6 hrs ago", lightingScore: 35 },
  { lat: 11.0165, lng: 76.9700, street: "Sathy Road, Gandhipuram", status: "working", lastChecked: "3 hrs ago", lightingScore: 75 },

  // Saibaba Colony
  { lat: 11.0230, lng: 76.9400, street: "Mettupalayam Rd, Saibaba Colony", status: "working", lastChecked: "1 hr ago", lightingScore: 88 },
  { lat: 11.0250, lng: 76.9430, street: "Bharathi Park Rd, Saibaba Colony", status: "dim", lastChecked: "4 hrs ago", lightingScore: 45 },

  // Peelamedu
  { lat: 11.0280, lng: 77.0020, street: "Avinashi Road, Peelamedu", status: "working", lastChecked: "2 hrs ago", lightingScore: 80 },
  { lat: 11.0310, lng: 77.0080, street: "Kalapatti Road, Peelamedu", status: "broken", lastChecked: "18 hrs ago", lightingScore: 0 },

  // Singanallur
  { lat: 10.9950, lng: 76.9780, street: "Trichy Road, Singanallur", status: "working", lastChecked: "30 min ago", lightingScore: 92 },
  { lat: 10.9930, lng: 76.9820, street: "Nava India Rd, Singanallur", status: "broken", lastChecked: "24 hrs ago", lightingScore: 8 },

  // Ukkadam
  { lat: 10.9880, lng: 76.9600, street: "Ukkadam Big Bazaar St", status: "dim", lastChecked: "8 hrs ago", lightingScore: 30 },
  { lat: 10.9860, lng: 76.9570, street: "Sungam Bypass, Ukkadam", status: "broken", lastChecked: "2 days ago", lightingScore: 0 },

  // Town Hall area
  { lat: 11.0120, lng: 76.9580, street: "Big Bazaar St, Town Hall", status: "working", lastChecked: "45 min ago", lightingScore: 82 },
  { lat: 11.0100, lng: 76.9560, street: "Raja Street, Town Hall", status: "dim", lastChecked: "7 hrs ago", lightingScore: 38 },

  // Race Course
  { lat: 11.0140, lng: 76.9480, street: "Race Course Road", status: "working", lastChecked: "1 hr ago", lightingScore: 95 },
  { lat: 11.0155, lng: 76.9450, street: "Nanjappa Road, Race Course", status: "working", lastChecked: "2 hrs ago", lightingScore: 87 },

  // Podanur
  { lat: 10.9630, lng: 76.9890, street: "Railway Station Rd, Podanur", status: "broken", lastChecked: "3 days ago", lightingScore: 3 },
  { lat: 10.9660, lng: 76.9850, street: "Bharathiar Rd, Podanur", status: "dim", lastChecked: "10 hrs ago", lightingScore: 28 },
];

export const getColor = (intensity: number) => {
  if (intensity >= 70) return "hsl(0, 100%, 55%)";
  if (intensity >= 50) return "hsl(45, 100%, 55%)";
  return "hsl(145, 100%, 42%)";
};

export const getRiskLabel = (intensity: number) => {
  if (intensity >= 70) return "High";
  if (intensity >= 50) return "Medium";
  return "Low";
};

export const getLightColor = (status: StreetLight["status"]) => {
  if (status === "working") return "hsl(145, 100%, 50%)";
  if (status === "dim") return "hsl(45, 100%, 55%)";
  return "hsl(0, 100%, 55%)";
};

export const getLightLabel = (status: StreetLight["status"]) => {
  if (status === "working") return "Well Lit";
  if (status === "dim") return "Dim";
  return "No Light";
};

// Adjusted risk score factoring in lighting
export const getAdjustedRisk = (baseIntensity: number, nearbyLights: StreetLight[]): number => {
  if (nearbyLights.length === 0) return baseIntensity;
  const avgLighting = nearbyLights.reduce((sum, l) => sum + l.lightingScore, 0) / nearbyLights.length;
  // Poor lighting adds up to +15 risk, good lighting reduces up to -10
  const lightingModifier = Math.round((50 - avgLighting) * 0.3);
  return Math.min(100, Math.max(0, baseIntensity + lightingModifier));
};
