import React from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

interface KpiCardProps {
  id?: string;
  label: string;
  value: string | number;
  trend?: string;
  trendPositive?: boolean;
  subText?: string;
  onRefresh?: () => void;
  isUpdating?: boolean;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  id,
  label,
  value,
  trend,
  trendPositive = true,
  subText,
  onRefresh,
  isUpdating,
}) => {
  return (
    <div
      id={id}
      className="bg-white p-4 rounded-lg border border-slate-200/90 shadow-xs hover:shadow-sm transition-all relative overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className={`text-slate-400 hover:text-blue-600 transition-colors p-0.5 rounded ${
              isUpdating ? 'animate-spin text-blue-600' : ''
            }`}
            title="Refresh metric"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold font-mono tracking-tight text-slate-900">{value}</span>
        {trend && (
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold ${
              trendPositive
                ? 'bg-rose-50 text-rose-600 border border-rose-200/60'
                : 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
            }`}
          >
            {trendPositive ? (
              <ArrowUpRight className="w-3 h-3 mr-0.5 inline" />
            ) : (
              <ArrowDownRight className="w-3 h-3 mr-0.5 inline" />
            )}
            {trend}
          </span>
        )}
      </div>

      {subText && <p className="mt-1 text-[11px] text-slate-400 truncate">{subText}</p>}
    </div>
  );
};
