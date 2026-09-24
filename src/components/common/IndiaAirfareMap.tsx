import React, { useState } from 'react';
import { AIRPORTS, MONITORED_ROUTES } from '../../data/airportsAndRoutes';
import { Airport, Route } from '../../types';
import { Plane, AlertCircle, TrendingUp, Info } from 'lucide-react';

interface IndiaAirfareMapProps {
  onSelectRoute?: (routeId: string) => void;
}

export const IndiaAirfareMap: React.FC<IndiaAirfareMapProps> = ({ onSelectRoute }) => {
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  // Geographic projection bounds for India SVG
  // Map coordinates: Lat 8N to 36N, Lng 68E to 98E
  const projectCoords = (lat: number, lng: number): [number, number] => {
    const minLat = 7.5;
    const maxLat = 34.5;
    const minLng = 68.0;
    const maxLng = 95.0;

    const width = 580;
    const height = 480;

    const x = ((lng - minLng) / (maxLng - minLng)) * width;
    const y = height - ((lat - minLat) / (maxLat - minLat)) * height;

    return [Math.round(x), Math.round(y)];
  };

  // Top flight routes for drawing curved arcs
  const displayArcs = [
    { id: 'DEL-BOM', from: 'DEL', to: 'BOM', status: 'nominal', weight: '14.5%' },
    { id: 'BLR-DEL', from: 'BLR', to: 'DEL', status: 'nominal', weight: '11.2%' },
    { id: 'BOM-BLR', from: 'BOM', to: 'BLR', status: 'nominal', weight: '8.9%' },
    { id: 'DEL-CCU', from: 'DEL', to: 'CCU', status: 'elevated', weight: '7.6%' },
    { id: 'HYD-DEL', from: 'HYD', to: 'DEL', status: 'nominal', weight: '6.5%' },
    { id: 'DEL-GOI', from: 'DEL', to: 'GOI', status: 'critical', weight: '4.8%' },
    { id: 'MAA-DEL', from: 'MAA', to: 'DEL', status: 'nominal', weight: '5.9%' },
    { id: 'DEL-PNQ', from: 'DEL', to: 'PNQ', status: 'nominal', weight: '4.5%' },
    { id: 'DEL-GAU', from: 'DEL', to: 'GAU', status: 'elevated', weight: '3.8%' },
  ];

  return (
    <div className="relative w-full h-[480px] bg-slate-900/95 rounded-lg border border-slate-800 p-4 overflow-hidden flex flex-col justify-between select-none">
      {/* Map Header and Legend */}
      <div className="flex items-center justify-between z-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">National Hub Status</span>
          <p className="text-[11px] text-slate-400">Live sector monitoring & traffic-weighted flight arcs</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="text-slate-300">Nominal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="text-slate-300">Elevated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <span className="text-rose-400 font-semibold">Surge Alert</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas for Map and Flight Paths */}
      <div className="relative flex-1 flex items-center justify-center">
        <svg viewBox="0 0 580 480" className="w-full h-full max-w-[580px] max-h-[440px]">
          {/* Subtle Grid background */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="arcNominal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="arcSurge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f87171" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          <rect width="580" height="480" fill="url(#grid)" />

          {/* India Boundary Outline Silhouette (Simplified high-stylized geo polygon) */}
          <path
            d="M 175 60 L 220 50 L 245 80 L 225 125 L 290 145 L 360 170 L 450 175 L 500 160 L 490 200 L 440 215 L 375 235 L 340 270 L 310 320 L 280 390 L 250 435 L 220 380 L 195 330 L 160 280 L 135 230 L 145 180 L 175 140 Z"
            fill="#0f172a"
            stroke="#334155"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.85"
          />

          {/* Flight Route Curved Arcs */}
          {displayArcs.map((arc) => {
            const originAirport = AIRPORTS.find((a) => a.code === arc.from);
            const destAirport = AIRPORTS.find((a) => a.code === arc.to);
            if (!originAirport || !destAirport) return null;

            const [x1, y1] = projectCoords(originAirport.coordinates[0], originAirport.coordinates[1]);
            const [x2, y2] = projectCoords(destAirport.coordinates[0], destAirport.coordinates[1]);

            // Arc curve control point offset
            const dx = x2 - x1;
            const dy = y2 - y1;
            const cx = (x1 + x2) / 2 - dy * 0.25;
            const cy = (y1 + y2) / 2 + dx * 0.25;

            const isSurge = arc.status === 'critical';
            const isHovered = hoveredRoute === arc.id;

            return (
              <g key={arc.id} className="cursor-pointer" onClick={() => onSelectRoute?.(arc.id)}>
                <path
                  d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                  fill="none"
                  stroke={isSurge ? '#ef4444' : isHovered ? '#60a5fa' : '#3b82f6'}
                  strokeWidth={isSurge ? 2.5 : isHovered ? 2.2 : 1.4}
                  strokeDasharray={isSurge ? '4 2' : undefined}
                  className="transition-all duration-200 hover:opacity-100"
                  opacity={isSurge ? 0.95 : isHovered ? 0.9 : 0.45}
                  onMouseEnter={() => setHoveredRoute(arc.id)}
                  onMouseLeave={() => setHoveredRoute(null)}
                />
              </g>
            );
          })}

          {/* Airport Hub Nodes */}
          {AIRPORTS.map((airport) => {
            const [x, y] = projectCoords(airport.coordinates[0], airport.coordinates[1]);
            const isSelected = selectedAirport?.code === airport.code;
            const isSurge = airport.code === 'GOI';
            const isElevated = airport.code === 'CCU' || airport.code === 'GAU';

            return (
              <g
                key={airport.code}
                className="cursor-pointer group"
                onClick={() => setSelectedAirport(airport)}
              >
                {/* Pulsing ring for critical/surge hubs */}
                {isSurge && (
                  <circle cx={x} cy={y} r="14" fill="#ef4444" opacity="0.25" className="animate-ping" />
                )}

                {/* Outer halo on hover/selected */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 10 : 7}
                  fill={isSurge ? '#ef4444' : isElevated ? '#fbbf24' : '#3b82f6'}
                  opacity={isSelected ? 0.9 : 0.8}
                  className="transition-all duration-200 group-hover:scale-125"
                />

                {/* Center dot */}
                <circle cx={x} cy={y} r="3" fill="#ffffff" />

                {/* Airport Code Tag */}
                <text
                  x={x + 9}
                  y={y + 4}
                  fill="#ffffff"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                  className="drop-shadow-sm select-none"
                >
                  {airport.code}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Hub Details Floating Card */}
        {selectedAirport && (
          <div className="absolute bottom-4 left-4 bg-slate-800/95 border border-slate-700 rounded-lg p-3 w-64 shadow-xl z-20 text-xs animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-white text-sm">{selectedAirport.code}</span>
                <span className="text-slate-400">({selectedAirport.city})</span>
              </div>
              <button
                onClick={() => setSelectedAirport(null)}
                className="text-slate-400 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span
                  className={`font-semibold uppercase ${
                    selectedAirport.status === 'surge'
                      ? 'text-rose-400'
                      : selectedAirport.status === 'elevated'
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {selectedAirport.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Sectors:</span>
                <span className="font-mono text-white">{selectedAirport.activeRoutesCount} monitored</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Hub Type:</span>
                <span className="text-slate-300">{selectedAirport.isMajorHub ? 'Tier-1 Metro Hub' : 'Non-Metro Corridor'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Footer Note */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
        <span>Grounded in DGCA Route Traffic Reports</span>
        <span>Click any node or sector arc to inspect pricing vector</span>
      </div>
    </div>
  );
};
