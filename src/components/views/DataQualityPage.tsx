import React, { useState } from 'react';
import { DATA_QUALITY_SUMMARY, QUALITY_ERROR_LOGS } from '../../data/mockData';
import { PageId } from '../../types';
import {
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Download,
  Filter,
  ShieldCheck,
  Activity,
  Layers,
  Database,
} from 'lucide-react';

interface DataQualityPageProps {
  onNavigate: (page: PageId) => void;
  onOpenExport: () => void;
}

export const DataQualityPage: React.FC<DataQualityPageProps> = ({ onNavigate, onOpenExport }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // 48 grid cells for Route Coverage Heatmap
  const matrixCells = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    status: i === 14 || i === 31 ? 'failed' : i % 8 === 0 ? 'stale' : 'fresh',
  }));

  const sourceFreshness = [
    { source: 'IndiGo API', timeAgo: '14m ago', status: 'fresh', note: 'Batch 84A processed successfully: 4,200 records.' },
    { source: 'Air India Scraper', timeAgo: '22m ago', status: 'fresh', note: 'Routine extraction complete.' },
    { source: 'Vistara Aggregator', timeAgo: '2h 15m ago', status: 'stale', note: 'Slight delay in response time detected. Retrying...' },
    { source: 'Akasa Air Feed', timeAgo: '5h ago', status: 'failed', note: 'Connection refused. Admin intervention required.' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
            SYSTEM RELIABILITY &amp; INTEGRITY
          </div>
          <h2 className="text-xl font-bold font-serif-heading text-slate-900 mt-0.5">Data Quality &amp; Reliability</h2>
          <p className="text-xs text-slate-500 max-w-2xl">
            Continuous automated telemetry on ingestion health, hash deduplication, and schema validation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
            <span>Refresh Telemetry</span>
          </button>
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0b192e] text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-slate-800 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export Audit Log</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards with SVG Circular Progress Gauge matching Stitch Screenshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Global Integrity Index with circular gauge */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Global Integrity
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1">94.2%</div>
            <div className="text-[10px] text-emerald-600 font-medium">Optimal Reliability</div>
          </div>

          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray="94.2, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-slate-800">
              94%
            </span>
          </div>
        </div>

        {/* Scraping Success */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Scraping Success Rate
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">96.8%</div>
            <div className="text-[10px] text-slate-400">12,480 / 12,890 Requests</div>
          </div>
          <div className="w-10 h-10 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Records Ingested */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Records Ingested (24h)
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1">12,480</div>
            <div className="text-[10px] text-slate-400">47 Monitored Sectors</div>
          </div>
          <div className="w-10 h-10 rounded bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Database className="w-5 h-5" />
          </div>
        </div>

        {/* Duplicates Filtered */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Duplicates Filtered
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1">234</div>
            <div className="text-[10px] text-slate-400">Hash Collision Deduplication</div>
          </div>
          <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
            <Layers className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Grid: Route Coverage Heatmap on Left, Source Freshness on Right matching Stitch Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 Cols): Route Coverage Heatmap Matrix */}
        <div className="lg:col-span-7 bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                ROUTE COVERAGE HEATMAP MATRIX
              </h3>
              <span className="text-[11px] text-slate-400">1,420 routes • 98.2% fresh status</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                <span>Fresh (&lt;1h)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-amber-400"></span>
                <span>Stale (&gt;2h)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-rose-500"></span>
                <span>Failed</span>
              </div>
            </div>
          </div>

          {/* Matrix Squares Grid */}
          <div className="grid grid-cols-12 gap-1.5 p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            {matrixCells.map((cell) => (
              <div
                key={cell.id}
                title={`Sector Basket #${cell.id + 1}: ${cell.status.toUpperCase()}`}
                className={`h-6 rounded-xs transition-transform hover:scale-110 cursor-pointer ${
                  cell.status === 'fresh'
                    ? 'bg-emerald-500'
                    : cell.status === 'stale'
                    ? 'bg-amber-400'
                    : 'bg-rose-500'
                }`}
              ></div>
            ))}
          </div>

          <div className="text-[11px] text-slate-500 flex justify-between font-mono">
            <span>DGCA Top Tier-1 Baskets (100% Ingested)</span>
            <span>Last Sync: 14m ago</span>
          </div>
        </div>

        {/* Right Column (5 Cols): Source Freshness matching Stitch Screenshot */}
        <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
              SOURCE FRESHNESS &amp; STATUS
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">4 Connected Ingest Feeds</span>
          </div>

          <div className="space-y-3">
            {sourceFreshness.map((item) => (
              <div key={item.source} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.status === 'fresh'
                          ? 'bg-emerald-500'
                          : item.status === 'stale'
                          ? 'bg-amber-400 animate-pulse'
                          : 'bg-rose-500'
                      }`}
                    ></span>
                    <span className="font-bold text-slate-900">{item.source}</span>
                  </div>
                  <span className="font-mono text-slate-500 text-[11px]">{item.timeAgo}</span>
                </div>
                <p className="text-[11px] text-slate-600 pl-4">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Error Logs Table matching Stitch Screenshot */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
              INGESTION EXCEPTION LOGS
            </h3>
            <span className="text-[11px] text-slate-400">Captured scraping and API schema mismatches</span>
          </div>
          <button
            onClick={onOpenExport}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-2.5">Timestamp</th>
                <th className="px-4 py-2.5">Source Node</th>
                <th className="px-4 py-2.5">Error Code</th>
                <th className="px-4 py-2.5">Description</th>
                <th className="px-4 py-2.5">Action Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {QUALITY_ERROR_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2.5 text-slate-500">{log.timestamp}</td>
                  <td className="px-4 py-2.5 font-bold text-slate-900">{log.source}</td>
                  <td className="px-4 py-2.5 text-rose-700 font-bold">{log.code}</td>
                  <td className="px-4 py-2.5 text-slate-700 font-sans">{log.message}</td>
                  <td className="px-4 py-2.5 text-slate-500 font-sans">{log.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
