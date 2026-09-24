import React, { useState } from 'react';
import { X, Bell, ShieldAlert, Sliders, Check } from 'lucide-react';

interface AlertConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertConfigModal: React.FC<AlertConfigModalProps> = ({ isOpen, onClose }) => {
  const [spikeThreshold, setSpikeThreshold] = useState(35);
  const [confidenceFloor, setConfidenceFloor] = useState(90);
  const [channels, setChannels] = useState({
    dashboardBanner: true,
    emailDigest: true,
    webhookMoSPI: false,
    smsOfficer: true,
  });
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif-heading">Anomaly Trigger Rules</h3>
              <p className="text-xs text-slate-500 font-mono">Automated Threshold Configuration</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Threshold slider */}
          <div className="space-y-1">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>Price Surge Sensitivity:</span>
              <span className="font-mono text-rose-700 font-bold">&gt; +{spikeThreshold}% Deviation</span>
            </div>
            <input
              type="range"
              min="15"
              max="75"
              value={spikeThreshold}
              onChange={(e) => setSpikeThreshold(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <span className="text-[10px] text-slate-400">Trigger alert if fare exceeds baseline by this %</span>
          </div>

          {/* Model Confidence Floor */}
          <div className="space-y-1">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>AI Model Confidence Floor:</span>
              <span className="font-mono text-blue-700 font-bold">{confidenceFloor}% Minimum</span>
            </div>
            <input
              type="range"
              min="80"
              max="99"
              value={confidenceFloor}
              onChange={(e) => setConfidenceFloor(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Notification Channels */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Dispatch Channels
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={channels.dashboardBanner}
                  onChange={(e) => setChannels({ ...channels, dashboardBanner: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-800">Top Emergency Alert Banner on Overview Dashboard</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={channels.emailDigest}
                  onChange={(e) => setChannels({ ...channels, emailDigest: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-800">Daily Officer Intelligence Digest (PDF Email)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={channels.webhookMoSPI}
                  onChange={(e) => setChannels({ ...channels, webhookMoSPI: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-800">MoSPI eSankhyiki Webhook Stream</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 border border-slate-300 hover:bg-slate-100 rounded text-xs font-semibold text-slate-700">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-[#0b192e] hover:bg-slate-800 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-400" /> : null}
            <span>{saved ? 'Rules Applied ✓' : 'Save Rules'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
