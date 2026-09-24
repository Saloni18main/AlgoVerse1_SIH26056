import React, { useState } from 'react';
import { KpiCard } from '../common/KpiCard';
import { AlertBanner } from '../common/AlertBanner';
import { IndiaAirfareMap } from '../common/IndiaAirfareMap';
import { MONITORED_ROUTES, AIRLINES } from '../../data/airportsAndRoutes';
import { HISTORICAL_INDEX_SERIES } from '../../data/mockData';
import { PageId, CabinClass } from '../../types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { Download, FileText, Filter, Calendar, MapPin, Layers } from 'lucide-react';

interface OverviewPageProps {
  onNavigate: (page: PageId) => void;
  onOpenExport: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate, onOpenExport }) => {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [cabinClass, setCabinClass] = useState<CabinClass>('Economy');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  // 12M Trend series data
  const trendData = HISTORICAL_INDEX_SERIES.slice(-12).map((pt, idx) => ({
    name: pt.label,
    index: pt.indexValue,
    isCurrent: idx === 11,
  }));

  // Airline average fares for horizontal chart
  const airlineData = [
    { name: 'IndiGo', fare: 5200, color: '#00398f' },
    { name: 'Air India', fare: 6100, color: '#015ae9' },
    { name: 'SpiceJet', fare: 4800, color: '#5da0ff' },
    { name: 'Vistara', fare: 7200, color: '#84a8e3' },
    { name: 'Akasa Air', fare: 4650, color: '#284a7e' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Filter Bar matching Stitch Screenshot */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* Date Range Selector */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 uppercase text-[10px]">Date Range:</span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="1 Year">1 Year</option>
            </select>
          </div>

          {/* City Selector */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 uppercase text-[10px]">City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="All Cities">All Cities</option>
              <option value="New Delhi">New Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Goa">Goa</option>
            </select>
          </div>

          {/* Cabin Class */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 uppercase text-[10px]">Cabin Class:</span>
            <select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value as CabinClass)}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="Economy">Economy</option>
              <option value="Premium Economy">Premium Economy</option>
              <option value="Business">Business</option>
            </select>
          </div>
        </div>

        {/* Quick Report & Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Report</span>
          </button>
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Featured Anomaly Alert Banner matching Stitch Screenshot */}
      <AlertBanner
        id="overview-anomaly-alert"
        headline="Anomaly detected: Delhi–Goa route shows 67% price spike."
        subText="Triggered 14 mins ago by AI Forecasting model (Sector DEL-GOI festive surge)."
        actionText="INVESTIGATE"
        onAction={() => onNavigate('anomaly-detection')}
      />

      {/* 6 KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <KpiCard
          id="kpi-airfare-index"
          label="Airfare Index"
          value="124.7"
          trend="+3.2%"
          trendPositive={true}
          subText="Jan 2024 = 100"
        />
        <KpiCard
          id="kpi-avg-fare"
          label="Avg Fare"
          value="₹5,840"
          trend="+4.8%"
          trendPositive={true}
          subText="Across 47 Baskets"
        />
        <KpiCard
          id="kpi-active-routes"
          label="Active Routes"
          value="47"
          subText="DGCA Metro & Non-metro"
        />
        <KpiCard
          id="kpi-monitored-airlines"
          label="Monitored Airlines"
          value="6"
          subText="98.5% Domestic Share"
        />
        <KpiCard
          id="kpi-data-records"
          label="Data Records"
          value="12,480"
          subText="Last 60 Minutes"
        />
        <KpiCard
          id="kpi-last-updated"
          label="Last Updated"
          value="14 min ago"
          subText="Automated Ingest"
          onRefresh={handleRefresh}
          isUpdating={isRefreshing}
        />
      </div>

      {/* Main Grid: Hub Map on Left, Index Trend + Airline Bars on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: National Hub Status Interactive Map */}
        <div className="lg:col-span-7">
          <IndiaAirfareMap
            onSelectRoute={(routeId) => {
              onNavigate('route-explorer');
            }}
          />
        </div>

        {/* Right 5 Cols: Index Trend (12M) + Avg Fare by Airline */}
        <div className="lg:col-span-5 space-y-6">
          {/* Airfare Index Trend (12M) */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                  AIRFARE INDEX TREND (12M)
                </h3>
                <span className="text-[11px] text-slate-400">Monthly Laspeyres index trajectory</span>
              </div>
              <span className="text-xs font-bold font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                124.7 (Latest)
              </span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[95, 130]} tick={{ fontSize: 10, fill: '#e8ebf0' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#f5f7fb', borderColor: '#dfe7f3', borderRadius: '6px', color: '#0b0b0b', fontSize: '11px' }}
                    formatter={(value: any) => [`${value}`, 'Index Value']}
                  />
                  <Bar dataKey="index" radius={[3, 3, 0, 0]}>
                    {trendData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isCurrent ? '#2563eb' : '#cbd5e1'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Avg Economy Fare by Airline Horizontal Bars matching Stitch Screenshot */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                AVG ECONOMY FARE BY AIRLINE
              </h3>
              <span className="text-[11px] text-slate-400">T-30 weighted mean</span>
            </div>

            <div className="space-y-3 pt-1">
              {airlineData.map((item) => {
                const maxFare = 8000;
                const widthPct = Math.round((item.fare / maxFare) * 100);
                return (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <span className="w-20 font-medium text-slate-600 truncate">{item.name}</span>
                    <div className="flex-1 mx-3 bg-slate-100 rounded-sm h-5 overflow-hidden relative">
                      <div
                        className="bg-[#0b192e] h-full rounded-sm transition-all duration-500"
                        style={{ width: `${widthPct}%` }}
                      ></div>
                    </div>
                    <span className="font-mono font-bold text-slate-900 w-14 text-right">
                      ₹{item.fare.toLocaleString('en-IN')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
