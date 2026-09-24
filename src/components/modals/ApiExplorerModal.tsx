import React, { useState } from 'react';
import { X, Play, Copy, Check, Code2, Globe, Sparkles } from 'lucide-react';

interface ApiExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiExplorerModal: React.FC<ApiExplorerModalProps> = ({ isOpen, onClose }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('/api/index/current');
  const [method, setMethod] = useState('GET');
  const [responseJson, setResponseJson] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const endpoints = [
    { path: '/api/index/current', desc: 'Current Laspeyres Airfare Index & MoM/YoY growth' },
    { path: '/api/dashboard', desc: 'National KPI row, hub statuses, 12M trend' },
    { path: '/api/routes/DEL-BOM/prices', desc: 'Route Explorer price vectors & elasticity' },
    { path: '/api/forecast/DEL-BOM?advanceDays=7', desc: 'AI forecast with SHAP feature contributions' },
    { path: '/api/anomalies', desc: 'Real-time anomaly ledger & severity counts' },
    { path: '/api/events/impact', desc: 'Festival surge indicators & calendar matrix' },
    { path: '/api/backtest', desc: '30-Day DGCA benchmark verification' },
    { path: '/api/quality/summary', desc: 'Data ingestion integrity telemetry' },
  ];

  const handleExecute = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(selectedEndpoint);
      const data = await res.json();
      setResponseJson(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setResponseJson(JSON.stringify({ error: 'Failed to fetch', message: e.message }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (responseJson) {
      navigator.clipboard.writeText(responseJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-xl max-w-4xl w-full h-[85vh] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0b192e] text-white flex items-center justify-center">
              <Code2 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif-heading">CPI-Ready REST API Sandbox</h3>
              <p className="text-xs text-slate-500 font-mono">Real-time MoSPI / eSankhyiki Integration Gateway</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5">
          {/* Endpoint Selector & URL Bar */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Select API Endpoint
            </label>
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded font-mono flex items-center">
                {method}
              </span>
              <select
                value={selectedEndpoint}
                onChange={(e) => setSelectedEndpoint(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {endpoints.map((ep) => (
                  <option key={ep.path} value={ep.path}>
                    {ep.path} — {ep.desc}
                  </option>
                ))}
              </select>
              <button
                onClick={handleExecute}
                disabled={isLoading}
                className="px-5 py-2 bg-[#0b192e] hover:bg-slate-800 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>{isLoading ? 'Executing...' : 'Run Request'}</span>
              </button>
            </div>
          </div>

          {/* cURL Snippet */}
          <div className="bg-slate-900 rounded-lg p-3 text-xs font-mono text-slate-300 relative">
            <span className="text-[10px] text-slate-500 uppercase block mb-1">cURL Command</span>
            <code>curl -X GET &quot;https://vayu-index.gov.in{selectedEndpoint}&quot; -H &quot;Accept: application/json&quot;</code>
          </div>

          {/* Response Payload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                JSON Response Payload
              </span>
              {responseJson && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy JSON'}</span>
                </button>
              )}
            </div>

            <div className="bg-[#081426] text-emerald-400 p-4 rounded-lg font-mono text-xs h-72 overflow-y-auto border border-slate-800 scrollbar-thin">
              {responseJson ? (
                <pre>{responseJson}</pre>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  Click &quot;Run Request&quot; to fetch live telemetry from server.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>OpenAPI 3.1 &amp; SDMX 2.1 Compliant</span>
          <button onClick={onClose} className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
