import React, { useState } from 'react';
import { PageId, AppViewMode } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { LandingPage } from './components/views/LandingPage';
import { OverviewPage } from './components/views/OverviewPage';
import { RouteExplorerPage } from './components/views/RouteExplorerPage';
import { PriceIndexPage } from './components/views/PriceIndexPage';
import { AiForecastingPage } from './components/views/AiForecastingPage';
import { AnomalyDetectionPage } from './components/views/AnomalyDetectionPage';
import { FestivalIntelligencePage } from './components/views/FestivalIntelligencePage';
import { DataQualityPage } from './components/views/DataQualityPage';
import { ScraperAdminPage } from './components/views/ScraperAdminPage';
import { ApiExplorerModal } from './components/modals/ApiExplorerModal';
import { MethodologyModal } from './components/modals/MethodologyModal';
import { ExportModal } from './components/modals/ExportModal';
import { AlertConfigModal } from './components/modals/AlertConfigModal';

export default function App() {
  const [currentView, setCurrentView] = useState<AppViewMode>('landing');
  const [history, setHistory] = useState<AppViewMode[]>(['landing']);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [isSidebarCollapsedDesktop, setIsSidebarCollapsedDesktop] = useState(false);

  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [isMethodologyModalOpen, setIsMethodologyModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const handleNavigate = (newView: AppViewMode) => {
    if (newView === currentView) return;
    setHistory((prev) => {
      // If navigating to landing, reset history to landing
      if (newView === 'landing') {
        return ['landing'];
      }
      return [...prev, newView];
    });
    setCurrentView(newView);
    setIsSidebarOpenMobile(false);
  };

  const handleBack = () => {
    // If currently on main overview dashboard or history has only 1 step or includes landing at bottom
    if (currentView === 'overview' || history.length <= 1) {
      setCurrentView('landing');
      setHistory(['landing']);
      setIsSidebarOpenMobile(false);
      return;
    }

    // Pop the current page from history and navigate to previous page
    const updatedHistory = [...history];
    updatedHistory.pop(); // remove current view
    const previousView = updatedHistory[updatedHistory.length - 1] || 'landing';
    setHistory(updatedHistory);
    setCurrentView(previousView);
    setIsSidebarOpenMobile(false);
  };

  // If user is on the landing screen
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-white font-sans antialiased text-slate-900">
        <LandingPage
          onEnterDashboard={() => handleNavigate('overview')}
          onOpenMethodology={() => setIsMethodologyModalOpen(true)}
          onOpenApi={() => setIsApiModalOpen(true)}
        />

        {/* Modals available on public view */}
        <ApiExplorerModal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} />
        <MethodologyModal isOpen={isMethodologyModalOpen} onClose={() => setIsMethodologyModalOpen(false)} />
        <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
      </div>
    );
  }

  // Active Dashboard page id (fallback to overview if any non-standard view)
  const activePage: PageId =
    currentView === 'overview' ||
    currentView === 'route-explorer' ||
    currentView === 'price-index' ||
    currentView === 'ai-forecasting' ||
    currentView === 'anomaly-detection' ||
    currentView === 'festival-intelligence' ||
    currentView === 'data-quality' ||
    currentView === 'scraper-admin'
      ? currentView
      : 'overview';

  return (
    <div className="flex h-screen bg-slate-100 font-sans antialiased text-slate-900 overflow-hidden select-none">
      {/* Left Sidebar with responsive mobile drawer & desktop collapse */}
      <Sidebar
        currentPage={activePage}
        onNavigate={(p) => handleNavigate(p)}
        onOpenExport={() => setIsExportModalOpen(true)}
        onOpenMethodology={() => setIsMethodologyModalOpen(true)}
        isOpenMobile={isSidebarOpenMobile}
        onCloseMobile={() => setIsSidebarOpenMobile(false)}
        isCollapsedDesktop={isSidebarCollapsedDesktop}
        onToggleCollapseDesktop={() => setIsSidebarCollapsedDesktop(!isSidebarCollapsedDesktop)}
        officer={null}
        onLogout={() => {}}
        onOpenLogin={() => handleNavigate('overview')}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header with Hamburger, Consistent Back Button, and Navigation Actions */}
        <Header
          currentPage={activePage}
          onNavigate={(p) => handleNavigate(p)}
          onBack={handleBack}
          onOpenApiExplorer={() => setIsApiModalOpen(true)}
          onOpenMethodology={() => setIsMethodologyModalOpen(true)}
          onOpenExport={() => setIsExportModalOpen(true)}
          onOpenLanding={() => handleNavigate('landing')}
          onToggleSidebar={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
          isSidebarOpenMobile={isSidebarOpenMobile}
          officer={null}
          onOpenLogin={() => handleNavigate('overview')}
          onLogout={() => {}}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto bg-slate-50/70">
          {activePage === 'overview' && (
            <OverviewPage
              onNavigate={(p) => handleNavigate(p)}
              onOpenExport={() => setIsExportModalOpen(true)}
            />
          )}

          {activePage === 'route-explorer' && (
            <RouteExplorerPage
              onNavigate={(p) => handleNavigate(p)}
              onOpenExport={() => setIsExportModalOpen(true)}
            />
          )}

          {activePage === 'price-index' && (
            <PriceIndexPage
              onNavigate={(p) => handleNavigate(p)}
              onOpenExport={() => setIsExportModalOpen(true)}
            />
          )}

          {activePage === 'ai-forecasting' && (
            <AiForecastingPage onNavigate={(p) => handleNavigate(p)} />
          )}

          {activePage === 'anomaly-detection' && (
            <AnomalyDetectionPage
              onNavigate={(p) => handleNavigate(p)}
              onOpenAlertConfig={() => setIsAlertModalOpen(true)}
            />
          )}

          {activePage === 'festival-intelligence' && (
            <FestivalIntelligencePage onNavigate={(p) => handleNavigate(p)} />
          )}

          {activePage === 'data-quality' && (
            <DataQualityPage
              onNavigate={(p) => handleNavigate(p)}
              onOpenExport={() => setIsExportModalOpen(true)}
            />
          )}

          {activePage === 'scraper-admin' && (
            <ScraperAdminPage
              onNavigate={(p) => handleNavigate(p)}
              onOpenExport={() => setIsExportModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <ApiExplorerModal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} />
      <MethodologyModal isOpen={isMethodologyModalOpen} onClose={() => setIsMethodologyModalOpen(false)} />
      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
      <AlertConfigModal isOpen={isAlertModalOpen} onClose={() => setIsAlertModalOpen(false)} />
    </div>
  );
}
