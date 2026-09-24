import React, { useState } from 'react';
import { ANOMALY_RECORDS } from '../../data/mockData';
import { AnomalyRecord, PageId, AnomalyFlagType } from '../../types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceDot,
} from 'recharts';
import {
  AlertTriangle,
  Bell,
  Filter,
  ArrowUpDown,
  CheckCircle,
  Clock,
  Radio,
  Sliders,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

interface AnomalyDetectionPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAlertConfig: () => void;
}

export const AnomalyDetectionPage: React.FC<AnomalyDetectionPageProps> = ({
  onNavigate,
  onOpenAlertConfig,
}) => {
  const [anomalies, setAnomalies] = useState<AnomalyRecord[]>(ANOMALY_RECORDS);
  const [timeRange, setTimeRange] = useState<'24H' | '7D' | '30D'>('24H');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCarrier, setFilterCarrier] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Frequency time series
  const frequencyData = [
    { time: '00:00', count: 4 },
    { time: '04:00', count: 2 },
    { time: '08:00', count: 11 },
    { time: '12:00', count: 19 },
    { time: '14:30', count: 34, isPeak: true },
    { time: '18:00', count: 14 },
    { time: '22:00', count: 8 },
  ];

  const handleStatusChange = (id: string, newStatus: 'open' | 'under_review' | 'resolved') => {
    setAnomalies((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const filteredAnomalies = anomalies.filter((a) => {
    if (filterType !== 'all' && String(a.flagType).toLowerCase() !== filterType.toLowerCase()) return false;
    if (filterCarrier !== 'all' && !a.carrier.toLowerCase().includes(filterCarrier.toLowerCase())) return false;
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    return true;
  });

  const getFlagBadge = (flagType: AnomalyFlagType) => {
    const normalized = String(flagType).toLowerCase();
    switch (normalized) {
      case 'price_spike':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-50 text-rose-700 border border-rose-200">
            PRICE SPIKE
          </span>
        );
      case 'elevated':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-50 text-amber-700 border border-amber-200">
            ELEVATED
          </span>
        );
      case 'price_drop':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200">
            PRICE DROP
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-100 text-slate-700 border border-slate-200">
            DATA NULL
          </span>
        );
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 4 Summary Cards matching Stitch Screenshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Critical</div>
            <div className="text-2xl font-bold font-mono text-rose-700 mt-1">14</div>
            <div className="text-[10px] text-slate-400">Immediate MoSPI Review</div>
          </div>
          <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">High</div>
            <div className="text-2xl font-bold font-mono text-amber-700 mt-1">42</div>
            <div className="text-[10px] text-slate-400">Deviation &gt; 35%</div>
          </div>
          <div className="w-10 h-10 rounded bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Medium</div>
            <div className="text-2xl font-bold font-mono text-blue-900 mt-1">128</div>
            <div className="text-[10px] text-slate-400">Elevated Volatility</div>
          </div>
          <div className="w-10 h-10 rounded bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Resolved</div>
            <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">845</div>
            <div className="text-[10px] text-slate-400">Archived to CPI Baseline</div>
          </div>
          <div className="w-10 h-10 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Anomaly Frequency Over Time Chart matching Stitch Screenshot */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
              ANOMALY FREQUENCY OVER TIME
            </h3>
            <span className="text-[11px] text-slate-400">Temporal cluster distribution across domestic network</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-0.5 rounded text-xs font-mono font-bold text-slate-600">
              {(['24H', '7D', '30D'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1 rounded transition-all ${
                    timeRange === r ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              id="btn-configure-alert"
              onClick={onOpenAlertConfig}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0b192e] text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-xs"
            >
              <Bell className="w-3.5 h-3.5 text-blue-400" />
              <span>Configure Alert</span>
            </button>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={frequencyData} margin={{ top: 15, right: 20, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b192e', borderColor: '#1e293b', borderRadius: '6px', color: '#fff', fontSize: '11px' }}
                formatter={(value: any) => [`${value} anomalies`, 'Volume']}
              />
              <Area type="monotone" dataKey="count" stroke="#00256C" strokeWidth={2} fill="#93c5fd" fillOpacity={0.25} />
              <ReferenceDot x="14:30" y={34} r={6} fill="#dc2626" stroke="#ffffff" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filter Parameters Row matching Stitch Screenshot */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 uppercase text-[10px]">Anomaly Type:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="all">All Types</option>
              <option value="price_spike">Price Spike</option>
              <option value="elevated">Elevated</option>
              <option value="price_drop">Price Drop</option>
              <option value="data_null">Data Null</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 uppercase text-[10px]">Carrier:</span>
            <select
              value={filterCarrier}
              onChange={(e) => setFilterCarrier(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="all">All Carriers</option>
              <option value="IndiGo">IndiGo</option>
              <option value="Air India">Air India</option>
              <option value="SpiceJet">SpiceJet</option>
              <option value="Vistara">Vistara</option>
              <option value="Akasa Air">Akasa Air</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 uppercase text-[10px]">Resolution Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="under_review">Under Review</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          Showing {filteredAnomalies.length} of {anomalies.length} records
        </div>
      </div>

      {/* Anomaly Ledger Table matching Stitch Screenshot */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
              ANOMALY LEDGER
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              LIVE STREAM
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-2.5">Timestamp</th>
                <th className="px-4 py-2.5">Route</th>
                <th className="px-4 py-2.5">Carrier</th>
                <th className="px-4 py-2.5">Observed Fare</th>
                <th className="px-4 py-2.5">Baseline</th>
                <th className="px-4 py-2.5">Deviation (%)</th>
                <th className="px-4 py-2.5">Flag Type</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredAnomalies.map((item) => {
                const observed = item.observedFare ?? item.actualFare ?? 0;
                const baseline = item.baselineFare ?? item.expectedFare ?? 0;
                const time = item.timestamp ?? item.detectionTime ?? '';
                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-2.5 text-slate-500">{time}</td>
                    <td className="px-4 py-2.5 font-bold text-slate-900">{item.origin} ➔ {item.destination}</td>
                    <td className="px-4 py-2.5 text-slate-700 font-sans font-medium">{item.carrier}</td>
                    <td className="px-4 py-2.5 font-bold text-slate-900">₹{observed.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-2.5 text-slate-500">₹{baseline.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-2.5 font-bold">
                      <span className={item.deviationPct > 0 ? 'text-rose-700' : 'text-blue-700'}>
                        {item.deviationPct > 0 ? `+${item.deviationPct.toFixed(1)}%` : `${item.deviationPct.toFixed(1)}%`}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">{getFlagBadge(item.flagType)}</td>
                    <td className="px-4 py-2.5">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                        className={`text-[11px] font-semibold rounded px-2 py-0.5 border focus:outline-none cursor-pointer ${
                          item.status === 'open'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : item.status === 'under_review'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        <option value="open">Open</option>
                        <option value="under_review">Under Review</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
