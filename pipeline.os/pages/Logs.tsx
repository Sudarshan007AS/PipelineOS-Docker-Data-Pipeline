import React, { useState } from 'react';
import { LOGS } from '../constants';
import { Card } from '../components/Card';
import { AlertCircle, Info, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { LogFilter } from '../types';

export const LogsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<LogFilter>(LogFilter.ALL);

  const filteredLogs = activeFilter === LogFilter.ALL 
    ? LOGS 
    : LOGS.filter(log => log.level === activeFilter);

  const getLevelBadge = (level: string) => {
    switch(level) {
        case 'INFO': return <span className="text-blue-500"><Info size={14} /></span>;
        case 'WARN': return <span className="text-amber-500"><AlertTriangle size={14} /></span>;
        case 'ERROR': return <span className="text-red-500"><AlertCircle size={14} /></span>;
        default: return <span className="text-gray-400"><CheckCircle2 size={14} /></span>;
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)] sm:h-[calc(100vh-9rem)] flex flex-col md:flex-row gap-4 md:gap-6 animate-fade-in">
      {/* Filters Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            <h3 className="hidden md:block text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Filter by Level</h3>
            {Object.values(LogFilter).map(filter => (
                <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`
                        whitespace-nowrap flex-shrink-0 md:w-full text-left px-3 py-2 md:py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 md:justify-between group
                        ${activeFilter === filter 
                        ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200' 
                        : 'bg-gray-100/50 md:bg-transparent text-gray-500 hover:bg-gray-100/50 hover:text-gray-900'}
                    `}
                >
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                            filter === 'ERROR' ? 'bg-red-500' :
                            filter === 'WARN' ? 'bg-amber-500' :
                            filter === 'INFO' ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        <span className="capitalize">{filter === 'ALL' ? 'All Events' : filter.toLowerCase()}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full transition-colors hidden md:inline-block ${
                        activeFilter === filter ? 'bg-gray-100 text-gray-600' : 'bg-transparent text-gray-400 group-hover:bg-gray-100'
                    }`}>
                        {filter === 'ALL' ? LOGS.length : LOGS.filter(l => l.level === filter).length}
                    </span>
                </button>
            ))}
        </div>
        
        <div className="hidden md:block mt-6 px-3">
             <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-800 leading-relaxed">
                    <strong>Tip:</strong> Logs are retained for 30 days. Export older logs to S3 for long-term auditing.
                </p>
             </div>
        </div>
      </div>

      {/* Logs Terminal */}
      <Card className="flex-1 flex flex-col min-h-0 bg-white border-gray-200 shadow-sm p-0 overflow-hidden" noPadding>
        {/* Terminal Header */}
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex gap-1.5 opacity-60">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <div className="h-4 w-px bg-gray-200 mx-1"></div>
                <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
                    <Clock size={10} />
                    Live Tail
                </span>
            </div>
            <div className="text-[10px] text-gray-400 font-mono hidden sm:block">
                Region: us-east-1a
            </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 font-mono text-xs bg-[#FBFBFB] custom-scrollbar">
            <div className="space-y-0.5">
                {filteredLogs.map((log) => (
                    <div key={log.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-2 sm:py-1.5 px-3 rounded hover:bg-white hover:shadow-sm transition-all duration-150 border border-transparent hover:border-gray-100 group">
                        <span className="text-gray-400 w-32 flex-shrink-0 select-none text-[10px] sm:text-[11px] tabular-nums tracking-tight">{log.timestamp}</span>
                        <div className="flex items-center gap-2 sm:contents">
                            <div className="w-5 flex items-center justify-center flex-shrink-0">
                                {getLevelBadge(log.level)}
                            </div>
                            <span className={`font-semibold w-28 flex-shrink-0 tracking-tight ${
                                log.level === 'ERROR' ? 'text-red-700' : 
                                log.level === 'WARN' ? 'text-amber-700' : 
                                'text-gray-700'
                            }`}>
                                {log.component}
                            </span>
                        </div>
                        <span className="text-gray-600 break-all leading-relaxed group-hover:text-gray-900 pl-7 sm:pl-0">{log.message}</span>
                    </div>
                ))}
            </div>
            {filteredLogs.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <p className="italic">No logs matching this filter</p>
                </div>
            )}
        </div>
      </Card>
    </div>
  );
};