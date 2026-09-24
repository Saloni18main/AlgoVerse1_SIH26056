import React from 'react';
import {
  LayoutDashboard,
  PlaneTakeoff,
  TrendingUp,
  BrainCircuit,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Sliders,
  Download,
  Settings,
  HelpCircle,
  Radio,
  ExternalLink,
  ShieldCheck,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCheck,
  Lock,
  LockOpen
} from 'lucide-react';
import { PageId, GovOfficer } from '../../types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenExport: () => void;
  onOpenMethodology: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isCollapsedDesktop?: boolean;
  onToggleCollapseDesktop?: () => void;
  officer: GovOfficer | null;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  onOpenExport,
  onOpenMethodology,
  isOpenMobile,
  onCloseMobile,
  isCollapsedDesktop = false,
  onToggleCollapseDesktop,
  officer,
  onLogout,
  onOpenLogin,
}) => {
  const navItems: { id: PageId; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'route-explorer', label: 'Route Explorer', icon: PlaneTakeoff },
    { id: 'price-index', label: 'Airfare Price Index', icon: TrendingUp },
    { id: 'ai-forecasting', label: 'AI Forecasting', icon: BrainCircuit, badge: 'AI' },
    { id: 'anomaly-detection', label: 'Anomaly Detection', icon: AlertTriangle, badge: '14' },
    { id: 'festival-intelligence', label: 'Festival Intelligence', icon: Calendar },
    { id: 'data-quality', label: 'Data Quality', icon: CheckCircle2 },
    { id: 'scraper-admin', label: 'Scraper Admin', icon: Sliders },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Aside */}
      <aside
        id="app-sidebar"
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 bg-[#081325] text-slate-300 flex flex-col h-screen shrink-0 border-r border-slate-800 select-none transition-all duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsedDesktop ? 'lg:w-20' : 'lg:w-64 w-72'}`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 bg-[#060e1c] flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold shadow-inner shrink-0">
              <Radio className="w-5 h-5 animate-pulse text-blue-400" />
            </div>
            {!isCollapsedDesktop && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white tracking-wider text-base truncate font-serif-heading">VAYU-INDEX</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-blue-900/60 text-blue-300 rounded border border-blue-700/50">MoSPI</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[11px] text-emerald-400 font-medium truncate">System Status: Active</span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 lg:hidden"
            title="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-2.5 py-4 space-y-1 overflow-y-auto">
          {!isCollapsedDesktop && (
            <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              Analytical Modules
            </div>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                title={isCollapsedDesktop ? item.label : undefined}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium transition-all duration-150 group text-left ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-300'
                    }`}
                  />
                  {!isCollapsedDesktop && <span className="truncate">{item.label}</span>}
                </div>
                {!isCollapsedDesktop && item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full shrink-0 ${
                      item.id === 'anomaly-detection'
                        ? isActive
                          ? 'bg-rose-500 text-white'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : isActive
                        ? 'bg-blue-800 text-white'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions & User Card */}
        <div className="p-3 border-t border-slate-800/80 bg-[#060e1c]/80 space-y-2">
          {!isCollapsedDesktop ? (
            <>
              <button
                id="btn-sidebar-export"
                onClick={onOpenExport}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-blue-50 hover:bg-white text-slate-900 rounded-md text-xs font-semibold shadow transition-all active:scale-[0.99]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Data</span>
              </button>

              <div className="pt-1 flex items-center justify-between px-2 text-xs text-slate-400">
                <button
                  onClick={onOpenMethodology}
                  className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Methodology</span>
                </button>
                <button
                  onClick={() => handleNavClick('scraper-admin')}
                  className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Settings</span>
                </button>
              </div>

              {/* Govt Officer Card / Authentication Status */}
              {officer ? (
                <div className="mt-2 p-2.5 rounded-lg bg-slate-800/80 border border-blue-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-xs">
                        {officer.avatarInitials || 'GO'}
                      </div>
                      <div className="text-[11px] leading-tight min-w-0">
                        <div className="text-white font-semibold truncate">{officer.name}</div>
                        <div className="text-slate-400 text-[10px] truncate">{officer.designation}</div>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Verified Gov Session"></span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-700/60">
                    <span className="text-amber-300 font-mono font-medium">{officer.employeeId}</span>
                    <button
                      onClick={onLogout}
                      className="text-rose-300 hover:text-rose-200 font-semibold flex items-center gap-1 hover:underline transition-colors"
                      title="End Government Session"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-2 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] text-amber-300 font-bold">
                        DI
                      </div>
                      <div className="text-[11px] leading-tight">
                        <div className="text-white font-medium">Public Observer</div>
                        <div className="text-slate-400 text-[10px]">Read-Only Mode</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onOpenLogin}
                    className="w-full py-1.5 px-2 bg-blue-900/60 hover:bg-blue-800 text-blue-200 rounded text-[11px] font-semibold border border-blue-700/60 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <UserCheck className="w-3 h-3 text-blue-400" />
                    <span>Government Access</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 py-2">
              <button
                onClick={onOpenExport}
                className="p-2 bg-blue-50 text-slate-900 rounded-md hover:bg-white"
                title="Export Data"
              >
                <Download className="w-4 h-4" />
              </button>
              {officer ? (
                <button
                  onClick={onLogout}
                  className="p-2 text-rose-400 hover:text-rose-300 hover:bg-slate-800 rounded-md"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-800 rounded-md"
                  title="Government Access"
                >
                  <UserCheck className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Desktop Collapse Toggle Button */}
          {onToggleCollapseDesktop && (
            <button
              onClick={onToggleCollapseDesktop}
              className="hidden lg:flex w-full items-center justify-center p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded text-xs transition-colors"
              title={isCollapsedDesktop ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsedDesktop ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <div className="flex items-center gap-1 text-[11px]">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Collapse Menu</span>
                </div>
              )}
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
2023