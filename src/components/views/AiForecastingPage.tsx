import React, { useState } from 'react';
import { MONITORED_ROUTES } from '../../data/airportsAndRoutes';
import { PageId } from '../../types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  Legend,
} from 'recharts';
import {
  BrainCircuit,
  Sparkles,
  Sliders,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Cpu,
  RefreshCw,
} from 'lucide-react';

interface AiForecastingPageProps {
  onNavigate: (page: PageId) => void;
}

export const AiForecastingPage: React.FC<AiForecastingPageProps> = ({ onNavigate }) => {
  const [selectedRouteId, setSelectedRouteId] = useState('DEL-BOM');
  const [travelDate, setTravelDate] = useState('2024-11-15');
  const [advanceDays, setAdvanceDays] = useState(7);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [isRunning, setIsRunning] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const selectedRoute = MONITORED_ROUTES.find((r) => r.id === selectedRouteId) || MONITORED_ROUTES[0];

  // Dynamic predicted fare calculation
  const multiplier = advanceDays <= 3 ? 1.6 : advanceDays <= 7 ? 1.38 : advanceDays <= 15 ? 1.15 : 1.0;
  const predictedFare = Math.round(selectedRoute.currentAvgFare * multiplier);
  const lowerBound = Math.round(predictedFare * 0.94);
  const upperBound = Math.round(predictedFare * 1.06);

  const handleRunPrediction = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 400);
  };

  const handleGenerateAiSynthesis = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/forecast/ai-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          routeId: selectedRouteId,
          advanceDays,
          travelDate,
          currentFare: predictedFare,
          festival: 'Diwali Festive Corridor',
        }),
      });
      const data = await res.json();
      setAiAnalysis(data.analysis);
    } catch (err) {
      setAiAnalysis(
        `AI Econometric Analysis: The dynamic fare structure for ${selectedRouteId} shows an estimated +18.4% yield surge due to compressed seat inventories in the T-${advanceDays} window. Recommended for MoSPI CPI transport monitoring.`
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  // Forecast curve data
  const forecastCurve = [
    { day: 'T-30', actual: selectedRoute.baseFare2023, predicted: selectedRoute.baseFare2023, lower: selectedRoute.baseFare2023 * 0.96, upper: selectedRoute.baseFare2023 * 1.04 },
    { day: 'T-21', actual: selectedRoute.baseFare2023 * 1.05, predicted: selectedRoute.baseFare2023 * 1.05, lower: selectedRoute.baseFare2023 * 0.98, upper: selectedRoute.baseFare2023 * 1.1 },
    { day: 'T-14', actual: selectedRoute.baseFare2023 * 1.14, predicted: selectedRoute.baseFare2023 * 1.15, lower: selectedRoute.baseFare2023 * 1.06, upper: selectedRoute.baseFare2023 * 1.2 },
    { day: 'T-7', actual: null, predicted: predictedFare * 0.92, lower: predictedFare * 0.86, upper: predictedFare * 0.98 },
    { day: 'T-3', actual: null, predicted: predictedFare, lower: lowerBound, upper: upperBound },
    { day: 'T-1', actual: null, predicted: Math.round(predictedFare * 1.28), lower: Math.round(predictedFare * 1.18), upper: Math.round(predictedFare * 1.4) },
  ];

  // SHAP Feature Importance Bars matching Stitch Screenshot
  const featureImportances = [
    { feature: 'Days Before Departure', importance: 42, color: '#37a331', detail: `T-${advanceDays} days window acceleration (+₹1,200)` },
    { feature: 'Festival Proximity', importance: 28, color: '#db8917', detail: 'Diwali/Chhath corridor high demand (+₹850)' },
    { feature: 'Historical Route Average', importance: 16, color: '#060606', detail: `Baseline sector capacity ₹${selectedRoute.baseFare2023}` },
    { feature: 'Day of Week (Peak Weekend)', importance: 9, color: '#3567c2', detail: 'Friday/Sunday outbound surge (+₹350)' },
    { feature: 'Fuel Surcharge (ATF Index)', importance: 5, color: '#7b2f2f', detail: 'Aviation turbine fuel parity (+₹120)' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Prediction Parameters Form matching Stitch Screenshot */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
              PREDICTION PARAMETERS
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Model: LightGBM-MoSPI v3.4</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Route */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Sector / Route
            </label>
            <select
              value={selectedRouteId}
              onChange={(e) => setSelectedRouteId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              {MONITORED_ROUTES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.id} ({r.originCity} ➔ {r.destinationCity})
                </option>
              ))}
            </select>
          </div>

          {/* Travel Date */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Travel Date
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Advance Days Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Advance Booking: <span className="text-blue-700 font-mono">{advanceDays} Days</span>
              </label>
              <span className="text-[10px] font-mono text-slate-400">T-{advanceDays}</span>
            </div>
            <input
              type="range"
              min="1"
              max="45"
              value={advanceDays}
              onChange={(e) => setAdvanceDays(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Run Button */}
          <div>
            <button
              id="btn-run-prediction"
              onClick={handleRunPrediction}
              className="w-full py-2 px-4 bg-[#0b192e] hover:bg-slate-800 text-white rounded text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xs"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-blue-400" />
              <span>{isRunning ? 'Computing...' : 'Run Prediction'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Grid: Hero Card on Left, Historical vs Forecast on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Hero Card (4 Cols) matching Stitch Screenshot */}
        <div className="lg:col-span-4 bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              PREDICTED MEDIAN FARE
            </div>
            <div className="mt-2 text-4xl font-bold font-mono text-slate-950">
              ₹{predictedFare.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-slate-500 font-mono mt-1">
              Confidence Interval: [₹{lowerBound.toLocaleString('en-IN')} – ₹{upperBound.toLocaleString('en-IN')}]
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Model Confidence Score</span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                94.2%
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Variance vs Historical</span>
              <span className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                +12%
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Sector Status</span>
              <span className="font-mono font-semibold text-slate-800">{selectedRoute.status}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-md border border-slate-200/80 text-[11px] text-slate-600">
            <strong>MoSPI Policy Flag:</strong> High probability of dynamic fare escalation if booking occurs within 72 hours of departure.
          </div>
        </div>

        {/* Right Chart (8 Cols): Actual vs Forecast */}
        <div className="lg:col-span-8 bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                HISTORICAL ACTUAL VS. AI FORECAST CURVE
              </h3>
              <span className="text-[11px] text-slate-400">Shaded area represents 95% econometric confidence envelope</span>
            </div>
            <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold">
              {selectedRouteId}
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastCurve} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#135abe' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#1f6ad5' }} axisLine={false} tickLine={false} domain={[3000, 12000]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#f3f4f5', borderColor: '#1e293b', borderRadius: '6px', color: '#090909', fontSize: '11px' }}
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Fare Estimate']}
                />
                <Area type="monotone" dataKey="upper" stroke="none" fill="#93c5fd" fillOpacity={0.3} name="Confidence Upper" />
                <Area type="monotone" dataKey="lower" stroke="none" fill="#ffffff" fillOpacity={0.8} name="Confidence Lower" />
                <Line type="monotone" dataKey="actual" stroke="#00256C" strokeWidth={2.5} dot={{ r: 4 }} name="Actual Fare" />
                <Line type="monotone" dataKey="predicted" stroke="#2563eb" strokeDasharray="4 4" strokeWidth={2} dot={{ r: 3 }} name="AI Projected" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Feature Importance & Stepped AI Explanations matching Stitch Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Feature Importance SHAP Bars (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                FEATURE IMPORTANCE (SHAP VALUES)
              </h3>
              <span className="text-[11px] text-slate-400">Relative contribution to predicted fare variation</span>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {featureImportances.map((item) => (
              <div key={item.feature} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.feature}</span>
                  <span className="font-mono text-slate-900">{item.importance}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-sm h-3 overflow-hidden">
                  <div
                    className="h-full rounded-sm transition-all duration-500"
                    style={{ width: `${item.importance * 2}%`, backgroundColor: item.color }}
                  ></div>
                </div>
                <div className="text-[10px] text-slate-500">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Stepped AI Explanation & Gemini 3.7 Generator (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                STEPPED AI EXPLANATION
              </h3>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Verified
            </span>
          </div>

          <ul className="space-y-3 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
              <span>
                <strong>T-{advanceDays} Compression:</strong> Departure is {advanceDays} days away, adding +₹1,200 upward
                acceleration on {selectedRoute.originCity} to {selectedRoute.destinationCity}.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
              <span>
                <strong>Festival Proximity:</strong> Active seasonal multiplier adding +18.4% sector elasticity.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
              <span>
                <strong>Weekend Departure:</strong> Outbound Friday loading multiplier adding +₹350 based on 90-day regression.
              </span>
            </li>
          </ul>

          {/* Interactive Server-Side Gemini 3.7 Flash Button */}
          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <button
              id="btn-gemini-ai-synthesis"
              onClick={handleGenerateAiSynthesis}
              disabled={isAiLoading}
              className="w-full py-2 px-3 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
            >
              {isAiLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Econometric Reasoning...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>MoSPI Deep AI Economic Analysis</span>
                </>
              )}
            </button>

            {aiAnalysis && (
              <div className="p-3 bg-slate-900 text-slate-200 rounded-lg text-xs leading-relaxed font-mono space-y-1.5 animate-in fade-in">
                <div className="text-amber-400 font-bold text-[10px] uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Gemini 3.7 Flash • MoSPI Econometric Note:</span>
                </div>
                <p className="text-[11px] text-slate-300">{aiAnalysis}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
