import React, { useState } from 'react';
import { X, Download, FileText, Database, FileSpreadsheet, Check } from 'lucide-react';
import { MONITORED_ROUTES } from '../../data/airportsAndRoutes';
import { HISTORICAL_INDEX_SERIES } from '../../data/mockData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'json' | 'xml' | 'pdf'>('csv');
  const [dataScope, setDataScope] = useState<'all' | 'index' | 'anomalies'>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleTriggerExport = () => {
    setIsExporting(true);

    if (selectedFormat === 'pdf') {
      setTimeout(() => {
        setIsExporting(false);
        setIsDone(true);
        window.print();
      }, 500);
      return;
    }

    // Generate export file in browser
    setTimeout(() => {
      let content = '';
      let mimeType = 'text/plain';
      let filename = `VAYU_INDEX_${Date.now()}`;

      if (selectedFormat === 'csv') {
        mimeType = 'text/csv';
        filename += '.csv';
        const headers = 'Route_ID,Origin,Destination,DGCA_Weight,AvgFare,MedianFare,IndexContribution\n';
        const rows = MONITORED_ROUTES.map(
          (r) => `${r.id},${r.origin},${r.destination},${r.dgcaWeight},${r.currentAvgFare},${r.medianFare},${r.indexContribution}`
        ).join('\n');
        content = headers + rows;
      } else if (selectedFormat === 'json') {
        mimeType = 'application/json';
        filename += '.json';
        content = JSON.stringify(
          {
            timestamp: new Date().toISOString(),
            currentAirfareIndex: 124.7,
            basePeriod: 'Jan 2023 = 100',
            routes: MONITORED_ROUTES,
            historicalSeries: HISTORICAL_INDEX_SERIES,
          },
          null,
          2
        );
      } else if (selectedFormat === 'xml') {
        mimeType = 'application/xml';
        filename += '.xml';
        content = `<?xml version="1.0" encoding="UTF-8"?>
<MoSPIStatisticalBulletin format="SDMX-2.1" domain="CPI_AIRFARE">
  <Header>
    <ID>VAYU-INDEX-BULLETIN</ID>
    <Generated>${new Date().toISOString()}</Generated>
  </Header>
  <AirfareIndex base="Jan-2023" value="124.7" mom="+3.2" yoy="+18.4"/>
</MoSPIStatisticalBulletin>`;
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsExporting(false);
      setIsDone(true);
      setTimeout(() => setIsDone(false), 2500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0b192e] text-white flex items-center justify-center">
              <Download className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif-heading">Export Statistical Dataset</h3>
              <p className="text-xs text-slate-500 font-mono">Government SDMX &amp; Data Pipeline Exporter</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Format selection */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Select Output Format
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'csv', label: 'CSV Spreadsheets', desc: 'Raw tabular price vectors' },
                { id: 'json', label: 'JSON Dataset', desc: 'Full econometric schema' },
                { id: 'xml', label: 'MoSPI SDMX (XML)', desc: 'Official NSO statistical standard' },
                { id: 'pdf', label: 'Printable Bulletin', desc: 'Executive PDF summary' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id as any)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedFormat === fmt.id
                      ? 'border-blue-600 bg-blue-50/50 text-blue-950 font-semibold ring-1 ring-blue-600'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="font-bold">{fmt.label}</div>
                  <div className="text-[10px] text-slate-500 font-normal mt-0.5">{fmt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Scope selection */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Data Scope
            </label>
            <select
              value={dataScope}
              onChange={(e) => setDataScope(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="all">Complete Dataset (All 47 Routes &amp; 12M Trajectory)</option>
              <option value="index">Airfare Price Index &amp; DGCA Backtest Points Only</option>
              <option value="anomalies">Anomaly Ledger &amp; Festival Calendar Matrix</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">SHA-256 Verified Ingestion</span>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 border border-slate-300 hover:bg-slate-100 rounded text-xs font-semibold text-slate-700">
              Cancel
            </button>
            <button
              onClick={handleTriggerExport}
              disabled={isExporting}
              className="px-5 py-2 bg-[#0b192e] hover:bg-slate-800 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              {isDone ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-blue-400" />}
              <span>{isExporting ? 'Generating...' : isDone ? 'Export Complete' : 'Download File'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
