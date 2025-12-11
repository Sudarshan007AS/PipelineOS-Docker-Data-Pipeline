import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Overview } from './pages/Overview';
import { StockDataPage } from './pages/StockData';
import { LogsPage } from './pages/Logs';
import { DocumentationPage } from './pages/Documentation';
import { View } from './types';
import { Bell, Search, Command, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.OVERVIEW);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case View.OVERVIEW: return <Overview />;
      case View.STOCK_DATA: return <StockDataPage />;
      case View.LOGS: return <LogsPage />;
      case View.DOCUMENTATION: return <DocumentationPage />;
      default: return <Overview />;
    }
  };

  const getBreadcrumb = () => {
    switch (currentView) {
        case View.OVERVIEW: return 'Dashboard';
        case View.STOCK_DATA: return 'Data Explorer';
        case View.LOGS: return 'System Logs';
        case View.DOCUMENTATION: return 'Knowledge Base';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-gray-900 font-sans selection:bg-gray-900 selection:text-white">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Topbar */}
        <header className="h-16 px-4 md:px-8 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-20">
            <div className="flex items-center text-sm tracking-wide gap-3">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  <Menu size={20} />
                </button>

                <div className="flex items-center">
                  <span className="hidden sm:inline text-gray-500 font-medium">Pipeline.OS</span>
                  <span className="hidden sm:inline mx-2.5 text-gray-300">/</span>
                  <span className="text-gray-900 font-semibold">{getBreadcrumb()}</span>
                </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-5">
                <div className="relative hidden md:flex items-center group">
                    <Search size={14} className="absolute left-3 text-gray-400 group-hover:text-gray-600 transition-colors z-10" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="bg-gray-100/50 border border-transparent rounded-lg py-1.5 pl-9 pr-10 text-xs font-medium text-gray-600 placeholder:text-gray-400 focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-gray-100 transition-all w-40 lg:w-56 hover:bg-gray-100"
                    />
                    <div className="absolute right-3 flex items-center pointer-events-none">
                        <Command size={10} className="text-gray-400 mr-0.5" />
                        <span className="text-[10px] text-gray-400 font-medium">K</span>
                    </div>
                </div>
                
                <div className="hidden md:block h-4 w-px bg-gray-200"></div>

                <button className="relative p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto max-w-[1600px] w-full mx-auto">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;