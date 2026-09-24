import React, { useState } from 'react';
import { MONITORED_ROUTES, AIRLINES, AIRPORTS } from '../../data/airportsAndRoutes';
import { SAMPLE_ADVANCE_ELASTICITY } from '../../data/mockData';
import { PageId } from '../../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Legend,
} from 'recharts';
import {
  Plane,
  ArrowRight,
  TrendingUp,
  Download,
  Filter,
  AlertCircle,
  Layers,
  Sparkles,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface RouteExplorerPageProps {
  onNavigate: (page: PageId) => void;
  onOpenExport: () => void;
}

export const RouteExplorerPage: React.FC<RouteExplorerPageProps> = ({ onNavigate, onOpenExport }) => {
  const [origin, setOrigin] = useState('DEL');
  const [destination, setDestination] = useState('BOM');
  const [startDate, setStartDate] = useState('2024-10-01');
  const [endDate, setEndDate] = useState('2024-10-31');
  const [airlineFilter, setAirlineFilter] = useState('All Carriers');
  const [overlayFestivals, setOverlayFestivals] = useState(true);
  const [isQuerying, setIsQuerying] = useState(false);
  const [anomalyFlagged, setAnomalyFlagged] = useState(false);

  // Find or fallback route data
  const currentRouteId = `${origin}-${destination}`;
  const route =
    MONITORED_ROUTES.find((r) => r.id === currentRouteId || (r.origin === origin && r.destination === destination)) ||
    MONITORED_ROUTES[0];

  const handleExecuteQuery = () => {
    setIsQuerying(true);
    setTimeout(() => setIsQuerying(false), 500);
  };

  const handleFlagAnomaly = () => {
    setAnomalyFlagged(true);
    setTimeout(() => setAnomalyFlagged(false), 3000);
  };

  // Price Trend series across airlines
  const trendData = [
    { date: 'Oct 01', indiGo: 4200, airIndia: 4550, spiceJet: 3900, akasaAir: 3850, vistara: 5400 },
    { date: 'Oct 08', indiGo: 4800, airIndia: 5100, spiceJet: 4400, akasaAir: 4300, vistara: 6100 },
    { date: 'Oct 15', indiGo: 12450, airIndia: 11800, spiceJet: 9800, akasaAir: 9400, vistara: 14890 }, // Peak Diwali Surge
    { date: 'Oct 22', indiGo: 3950, airIndia: 4300, spiceJet: 3750, akasaAir: 3600, vistara: 4900 },
    { date: 'Oct 29', indiGo: 8200, airIndia: 8900, spiceJet: 7400, akasaAir: 7100, vistara: 10200 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Route Query Parameters Panel matching Stitch Screenshot */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
          {/* Origin */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Origin
            </label>
            <div className="relative">
              <Plane className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 rotate-45" />
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded pl-8 pr-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {AIRPORTS.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.code} - {a.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Destination */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Destination
            </label>
            <div className="relative">
              <Plane className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 -rotate-45" />
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded pl-8 pr-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {AIRPORTS.filter((a) => a.code !== origin).map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.code} - {a.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Range */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Date Range
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <span className="text-slate-400 text-xs">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Airline */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Airline
            </label>
            <select
              value={airlineFilter}
              onChange={(e) => setAirlineFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="All Carriers">All Carriers</option>
              {AIRLINES.map((a) => (
                <option key={a.code} value={a.name}>
                  {a.name} ({a.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Query Submit and Quick Action Buttons */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <button
            id="btn-execute-query"
            onClick={handleExecuteQuery}
            className="px-5 py-2 bg-[#0b192e] hover:bg-slate-800 text-white rounded text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 shadow-xs"
          >
            {isQuerying ? 'Fetching...' : 'Execute Query'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFlagAnomaly}
              className="px-3 py-1.5 border border-rose-200 text-rose-700 hover:bg-rose-50 rounded text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{anomalyFlagged ? 'Flagged for Review ✓' : 'Flag Anomaly'}</span>
            </button>
            <button
              onClick={onOpenExport}
              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Sector CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Stats Cards Row matching Stitch Screenshot */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average Fare</div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">₹{route.currentAvgFare.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Weighted across carriers</div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Median Fare</div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">₹{route.medianFare.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">50th percentile quote</div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Minimum (Floor)</div>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-1">₹{route.floorFare.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Early advance (T+45)</div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Maximum (Ceiling)</div>
          <div className="text-xl font-bold font-mono text-rose-700 mt-1">₹{route.ceilingFare.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Last minute surge peak</div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Volatility Index</div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">{route.volatilityIndex} High</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Std deviation coefficient</div>
        </div>
      </div>

      {/* Main Analysis: Price Trend on Left, Box Plot on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Price Trend by Airline Line Chart */}
        <div className="lg:col-span-8 bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                PRICE TREND BY AIRLINE
              </h3>
              <span className="text-[11px] text-slate-400">Multi-carrier quote tracking ({origin} ➔ {destination})</span>
            </div>

            {/* Festival Overlay Switch */}
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="text-[11px] font-medium">Overlay Festival Events</span>
              <button
                type="button"
                onClick={() => setOverlayFestivals(!overlayFestivals)}
                className={`w-9 h-5 rounded-full transition-colors relative ${
                  overlayFestivals ? 'bg-[#0b192e]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    overlayFestivals ? 'left-4.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 16000]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#f8f8f9', borderColor: '#1e293b', borderRadius: '6px', color: '#050505', fontSize: '11px' }}
                  formatter={(value: any) => [`₹${value.toLocaleString('en-IN')}`, 'Fare Quote']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />

                {overlayFestivals && (
                  <ReferenceLine
                    x="Oct 15"
                    stroke="#dc2626"
                    strokeDasharray="4 4"
                    label={{ value: 'Diwali Rush', position: 'top', fill: '#dc2626', fontSize: 10, fontWeight: 700 }}
                  />
                )}

                <Line type="monotone" dataKey="indiGo" stroke="#00256C" strokeWidth={2.2} dot={{ r: 3 }} name="IndiGo" />
                <Line type="monotone" dataKey="airIndia" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth={1.8} dot={{ r: 2.5 }} name="Air India" />
                <Line type="monotone" dataKey="vistara" stroke="#582C83" strokeWidth={1.8} dot={{ r: 2.5 }} name="Vistara" />
                <Line type="monotone" dataKey="spiceJet" stroke="#f97316" strokeWidth={1.5} dot={{ r: 2 }} name="SpiceJet" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fare Distribution Box Plot matching Stitch Screenshot */}
        <div className="lg:col-span-4 bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                FARE DISTRIBUTION
              </h3>
              <span className="text-[11px] text-slate-400">Statistical quartile spread</span>
            </div>

            {/* Custom SVG Box Plot Graphic matching Stitch Layout */}
            <div className="flex items-center justify-center py-4">
              <div className="relative w-48 h-44 border-l border-slate-200 flex flex-col justify-between pl-4">
                {/* Max Whisker */}
                <div className="text-[10px] font-mono text-slate-400">
                  Max: ₹{route.ceilingFare.toLocaleString('en-IN')}
                </div>

                {/* Box container */}
                <div className="my-auto w-32 border border-slate-800 bg-slate-50/80 rounded-sm relative p-2 shadow-xs">
                  <div className="text-[10px] font-mono text-slate-600">Q3: ₹8,100</div>
                  <div className="my-1.5 border-t-2 border-blue-600 flex justify-between items-center">
                    <span className="text-[11px] font-mono font-bold text-slate-900">Med: ₹5,200</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-600">Q1: ₹4,300</div>
                </div>

                {/* Min Whisker */}
                <div className="text-[10px] font-mono text-slate-400">
                  Min: ₹{route.floorFare.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          {/* YoY Sector Comparison Badge */}
          <div className="p-3 bg-slate-50 rounded-md border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">YoY Sector Comparison</div>
              <div className="text-xs font-bold text-slate-800 font-mono">{origin} – {destination}</div>
            </div>
            <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
              +{route.yoyChange}%
            </span>
          </div>
        </div>
      </div>

      {/* Advance-Purchase Elasticity Breakdown Table (T+1, T+7, T+15, T+30, T+45) */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
              ADVANCE-PURCHASE ELASTICITY & FARE COMPONENT BREAKDOWN
            </h3>
            <span className="text-[11px] text-slate-400">Separating Base Fare, Taxes, UDF, and Convenience Fees</span>
          </div>
          <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold">
            MoSPI Requirement: 4 Components Separated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-2.5">Window</th>
                <th className="px-4 py-2.5">Days to Departure</th>
                <th className="px-4 py-2.5">Base Fare (₹)</th>
                <th className="px-4 py-2.5">Taxes & GST (₹)</th>
                <th className="px-4 py-2.5">UDF (Airport Fee)</th>
                <th className="px-4 py-2.5">Convenience Fee</th>
                <th className="px-4 py-2.5">Total Fare (₹)</th>
                <th className="px-4 py-2.5">Dynamic Multiplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {SAMPLE_ADVANCE_ELASTICITY.map((row) => (
                <tr key={row.window} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-2.5 font-bold text-slate-900">{row.window}</td>
                  <td className="px-4 py-2.5 text-slate-600">{row.days} days</td>
                  <td className="px-4 py-2.5 text-slate-900">₹{row.baseFare.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-2.5 text-slate-600">₹{row.taxes}</td>
                  <td className="px-4 py-2.5 text-slate-600">₹{row.udf}</td>
                  <td className="px-4 py-2.5 text-slate-600">₹{row.fee}</td>
                  <td className="px-4 py-2.5 font-bold text-blue-900">₹{row.avgFare.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        row.window === 'T+1'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : row.window === 'T+7'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {row.multiplier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Airline Comparison Table matching Stitch Screenshot */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
            AIRLINE COMPARISON TABLE
          </h3>
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-2.5">Date</th>
                <th className="px-4 py-2.5">IndiGo</th>
                <th className="px-4 py-2.5">Air India</th>
                <th className="px-4 py-2.5">SpiceJet</th>
                <th className="px-4 py-2.5">Akasa Air</th>
                <th className="px-4 py-2.5">Vistara</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 text-slate-700 font-sans font-medium">2024-10-01</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹4,200</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹4,550</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹3,900</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹3,850</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹5,400</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 text-slate-700 font-sans font-medium">2024-10-08</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹4,800</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹5,100</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹4,400</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹4,300</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹6,100</td>
              </tr>
              <tr className="hover:bg-rose-50/50 bg-rose-50/20">
                <td className="px-4 py-2.5 text-rose-900 font-sans font-medium flex items-center gap-1.5">
                  <span>2024-10-15</span>
                  <span className="px-1 py-0.2 text-[9px] bg-rose-100 text-rose-700 rounded font-bold">Diwali Surge</span>
                </td>
                <td className="px-4 py-2.5 font-bold text-rose-700">₹12,450</td>
                <td className="px-4 py-2.5 font-bold text-rose-700">₹11,800</td>
                <td className="px-4 py-2.5 font-bold text-rose-700">₹9,800</td>
                <td className="px-4 py-2.5 font-bold text-rose-700">₹9,400</td>
                <td className="px-4 py-2.5 font-bold text-rose-700">₹14,890</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 text-slate-700 font-sans font-medium">2024-10-22</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹3,950</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹4,300</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹3,750</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹3,600</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">₹4,900</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
