import { StreetLight } from "./crimeData";

export interface DistrictStreetLights {
  district: string;
  lights: StreetLight[];
}

// Generate a recent human-readable timestamp
const recentTime = (minutesAgo: number): string => {
  if (minutesAgo < 60) return `${minutesAgo} min ago`;
  const hrs = Math.floor(minutesAgo / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
  return "1 day ago";
};

// Seeded random for consistent but recent-looking timestamps
const recentChecked = (seed: number): string => {
  const options = [3, 8, 12, 18, 25, 35, 45, 60, 90, 120, 180];
  return recentTime(options[seed % options.length]);
};

// Helper to generate lights for a district given town centers
type LightInput = { street: string; status: "working" | "dim" | "broken"; lightingScore: number; lastChecked?: string };
const makeLights = (
  towns: { name: string; lat: number; lng: number; lights: LightInput[] }[]
): StreetLight[] =>
  towns.flatMap((t, ti) =>
    t.lights.map((l, i) => ({
      lat: t.lat + (i % 2 === 0 ? 0.002 : -0.002) * (i + 1),
      lng: t.lng + (i % 2 === 0 ? -0.001 : 0.003) * (i + 1),
      street: l.street,
      status: l.status,
      lightingScore: l.lightingScore,
      lastChecked: recentChecked(ti * 7 + i * 3 + l.lightingScore),
    }))
  );

export const allDistrictStreetLights: DistrictStreetLights[] = [
  {
    district: "Chennai",
    lights: makeLights([
      { name: "T. Nagar", lat: 13.0418, lng: 80.2341, lights: [
        { street: "Usman Road, T. Nagar", status: "working", lightingScore: 90 },
        { street: "Pondy Bazaar, T. Nagar", status: "working", lightingScore: 85 },
        { street: "GN Chetty Road, T. Nagar", status: "dim", lightingScore: 45 },
      ]},
      { name: "Ambattur", lat: 13.1143, lng: 80.1548, lights: [
        { street: "MTH Road, Ambattur", status: "working", lightingScore: 88 },
        { street: "Industrial Estate Rd, Ambattur", status: "broken", lightingScore: 5 },
      ]},
      { name: "Velachery", lat: 12.9815, lng: 80.2180, lights: [
        { street: "100 Feet Road, Velachery", status: "working", lightingScore: 92 },
        { street: "Taramani Link Rd, Velachery", status: "dim", lightingScore: 38 },
      ]},
      { name: "Anna Nagar", lat: 13.0850, lng: 80.2101, lights: [
        { street: "2nd Avenue, Anna Nagar", status: "working", lightingScore: 94 },
        { street: "Shanti Colony, Anna Nagar", status: "working", lightingScore: 87 },
      ]},
    ]),
  },
  {
    district: "Coimbatore",
    lights: makeLights([
      { name: "RS Puram", lat: 11.0060, lng: 76.9520, lights: [
        { street: "DB Road, RS Puram", status: "working", lightingScore: 85 },
        { street: "Oppanakara St, RS Puram", status: "dim", lightingScore: 40 },
        { street: "TV Samy Road, RS Puram", status: "working", lightingScore: 90 },
      ]},
      { name: "Gandhipuram", lat: 11.0180, lng: 76.9670, lights: [
        { street: "Cross Cut Road, Gandhipuram", status: "broken", lightingScore: 5 },
        { street: "Nehru Street, Gandhipuram", status: "dim", lightingScore: 35 },
        { street: "Sathy Road, Gandhipuram", status: "working", lightingScore: 75 },
      ]},
      { name: "Peelamedu", lat: 11.0280, lng: 77.0020, lights: [
        { street: "Avinashi Road, Peelamedu", status: "working", lightingScore: 80 },
        { street: "Kalapatti Road, Peelamedu", status: "broken", lightingScore: 0 },
      ]},
      { name: "Singanallur", lat: 10.9950, lng: 76.9780, lights: [
        { street: "Trichy Road, Singanallur", status: "working", lightingScore: 92 },
        { street: "Nava India Rd, Singanallur", status: "broken", lightingScore: 8 },
      ]},
      { name: "Saibaba Colony", lat: 11.0230, lng: 76.9400, lights: [
        { street: "Mettupalayam Rd, Saibaba Colony", status: "working", lightingScore: 88 },
        { street: "Bharathi Park Rd, Saibaba Colony", status: "dim", lightingScore: 45 },
      ]},
      { name: "Ukkadam", lat: 10.9880, lng: 76.9600, lights: [
        { street: "Ukkadam Big Bazaar St", status: "dim", lightingScore: 30 },
        { street: "Sungam Bypass, Ukkadam", status: "broken", lightingScore: 0 },
      ]},
    ]),
  },
  {
    district: "Madurai",
    lights: makeLights([
      { name: "Meenakshi Amman", lat: 9.9195, lng: 78.1193, lights: [
        { street: "East Masi St, Madurai", status: "working", lightingScore: 88 },
        { street: "West Masi St, Madurai", status: "dim", lightingScore: 42 },
      ]},
      { name: "Anna Nagar", lat: 9.9350, lng: 78.1250, lights: [
        { street: "Bypass Road, Anna Nagar", status: "working", lightingScore: 78 },
        { street: "Nehru St, Anna Nagar", status: "broken", lightingScore: 3 },
      ]},
      { name: "KK Nagar", lat: 9.9400, lng: 78.1050, lights: [
        { street: "Main Road, KK Nagar", status: "working", lightingScore: 82 },
        { street: "2nd Cross St, KK Nagar", status: "dim", lightingScore: 35 },
      ]},
    ]),
  },
  {
    district: "Tiruchirappalli",
    lights: makeLights([
      { name: "Srirangam", lat: 10.8560, lng: 78.6920, lights: [
        { street: "Temple Road, Srirangam", status: "working", lightingScore: 90 },
        { street: "Car Street, Srirangam", status: "dim", lightingScore: 40 },
      ]},
      { name: "Cantonment", lat: 10.8050, lng: 78.6900, lights: [
        { street: "Williams Road, Cantonment", status: "working", lightingScore: 85 },
        { street: "Junction Road, Cantonment", status: "broken", lightingScore: 8 },
      ]},
    ]),
  },
  {
    district: "Salem",
    lights: makeLights([
      { name: "Hasthampatti", lat: 11.6550, lng: 78.1550, lights: [
        { street: "Cherry Road, Hasthampatti", status: "dim", lightingScore: 38 },
        { street: "Omalur Road, Hasthampatti", status: "broken", lightingScore: 5 },
      ]},
      { name: "Fairlands", lat: 11.6700, lng: 78.1300, lights: [
        { street: "5 Roads Junction, Fairlands", status: "working", lightingScore: 80 },
        { street: "Steel Plant Rd, Salem", status: "dim", lightingScore: 32 },
      ]},
    ]),
  },
  {
    district: "Erode",
    lights: makeLights([
      { name: "Erode City", lat: 11.3410, lng: 77.7172, lights: [
        { street: "EVN Road, Erode City", status: "working", lightingScore: 82 },
        { street: "Brough Road, Erode City", status: "dim", lightingScore: 40 },
        { street: "Cauvery Bridge Rd, Erode City", status: "working", lightingScore: 78 },
      ]},
      { name: "Perundurai", lat: 11.2750, lng: 77.5870, lights: [
        { street: "Main Road, Perundurai", status: "working", lightingScore: 75 },
        { street: "Industrial Area Rd, Perundurai", status: "dim", lightingScore: 38 },
      ]},
      { name: "Gobichettipalayam", lat: 11.4550, lng: 77.4370, lights: [
        { street: "Sathy Road, Gobichettipalayam", status: "working", lightingScore: 80 },
        { street: "Bus Stand Rd, Gobichettipalayam", status: "dim", lightingScore: 42 },
        { street: "Bazar Street, Gobichettipalayam", status: "broken", lightingScore: 8 },
      ]},
      { name: "Sathyamangalam", lat: 11.5050, lng: 77.2380, lights: [
        { street: "Mysore Road, Sathyamangalam", status: "dim", lightingScore: 35 },
        { street: "Forest Range Rd, Sathyamangalam", status: "broken", lightingScore: 5 },
        { street: "Main Bazaar, Sathyamangalam", status: "working", lightingScore: 72 },
      ]},
      { name: "Bhavani", lat: 11.4500, lng: 77.6800, lights: [
        { street: "Sangam Road, Bhavani", status: "working", lightingScore: 76 },
        { street: "Temple Street, Bhavani", status: "dim", lightingScore: 35 },
        { street: "Main Bazaar, Bhavani", status: "broken", lightingScore: 10 },
      ]},
      { name: "Anthiyur", lat: 11.5720, lng: 77.5890, lights: [
        { street: "Sathy Road, Anthiyur", status: "dim", lightingScore: 32 },
        { street: "Market Street, Anthiyur", status: "broken", lightingScore: 5 },
      ]},
      { name: "Modakurichi", lat: 11.3030, lng: 77.7830, lights: [
        { street: "Main Road, Modakurichi", status: "dim", lightingScore: 38 },
        { street: "Village Rd, Modakurichi", status: "broken", lightingScore: 8 },
      ]},
      { name: "Kodumudi", lat: 11.0770, lng: 77.8870, lights: [
        { street: "Temple Road, Kodumudi", status: "working", lightingScore: 70 },
        { street: "River Bank Rd, Kodumudi", status: "dim", lightingScore: 30 },
      ]},
      { name: "Nambiyur", lat: 11.3560, lng: 77.3280, lights: [
        { street: "Gobi Road, Nambiyur", status: "dim", lightingScore: 35 },
        { street: "Bazaar Street, Nambiyur", status: "broken", lightingScore: 5 },
      ]},
      { name: "Chennimalai", lat: 11.1630, lng: 77.6020, lights: [
        { street: "Hill Temple Rd, Chennimalai", status: "working", lightingScore: 68 },
        { street: "Market Street, Chennimalai", status: "dim", lightingScore: 32 },
      ]},
      { name: "Punjai Puliampatti", lat: 11.3450, lng: 77.1620, lights: [
        { street: "Main Road, Punjai Puliampatti", status: "broken", lightingScore: 8 },
        { street: "School Road, Punjai Puliampatti", status: "dim", lightingScore: 25 },
      ]},
      { name: "Bhavanisagar", lat: 11.4720, lng: 77.0880, lights: [
        { street: "Dam Road, Bhavanisagar", status: "working", lightingScore: 72 },
        { street: "Colony Road, Bhavanisagar", status: "dim", lightingScore: 38 },
      ]},
      { name: "Ammapet", lat: 11.3510, lng: 77.7050, lights: [
        { street: "Junction Road, Ammapet", status: "working", lightingScore: 75 },
        { street: "Bypass Road, Ammapet", status: "dim", lightingScore: 40 },
      ]},
      { name: "Arachalur", lat: 11.2380, lng: 77.6850, lights: [
        { street: "Perundurai Road, Arachalur", status: "dim", lightingScore: 36 },
        { street: "Village Main Rd, Arachalur", status: "broken", lightingScore: 5 },
      ]},
      { name: "Kasipalayam", lat: 11.3300, lng: 77.7400, lights: [
        { street: "Erode Road, Kasipalayam", status: "dim", lightingScore: 38 },
        { street: "Inner Street, Kasipalayam", status: "broken", lightingScore: 10 },
      ]},
      { name: "Thalavadi", lat: 11.7420, lng: 77.0040, lights: [
        { street: "Forest Road, Thalavadi", status: "broken", lightingScore: 3 },
        { street: "Tribal Colony Rd, Thalavadi", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Tirunelveli",
    lights: makeLights([
      { name: "Palayamkottai", lat: 8.7250, lng: 77.7400, lights: [
        { street: "High Road, Palayamkottai", status: "working", lightingScore: 80 },
        { street: "South Car Street, Palayamkottai", status: "broken", lightingScore: 8 },
      ]},
      { name: "Melapalayam", lat: 8.7050, lng: 77.7600, lights: [
        { street: "Bazar Street, Melapalayam", status: "dim", lightingScore: 38 },
        { street: "Junction Road, Melapalayam", status: "working", lightingScore: 75 },
      ]},
    ]),
  },
  {
    district: "Vellore",
    lights: makeLights([
      { name: "Katpadi", lat: 12.9700, lng: 79.1400, lights: [
        { street: "Station Road, Katpadi", status: "working", lightingScore: 85 },
        { street: "Bypass Road, Katpadi", status: "dim", lightingScore: 42 },
      ]},
      { name: "Vellore Fort", lat: 12.9165, lng: 79.1325, lights: [
        { street: "Officer's Lane, Vellore", status: "working", lightingScore: 88 },
        { street: "Long Bazaar, Vellore", status: "broken", lightingScore: 6 },
      ]},
    ]),
  },
  {
    district: "Thanjavur",
    lights: makeLights([
      { name: "Thanjavur Town", lat: 10.7870, lng: 79.1378, lights: [
        { street: "Big Temple Road, Thanjavur", status: "working", lightingScore: 90 },
        { street: "South Rampart, Thanjavur", status: "dim", lightingScore: 40 },
      ]},
      { name: "Kumbakonam", lat: 10.9617, lng: 79.3881, lights: [
        { street: "Big Bazaar St, Kumbakonam", status: "working", lightingScore: 78 },
        { street: "Nageswaran South St", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Kancheepuram",
    lights: makeLights([
      { name: "Kancheepuram Town", lat: 12.8342, lng: 79.7036, lights: [
        { street: "Gandhi Road, Kanchipuram", status: "working", lightingScore: 82 },
        { street: "Pillayar Koil St, Kanchipuram", status: "dim", lightingScore: 38 },
      ]},
      { name: "Sriperumbudur", lat: 12.7183, lng: 79.9419, lights: [
        { street: "Industrial Rd, Sriperumbudur", status: "working", lightingScore: 75 },
        { street: "Old Town Rd, Sriperumbudur", status: "broken", lightingScore: 10 },
      ]},
    ]),
  },
  {
    district: "Tiruppur",
    lights: makeLights([
      { name: "Tiruppur Town", lat: 11.1085, lng: 77.3411, lights: [
        { street: "Kumaran Road, Tiruppur", status: "working", lightingScore: 80 },
        { street: "Palladam Road, Tiruppur", status: "dim", lightingScore: 42 },
      ]},
      { name: "Avinashi", lat: 11.1900, lng: 77.2700, lights: [
        { street: "Market Road, Avinashi", status: "broken", lightingScore: 8 },
        { street: "Bus Stand Rd, Avinashi", status: "dim", lightingScore: 35 },
      ]},
    ]),
  },
  {
    district: "Dindigul",
    lights: makeLights([
      { name: "Dindigul Town", lat: 10.3624, lng: 77.9695, lights: [
        { street: "Lock Market, Dindigul", status: "working", lightingScore: 78 },
        { street: "Palani Road, Dindigul", status: "dim", lightingScore: 40 },
      ]},
      { name: "Palani", lat: 10.4500, lng: 77.5200, lights: [
        { street: "Temple Road, Palani", status: "working", lightingScore: 85 },
        { street: "Bazaar Street, Palani", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Thoothukudi",
    lights: makeLights([
      { name: "Thoothukudi Town", lat: 8.7642, lng: 78.1348, lights: [
        { street: "Harbor Road, Thoothukudi", status: "working", lightingScore: 82 },
        { street: "Caldwell Road, Thoothukudi", status: "dim", lightingScore: 38 },
      ]},
      { name: "Kovilpatti", lat: 9.1744, lng: 77.8694, lights: [
        { street: "Main Road, Kovilpatti", status: "working", lightingScore: 75 },
        { street: "Market St, Kovilpatti", status: "broken", lightingScore: 8 },
      ]},
    ]),
  },
  {
    district: "Namakkal",
    lights: makeLights([
      { name: "Namakkal Town", lat: 11.2189, lng: 78.1674, lights: [
        { street: "Trichy Road, Namakkal", status: "working", lightingScore: 80 },
        { street: "Lorry Shed Road, Namakkal", status: "dim", lightingScore: 42 },
      ]},
      { name: "Rasipuram", lat: 11.4600, lng: 78.1800, lights: [
        { street: "Salem Road, Rasipuram", status: "working", lightingScore: 76 },
        { street: "Old Bus Stand Rd, Rasipuram", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Cuddalore",
    lights: makeLights([
      { name: "Cuddalore Town", lat: 11.7480, lng: 79.7714, lights: [
        { street: "South Arch St, Cuddalore", status: "dim", lightingScore: 38 },
        { street: "Manjakuppam Rd, Cuddalore", status: "broken", lightingScore: 5 },
      ]},
      { name: "Chidambaram", lat: 11.3990, lng: 79.6950, lights: [
        { street: "East Car St, Chidambaram", status: "working", lightingScore: 85 },
        { street: "South Car St, Chidambaram", status: "dim", lightingScore: 40 },
      ]},
    ]),
  },
  {
    district: "Villupuram",
    lights: makeLights([
      { name: "Villupuram Town", lat: 11.9401, lng: 79.4861, lights: [
        { street: "Gandhi Road, Villupuram", status: "dim", lightingScore: 42 },
        { street: "Bazar Street, Villupuram", status: "broken", lightingScore: 8 },
      ]},
      { name: "Tindivanam", lat: 12.2340, lng: 79.6560, lights: [
        { street: "Main Road, Tindivanam", status: "working", lightingScore: 78 },
        { street: "Bus Stand Rd, Tindivanam", status: "dim", lightingScore: 35 },
      ]},
    ]),
  },
  {
    district: "Kanyakumari",
    lights: makeLights([
      { name: "Nagercoil", lat: 8.1780, lng: 77.4119, lights: [
        { street: "Court Road, Nagercoil", status: "working", lightingScore: 88 },
        { street: "Cape Road, Nagercoil", status: "working", lightingScore: 82 },
      ]},
      { name: "Marthandam", lat: 8.3080, lng: 77.2200, lights: [
        { street: "Junction Road, Marthandam", status: "working", lightingScore: 78 },
        { street: "Market Road, Marthandam", status: "dim", lightingScore: 40 },
      ]},
    ]),
  },
  {
    district: "Ramanathapuram",
    lights: makeLights([
      { name: "Ramanathapuram Town", lat: 9.3639, lng: 78.8395, lights: [
        { street: "Collector Office Rd, Ramanathapuram", status: "dim", lightingScore: 35 },
        { street: "Bazar Street, Ramanathapuram", status: "broken", lightingScore: 5 },
      ]},
      { name: "Rameswaram", lat: 9.2885, lng: 79.3129, lights: [
        { street: "Temple Road, Rameswaram", status: "working", lightingScore: 85 },
        { street: "Agni Theertham Rd, Rameswaram", status: "dim", lightingScore: 42 },
      ]},
    ]),
  },
  {
    district: "Sivaganga",
    lights: makeLights([
      { name: "Karaikudi", lat: 10.0765, lng: 78.7739, lights: [
        { street: "Sekkalai Road, Karaikudi", status: "working", lightingScore: 80 },
        { street: "Railway Station Rd, Karaikudi", status: "dim", lightingScore: 38 },
      ]},
      { name: "Sivaganga Town", lat: 10.1438, lng: 78.4839, lights: [
        { street: "Palace Road, Sivaganga", status: "working", lightingScore: 75 },
        { street: "Market Street, Sivaganga", status: "dim", lightingScore: 32 },
      ]},
    ]),
  },
  {
    district: "Virudhunagar",
    lights: makeLights([
      { name: "Sivakasi", lat: 9.4533, lng: 77.8025, lights: [
        { street: "Thiruthangal Rd, Sivakasi", status: "working", lightingScore: 78 },
        { street: "Cracker Factory Rd, Sivakasi", status: "broken", lightingScore: 5 },
      ]},
      { name: "Rajapalayam", lat: 9.4536, lng: 77.5533, lights: [
        { street: "Main Road, Rajapalayam", status: "working", lightingScore: 82 },
        { street: "Market Street, Rajapalayam", status: "dim", lightingScore: 35 },
      ]},
    ]),
  },
  {
    district: "Nagapattinam",
    lights: makeLights([
      { name: "Nagapattinam Town", lat: 10.7672, lng: 79.8420, lights: [
        { street: "Harbour Road, Nagapattinam", status: "dim", lightingScore: 38 },
        { street: "South St, Nagapattinam", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Theni",
    lights: makeLights([
      { name: "Theni Town", lat: 10.0104, lng: 77.4768, lights: [
        { street: "Madurai Road, Theni", status: "working", lightingScore: 78 },
        { street: "Market Area, Theni", status: "dim", lightingScore: 35 },
      ]},
      { name: "Bodinayakanur", lat: 10.0100, lng: 77.3500, lights: [
        { street: "Bus Stand Rd, Bodinayakanur", status: "broken", lightingScore: 8 },
        { street: "Main Road, Bodinayakanur", status: "dim", lightingScore: 40 },
      ]},
    ]),
  },
  {
    district: "Krishnagiri",
    lights: makeLights([
      { name: "Hosur", lat: 12.7409, lng: 77.8253, lights: [
        { street: "Industrial Rd, Hosur", status: "working", lightingScore: 82 },
        { street: "SIPCOT Main Rd, Hosur", status: "dim", lightingScore: 40 },
      ]},
      { name: "Krishnagiri Town", lat: 12.5186, lng: 78.2137, lights: [
        { street: "Fort Road, Krishnagiri", status: "dim", lightingScore: 32 },
        { street: "Bazar Street, Krishnagiri", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Dharmapuri",
    lights: makeLights([
      { name: "Dharmapuri Town", lat: 12.1211, lng: 78.1582, lights: [
        { street: "Salem Road, Dharmapuri", status: "dim", lightingScore: 38 },
        { street: "Bus Stand Rd, Dharmapuri", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Nilgiris",
    lights: makeLights([
      { name: "Ooty", lat: 11.4102, lng: 76.6950, lights: [
        { street: "Commercial Road, Ooty", status: "working", lightingScore: 88 },
        { street: "Charring Cross, Ooty", status: "working", lightingScore: 85 },
      ]},
      { name: "Coonoor", lat: 11.3500, lng: 76.8000, lights: [
        { street: "Bedford Circle, Coonoor", status: "working", lightingScore: 80 },
        { street: "Sim's Park Rd, Coonoor", status: "dim", lightingScore: 45 },
      ]},
    ]),
  },
  {
    district: "Karur",
    lights: makeLights([
      { name: "Karur Town", lat: 10.9601, lng: 78.0766, lights: [
        { street: "Textile Market Rd, Karur", status: "working", lightingScore: 78 },
        { street: "Jawahar Bazaar, Karur", status: "dim", lightingScore: 38 },
      ]},
    ]),
  },
  {
    district: "Perambalur",
    lights: makeLights([
      { name: "Perambalur Town", lat: 11.2320, lng: 78.8807, lights: [
        { street: "Trichy Road, Perambalur", status: "working", lightingScore: 75 },
        { street: "Bus Stand Rd, Perambalur", status: "dim", lightingScore: 32 },
      ]},
    ]),
  },
  {
    district: "Ariyalur",
    lights: makeLights([
      { name: "Ariyalur Town", lat: 11.1404, lng: 79.0747, lights: [
        { street: "Main Road, Ariyalur", status: "dim", lightingScore: 35 },
        { street: "Cement Factory Rd, Ariyalur", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Pudukkottai",
    lights: makeLights([
      { name: "Pudukkottai Town", lat: 10.3833, lng: 78.8001, lights: [
        { street: "Palace Road, Pudukkottai", status: "working", lightingScore: 78 },
        { street: "Tirumayam Rd, Pudukkottai", status: "dim", lightingScore: 40 },
      ]},
    ]),
  },
  {
    district: "Tiruvannamalai",
    lights: makeLights([
      { name: "Tiruvannamalai Town", lat: 12.2253, lng: 79.0747, lights: [
        { street: "Girivalam Path, Tiruvannamalai", status: "dim", lightingScore: 35 },
        { street: "Car Street, Tiruvannamalai", status: "broken", lightingScore: 8 },
      ]},
      { name: "Arani", lat: 12.6700, lng: 79.2800, lights: [
        { street: "Silk Market Rd, Arani", status: "working", lightingScore: 78 },
        { street: "Bus Stand Rd, Arani", status: "dim", lightingScore: 35 },
      ]},
    ]),
  },
  {
    district: "Tiruvallur",
    lights: makeLights([
      { name: "Avadi", lat: 13.1145, lng: 80.1098, lights: [
        { street: "CTH Road, Avadi", status: "working", lightingScore: 85 },
        { street: "Industrial Estate Rd, Avadi", status: "dim", lightingScore: 40 },
      ]},
      { name: "Poonamallee", lat: 13.0470, lng: 80.0920, lights: [
        { street: "Trunk Road, Poonamallee", status: "working", lightingScore: 82 },
        { street: "Nazarathpet Rd, Poonamallee", status: "broken", lightingScore: 8 },
      ]},
    ]),
  },
  {
    district: "Chengalpattu",
    lights: makeLights([
      { name: "Chengalpattu Town", lat: 12.6819, lng: 79.9888, lights: [
        { street: "GST Road, Chengalpattu", status: "working", lightingScore: 82 },
        { street: "Bazaar Road, Chengalpattu", status: "dim", lightingScore: 38 },
      ]},
      { name: "Mahabalipuram", lat: 12.6269, lng: 80.1927, lights: [
        { street: "Shore Temple Rd, Mahabalipuram", status: "working", lightingScore: 88 },
        { street: "Fisherman Colony Rd", status: "dim", lightingScore: 30 },
      ]},
    ]),
  },
  {
    district: "Ranipet",
    lights: makeLights([
      { name: "Arakkonam", lat: 13.0791, lng: 79.6697, lights: [
        { street: "Railway Station Rd, Arakkonam", status: "working", lightingScore: 78 },
        { street: "Market Road, Arakkonam", status: "dim", lightingScore: 40 },
      ]},
      { name: "Walajah", lat: 12.9256, lng: 79.3643, lights: [
        { street: "Fort Road, Walajah", status: "dim", lightingScore: 35 },
        { street: "Collector Office Rd, Walajah", status: "broken", lightingScore: 8 },
      ]},
    ]),
  },
  {
    district: "Kallakurichi",
    lights: makeLights([
      { name: "Kallakurichi Town", lat: 11.7387, lng: 78.9597, lights: [
        { street: "Bus Stand Rd, Kallakurichi", status: "dim", lightingScore: 35 },
        { street: "Main Road, Kallakurichi", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Tenkasi",
    lights: makeLights([
      { name: "Tenkasi Town", lat: 8.9604, lng: 77.3152, lights: [
        { street: "Courtallam Road, Tenkasi", status: "working", lightingScore: 78 },
        { street: "Market Road, Tenkasi", status: "dim", lightingScore: 35 },
      ]},
      { name: "Courtallam", lat: 8.9300, lng: 77.2700, lights: [
        { street: "Falls Road, Courtallam", status: "dim", lightingScore: 40 },
        { street: "Tourist Area Rd, Courtallam", status: "broken", lightingScore: 8 },
      ]},
    ]),
  },
  {
    district: "Mayiladuthurai",
    lights: makeLights([
      { name: "Mayiladuthurai Town", lat: 11.1018, lng: 79.6525, lights: [
        { street: "Temple Road, Mayiladuthurai", status: "working", lightingScore: 82 },
        { street: "Railway Station Rd, Mayiladuthurai", status: "dim", lightingScore: 38 },
      ]},
    ]),
  },
  {
    district: "Tirupattur",
    lights: makeLights([
      { name: "Ambur", lat: 12.7915, lng: 78.7161, lights: [
        { street: "Leather Market Rd, Ambur", status: "dim", lightingScore: 38 },
        { street: "Main Road, Ambur", status: "broken", lightingScore: 8 },
      ]},
      { name: "Vaniyambadi", lat: 12.6817, lng: 78.6196, lights: [
        { street: "Bazar Street, Vaniyambadi", status: "working", lightingScore: 75 },
        { street: "Station Road, Vaniyambadi", status: "dim", lightingScore: 35 },
      ]},
    ]),
  },
];

// Get street lights for a specific district
export const getDistrictLights = (districtName: string): StreetLight[] => {
  const found = allDistrictStreetLights.find(
    (d) => d.district.toLowerCase() === districtName.toLowerCase()
  );
  return found?.lights ?? [];
};

// Get all lights across all districts
export const getAllStreetLights = (): StreetLight[] =>
  allDistrictStreetLights.flatMap((d) => d.lights);

// Calculate district lighting score
export const getDistrictLightingScore = (districtName: string): number => {
  const lights = getDistrictLights(districtName);
  if (lights.length === 0) return 50;
  return Math.round(lights.reduce((sum, l) => sum + l.lightingScore, 0) / lights.length);
};

// Get lighting status summary for a district
export const getDistrictLightingSummary = (districtName: string) => {
  const lights = getDistrictLights(districtName);
  return {
    total: lights.length,
    working: lights.filter((l) => l.status === "working").length,
    dim: lights.filter((l) => l.status === "dim").length,
    broken: lights.filter((l) => l.status === "broken").length,
    avgScore: getDistrictLightingScore(districtName),
  };
};
