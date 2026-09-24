import React, { useState } from 'react';
import { FESTIVALS_DATA } from '../../data/mockData';
import { PageId } from '../../types';
import {
  Calendar,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Flame,
  Info,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface FestivalIntelligencePageProps {
  onNavigate: (page: PageId) => void;
}

export const FestivalIntelligencePage: React.FC<FestivalIntelligencePageProps> = ({ onNavigate }) => {
  const [selectedMonth, setSelectedMonth] = useState('October 2024');

  // October 2024 Calendar Grid
  // Oct 1 starts on Tuesday (offset = 2)
  const calendarDays = [
    { day: null, date: null },
    { day: null, date: null },
    { day: 1, date: '2024-10-01', type: 'normal' },
    { day: 2, date: '2024-10-02', type: 'holiday', label: 'Gandhi Jayanti' },
    { day: 3, date: '2024-10-03', type: 'normal' },
    { day: 4, date: '2024-10-04', type: 'normal' },
    { day: 5, date: '2024-10-05', type: 'normal' },
    { day: 6, date: '2024-10-06', type: 'normal' },
    { day: 7, date: '2024-10-07', type: 'normal' },
    { day: 8, date: '2024-10-08', type: 'normal' },
    { day: 9, date: '2024-10-09', type: 'normal' },
    { day: 10, date: '2024-10-10', type: 'normal' },
    { day: 11, date: '2024-10-11', type: 'festival', label: 'Maha Navami' },
    { day: 12, date: '2024-10-12', type: 'surge', label: 'Dussehra (+38.5%)' },
    { day: 13, date: '2024-10-13', type: 'normal' },
    { day: 14, date: '2024-10-14', type: 'normal' },
    { day: 15, date: '2024-10-15', type: 'normal' },
    { day: 16, date: '2024-10-16', type: 'normal' },
    { day: 17, date: '2024-10-17', type: 'normal' },
    { day: 18, date: '2024-10-18', type: 'normal' },
    { day: 19, date: '2024-10-19', type: 'normal' },
    { day: 20, date: '2024-10-20', type: 'surge', label: 'Pre-Diwali Alert' },
    { day: 21, date: '2024-10-21', type: 'normal' },
    { day: 22, date: '2024-10-22', type: 'normal' },
    { day: 23, date: '2024-10-23', type: 'normal' },
    { day: 24, date: '2024-10-24', type: 'normal' },
    { day: 25, date: '2024-10-25', type: 'normal' },
    { day: 26, date: '2024-10-26', type: 'normal' },
    { day: 27, date: '2024-10-27', type: 'normal' },
    { day: 28, date: '2024-10-28', type: 'normal' },
    { day: 29, date: '2024-10-29', type: 'festival', label: 'Dhanteras' },
    { day: 30, date: '2024-10-30', type: 'festival', label: 'Choti Diwali' },
    { day: 31, date: '2024-10-31', type: 'surge', label: 'Diwali Eve (+65.1%)' },
  ];

  // Fare hike ranking
  const fareHikeItems = [
    { event: 'CHRISTMAS / NEW YEAR', surgePct: 82.4, color: '#00256C' },
    { event: 'DIWALI WINDOW', surgePct: 65.1, color: '#00256C' },
    { event: 'HOLI', surgePct: 41.0, color: '#00256C' },
    { event: 'DUSSEHRA', surgePct: 38.5, isProjected: true, color: '#dc2626' },
    { event: 'STANDARD WEEKEND BASELINE', surgePct: 12.0, color: '#94A3B8' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb Header */}
      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
          MACRO ANALYSIS / TEMPORAL
        </div>
        <h2 className="text-xl font-bold font-serif-heading text-slate-900 mt-0.5">Festival & Event Intelligence</h2>
        <p className="text-xs text-slate-500 max-w-2xl">
          Temporal demand elasticity, holiday spikes, and pre-booking acceleration matrices for national economic forecasting.
        </p>
      </div>

      {/* Surge Alert Banner matching Stitch Screenshot */}
      <div className="bg-rose-50/90 border border-rose-200 rounded-lg p-4 text-rose-950 shadow-xs flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-md bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-900 font-mono">
            FESTIVAL SURGE DETECTED
          </div>
          <p className="text-xs text-rose-900/90 leading-relaxed">
            Anomalous fare hikes detected in pre-booking windows for <strong>Dussehra (Oct 12)</strong> &amp;{' '}
            <strong>Diwali (Nov 01)</strong>. Tier-1 to Tier-2 routes are experiencing a <strong>+45% deviation</strong> from
            standard baseline indices. Immediate observation recommended.
          </p>
        </div>
      </div>

      {/* Main Grid: Event Matrix on Left, Fare Hike Index + Predictive Insights on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 Cols): Event Proximity Matrix Calendar matching Stitch Screenshot */}
        <div className="lg:col-span-7 bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                EVENT PROXIMITY MATRIX
              </h3>
              <span className="text-[11px] text-slate-400">Q4 2024 Sector Intensity Calendar</span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded">
              October 2024
            </span>
          </div>

          {/* 7-Day Columns */}
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
              <div key={day} className="text-[10px] font-bold uppercase text-slate-400 py-1 font-mono">
                {day}
              </div>
            ))}

            {calendarDays.map((item, idx) => {
              if (!item.day) {
                return <div key={`empty-${idx}`} className="h-16 bg-slate-50/50 rounded-md border border-dashed border-slate-200"></div>;
              }

              const isHoliday = item.type === 'holiday';
              const isFestival = item.type === 'festival';
              const isSurge = item.type === 'surge';

              return (
                <div
                  key={`day-${item.day}`}
                  className={`h-16 p-1.5 rounded-md border text-left flex flex-col justify-between transition-all ${
                    isSurge
                      ? 'bg-rose-50 border-rose-300 text-rose-950 shadow-xs'
                      : isFestival
                      ? 'bg-blue-50/70 border-blue-200 text-blue-950'
                      : isHoliday
                      ? 'bg-slate-100 border-slate-300 text-slate-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs font-bold">{item.day}</span>
                    {isSurge && <Flame className="w-3 h-3 text-rose-600 animate-pulse" />}
                  </div>

                  {item.label && (
                    <span
                      className={`text-[9px] font-semibold leading-tight line-clamp-2 ${
                        isSurge ? 'text-rose-700 font-bold' : isFestival ? 'text-blue-700' : 'text-slate-600'
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend matching Stitch Screenshot */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-slate-200 border border-slate-300"></span>
              <span>National Holiday</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-blue-100 border border-blue-300"></span>
              <span>Major Festival</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-rose-200 border border-rose-400"></span>
              <span className="text-rose-700 font-bold">Active Surge Alert</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Fare Hike Index + Predictive Insights */}
        <div className="lg:col-span-5 space-y-6">
          {/* Fare Hike Index by Event matching Stitch Screenshot */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                FARE HIKE INDEX BY EVENT
              </h3>
              <span className="text-[11px] text-slate-400">Mean surge % above baseline</span>
            </div>

            <div className="space-y-3.5 pt-1">
              {fareHikeItems.map((item) => (
                <div key={item.event} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className={item.isProjected ? 'text-rose-700 font-bold' : 'text-slate-700'}>
                      {item.event} {item.isProjected && '(Projected)'}
                    </span>
                    <span className="font-mono font-bold text-slate-900">+{item.surgePct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-sm h-3 overflow-hidden">
                    <div
                      className="h-full rounded-sm transition-all duration-500"
                      style={{ width: `${item.surgePct}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Predictive Insights Card matching Stitch Screenshot */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                  PREDICTIVE INSIGHTS
                </h3>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Model Confidence: 94.2%
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Analysis indicates a highly inelastic demand curve leading up to major religious festivals. The{' '}
              <strong>T-minus 14 days window</strong> shows the sharpest acceleration in fare hikes, particularly on
              arterial routes connecting metropolitan hubs to tier-2 cities.
            </p>

            <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              Historical data models predict a sustained plateau in pricing post-Diwali, contrary to the immediate
              drop-off observed after minor public holidays. Algorithmic scrutiny is advised for the upcoming Dussehra
              corridor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
