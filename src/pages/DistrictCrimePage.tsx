import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, MapPin, TrendingUp, Shield } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { tamilNaduDistricts, getDistrictColor, getDistrictRiskLabel } from "../data/districtCrimeData";

const CHART_COLORS = [
  "hsl(0, 100%, 55%)",
  "hsl(45, 100%, 55%)",
  "hsl(185, 100%, 50%)",
  "hsl(280, 100%, 60%)",
  "hsl(145, 100%, 50%)",
  "hsl(320, 100%, 55%)",
  "hsl(30, 100%, 55%)",
];

const CRIME_LABELS = ["Murder", "Robbery", "Theft", "Assault", "Burglary", "Harassment", "Kidnapping"];
const CRIME_KEYS: (keyof typeof tamilNaduDistricts[0]["crimeBreakdown"])[] = [
  "murder", "robbery", "theft", "assault", "burglary", "harassment", "kidnapping",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-lg p-3 text-xs">
      <p className="text-foreground font-semibold mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="flex justify-between gap-4">
          <span>{p.name}:</span>
          <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

const DistrictCrimePage = () => {
  const { districtName } = useParams<{ districtName: string }>();
  const navigate = useNavigate();

  const district = tamilNaduDistricts.find(
    (d) => d.district.toLowerCase().replace(/\s+/g, "-") === districtName
  );

  if (!district) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-display text-foreground">District not found</h2>
          <button onClick={() => navigate("/map")} className="mt-4 px-4 py-2 rounded-xl gradient-neon text-primary-foreground text-sm font-semibold">
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  const color = getDistrictColor(district.intensity);
  const risk = getDistrictRiskLabel(district.intensity);

  // Trend data for line chart
  const trendData = district.years.map((year, i) => ({
    year: year.toString(),
    Murder: district.crimeBreakdown.murder[i],
    Robbery: district.crimeBreakdown.robbery[i],
    Theft: district.crimeBreakdown.theft[i],
    Assault: district.crimeBreakdown.assault[i],
    Burglary: district.crimeBreakdown.burglary[i],
    Harassment: district.crimeBreakdown.harassment[i],
    Kidnapping: district.crimeBreakdown.kidnapping[i],
  }));

  // Pie data for latest year
  const latestIdx = district.years.length - 1;
  const pieData = CRIME_KEYS.map((key, i) => ({
    name: CRIME_LABELS[i],
    value: district.crimeBreakdown[key][latestIdx],
  }));

  // Bar data for latest year
  const barData = CRIME_KEYS.map((key, i) => ({
    category: CRIME_LABELS[i],
    cases: district.crimeBreakdown[key][latestIdx],
  }));

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center gap-3 p-4 glass-strong">
        <button onClick={() => navigate("/map")} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold font-display gradient-neon-text">{district.district}</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">District Crime Analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-xs font-semibold" style={{ color }}>{risk} Risk</span>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-3 text-center">
            <Shield className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold font-display text-foreground">{district.intensity}</p>
            <p className="text-[10px] text-muted-foreground uppercase">Risk Score</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-3 text-center">
            <TrendingUp className="w-5 h-5 mx-auto mb-1 text-neon-yellow" />
            <p className="text-lg font-bold font-display text-foreground">{district.totalCases.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground uppercase">Total Cases</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-3 text-center">
            <MapPin className="w-5 h-5 mx-auto mb-1 text-neon-magenta" />
            <p className="text-lg font-bold font-display text-foreground">{district.mainTowns.length}</p>
            <p className="text-[10px] text-muted-foreground uppercase">Main Towns</p>
          </motion.div>
        </div>

        {/* Dark area warning */}
        {district.isDark && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-warning/10 border border-warning/20">
            <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
            <span className="text-xs text-warning font-semibold">Poorly lit areas detected in this district</span>
          </div>
        )}

        {/* Main Towns */}
        <div className="glass rounded-xl p-4">
          <h3 className="text-xs font-bold font-display text-foreground uppercase tracking-wider mb-3">Main Towns</h3>
          <div className="flex flex-wrap gap-2">
            {district.mainTowns.map((town) => (
              <span key={town} className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
                {town}
              </span>
            ))}
          </div>
        </div>

        {/* Crime Trend Line Chart */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-4">
          <h3 className="text-xs font-bold font-display text-foreground uppercase tracking-wider mb-4">Crime Trends (2020–2024)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
              <XAxis dataKey="year" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              {CRIME_LABELS.map((label, i) => (
                <Line key={label} type="monotone" dataKey={label} stroke={CHART_COLORS[i]} strokeWidth={2} dot={{ r: 3 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart - Latest Year */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-4">
          <h3 className="text-xs font-bold font-display text-foreground uppercase tracking-wider mb-4">Crime Breakdown — {district.years[latestIdx]}</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
              <XAxis dataKey="category" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 9 }} angle={-35} textAnchor="end" height={60} />
              <YAxis tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="cases" radius={[4, 4, 0, 0]}>
                {barData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-4">
          <h3 className="text-xs font-bold font-display text-foreground uppercase tracking-wider mb-4">Crime Distribution — {district.years[latestIdx]}</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} innerRadius={45} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Incidents */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-xl p-4">
          <h3 className="text-xs font-bold font-display text-foreground uppercase tracking-wider mb-3">Recent Incidents</h3>
          <div className="space-y-2">
            {district.recentIncidents.map((incident, i) => (
              <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border">
                <AlertTriangle className="w-3.5 h-3.5 text-neon-red mt-0.5 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">{incident}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DistrictCrimePage;
