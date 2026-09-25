import React from 'react';
import { ArrowRight, ShieldCheck, Plane, BarChart3, TrendingUp, Sparkles, Database, Building2, Layers, Compass } from 'lucide-react';
import isometricVisual from '../../assets/images/airfare_network_isometric_1788276034778.jpg';

interface LandingPageProps {
  onEnterDashboard: () => void;
  onOpenMethodology: () => void;
  onOpenApi: () => void;
}
2026
export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterDashboard,
  onOpenMethodology,
  onOpenApi,
}) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Tricolor Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>

      {/* Top Navigation */}
      <header className="border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#0b192e] flex items-center justify-center text-white font-bold text-sm shadow-xs">
            V
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 tracking-wider text-sm font-brand font-serif-heading">VAYU-INDEX</span>
              <span className="px-1.5 py-0.2 text-[9px] font-semibold uppercase tracking-wider bg-blue-900 text-white rounded">MoSPI</span>
            </div>
            <div className="text-[10px] text-slate-500 tracking-widest uppercase">Airfare Intelligence Platform</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600 uppercase tracking-wider">
          <button onClick={onOpenMethodology} className="hover:text-blue-700 transition-colors">
            ABOUT
          </button>
          <button onClick={onOpenMethodology} className="hover:text-blue-700 transition-colors">
            METHODOLOGY
          </button>
          <button onClick={onOpenApi} className="hover:text-blue-700 transition-colors">
            DATA SOURCES
          </button>
          <button onClick={onOpenMethodology} className="hover:text-blue-700 transition-colors">
            DOCUMENTATION
          </button>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="btn-gov-access"
            onClick={onEnterDashboard}
            className="flex items-center gap-2 px-4 py-2 bg-[#00256C] text-white hover:bg-[#001B4E] rounded text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 group"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>GOVERNMENT ACCESS</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Copy & Primary Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-slate-950 font-serif-heading leading-[1.12]">
              India's Airfare, <br />
              <span className="text-blue-700">Measured in Real Time.</span>
            </h1>

            {/* Clear One-Line Explanation */}
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-xl">
              VAYU-INDEX is a real-time Airfare Price Index for India that supports CPI augmentation.
            </p>
          </div>

          {/* Prominent Headline KPI Card (Current Fare Index & vs Last Month) */}
          <div className="p-5 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200/90 shadow-xs max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                Current Fare Index
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-50 text-blue-800 border border-blue-200">
                PROTOTYPE DEMO
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-slate-900">
                124.7
              </span>
              <span className="text-xs font-semibold text-slate-500 font-mono">
                pts (Base 2024 = 100)
              </span>
            </div>

            {/* vs Last Month Change */}
            <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold font-mono">
                <TrendingUp className="w-4 h-4" />
                <span>+2.4% (+2.9 pts)</span>
              </div>
              <span className="text-slate-500 font-medium">
                vs Last Month (January 2025)
              </span>
            </div>
          </div>

          {/* Large Primary CTA Button: Explore Dashboard */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              id="btn-explore-dashboard"
              onClick={onEnterDashboard}
              className="flex items-center gap-3 px-8 py-4 bg-[#00256C] hover:bg-[#001B4E] text-white rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-950/15 transition-all active:scale-95 group"
            >
              <span>EXPLORE DASHBOARD</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              id="btn-explore-methodology"
              onClick={onOpenMethodology}
              className="flex items-center gap-2 px-6 py-4 border border-slate-300 hover:border-slate-800 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>VIEW METHODOLOGY</span>
            </button>
          </div>

          {/* Baseline Metric Indicators */}
          <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-md">
            <div>
              <div className="text-lg font-bold font-mono text-slate-900">47</div>
              <div className="text-[10px] text-slate-500 font-medium uppercase">Major Corridors</div>
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-slate-900">T-30 to T-1</div>
              <div className="text-[10px] text-slate-500 font-medium uppercase">Advance Booking Buckets</div>
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-emerald-700">Daily</div>
              <div className="text-[10px] text-slate-500 font-medium uppercase">Index Frequency</div>
            </div>
          </div>
        </div>

        {/* Right Visual: Clean Isometric Airfare Intelligence Platform Graphic */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-2xl border border-slate-200/90 bg-white shadow-xl overflow-hidden group">
            {/* Header Tag */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/70 text-xs">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-700" />
                <span className="font-semibold text-slate-800 font-serif-heading">AIRFARE INTELLIGENCE PLATFORM</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-700 px-2 py-0.5 bg-white rounded border border-slate-200">
                MoSPI / NSO
              </span>
            </div>

            {/* High Resolution Isometric Airfare Graphic */}
            <div className="relative overflow-hidden bg-white p-2 sm:p-3">
              <img
                src={isometricVisual}
                alt="Airfare Intelligence Platform and Flight Network Analytics"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[380px] sm:max-h-[420px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-101"
              />
            </div>

            {/* Bottom Caption Bar */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Laspeyres Index Aggregation</span>
              </div>
              <span className="text-slate-500 font-medium">MoSPI CPI Sub-Item 04</span>
            </div>
          </div>
        </div>
      </main>

      {/* Partner Data Source Badges */}
      <footer className="border-t border-slate-200/90 py-6 bg-slate-50 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
            BUILT FOR EVIDENCE-BASED STATISTICAL INTELLIGENCE
          </div>

          <div className="flex flex-wrap items-center gap-8 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-slate-600" />
              <span>AIRLINE DATA</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-600" />
              <span>OTA DATA</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-600" />
              <span>DGCA DATA</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-600" />
              <span>MoSPI / NSO</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
