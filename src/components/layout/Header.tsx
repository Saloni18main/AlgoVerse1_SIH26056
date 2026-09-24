import React, { useState } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  Shield,
  FileText,
  Code2,
  BookOpen,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Check,
  X,
  Menu,
  ShieldCheck,
  LogOut,
  UserCheck,
  Lock,
  Globe,
  ArrowLeft,
} from 'lucide-react';
import { PageId, GovOfficer } from '../../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onBack: () => void;
  onOpenApiExplorer: () => void;
  onOpenMethodology: () => void;
  onOpenExport: () => void;
  onOpenLanding: () => void;
  onToggleSidebar: () => void;
  isSidebarOpenMobile?: boolean;
  officer: GovOfficer | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onBack,
  onOpenApiExplorer,
  onOpenMethodology,
  onOpenExport,
  onOpenLanding,
  onToggleSidebar,
  isSidebarOpenMobile = false,
  officer,
  onOpenLogin,
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showOfficerMenu, setShowOfficerMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'DEL-GOI price spike detected (+67%)', time: '14 min ago', unread: true },
    { id: 2, text: 'Batch 84A processed: 12,480 quotes ingested', time: '45 min ago', unread: false },
    { id: 3, text: 'DGCA 30-day backtest deviation verified at 0.12%', time: '2 hours ago', unread: false },
  ]);

  const titles: Record<PageId, { title: string; subtitle: string }> = {
    overview: {
      title: 'National Airfare Overview',
      subtitle: "Real-time intelligence on India's domestic airfare market.",
    },
    'route-explorer': {
      title: 'Route Explorer',
      subtitle: 'Deep-dive analysis of domestic sector pricing vectors.',
    },
    'price-index': {
      title: 'Airfare Price Index',
      subtitle: 'Aggregate measure of domestic commercial air travel pricing trends across top 100 domestic routes.',
    },
    'ai-forecasting': {
      title: 'AI Airfare Forecast',
      subtitle: 'Predictive analysis based on historical trends, capacity, and demand indicators.',
    },
    'anomaly-detection': {
      title: 'Anomaly Detection',
      subtitle: 'Real-time monitoring of statistical deviations in domestic route pricing.',
    },
    'festival-intelligence': {
      title: 'Festival & Event Intelligence',
      subtitle: 'Temporal demand elasticity, holiday spikes, and pre-booking acceleration matrices.',
    },
    'data-quality': {
      title: 'Data Quality & Reliability',
      subtitle: 'Real-time assessment of source integrity and scraper performance.',
    },
    'scraper-admin': {
      title: 'Scraper Administration',
      subtitle: 'Manage, monitor, and configure data acquisition nodes.',
    },
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.toLowerCase().trim();
    if (q.includes('route') || q.includes('del') || q.includes('bom') || q.includes('blr')) {
      onNavigate('route-explorer');
    } else if (q.includes('index') || q.includes('cpi') || q.includes('laspeyres') || q.includes('dgca')) {
      onNavigate('price-index');
    } else if (q.includes('forecast') || q.includes('ai') || q.includes('predict')) {
      onNavigate('ai-forecasting');
    } else if (q.includes('anom') || q.includes('spike') || q.includes('alert')) {
      onNavigate('anomaly-detection');
    } else if (q.includes('fest') || q.includes('diwali') || q.includes('dussehra') || q.includes('event')) {
      onNavigate('festival-intelligence');
    } else if (q.includes('scrap') || q.includes('node') || q.includes('log')) {
      onNavigate('scraper-admin');
    } else if (q.includes('qual') || q.includes('matrix')) {
      onNavigate('data-quality');
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
      {/* Top micro bar for sub-links & government portal breadcrumbs */}
      <div className="px-4 sm:px-6 py-1.5 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600 bg-slate-50/70">
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden text-[11px] sm:text-xs">
          <span className="font-semibold text-slate-800 tracking-wide truncate">National Airfare Intelligence</span>
          <span className="text-slate-300">|</span>
          <button
            onClick={onOpenLanding}
            className="text-blue-700 hover:underline font-medium flex items-center gap-1 shrink-0"
          >
            <Globe className="w-3 h-3 text-blue-600" />
            <span>Public Portal</span>
          </button>
          <span className="text-slate-300 hidden md:inline">|</span>
          <span className="text-slate-500 font-mono text-[11px] hidden md:inline">Sponsor: MoSPI (DIID) — SIH26056</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
          <button
            onClick={onOpenMethodology}
            className="hover:text-blue-700 font-medium transition-colors flex items-center gap-1"
          >
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Methodology</span>
          </button>
          <button
            onClick={onOpenExport}
            className="hover:text-blue-700 font-medium transition-colors flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Reports</span>
          </button>
          <button
            onClick={onOpenApiExplorer}
            className="hover:text-blue-700 font-medium transition-colors flex items-center gap-1"
          >
            <Code2 className="w-3.5 h-3.5 text-slate-500" />
            <span>CPI API</span>
          </button>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Section: Hamburger Menu + Consistent Navigation Back Button + Page Titles */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          {/* Responsive Hamburger Toggle Button */}
          <button
            id="btn-hamburger-menu"
            onClick={onToggleSidebar}
            className="p-2 -ml-1 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors shrink-0 flex items-center justify-center shadow-2xs"
            aria-label="Toggle navigation sidebar"
            title="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Consistent Top-Left Navigation Back Button */}
          <button
            id="btn-nav-back"
            onClick={onBack}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#00256C] bg-slate-100 hover:bg-slate-200/90 border border-slate-300/80 rounded-md transition-all shrink-0 shadow-2xs active:scale-95 group cursor-pointer"
            title="Go Back"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#00256C] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </button>

          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 font-serif-heading tracking-tight leading-tight truncate">
              {titles[currentPage]?.title || 'Airfare Intelligence'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 max-w-2xl truncate hidden sm:block">
              {titles[currentPage]?.subtitle || ''}
            </p>
          </div>
        </div>

        {/* Header Right: Global Search, Quick Actions, Prominent Government Access */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="relative hidden xl:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search route, index, carrier..."
              className="w-56 pl-8 pr-10 py-1.5 bg-slate-100/90 border border-slate-200 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white transition-all"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-slate-200 text-slate-500 px-1 py-0.5 rounded font-mono border border-slate-300">
              ↵
            </kbd>
          </form>

          {/* Notification Button with dropdown */}
          <div className="relative">
            <button
              id="btn-header-notifications"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
              title="System Alerts"
            >
              <Bell className="w-4 h-4" />
              {notifications.some((n) => n.unread) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">System Notifications</span>
                  <button
                    onClick={() => setNotifications(notifications.map((n) => ({ ...n, unread: false })))}
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-2.5 text-xs hover:bg-slate-50 transition-colors cursor-pointer ${
                        n.unread ? 'bg-blue-50/50' : ''
                      }`}
                      onClick={() => {
                        onNavigate('anomaly-detection');
                        setShowNotifications(false);
                      }}
                    >
                      <div className="font-medium text-slate-800">{n.text}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Help button */}
          <button
            onClick={onOpenMethodology}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors hidden sm:inline-flex"
            title="Statistical Documentation"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Prominent Government Access or Authenticated Officer Dropdown */}
          {officer ? (
            <div className="relative">
              <button
                id="btn-officer-profile-dropdown"
                onClick={() => setShowOfficerMenu(!showOfficerMenu)}
                className="flex items-center gap-2.5 p-1 sm:pl-2.5 sm:pr-3 py-1 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-300 transition-all text-left"
              >
                <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-serif-heading font-semibold text-xs shadow-xs border border-blue-900 shrink-0">
                  {officer.avatarInitials || 'GO'}
                </div>
                <div className="hidden md:block leading-tight">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{officer.name}</span>
                    <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[9px] font-mono rounded font-bold">
                      GOI
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{officer.designation}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* Officer Dropdown Menu */}
              {showOfficerMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/80">
                    <div className="text-xs font-bold text-slate-900">{officer.name}</div>
                    <div className="text-[11px] text-slate-600">{officer.email}</div>
                    <div className="mt-2 flex items-center gap-2 text-[10px] font-mono text-slate-500">
                      <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
                        {officer.employeeId}
                      </span>
                      <span className="text-emerald-600 font-semibold">• Active Session</span>
                    </div>
                  </div>

                  <div className="px-4 py-2 text-[11px] text-slate-600 space-y-1">
                    <div>
                      <span className="font-semibold text-slate-700">Ministry:</span> {officer.ministry}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Clearance:</span>{' '}
                      <span className="font-mono text-amber-700 font-bold">{officer.clearanceLevel}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => {
                        setShowOfficerMenu(false);
                        onOpenLanding();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      <span>Switch to Public Portal View</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowOfficerMenu(false);
                        onLogout();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out (Close Gov Session)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              id="btn-header-gov-access"
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#00256C] hover:bg-[#001B4E] text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 group"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Government Access</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
2023