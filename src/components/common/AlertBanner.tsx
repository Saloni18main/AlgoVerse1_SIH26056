import React from 'react';
import { AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';

interface AlertBannerProps {
  id?: string;
  headline: string;
  subText?: string;
  actionText?: string;
  onAction?: () => void;
  severity?: 'critical' | 'warning' | 'info';
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  id,
  headline,
  subText,
  actionText = 'INVESTIGATE',
  onAction,
  severity = 'critical',
}) => {
  const isCritical = severity === 'critical';

  return (
    <div
      id={id}
      className={`rounded-lg p-3.5 flex items-center justify-between gap-4 border transition-all ${
        isCritical
          ? 'bg-rose-50/90 border-rose-200 text-rose-950 shadow-xs'
          : 'bg-amber-50/90 border-amber-200 text-amber-950 shadow-xs'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
            isCritical ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold tracking-tight">{headline}</div>
          {subText && <div className="text-[11px] text-slate-600 mt-0.5">{subText}</div>}
        </div>
      </div>

      {onAction && (
        <button
          onClick={onAction}
          className={`px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider transition-all shrink-0 flex items-center gap-1 active:scale-95 ${
            isCritical
              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
              : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
          }`}
        >
          <span>{actionText}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
