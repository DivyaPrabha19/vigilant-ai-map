import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, MapPin, TrendingUp, Shield, Lightbulb, Clock } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { tamilNaduDistricts, getDistrictColor, getDistrictRiskLabel } from "../data/districtCrimeData";
import { getDistrictLights, getDistrictLightingSummary } from "../data/streetLightData";
import { getLightColor, getLightLabel } from "../data/crimeData";

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

  // Lighting data
  const lights = getDistrictLights(district.district);
  const lightingSummary = getDistrictLightingSummary(district.district);

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

  const lightScoreColor = lightingSummary.avgScore >= 60 ? "hsl(145, 100%, 50%)" : lightingSummary.avgScore >= 35 ? "hsl(45, 100%, 55%)" : "hsl(0, 100%, 55%)";

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
        <div className="grid grid-cols-4 gap-2">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-3 text-center">
            <Shield className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold font-display text-foreground">{district.intensity}</p>
            <p className="text-[9px] text-muted-foreground uppercase">Risk Score</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-3 text-center">
            <TrendingUp className="w-5 h-5 mx-auto mb-1 text-neon-yellow" />
            <p className="text-lg font-bold font-display text-foreground">{district.totalCases.toLocaleString()}</p>
            <p className="text-[9px] text-muted-foreground uppercase">Total Cases</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-3 text-center">
            <MapPin className="w-5 h-5 mx-auto mb-1 text-neon-magenta" />
            <p className="text-lg font-bold font-display text-foreground">{district.mainTowns.length}</p>
            <p className="text-[9px] text-muted-foreground uppercase">Main Towns</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-3 text-center">
            <Lightbulb className="w-5 h-5 mx-auto mb-1" style={{ color: lightScoreColor }} />
            <p className="text-lg font-bold font-display text-foreground">{lightingSummary.avgScore}%</p>
            <p className="text-[9px] text-muted-foreground uppercase">Lighting</p>
          </motion.div>
        </div>

        {/* Dark area warning */}
        {district.isDark && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-warning/10 border border-warning/20">
            <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
            <span className="text-xs text-warning font-semibold">Poorly lit areas detected in this district</span>
          </div>
        )}

        {/* Street Lighting Overview */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass rounded-xl p-4">
          <h3 className="text-xs font-bold font-display text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-neon-yellow" />
            Street Lighting Status
          </h3>
          {/* Summary bars */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="rounded-lg bg-neon-green/10 border border-neon-green/20 p-2 text-center">
              <p className="text-lg font-bold font-display text-neon-green">{lightingSummary.working}</p>
              <p className="text-[9px] text-muted-foreground uppercase">Working</p>
            </div>
            <div className="rounded-lg bg-neon-yellow/10 border border-neon-yellow/20 p-2 text-center">
              <p className="text-lg font-bold font-display text-neon-yellow">{lightingSummary.dim}</p>
              <p className="text-[9px] text-muted-foreground uppercase">Dim</p>
            </div>
            <div className="rounded-lg bg-neon-red/10 border border-neon-red/20 p-2 text-center">
              <p className="text-lg font-bold font-display text-neon-red">{lightingSummary.broken}</p>
              <p className="text-[9px] text-muted-foreground uppercase">Broken</p>
            </div>
          </div>
          {/* Individual street lights */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {lights.map((light, i) => {
              const lc = getLightColor(light.status);
              return (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/30 border border-border">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: lc, boxShadow: light.status === "working" ? `0 0 8px ${lc}` : "none" }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{light.street}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-semibold" style={{ color: lc }}>
                        {light.status === "working" ? "✓ Working" : light.status === "dim" ? "◐ Dim" : "✕ Broken"}
                      </span>
                      <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                        <Clock className="w-2.5 h-2.5" />{light.lastChecked}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold font-display" style={{ color: lc }}>{light.lightingScore}%</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Avg lighting impact on risk */}
          <div className="mt-3 p-2.5 rounded-lg bg-muted/30 border border-border">
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Average lighting score: <span className="font-bold" style={{ color: lightScoreColor }}>{lightingSummary.avgScore}%</span>.
              {lightingSummary.avgScore < 40
                ? " Poor lighting significantly increases night-time risk in this district."
                : lightingSummary.avgScore < 65
                ? " Moderate lighting — some areas need improvement for safety."
                : " Good lighting coverage — contributes to lower night-time risk."}
            </p>
          </div>
        </motion.div>

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
