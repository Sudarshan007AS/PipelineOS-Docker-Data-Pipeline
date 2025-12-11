import React from 'react';
import { LayoutGrid, Database, Terminal, FileText, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onChangeView: (view: View) => void;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onChangeView, 
  isOpen, 
  onClose,
  isCollapsed,
  toggleCollapse
}) => {
  const navItems = [
    { id: View.OVERVIEW, label: 'Overview', icon: LayoutGrid },
    { id: View.STOCK_DATA, label: 'Stock Data', icon: Database },
    { id: View.LOGS, label: 'Logs & Events', icon: Terminal },
    { id: View.DOCUMENTATION, label: 'Documentation', icon: FileText },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 
          flex flex-col transition-all duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-[80px]' : 'w-[280px] lg:w-[280px]'}
        `}
      >
        <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold tracking-wider">P.</span>
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg text-gray-900 tracking-tight whitespace-nowrap opacity-100 transition-opacity duration-200">
                Pipeline.OS
              </span>
            )}
          </div>
          {/* Mobile Close Button */}
          <button onClick={onClose} className="lg:hidden text-gray-500">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onChangeView(item.id);
                  onClose(); // Close on mobile selection
                }}
                title={isCollapsed ? item.label : undefined}
                className={`
                  w-full flex items-center rounded-lg text-sm transition-all duration-200 group relative
                  ${isCollapsed ? 'justify-center p-3' : 'px-3 py-2.5 justify-between'}
                  ${isActive 
                    ? 'bg-gray-50 text-gray-900 font-medium ring-1 ring-gray-200/50 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50/50'}
                `}
              >
                <div className="flex items-center gap-3.5">
                  <Icon 
                    size={20} 
                    strokeWidth={isActive ? 2 : 1.5}
                    className={`transition-colors flex-shrink-0 ${isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`} 
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
              </button>
            );
          })}
        </nav>

        {/* User & Collapse Section */}
        <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
           <div className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group ${isCollapsed ? 'justify-center' : ''}`}>
            
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium text-gray-900 truncate">Made with ❤️ by Sudarshan A S</span>
              </div>
            )}
          </div>

          <button 
            onClick={toggleCollapse}
            className="hidden lg:flex items-center justify-center w-full p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors mt-2"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>
    </>
  );
};