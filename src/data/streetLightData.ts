import { StreetLight } from "./crimeData";

export interface DistrictStreetLights {
  district: string;
  lights: StreetLight[];
}

const recentTime = (minutesAgo: number): string => {
  if (minutesAgo < 60) return `${minutesAgo} min ago`;
  const hrs = Math.floor(minutesAgo / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
  return "1 day ago";
};

const recentChecked = (seed: number): string => {
  const options = [3, 8, 12, 18, 25, 35, 45, 60, 90, 120, 180];
  return recentTime(options[seed % options.length]);
};

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
      { name: "Tondiarpet", lat: 13.1275, lng: 80.2890, lights: [
        { street: "TH Road, Tondiarpet", status: "dim", lightingScore: 35 },
        { street: "Old Washermanpet Rd, Tondiarpet", status: "broken", lightingScore: 8 },
      ]},
      { name: "Perambur", lat: 13.1100, lng: 80.2330, lights: [
        { street: "Perambur High Rd, Perambur", status: "working", lightingScore: 82 },
        { street: "Purasawalkam High Rd, Perambur", status: "dim", lightingScore: 42 },
      ]},
      { name: "Ambattur", lat: 13.1143, lng: 80.1548, lights: [
        { street: "MTH Road, Ambattur", status: "working", lightingScore: 88 },
        { street: "Industrial Estate Rd, Ambattur", status: "broken", lightingScore: 5 },
      ]},
      { name: "Ayanavaram", lat: 13.0900, lng: 80.2270, lights: [
        { street: "Ayanavaram Main Rd", status: "working", lightingScore: 80 },
        { street: "Paper Mills Rd, Ayanavaram", status: "dim", lightingScore: 38 },
      ]},
      { name: "Mylapore", lat: 13.0340, lng: 80.2700, lights: [
        { street: "Kutchery Road, Mylapore", status: "working", lightingScore: 92 },
        { street: "Kapaleeswarar Temple St, Mylapore", status: "working", lightingScore: 88 },
      ]},
      { name: "Guindy", lat: 13.0067, lng: 80.2206, lights: [
        { street: "Mount Road, Guindy", status: "working", lightingScore: 90 },
        { street: "SIDCO Nagar Rd, Guindy", status: "dim", lightingScore: 40 },
      ]},
      { name: "Sholinganallur", lat: 12.9010, lng: 80.2279, lights: [
        { street: "OMR Road, Sholinganallur", status: "working", lightingScore: 85 },
        { street: "Kazhipattur Rd, Sholinganallur", status: "dim", lightingScore: 35 },
        { street: "IT Park Rd, Sholinganallur", status: "working", lightingScore: 90 },
      ]},
    ]),
  },
  {
    district: "Coimbatore",
    lights: makeLights([
      { name: "Coimbatore City", lat: 11.0168, lng: 76.9558, lights: [
        { street: "DB Road, RS Puram", status: "working", lightingScore: 85 },
        { street: "Oppanakara St, Town Hall", status: "dim", lightingScore: 40 },
        { street: "Avinashi Road, Coimbatore", status: "working", lightingScore: 90 },
      ]},
      { name: "Mettupalayam", lat: 11.2990, lng: 76.9410, lights: [
        { street: "Ooty Road, Mettupalayam", status: "working", lightingScore: 75 },
        { street: "Bazar Street, Mettupalayam", status: "dim", lightingScore: 38 },
      ]},
      { name: "Pollachi", lat: 10.6600, lng: 77.0080, lights: [
        { street: "Palani Road, Pollachi", status: "working", lightingScore: 80 },
        { street: "Market Rd, Pollachi", status: "dim", lightingScore: 42 },
      ]},
      { name: "Sulur", lat: 11.0350, lng: 77.1280, lights: [
        { street: "Air Force Station Rd, Sulur", status: "working", lightingScore: 82 },
        { street: "Main Road, Sulur", status: "dim", lightingScore: 40 },
      ]},
      { name: "Kinathukadavu", lat: 10.8200, lng: 76.9800, lights: [
        { street: "Pollachi Road, Kinathukadavu", status: "dim", lightingScore: 35 },
        { street: "Village Rd, Kinathukadavu", status: "broken", lightingScore: 8 },
      ]},
      { name: "Valparai", lat: 10.3270, lng: 76.9540, lights: [
        { street: "Estate Road, Valparai", status: "dim", lightingScore: 30 },
        { street: "Town Center, Valparai", status: "working", lightingScore: 72 },
      ]},
      { name: "Annur", lat: 11.2330, lng: 77.1050, lights: [
        { street: "Main Road, Annur", status: "dim", lightingScore: 38 },
        { street: "Market Street, Annur", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Madurai",
    lights: makeLights([
      { name: "Madurai City", lat: 9.9195, lng: 78.1193, lights: [
        { street: "East Masi St, Madurai", status: "working", lightingScore: 88 },
        { street: "West Masi St, Madurai", status: "dim", lightingScore: 42 },
      ]},
      { name: "Tirumangalam", lat: 9.8200, lng: 77.9830, lights: [
        { street: "Main Road, Tirumangalam", status: "working", lightingScore: 75 },
        { street: "Bus Stand Rd, Tirumangalam", status: "dim", lightingScore: 38 },
      ]},
      { name: "Usilampatti", lat: 9.9700, lng: 77.7900, lights: [
        { street: "Theni Road, Usilampatti", status: "dim", lightingScore: 35 },
        { street: "Market Street, Usilampatti", status: "broken", lightingScore: 8 },
      ]},
      { name: "Melur", lat: 10.0310, lng: 78.3400, lights: [
        { street: "Trichy Road, Melur", status: "working", lightingScore: 72 },
        { street: "Bazar Street, Melur", status: "dim", lightingScore: 35 },
      ]},
      { name: "Peraiyur", lat: 9.7320, lng: 77.7920, lights: [
        { street: "Main Road, Peraiyur", status: "dim", lightingScore: 32 },
        { street: "Temple Street, Peraiyur", status: "broken", lightingScore: 5 },
      ]},
      { name: "Vadipatti", lat: 10.0860, lng: 77.9620, lights: [
        { street: "Dindigul Road, Vadipatti", status: "dim", lightingScore: 38 },
        { street: "Village Rd, Vadipatti", status: "broken", lightingScore: 10 },
      ]},
    ]),
  },
  {
    district: "Tiruchirappalli",
    lights: makeLights([
      { name: "Trichy City", lat: 10.8050, lng: 78.6900, lights: [
        { street: "Williams Road, Cantonment", status: "working", lightingScore: 85 },
        { street: "Junction Road, Trichy", status: "dim", lightingScore: 42 },
      ]},
      { name: "Srirangam", lat: 10.8560, lng: 78.6920, lights: [
        { street: "Temple Road, Srirangam", status: "working", lightingScore: 90 },
        { street: "Car Street, Srirangam", status: "dim", lightingScore: 40 },
      ]},
      { name: "Manapparai", lat: 10.6080, lng: 78.4200, lights: [
        { street: "Main Road, Manapparai", status: "working", lightingScore: 72 },
        { street: "Market Street, Manapparai", status: "dim", lightingScore: 35 },
      ]},
      { name: "Lalgudi", lat: 10.8730, lng: 78.8150, lights: [
        { street: "Trichy Road, Lalgudi", status: "working", lightingScore: 75 },
        { street: "Bus Stand Rd, Lalgudi", status: "broken", lightingScore: 8 },
      ]},
      { name: "Musiri", lat: 10.9540, lng: 78.4440, lights: [
        { street: "Main Road, Musiri", status: "dim", lightingScore: 38 },
        { street: "Cauvery Bank Rd, Musiri", status: "broken", lightingScore: 5 },
      ]},
      { name: "Thuraiyur", lat: 11.1460, lng: 78.5970, lights: [
        { street: "Perambalur Rd, Thuraiyur", status: "dim", lightingScore: 35 },
        { street: "Market Street, Thuraiyur", status: "broken", lightingScore: 8 },
      ]},
    ]),
  },
  {
    district: "Salem",
    lights: makeLights([
      { name: "Salem City", lat: 11.6550, lng: 78.1550, lights: [
        { street: "Cherry Road, Salem", status: "working", lightingScore: 82 },
        { street: "Omalur Road, Salem", status: "dim", lightingScore: 42 },
      ]},
      { name: "Attur", lat: 11.5970, lng: 78.6020, lights: [
        { street: "Main Road, Attur", status: "working", lightingScore: 75 },
        { street: "Bazar Street, Attur", status: "dim", lightingScore: 38 },
      ]},
      { name: "Mettur", lat: 11.7870, lng: 77.8010, lights: [
        { street: "Dam Road, Mettur", status: "working", lightingScore: 78 },
        { street: "Colony Road, Mettur", status: "dim", lightingScore: 35 },
      ]},
      { name: "Omalur", lat: 11.7400, lng: 78.0450, lights: [
        { street: "Salem Road, Omalur", status: "dim", lightingScore: 38 },
        { street: "Market Street, Omalur", status: "broken", lightingScore: 8 },
      ]},
      { name: "Sankagiri", lat: 11.4800, lng: 77.8620, lights: [
        { street: "Fort Road, Sankagiri", status: "dim", lightingScore: 35 },
        { street: "Erode Road, Sankagiri", status: "broken", lightingScore: 5 },
      ]},
      { name: "Edappadi", lat: 11.5730, lng: 77.8000, lights: [
        { street: "Main Road, Edappadi", status: "working", lightingScore: 72 },
        { street: "Industrial Rd, Edappadi", status: "dim", lightingScore: 38 },
      ]},
      { name: "Gangavalli", lat: 11.5000, lng: 78.6400, lights: [
        { street: "Main Road, Gangavalli", status: "dim", lightingScore: 32 },
        { street: "Market Street, Gangavalli", status: "broken", lightingScore: 5 },
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
      { name: "Tirunelveli City", lat: 8.7139, lng: 77.7567, lights: [
        { street: "Town Hall Rd, Tirunelveli", status: "working", lightingScore: 85 },
        { street: "Junction Road, Tirunelveli", status: "dim", lightingScore: 40 },
      ]},
      { name: "Palayamkottai", lat: 8.7250, lng: 77.7400, lights: [
        { street: "High Road, Palayamkottai", status: "working", lightingScore: 80 },
        { street: "South Car Street, Palayamkottai", status: "broken", lightingScore: 8 },
      ]},
      { name: "Ambasamudram", lat: 8.7100, lng: 77.4530, lights: [
        { street: "Main Road, Ambasamudram", status: "working", lightingScore: 72 },
        { street: "River Rd, Ambasamudram", status: "dim", lightingScore: 35 },
      ]},
      { name: "Nanguneri", lat: 8.4930, lng: 77.6570, lights: [
        { street: "Temple Road, Nanguneri", status: "dim", lightingScore: 35 },
        { street: "Market Street, Nanguneri", status: "broken", lightingScore: 8 },
      ]},
      { name: "Radhapuram", lat: 8.2700, lng: 77.8200, lights: [
        { street: "Kanyakumari Rd, Radhapuram", status: "dim", lightingScore: 32 },
        { street: "Village Rd, Radhapuram", status: "broken", lightingScore: 5 },
      ]},
      { name: "Sankarankovil", lat: 9.1680, lng: 77.5330, lights: [
        { street: "Temple Road, Sankarankovil", status: "working", lightingScore: 75 },
        { street: "Bus Stand Rd, Sankarankovil", status: "dim", lightingScore: 38 },
      ]},
    ]),
  },
  {
    district: "Vellore",
    lights: makeLights([
      { name: "Vellore City", lat: 12.9165, lng: 79.1325, lights: [
        { street: "Officer's Lane, Vellore", status: "working", lightingScore: 88 },
        { street: "Long Bazaar, Vellore", status: "dim", lightingScore: 40 },
      ]},
      { name: "Katpadi", lat: 12.9700, lng: 79.1400, lights: [
        { street: "Station Road, Katpadi", status: "working", lightingScore: 85 },
        { street: "Bypass Road, Katpadi", status: "dim", lightingScore: 42 },
      ]},
      { name: "Gudiyatham", lat: 12.9480, lng: 78.8700, lights: [
        { street: "Main Road, Gudiyatham", status: "working", lightingScore: 78 },
        { street: "Market Street, Gudiyatham", status: "dim", lightingScore: 38 },
      ]},
      { name: "Vaniyambadi", lat: 12.6817, lng: 78.6196, lights: [
        { street: "Bazar Street, Vaniyambadi", status: "working", lightingScore: 75 },
        { street: "Station Road, Vaniyambadi", status: "dim", lightingScore: 35 },
      ]},
      { name: "Ambur", lat: 12.7915, lng: 78.7161, lights: [
        { street: "Leather Market Rd, Ambur", status: "dim", lightingScore: 38 },
        { street: "Main Road, Ambur", status: "broken", lightingScore: 8 },
      ]},
      { name: "Pernambut", lat: 12.9400, lng: 78.7300, lights: [
        { street: "Trunk Road, Pernambut", status: "dim", lightingScore: 35 },
        { street: "Market Rd, Pernambut", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Thoothukudi",
    lights: makeLights([
      { name: "Thoothukudi City", lat: 8.7642, lng: 78.1348, lights: [
        { street: "Harbor Road, Thoothukudi", status: "working", lightingScore: 82 },
        { street: "Caldwell Road, Thoothukudi", status: "dim", lightingScore: 38 },
      ]},
      { name: "Tiruchendur", lat: 8.4970, lng: 78.1190, lights: [
        { street: "Temple Road, Tiruchendur", status: "working", lightingScore: 85 },
        { street: "Beach Road, Tiruchendur", status: "dim", lightingScore: 40 },
      ]},
      { name: "Sathankulam", lat: 8.4380, lng: 77.9130, lights: [
        { street: "Main Road, Sathankulam", status: "dim", lightingScore: 35 },
        { street: "Market Street, Sathankulam", status: "broken", lightingScore: 8 },
      ]},
      { name: "Srivaikuntam", lat: 8.6290, lng: 77.9120, lights: [
        { street: "Temple Road, Srivaikuntam", status: "working", lightingScore: 78 },
        { street: "Bazar Street, Srivaikuntam", status: "dim", lightingScore: 38 },
      ]},
      { name: "Kovilpatti", lat: 9.1744, lng: 77.8694, lights: [
        { street: "Main Road, Kovilpatti", status: "working", lightingScore: 75 },
        { street: "Market St, Kovilpatti", status: "broken", lightingScore: 8 },
      ]},
      { name: "Vilathikulam", lat: 9.1330, lng: 78.1670, lights: [
        { street: "Thoothukudi Road, Vilathikulam", status: "dim", lightingScore: 32 },
        { street: "Salt Pan Rd, Vilathikulam", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Dindigul",
    lights: makeLights([
      { name: "Dindigul City", lat: 10.3624, lng: 77.9695, lights: [
        { street: "Lock Market, Dindigul", status: "working", lightingScore: 78 },
        { street: "Palani Road, Dindigul", status: "dim", lightingScore: 40 },
      ]},
      { name: "Palani", lat: 10.4500, lng: 77.5200, lights: [
        { street: "Temple Road, Palani", status: "working", lightingScore: 85 },
        { street: "Bazaar Street, Palani", status: "broken", lightingScore: 5 },
      ]},
      { name: "Oddanchatram", lat: 10.2240, lng: 77.7510, lights: [
        { street: "Market Road, Oddanchatram", status: "working", lightingScore: 75 },
        { street: "Bus Stand Rd, Oddanchatram", status: "dim", lightingScore: 38 },
      ]},
      { name: "Nilakottai", lat: 10.1660, lng: 77.8510, lights: [
        { street: "Main Road, Nilakottai", status: "dim", lightingScore: 35 },
        { street: "Forest Rd, Nilakottai", status: "broken", lightingScore: 8 },
      ]},
      { name: "Natham", lat: 10.2200, lng: 78.1200, lights: [
        { street: "Main Road, Natham", status: "dim", lightingScore: 32 },
        { street: "Bazar Street, Natham", status: "broken", lightingScore: 5 },
      ]},
      { name: "Vedasandur", lat: 10.5300, lng: 77.9500, lights: [
        { street: "Dindigul Road, Vedasandur", status: "dim", lightingScore: 38 },
        { street: "Market Street, Vedasandur", status: "broken", lightingScore: 8 },
      ]},
    ]),
  },
  {
    district: "Thanjavur",
    lights: makeLights([
      { name: "Thanjavur City", lat: 10.7870, lng: 79.1378, lights: [
        { street: "Big Temple Road, Thanjavur", status: "working", lightingScore: 90 },
        { street: "South Rampart, Thanjavur", status: "dim", lightingScore: 40 },
      ]},
      { name: "Kumbakonam", lat: 10.9617, lng: 79.3881, lights: [
        { street: "Big Bazaar St, Kumbakonam", status: "working", lightingScore: 78 },
        { street: "Nageswaran South St, Kumbakonam", status: "broken", lightingScore: 5 },
      ]},
      { name: "Pattukkottai", lat: 10.4240, lng: 79.3220, lights: [
        { street: "Main Road, Pattukkottai", status: "working", lightingScore: 72 },
        { street: "Bus Stand Rd, Pattukkottai", status: "dim", lightingScore: 38 },
      ]},
      { name: "Orathanadu", lat: 10.6300, lng: 79.2200, lights: [
        { street: "Main Road, Orathanadu", status: "dim", lightingScore: 35 },
        { street: "Temple Street, Orathanadu", status: "broken", lightingScore: 5 },
      ]},
      { name: "Papanasam", lat: 10.9270, lng: 79.2700, lights: [
        { street: "Main Road, Papanasam", status: "working", lightingScore: 70 },
        { street: "Village Rd, Papanasam", status: "dim", lightingScore: 32 },
      ]},
      { name: "Thiruvaiyaru", lat: 10.8830, lng: 79.1050, lights: [
        { street: "Temple Road, Thiruvaiyaru", status: "working", lightingScore: 78 },
        { street: "River Bank Rd, Thiruvaiyaru", status: "dim", lightingScore: 35 },
      ]},
    ]),
  },
  {
    district: "Cuddalore",
    lights: makeLights([
      { name: "Cuddalore City", lat: 11.7480, lng: 79.7714, lights: [
        { street: "South Arch St, Cuddalore", status: "dim", lightingScore: 38 },
        { street: "Manjakuppam Rd, Cuddalore", status: "broken", lightingScore: 5 },
      ]},
      { name: "Chidambaram", lat: 11.3990, lng: 79.6950, lights: [
        { street: "East Car St, Chidambaram", status: "working", lightingScore: 85 },
        { street: "South Car St, Chidambaram", status: "dim", lightingScore: 40 },
      ]},
      { name: "Panruti", lat: 11.7740, lng: 79.5600, lights: [
        { street: "Main Road, Panruti", status: "working", lightingScore: 75 },
        { street: "Market Street, Panruti", status: "dim", lightingScore: 38 },
      ]},
      { name: "Neyveli", lat: 11.5470, lng: 79.4900, lights: [
        { street: "Township Main Rd, Neyveli", status: "working", lightingScore: 90 },
        { street: "Block Rd, Neyveli", status: "working", lightingScore: 85 },
      ]},
      { name: "Virudhachalam", lat: 11.5150, lng: 79.3200, lights: [
        { street: "Station Road, Virudhachalam", status: "working", lightingScore: 72 },
        { street: "Bazar Street, Virudhachalam", status: "dim", lightingScore: 38 },
      ]},
      { name: "Tittakudi", lat: 11.3900, lng: 79.1200, lights: [
        { street: "Main Road, Tittakudi", status: "dim", lightingScore: 32 },
        { street: "Village Rd, Tittakudi", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Kancheepuram",
    lights: makeLights([
      { name: "Kanchipuram City", lat: 12.8342, lng: 79.7036, lights: [
        { street: "Gandhi Road, Kanchipuram", status: "working", lightingScore: 82 },
        { street: "Pillayar Koil St, Kanchipuram", status: "dim", lightingScore: 38 },
      ]},
      { name: "Sriperumbudur", lat: 12.7183, lng: 79.9419, lights: [
        { street: "Industrial Rd, Sriperumbudur", status: "working", lightingScore: 75 },
        { street: "Old Town Rd, Sriperumbudur", status: "broken", lightingScore: 10 },
      ]},
      { name: "Uthiramerur", lat: 12.6200, lng: 79.7500, lights: [
        { street: "Temple Road, Uthiramerur", status: "working", lightingScore: 72 },
        { street: "Village Main Rd, Uthiramerur", status: "dim", lightingScore: 35 },
      ]},
      { name: "Walajabad", lat: 12.7740, lng: 79.7370, lights: [
        { street: "Main Road, Walajabad", status: "dim", lightingScore: 38 },
        { street: "Market Street, Walajabad", status: "broken", lightingScore: 8 },
      ]},
    ]),
  },
  {
    district: "Tiruvallur",
    lights: makeLights([
      { name: "Tiruvallur Town", lat: 13.1428, lng: 79.9082, lights: [
        { street: "Main Road, Tiruvallur", status: "working", lightingScore: 78 },
        { street: "Bus Stand Rd, Tiruvallur", status: "dim", lightingScore: 40 },
      ]},
      { name: "Avadi", lat: 13.1145, lng: 80.1098, lights: [
        { street: "CTH Road, Avadi", status: "working", lightingScore: 85 },
        { street: "Industrial Estate Rd, Avadi", status: "dim", lightingScore: 40 },
      ]},
      { name: "Ponneri", lat: 13.3350, lng: 80.1920, lights: [
        { street: "Main Road, Ponneri", status: "working", lightingScore: 72 },
        { street: "Market Street, Ponneri", status: "dim", lightingScore: 35 },
      ]},
      { name: "Gummidipoondi", lat: 13.4070, lng: 80.1090, lights: [
        { street: "Industrial Rd, Gummidipoondi", status: "dim", lightingScore: 35 },
        { street: "Village Road, Gummidipoondi", status: "broken", lightingScore: 8 },
      ]},
      { name: "Tiruttani", lat: 13.1790, lng: 79.6160, lights: [
        { street: "Temple Road, Tiruttani", status: "working", lightingScore: 82 },
        { street: "Station Road, Tiruttani", status: "dim", lightingScore: 38 },
      ]},
      { name: "Pallipattu", lat: 13.3340, lng: 79.4450, lights: [
        { street: "Main Road, Pallipattu", status: "dim", lightingScore: 32 },
        { street: "Market Street, Pallipattu", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Tiruppur",
    lights: makeLights([
      { name: "Tiruppur City", lat: 11.1085, lng: 77.3411, lights: [
        { street: "Kumaran Road, Tiruppur", status: "working", lightingScore: 80 },
        { street: "Palladam Road, Tiruppur", status: "dim", lightingScore: 42 },
      ]},
      { name: "Avinashi", lat: 11.1900, lng: 77.2700, lights: [
        { street: "Market Road, Avinashi", status: "broken", lightingScore: 8 },
        { street: "Bus Stand Rd, Avinashi", status: "dim", lightingScore: 35 },
      ]},
      { name: "Dharapuram", lat: 10.7400, lng: 77.5300, lights: [
        { street: "Main Road, Dharapuram", status: "working", lightingScore: 75 },
        { street: "Bazar Street, Dharapuram", status: "dim", lightingScore: 38 },
      ]},
      { name: "Kangeyam", lat: 10.9200, lng: 77.5600, lights: [
        { street: "Bull Market Rd, Kangeyam", status: "dim", lightingScore: 35 },
        { street: "Main Road, Kangeyam", status: "working", lightingScore: 72 },
      ]},
      { name: "Palladam", lat: 10.9900, lng: 77.2860, lights: [
        { street: "Tiruppur Road, Palladam", status: "working", lightingScore: 78 },
        { street: "Market Street, Palladam", status: "dim", lightingScore: 38 },
      ]},
      { name: "Udumalaipettai", lat: 10.5870, lng: 77.2480, lights: [
        { street: "Palani Road, Udumalaipettai", status: "dim", lightingScore: 35 },
        { street: "Bazar Street, Udumalaipettai", status: "broken", lightingScore: 8 },
      ]},
    ]),
  },
  {
    district: "Karur",
    lights: makeLights([
      { name: "Karur City", lat: 10.9601, lng: 78.0766, lights: [
        { street: "Textile Market Rd, Karur", status: "working", lightingScore: 78 },
        { street: "Jawahar Bazaar, Karur", status: "dim", lightingScore: 38 },
      ]},
      { name: "Kulithalai", lat: 10.9340, lng: 78.4190, lights: [
        { street: "Main Road, Kulithalai", status: "working", lightingScore: 72 },
        { street: "River Bank Rd, Kulithalai", status: "dim", lightingScore: 35 },
      ]},
      { name: "Aravakurichi", lat: 10.9500, lng: 78.1700, lights: [
        { street: "Main Road, Aravakurichi", status: "dim", lightingScore: 38 },
        { street: "Market Street, Aravakurichi", status: "broken", lightingScore: 8 },
      ]},
      { name: "Krishnarayapuram", lat: 10.9640, lng: 78.2800, lights: [
        { street: "Main Road, Krishnarayapuram", status: "dim", lightingScore: 35 },
        { street: "Temple Street, Krishnarayapuram", status: "broken", lightingScore: 5 },
      ]},
      { name: "Manmangalam", lat: 10.9200, lng: 78.1200, lights: [
        { street: "Karur Road, Manmangalam", status: "dim", lightingScore: 32 },
        { street: "Village Rd, Manmangalam", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Namakkal",
    lights: makeLights([
      { name: "Namakkal City", lat: 11.2189, lng: 78.1674, lights: [
        { street: "Trichy Road, Namakkal", status: "working", lightingScore: 80 },
        { street: "Lorry Shed Road, Namakkal", status: "dim", lightingScore: 42 },
      ]},
      { name: "Tiruchengode", lat: 11.3800, lng: 77.8920, lights: [
        { street: "Arthanareeswarar Rd, Tiruchengode", status: "working", lightingScore: 78 },
        { street: "Bazar Street, Tiruchengode", status: "dim", lightingScore: 38 },
      ]},
      { name: "Rasipuram", lat: 11.4600, lng: 78.1800, lights: [
        { street: "Salem Road, Rasipuram", status: "working", lightingScore: 76 },
        { street: "Old Bus Stand Rd, Rasipuram", status: "broken", lightingScore: 5 },
      ]},
      { name: "Paramathi Velur", lat: 11.1000, lng: 78.2300, lights: [
        { street: "Main Road, Paramathi Velur", status: "dim", lightingScore: 35 },
        { street: "Market Street, Paramathi Velur", status: "broken", lightingScore: 5 },
      ]},
      { name: "Kolli Hills", lat: 11.2500, lng: 78.3400, lights: [
        { street: "Ghat Road, Kolli Hills", status: "broken", lightingScore: 5 },
        { street: "Village Center, Kolli Hills", status: "broken", lightingScore: 3 },
      ]},
    ]),
  },
  {
    district: "Krishnagiri",
    lights: makeLights([
      { name: "Krishnagiri Town", lat: 12.5186, lng: 78.2137, lights: [
        { street: "Fort Road, Krishnagiri", status: "dim", lightingScore: 32 },
        { street: "Bazar Street, Krishnagiri", status: "broken", lightingScore: 5 },
      ]},
      { name: "Hosur", lat: 12.7409, lng: 77.8253, lights: [
        { street: "Industrial Rd, Hosur", status: "working", lightingScore: 82 },
        { street: "SIPCOT Main Rd, Hosur", status: "dim", lightingScore: 40 },
      ]},
      { name: "Denkanikottai", lat: 12.5280, lng: 77.7880, lights: [
        { street: "Main Road, Denkanikottai", status: "dim", lightingScore: 35 },
        { street: "Market Street, Denkanikottai", status: "broken", lightingScore: 8 },
      ]},
      { name: "Uthangarai", lat: 12.3100, lng: 78.3600, lights: [
        { street: "Main Road, Uthangarai", status: "dim", lightingScore: 32 },
        { street: "Bus Stand Rd, Uthangarai", status: "broken", lightingScore: 5 },
      ]},
      { name: "Pochampalli", lat: 12.3700, lng: 78.3200, lights: [
        { street: "Silk Market Rd, Pochampalli", status: "working", lightingScore: 70 },
        { street: "Village Rd, Pochampalli", status: "dim", lightingScore: 30 },
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
      { name: "Harur", lat: 12.0500, lng: 78.4800, lights: [
        { street: "Main Road, Harur", status: "dim", lightingScore: 35 },
        { street: "Market Street, Harur", status: "broken", lightingScore: 5 },
      ]},
      { name: "Palacode", lat: 12.0100, lng: 77.9200, lights: [
        { street: "Main Road, Palacode", status: "dim", lightingScore: 32 },
        { street: "Village Rd, Palacode", status: "broken", lightingScore: 8 },
      ]},
      { name: "Pennagaram", lat: 12.1300, lng: 77.8900, lights: [
        { street: "Main Road, Pennagaram", status: "dim", lightingScore: 35 },
        { street: "Market Street, Pennagaram", status: "broken", lightingScore: 5 },
      ]},
      { name: "Pappireddipatti", lat: 11.9300, lng: 78.3700, lights: [
        { street: "Main Road, Pappireddipatti", status: "dim", lightingScore: 30 },
        { street: "Village Rd, Pappireddipatti", status: "broken", lightingScore: 5 },
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
      { name: "Vedaranyam", lat: 10.3710, lng: 79.8500, lights: [
        { street: "Salt Pan Rd, Vedaranyam", status: "dim", lightingScore: 30 },
        { street: "Main Road, Vedaranyam", status: "broken", lightingScore: 8 },
      ]},
      { name: "Kilvelur", lat: 10.6700, lng: 79.7400, lights: [
        { street: "Main Road, Kilvelur", status: "dim", lightingScore: 32 },
        { street: "Village Rd, Kilvelur", status: "broken", lightingScore: 5 },
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
      { name: "Udayarpalayam", lat: 11.2400, lng: 79.0600, lights: [
        { street: "Main Road, Udayarpalayam", status: "dim", lightingScore: 32 },
        { street: "Temple Street, Udayarpalayam", status: "broken", lightingScore: 5 },
      ]},
      { name: "Sendurai", lat: 11.3000, lng: 79.0500, lights: [
        { street: "Main Road, Sendurai", status: "dim", lightingScore: 30 },
        { street: "Village Rd, Sendurai", status: "broken", lightingScore: 5 },
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
      { name: "Veppanthattai", lat: 11.2100, lng: 78.7600, lights: [
        { street: "Main Road, Veppanthattai", status: "dim", lightingScore: 35 },
        { street: "Market Street, Veppanthattai", status: "broken", lightingScore: 5 },
      ]},
      { name: "Kunnam", lat: 11.3300, lng: 78.9700, lights: [
        { street: "Main Road, Kunnam", status: "dim", lightingScore: 32 },
        { street: "Village Rd, Kunnam", status: "broken", lightingScore: 5 },
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
      { name: "Paramakudi", lat: 9.5450, lng: 78.5900, lights: [
        { street: "Main Road, Paramakudi", status: "working", lightingScore: 72 },
        { street: "Market Street, Paramakudi", status: "dim", lightingScore: 35 },
      ]},
      { name: "Mudukulathur", lat: 9.3400, lng: 78.5100, lights: [
        { street: "Main Road, Mudukulathur", status: "dim", lightingScore: 32 },
        { street: "Village Rd, Mudukulathur", status: "broken", lightingScore: 5 },
      ]},
      { name: "Kamuthi", lat: 9.4100, lng: 78.3600, lights: [
        { street: "Main Road, Kamuthi", status: "dim", lightingScore: 35 },
        { street: "Market Street, Kamuthi", status: "broken", lightingScore: 8 },
      ]},
    ]),
  },
  {
    district: "Sivaganga",
    lights: makeLights([
      { name: "Sivaganga Town", lat: 10.1438, lng: 78.4839, lights: [
        { street: "Palace Road, Sivaganga", status: "working", lightingScore: 75 },
        { street: "Market Street, Sivaganga", status: "dim", lightingScore: 32 },
      ]},
      { name: "Karaikudi", lat: 10.0765, lng: 78.7739, lights: [
        { street: "Sekkalai Road, Karaikudi", status: "working", lightingScore: 80 },
        { street: "Railway Station Rd, Karaikudi", status: "dim", lightingScore: 38 },
      ]},
      { name: "Devakottai", lat: 10.1600, lng: 78.8200, lights: [
        { street: "Main Road, Devakottai", status: "working", lightingScore: 72 },
        { street: "Bazar Street, Devakottai", status: "dim", lightingScore: 35 },
      ]},
      { name: "Tirupattur", lat: 10.1300, lng: 78.7400, lights: [
        { street: "Temple Road, Tirupattur", status: "dim", lightingScore: 35 },
        { street: "Market Street, Tirupattur", status: "broken", lightingScore: 8 },
      ]},
      { name: "Manamadurai", lat: 9.6800, lng: 78.4700, lights: [
        { street: "Junction Road, Manamadurai", status: "working", lightingScore: 72 },
        { street: "Station Rd, Manamadurai", status: "dim", lightingScore: 35 },
      ]},
    ]),
  },
  {
    district: "Virudhunagar",
    lights: makeLights([
      { name: "Virudhunagar City", lat: 9.5852, lng: 77.9571, lights: [
        { street: "Main Road, Virudhunagar", status: "working", lightingScore: 78 },
        { street: "Market Street, Virudhunagar", status: "dim", lightingScore: 38 },
      ]},
      { name: "Sivakasi", lat: 9.4533, lng: 77.8025, lights: [
        { street: "Thiruthangal Rd, Sivakasi", status: "working", lightingScore: 78 },
        { street: "Cracker Factory Rd, Sivakasi", status: "broken", lightingScore: 5 },
      ]},
      { name: "Rajapalayam", lat: 9.4536, lng: 77.5533, lights: [
        { street: "Main Road, Rajapalayam", status: "working", lightingScore: 82 },
        { street: "Market Street, Rajapalayam", status: "dim", lightingScore: 35 },
      ]},
      { name: "Srivilliputhur", lat: 9.5120, lng: 77.6320, lights: [
        { street: "Temple Road, Srivilliputhur", status: "working", lightingScore: 80 },
        { street: "Bazar Street, Srivilliputhur", status: "dim", lightingScore: 38 },
      ]},
      { name: "Aruppukottai", lat: 9.5100, lng: 78.1000, lights: [
        { street: "Main Road, Aruppukottai", status: "working", lightingScore: 75 },
        { street: "Market Street, Aruppukottai", status: "dim", lightingScore: 35 },
      ]},
      { name: "Sattur", lat: 9.3500, lng: 77.9200, lights: [
        { street: "Main Road, Sattur", status: "dim", lightingScore: 38 },
        { street: "Bus Stand Rd, Sattur", status: "broken", lightingScore: 8 },
      ]},
    ]),
  },
  {
    district: "Theni",
    lights: makeLights([
      { name: "Theni City", lat: 10.0104, lng: 77.4768, lights: [
        { street: "Madurai Road, Theni", status: "working", lightingScore: 78 },
        { street: "Market Area, Theni", status: "dim", lightingScore: 35 },
      ]},
      { name: "Bodinayakanur", lat: 10.0100, lng: 77.3500, lights: [
        { street: "Bus Stand Rd, Bodinayakanur", status: "broken", lightingScore: 8 },
        { street: "Main Road, Bodinayakanur", status: "dim", lightingScore: 40 },
      ]},
      { name: "Periyakulam", lat: 10.1200, lng: 77.5500, lights: [
        { street: "Main Road, Periyakulam", status: "working", lightingScore: 75 },
        { street: "Market Street, Periyakulam", status: "dim", lightingScore: 38 },
      ]},
      { name: "Uthamapalayam", lat: 9.8100, lng: 77.3300, lights: [
        { street: "Main Road, Uthamapalayam", status: "dim", lightingScore: 35 },
        { street: "Tea Factory Rd, Uthamapalayam", status: "broken", lightingScore: 8 },
      ]},
      { name: "Andipatti", lat: 9.9800, lng: 77.6000, lights: [
        { street: "Main Road, Andipatti", status: "dim", lightingScore: 35 },
        { street: "Village Rd, Andipatti", status: "broken", lightingScore: 5 },
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
      { name: "Kotagiri", lat: 11.4230, lng: 76.8610, lights: [
        { street: "Main Road, Kotagiri", status: "working", lightingScore: 75 },
        { street: "Market Street, Kotagiri", status: "dim", lightingScore: 38 },
      ]},
      { name: "Gudalur", lat: 11.5020, lng: 76.5000, lights: [
        { street: "Main Road, Gudalur", status: "dim", lightingScore: 35 },
        { street: "Bazar Street, Gudalur", status: "broken", lightingScore: 8 },
      ]},
      { name: "Pandalur", lat: 11.4800, lng: 76.3200, lights: [
        { street: "Main Road, Pandalur", status: "dim", lightingScore: 30 },
        { street: "Estate Rd, Pandalur", status: "broken", lightingScore: 5 },
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
      { name: "Sengottai", lat: 8.9700, lng: 77.2400, lights: [
        { street: "Main Road, Sengottai", status: "working", lightingScore: 72 },
        { street: "Station Road, Sengottai", status: "dim", lightingScore: 35 },
      ]},
      { name: "Kadayanallur", lat: 9.0700, lng: 77.3500, lights: [
        { street: "Main Road, Kadayanallur", status: "dim", lightingScore: 35 },
        { street: "Bazar Street, Kadayanallur", status: "broken", lightingScore: 8 },
      ]},
      { name: "Shencottai", lat: 8.9780, lng: 77.2530, lights: [
        { street: "Junction Road, Shencottai", status: "working", lightingScore: 70 },
        { street: "Market Street, Shencottai", status: "dim", lightingScore: 32 },
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
      { name: "Ulundurpet", lat: 11.7300, lng: 79.3200, lights: [
        { street: "Main Road, Ulundurpet", status: "dim", lightingScore: 35 },
        { street: "Market Street, Ulundurpet", status: "broken", lightingScore: 8 },
      ]},
      { name: "Sankarapuram", lat: 11.8800, lng: 78.8300, lights: [
        { street: "Main Road, Sankarapuram", status: "dim", lightingScore: 32 },
        { street: "Village Rd, Sankarapuram", status: "broken", lightingScore: 5 },
      ]},
      { name: "Chinnasalem", lat: 11.6300, lng: 78.8800, lights: [
        { street: "Main Road, Chinnasalem", status: "dim", lightingScore: 35 },
        { street: "Bazar Street, Chinnasalem", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Ranipet",
    lights: makeLights([
      { name: "Ranipet Town", lat: 12.9340, lng: 79.3330, lights: [
        { street: "Main Road, Ranipet", status: "working", lightingScore: 75 },
        { street: "Industrial Rd, Ranipet", status: "dim", lightingScore: 38 },
      ]},
      { name: "Arcot", lat: 12.9070, lng: 79.3170, lights: [
        { street: "Fort Road, Arcot", status: "dim", lightingScore: 38 },
        { street: "Bazar Street, Arcot", status: "broken", lightingScore: 8 },
      ]},
      { name: "Walajah", lat: 12.9256, lng: 79.3643, lights: [
        { street: "Fort Road, Walajah", status: "dim", lightingScore: 35 },
        { street: "Collector Office Rd, Walajah", status: "broken", lightingScore: 8 },
      ]},
      { name: "Arakkonam", lat: 13.0791, lng: 79.6697, lights: [
        { street: "Railway Station Rd, Arakkonam", status: "working", lightingScore: 78 },
        { street: "Market Road, Arakkonam", status: "dim", lightingScore: 40 },
      ]},
      { name: "Nemili", lat: 12.9600, lng: 79.5700, lights: [
        { street: "Main Road, Nemili", status: "dim", lightingScore: 32 },
        { street: "Village Rd, Nemili", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  {
    district: "Tirupattur",
    lights: makeLights([
      { name: "Tirupattur Town", lat: 12.4950, lng: 78.5730, lights: [
        { street: "Main Road, Tirupattur", status: "working", lightingScore: 75 },
        { street: "Market Street, Tirupattur", status: "dim", lightingScore: 38 },
      ]},
      { name: "Ambur", lat: 12.7915, lng: 78.7161, lights: [
        { street: "Leather Market Rd, Ambur", status: "dim", lightingScore: 38 },
        { street: "Main Road, Ambur", status: "broken", lightingScore: 8 },
      ]},
      { name: "Vaniyambadi", lat: 12.6817, lng: 78.6196, lights: [
        { street: "Bazar Street, Vaniyambadi", status: "working", lightingScore: 75 },
        { street: "Station Road, Vaniyambadi", status: "dim", lightingScore: 35 },
      ]},
      { name: "Natrampalli", lat: 12.5600, lng: 78.5800, lights: [
        { street: "Main Road, Natrampalli", status: "dim", lightingScore: 32 },
        { street: "Market Street, Natrampalli", status: "broken", lightingScore: 5 },
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
      { name: "Sirkazhi", lat: 11.2360, lng: 79.7340, lights: [
        { street: "Temple Road, Sirkazhi", status: "working", lightingScore: 78 },
        { street: "Bazar Street, Sirkazhi", status: "dim", lightingScore: 35 },
      ]},
      { name: "Kuthalam", lat: 11.0300, lng: 79.5600, lights: [
        { street: "Main Road, Kuthalam", status: "dim", lightingScore: 35 },
        { street: "Market Street, Kuthalam", status: "broken", lightingScore: 8 },
      ]},
      { name: "Tharangambadi", lat: 11.0280, lng: 79.8490, lights: [
        { street: "Beach Road, Tharangambadi", status: "dim", lightingScore: 30 },
        { street: "Fort Road, Tharangambadi", status: "broken", lightingScore: 5 },
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
      { name: "Tambaram", lat: 12.9249, lng: 80.1000, lights: [
        { street: "GST Road, Tambaram", status: "working", lightingScore: 88 },
        { street: "Mudichur Road, Tambaram", status: "dim", lightingScore: 42 },
      ]},
      { name: "Pallavaram", lat: 12.9675, lng: 80.1491, lights: [
        { street: "Cantonment Rd, Pallavaram", status: "working", lightingScore: 85 },
        { street: "Old Trunk Rd, Pallavaram", status: "dim", lightingScore: 40 },
      ]},
      { name: "Madurantakam", lat: 12.4900, lng: 79.8800, lights: [
        { street: "Main Road, Madurantakam", status: "dim", lightingScore: 35 },
        { street: "Lake Road, Madurantakam", status: "broken", lightingScore: 8 },
      ]},
      { name: "Cheyyur", lat: 12.3500, lng: 80.0000, lights: [
        { street: "Main Road, Cheyyur", status: "dim", lightingScore: 32 },
        { street: "Coast Road, Cheyyur", status: "broken", lightingScore: 5 },
      ]},
    ]),
  },
  // Remaining districts with minimal data
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
