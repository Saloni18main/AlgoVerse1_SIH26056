import React, { useState } from 'react';
import { HISTORICAL_INDEX_SERIES, BACKTEST_30_DAYS } from '../../data/mockData';
import { MONITORED_ROUTES } from '../../data/airportsAndRoutes';
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
} from 'recharts';
import {
  FileDown,
  ChevronDown,
  ChevronUp,
  Info,
  ShieldCheck,
  Filter,
  Calendar,
  Sparkles,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

interface PriceIndexPageProps {
  onNavigate: (page: PageId) => void;
  onOpenExport: () => void;
}

export const PriceIndexPage: React.FC<PriceIndexPageProps> = ({ onNavigate, onOpenExport }) => {
  const [timeRange, setTimeRange] = useState<'1Y' | 'YTD' | 'ALL'>('1Y');
  const [activeTab, setActiveTab] = useState<'trajectory' | 'backtest'>('trajectory');
  const [expandedSection, setExpandedSection] = useState<string | null>('formula');
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handleDownloadPdf = () => {
    setIsExportingPdf(true);
    setTimeout(() => {
      setIsExportingPdf(false);
      window.print();
    }, 600);
  };

  const chartSeries =
    timeRange === 'YTD'
      ? HISTORICAL_INDEX_SERIES.slice(-4)
      : timeRange === '1Y'
      ? HISTORICAL_INDEX_SERIES.slice(-12)
      : HISTORICAL_INDEX_SERIES;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
            MACRO INDICATORS / INDEX METRICS
          </div>
          <h2 className="text-xl font-bold font-serif-heading text-slate-900 mt-0.5">Airfare Price Index</h2>
          <p className="text-xs text-slate-500 max-w-2xl">
            Aggregate measure of domestic commercial air travel pricing trends across top 100 domestic routes,
            adjusted for seasonal variances and operational anomalies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold shadow-xs"
          >
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>FILTERS</span>
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0b192e] text-white rounded text-xs font-mono font-bold shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>JAN 2025</span>
          </div>
        </div>
      </div>

      {/* Top Grid: Hero Card on Left, Trajectory Chart on Right matching Stitch Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Hero Card (5 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              CURRENT INDEX VALUE
            </div>

            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-4xl font-bold font-mono text-slate-950 tracking-tight">124.7</span>
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Base Period: Jan 2024 = 100</div>

            <div className="mt-5 space-y-2.5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Month-over-Month (MoM)</span>
                <span className="px-2 py-0.5 rounded font-bold font-mono text-xs bg-rose-50 text-rose-700 border border-rose-200">
                  +3.2%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Year-over-Year (YoY)</span>
                <span className="px-2 py-0.5 rounded font-bold font-mono text-xs bg-rose-50 text-rose-700 border border-rose-200">
                  +18.4%
                </span>
              </div>
            </div>

            {/* Self-explaining Plain English Summary Box */}
            <div className="mt-4 p-3 bg-blue-50/70 border border-blue-100 rounded-md text-[11px] text-blue-900 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold mb-1 text-blue-950">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Self-Explaining Index Synthesis:</span>
              </div>
              "Index rose 4.2% this week, mainly driven by Delhi–Guwahati (+40.2%) and Delhi–Goa (+68.5%) fares ahead of
              Diwali travel."
            </div>
          </div>

          {/* Monthly Statistical Bulletin Download Card matching Stitch Screenshot */}
          <div className="bg-[#0b192e] text-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <FileDown className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold font-serif-heading tracking-wide">Monthly Statistical Bulletin</div>
                <div className="text-[10px] text-slate-400 font-mono">PDF Report • Jan 2025</div>
              </div>
            </div>

            <button
              id="btn-download-pdf-bulletin"
              onClick={handleDownloadPdf}
              className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
              title="Download Bulletin PDF"
            >
              <FileDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Trajectory Chart (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                  {activeTab === 'trajectory' ? 'INDEX TRAJECTORY' : '30-DAY DGCA BACKTEST VALIDATION'}
                </h3>
                <div className="flex bg-slate-100 p-0.5 rounded text-[11px] font-semibold">
                  <button
                    onClick={() => setActiveTab('trajectory')}
                    className={`px-2.5 py-0.5 rounded ${
                      activeTab === 'trajectory' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    APIx Series
                  </button>
                  <button
                    onClick={() => setActiveTab('backtest')}
                    className={`px-2.5 py-0.5 rounded ${
                      activeTab === 'backtest' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    DGCA Backtest
                  </button>
                </div>
              </div>
              <span className="text-[11px] text-slate-400">
                {activeTab === 'trajectory' ? 'Jan 2024 – Present' : 'DGCA Published Average Fares vs Computed Index'}
              </span>
            </div>

            {/* Range Toggle */}
            {activeTab === 'trajectory' && (
              <div className="flex items-center bg-slate-100 p-0.5 rounded text-xs font-mono font-bold text-slate-600">
                {(['1Y', 'YTD', 'ALL'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-2.5 py-1 rounded transition-all ${
                      timeRange === r ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === 'trajectory' ? (
                <LineChart data={chartSeries} margin={{ top: 15, right: 30, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[95, 130]} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#e5e5e6', borderColor: '#1e293b', borderRadius: '6px', color: '#0b49b4', fontSize: '12px' }}
                    formatter={(value: any) => [`${value}`, 'Airfare Price Index']}
                  />
                  <ReferenceLine
                    y={100}
                    stroke="#000000"
                    strokeWidth={1.5}
                    label={{ value: 'BASE (100)', position: 'insideBottomLeft', fill: '#475569', fontSize: 10, fontWeight: 700 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="indexValue"
                    stroke="#1e293b"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#1e293b' }}
                    activeDot={{ r: 6, fill: '#2563eb' }}
                  />
                </LineChart>
              ) : (
                <LineChart data={BACKTEST_30_DAYS} margin={{ top: 15, right: 30, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[120, 126]} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#1e293b', borderRadius: '6px', color: '#5e0572', fontSize: '11px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="computedIndex"
                    name="Computed APIx"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          {activeTab === 'backtest' && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>30-Day Mean Absolute Deviation: <strong>0.12%</strong> vs official DGCA published reports.</span>
              </div>
              <span className="font-bold font-mono text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                STATISTICALLY DEFENSIBLE
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Grid: Route Contribution Table on Left, Methodology Accordion on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                ROUTE CONTRIBUTION TABLE
              </h3>
              <span className="text-[11px] text-slate-400">DGCA Passenger Traffic Weights ($W_i$)</span>
            </div>
            <button
              onClick={() => onNavigate('route-explorer')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <span>VIEW FULL SET</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">Route (O-D)</th>
                  <th className="px-4 py-2.5">Weight (W)</th>
                  <th className="px-4 py-2.5">Price Relative</th>
                  <th className="px-4 py-2.5">Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {MONITORED_ROUTES.slice(0, 5).map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-slate-900">{row.id}</td>
                    <td className="px-4 py-2.5 text-slate-600">{row.dgcaWeight.toFixed(4)}</td>
                    <td className="px-4 py-2.5 text-slate-800">{row.priceRelative.toFixed(2)}</td>
                    <td className="px-4 py-2.5 font-bold">
                      <span
                        className={
                          row.indexContribution > 0
                            ? 'text-rose-600'
                            : row.indexContribution < 0
                            ? 'text-emerald-600'
                            : 'text-slate-600'
                        }
                      >
                        {row.indexContribution > 0 ? `+${row.indexContribution.toFixed(3)}` : row.indexContribution.toFixed(3)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Methodology Accordion (5 Cols) matching Stitch Screenshot */}
        <div className="lg:col-span-5 bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <span className="font-bold text-xs text-slate-900 font-mono">Σ METHODOLOGY</span>
          </div>

          <div className="space-y-2 text-xs">
            {/* Accordion Item 1: Concept & Scope */}
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === 'concept' ? null : 'concept')}
                className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left font-bold text-slate-800"
              >
                <span>Concept & Scope</span>
                {expandedSection === 'concept' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {expandedSection === 'concept' && (
                <div className="p-3 bg-white text-slate-600 text-[11px] leading-relaxed border-t border-slate-200">
                  VAYU-INDEX tracks domestic scheduled commercial airline tickets across India's top 100 passenger corridors.
                  Grounded in MoSPI guidelines, it isolates air travel volatility to augment CPI Transport sub-group index.
                </div>
              )}
            </div>

            {/* Accordion Item 2: Aggregation Formula */}
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === 'formula' ? null : 'formula')}
                className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left font-bold text-slate-800"
              >
                <span>Aggregation Formula</span>
                {expandedSection === 'formula' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {expandedSection === 'formula' && (
                <div className="p-3 bg-white text-slate-600 text-[11px] space-y-2 border-t border-slate-200">
                  <p>
                    The index utilizes a Laspeyres-type formula, measuring the price change of a fixed basket of domestic
                    routes relative to the base period.
                  </p>
                  <div className="p-2.5 bg-slate-900 text-slate-100 rounded font-mono text-[11px] text-center">
                    I_t = Σ ( W_0 × ( P_t / P_0 ) ) × 100
                  </div>
                </div>
              )}
            </div>

            {/* Accordion Item 3: Weight Allocation */}
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === 'weights' ? null : 'weights')}
                className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left font-bold text-slate-800"
              >
                <span>Weight Allocation</span>
                {expandedSection === 'weights' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {expandedSection === 'weights' && (
                <div className="p-3 bg-white text-slate-600 text-[11px] leading-relaxed border-t border-slate-200">
                  Route weights ($W_i$) represent each sector's proportion of total domestic annual passenger traffic published in
                  DGCA monthly air traffic reports, normalized such that $\sum W_i = 1.0$.
                </div>
              )}
            </div>
          </div>

          {/* Sample completion info box matching Stitch Screenshot */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-start gap-2.5 text-[11px] text-slate-600">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              Data for the current index calculation includes a <strong>98.4% sample completion rate</strong> across all
              monitored OTAs and direct airline APIs. No significant interpolation required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
