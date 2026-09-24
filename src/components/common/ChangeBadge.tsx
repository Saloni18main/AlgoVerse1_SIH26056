import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface ChangeBadgeProps {
  value: number | string;
  isPositive?: boolean;
  prefix?: string;
  suffix?: string;
  size?: 'sm' | 'md';
}

export const ChangeBadge: React.FC<ChangeBadgeProps> = ({
  value,
  isPositive,
  prefix = '',
  suffix = '%',
  size = 'md',
}) => {
  const numericVal = typeof value === 'number' ? value : parseFloat(value);
  const positive = isPositive !== undefined ? isPositive : numericVal >= 0;

  const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center font-bold font-mono rounded ${sizeClasses} ${
        positive
          ? 'bg-rose-50 text-rose-700 border border-rose-200'
          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
      }`}
    >
      {positive ? (
        <ArrowUpRight className="w-3 h-3 mr-0.5 inline shrink-0" />
      ) : (
        <ArrowDownRight className="w-3 h-3 mr-0.5 inline shrink-0" />
      )}
      <span>
        {positive && !String(value).startsWith('+') ? '+' : ''}
        {value}
        {suffix}
      </span>
    </span>
  );
};
