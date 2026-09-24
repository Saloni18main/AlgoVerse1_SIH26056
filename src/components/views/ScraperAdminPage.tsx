import React, { useState, useEffect } from 'react';
import { SCRAPER_NODES, INITIAL_SCRAPER_LOGS } from '../../data/mockData';
import { ScraperNode, ScraperLog, PageId } from '../../types';
import {
  Play,
  Pause,
  RotateCw,
  Sliders,
  Terminal,
  ShieldCheck,
  AlertOctagon,
  Download,
  Trash2,
  Cpu,
  Layers,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface ScraperAdminPageProps {
  onNavigate: (page: PageId) => void;
  onOpenExport: () => void;
}

export const ScraperAdminPage: React.FC<ScraperAdminPageProps> = ({ onNavigate, onOpenExport }) => {
  const [nodes, setNodes] = useState<ScraperNode[]>(SCRAPER_NODES);
  const [logs, setLogs] = useState<ScraperLog[]>(INITIAL_SCRAPER_LOGS);
  const [isLogPaused, setIsLogPaused] = useState(false);
  const [showHaltModal, setShowHaltModal] = useState(false);
  const [cronSchedule, setCronSchedule] = useState('0 */2 * * *');
  const [proxyPool, setProxyPool] = useState('Rotating Residential (India IP)');
  const [concurrency, setConcurrency] = useState(12);
  const [strictRobotsCompliance, setStrictRobotsCompliance] = useState(true);

  // Simulated live log append when not paused
  useEffect(() => {
    if (isLogPaused) return;

    const interval = setInterval(() => {
      const sampleMessages = [
        { node: 'INDGO-DOM-01', msg: 'Heartbeat OK. Active session pool healthy (42 active connections).' },
        { node: 'VIST-METRO-02', msg: 'Batch 84B fare bucket parsed: 380 quotes on BOM-DEL.' },
        { node: 'MMT-OTA-01', msg: 'Aggregator quote parity verified across 18 travel agencies.' },
      ];
      const randomMsg = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      const newLog: ScraperLog = {
        id: String(Date.now()),
        timestamp: new Date().toLocaleTimeString(),
        nodeId: randomMsg.node,
        level: 'INFO',
        message: randomMsg.msg,
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 40)]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isLogPaused]);

  const handleTriggerNode = async (nodeId: string) => {
    try {
      const res = await fetch(`/api/scrapers/${nodeId}/trigger`, { method: 'POST' });
      const data = await res.json();
      if (data.success && data.node) {
        setNodes((prev) => prev.map((n) => (n.id === nodeId ? { ...n, status: 'ACTIVE', recordsFetched: n.recordsFetched + 420 } : n)));
      }
    } catch (e) {
      // Local optimistic update
      setNodes((prev) =>
        prev.map((n) =>
          n.id === nodeId
            ? { ...n, status: 'ACTIVE', recordsFetched: n.recordsFetched + 420, lastRun: 'Just now' }
            : n
        )
      );
    }
  };

  const handleHaltAll = () => {
    setNodes((prev) => prev.map((n) => ({ ...n, status: 'IDLE' })));
    setShowHaltModal(false);
  };

  const handleRunAll = () => {
    setNodes((prev) => prev.map((n) => ({ ...n, status: 'ACTIVE' })));
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Actions Header matching Stitch Screenshot */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
            DATA INGESTION PIPELINE
          </div>
          <h2 className="text-xl font-bold font-serif-heading text-slate-900 mt-0.5">Scraper Administration</h2>
          <p className="text-xs text-slate-500 max-w-2xl">
            Configure, deploy, and inspect distributed browserless data ingestion nodes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-halt-all"
            onClick={() => setShowHaltModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Halt All</span>
          </button>

          <button
            id="btn-run-all"
            onClick={handleRunAll}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0b192e] hover:bg-slate-800 text-white rounded text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>Run All Scrapers</span>
          </button>
        </div>
      </div>

      {/* Scraper Status Overview Table matching Stitch Screenshot */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
              SCRAPER STATUS OVERVIEW
            </h3>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
              {nodes.filter((n) => n.status === 'ACTIVE').length} / {nodes.length} Nodes Active
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-2.5">Node ID</th>
                <th className="px-4 py-2.5">Target Source</th>
                <th className="px-4 py-2.5">Type</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Last Run</th>
                <th className="px-4 py-2.5">Frequency</th>
                <th className="px-4 py-2.5">Success Rate</th>
                <th className="px-4 py-2.5">Records</th>
                <th className="px-4 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {nodes.map((node) => (
                <tr key={node.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2.5 font-bold text-slate-900">{node.id}</td>
                  <td className="px-4 py-2.5 text-slate-700 font-sans font-medium">{node.target}</td>
                  <td className="px-4 py-2.5 text-slate-500">{node.type}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        node.status === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : node.status === 'IDLE'
                          ? 'bg-slate-100 text-slate-700 border border-slate-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {node.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-slate-500">{node.lastRun}</td>
                  <td className="px-4 py-2.5 text-slate-600">{node.frequency}</td>
                  <td className="px-4 py-2.5 text-emerald-700 font-bold">{node.successRate}%</td>
                  <td className="px-4 py-2.5 text-slate-900">{node.recordsFetched.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-2.5">
                    <button
                      onClick={() => handleTriggerNode(node.id)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-[#0b192e] hover:text-white text-slate-700 rounded text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      {node.status === 'ERROR' ? 'Force Retry' : 'Run Now'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid: Live Terminal Viewer on Left, Node Config on Right matching Stitch Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Terminal Log Viewer (7 Cols) */}
        <div className="lg:col-span-7 bg-[#081426] text-slate-200 p-4 rounded-lg border border-slate-800 shadow-xl space-y-3 font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white tracking-wider">LIVE INGESTION TERMINAL</span>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <button
                onClick={() => setIsLogPaused(!isLogPaused)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                {isLogPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={handleClearLogs}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={onOpenExport}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Download
              </button>
            </div>
          </div>

          {/* Terminal log output lines */}
          <div className="h-60 overflow-y-auto space-y-1.5 text-[11px] pr-2 scrollbar-thin">
            {logs.map((log) => (
              <div key={log.id} className="leading-tight flex items-start gap-2">
                <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                <span className="text-blue-400 font-bold shrink-0">[{log.nodeId}]</span>
                <span
                  className={
                    log.level === 'ERROR'
                      ? 'text-rose-400 font-bold'
                      : log.level === 'WARN'
                      ? 'text-amber-400'
                      : log.level === 'SUCCESS'
                      ? 'text-emerald-400 font-semibold'
                      : 'text-slate-300'
                  }
                >
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Node Configuration Panel (5 Cols) matching Stitch Screenshot */}
        <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
              GLOBAL NODE CONFIGURATION
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Cron Schedule */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Cron Schedule
              </label>
              <input
                type="text"
                value={cronSchedule}
                onChange={(e) => setCronSchedule(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Every 2 hours on the hour</span>
            </div>

            {/* Proxy Pool */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Proxy Pool
              </label>
              <select
                value={proxyPool}
                onChange={(e) => setProxyPool(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="Rotating Residential (India IP)">Rotating Residential (India IP Pool)</option>
                <option value="Datacenter Dedicated (Mumbai & Delhi)">Datacenter Dedicated (Mumbai & Delhi)</option>
                <option value="Direct Ingest (Whitelisted API Gateways)">Direct Ingest (Whitelisted API Gateways)</option>
              </select>
            </div>

            {/* Concurrency */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Request Concurrency: <span className="font-mono text-blue-700">{concurrency} Threads</span>
                </label>
              </div>
              <input
                type="range"
                min="2"
                max="32"
                value={concurrency}
                onChange={(e) => setConcurrency(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Ethical Scraping Compliance Toggle */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Strict /robots.txt Compliance</span>
                </div>
                <div className="text-[10px] text-slate-500">Adheres to crawl delays and rate limits</div>
              </div>
              <button
                type="button"
                onClick={() => setStrictRobotsCompliance(!strictRobotsCompliance)}
                className={`w-9 h-5 rounded-full transition-colors relative ${
                  strictRobotsCompliance ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    strictRobotsCompliance ? 'left-4.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Halt All */}
      {showHaltModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 font-serif-heading">Confirm Pipeline Halt</h4>
                <p className="text-xs text-slate-500">This will pause all active scrapers across 6 airline feeds.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to halt all data ingestion nodes? Live index updates and anomaly alerts will pause
              until manually resumed.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowHaltModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleHaltAll}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-bold uppercase tracking-wider shadow-xs"
              >
                Confirm Halt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};