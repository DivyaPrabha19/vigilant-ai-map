import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const newsItems = [
  {
    id: 1,
    title: "Woman stalked and harassed near Coimbatore college campus",
    location: "Gandhipuram, Coimbatore",
    district: "Coimbatore",
    type: "Harassment",
    time: "1 hour ago",
    breaking: true,
    summary: "A 21-year-old college student reported being stalked for weeks near campus. Police have arrested the suspect and increased patrol around educational institutions.",
  },
  {
    id: 2,
    title: "Two arrested for attempted kidnapping of minor girl in Salem",
    location: "Hasthampatti, Salem",
    district: "Salem",
    type: "Kidnapping",
    time: "3 hours ago",
    breaking: true,
    summary: "Police arrested two men for attempting to kidnap a 14-year-old girl near her school. Swift action by bystanders helped foil the attempt.",
  },
  {
    id: 3,
    title: "Woman assaulted while returning from night shift in Chennai",
    location: "Sholinganallur, Chennai",
    district: "Chennai",
    type: "Assault",
    time: "5 hours ago",
    breaking: false,
    summary: "A 28-year-old IT employee was assaulted by two unknown men while walking to her PG from the bus stop at 11 PM. CCTV footage being analyzed.",
  },
  {
    id: 4,
    title: "Chain snatching targets women in Madurai market area",
    location: "Meenakshi Amman, Madurai",
    district: "Madurai",
    type: "Theft",
    time: "6 hours ago",
    breaking: false,
    summary: "Three women had their gold chains snatched by bike-borne miscreants near the temple market. Police have deployed plainclothes officers.",
  },
  {
    id: 5,
    title: "Domestic violence complaint leads to husband's arrest in Trichy",
    location: "Srirangam, Tiruchirappalli",
    district: "Tiruchirappalli",
    type: "Assault",
    time: "8 hours ago",
    breaking: false,
    summary: "Woman filed dowry harassment and assault case. Husband and in-laws arrested under Dowry Prohibition Act. Victim shifted to shelter home.",
  },
  {
    id: 6,
    title: "Eve-teasing gang busted near Erode bus stand",
    location: "Erode City, Erode",
    district: "Erode",
    type: "Harassment",
    time: "10 hours ago",
    breaking: true,
    summary: "A gang of 4 men involved in serial eve-teasing near the bus stand area has been arrested. 12 complaints from women were linked to the group.",
  },
  {
    id: 7,
    title: "Woman's phone snatched at knifepoint in Tirunelveli",
    location: "Palayamkottai, Tirunelveli",
    district: "Tirunelveli",
    type: "Robbery",
    time: "12 hours ago",
    breaking: false,
    summary: "A 25-year-old woman was robbed of her phone and purse at knifepoint while walking alone at night. Suspect identified via CCTV.",
  },
  {
    id: 8,
    title: "Acid attack attempt foiled in Vellore; man arrested",
    location: "Katpadi, Vellore",
    district: "Vellore",
    type: "Assault",
    time: "14 hours ago",
    breaking: true,
    summary: "Police arrested a 30-year-old man for attempting acid attack on a woman who rejected his advances. Alert passersby intervened and saved the victim.",
  },
  {
    id: 9,
    title: "Cyberstalking case: Woman harassed online in Tiruppur",
    location: "Tiruppur City, Tiruppur",
    district: "Tiruppur",
    type: "Harassment",
    time: "16 hours ago",
    breaking: false,
    summary: "A textile worker lodged a complaint about receiving threatening messages and morphed images online. Cyber cell has traced the accused.",
  },
  {
    id: 10,
    title: "Woman auto driver robbed at night in Thanjavur",
    location: "Kumbakonam, Thanjavur",
    district: "Thanjavur",
    type: "Robbery",
    time: "18 hours ago",
    breaking: false,
    summary: "A woman auto driver was robbed of her day's earnings by two men who posed as passengers. Investigation underway.",
  },
  {
    id: 11,
    title: "Missing girl found safe in Dindigul after 48 hours",
    location: "Palani, Dindigul",
    district: "Dindigul",
    type: "Kidnapping",
    time: "1 day ago",
    breaking: false,
    summary: "A 16-year-old girl who went missing from her home was found safe by police. One suspect detained for questioning.",
  },
  {
    id: 12,
    title: "Sexual harassment complaint filed against employer in Cuddalore",
    location: "Chidambaram, Cuddalore",
    district: "Cuddalore",
    type: "Harassment",
    time: "1 day ago",
    breaking: false,
    summary: "A factory worker filed a sexual harassment complaint against her supervisor. Police have registered a case under POCSO and IPC sections.",
  },
];

const getTypeColor = (type: string) => {
  const map: Record<string, string> = {
    Theft: "hsl(var(--neon-yellow))",
    Assault: "hsl(var(--neon-red))",
    Robbery: "hsl(var(--neon-red))",
    Burglary: "hsl(var(--neon-magenta))",
    Harassment: "hsl(var(--neon-purple))",
    Murder: "hsl(var(--neon-red))",
    Kidnapping: "hsl(var(--neon-magenta))",
  };
  return map[type] || "hsl(var(--neon-cyan))";
};

const NewsFeedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-20 flex items-center gap-3 p-4 glass-strong">
        <button onClick={() => navigate("/home")} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold font-display gradient-neon-text">Crime News</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Tamil Nadu · Women Safety · Real-time</p>
        </div>
      </header>

      <div className="p-4 space-y-3">
        {newsItems.map((news, i) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass rounded-xl p-4"
          >
            {news.breaking && (
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3 h-3 text-neon-red" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-neon-red animate-glow-pulse">Breaking</span>
              </div>
            )}

            <h3 className="text-sm font-semibold text-foreground leading-snug">{news.title}</h3>

            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{
                backgroundColor: `${getTypeColor(news.type)}15`,
                color: getTypeColor(news.type),
              }}>
                {news.type}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <MapPin className="w-3 h-3" />{news.location}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" />{news.time}
              </span>
            </div>

            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{news.summary}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeedPage;
