import React, { useState, useMemo } from 'react';
import { STOCK_DATA } from '../constants';
import { Card } from '../components/Card';
import { Search, Filter, Download, ChevronDown } from 'lucide-react';
import { Button } from '../components/Button';

export const StockDataPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = useMemo(() => {
    return STOCK_DATA.filter(item => 
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] sm:h-full flex flex-col animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
         <div className="relative w-full sm:w-80 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors" size={16} />
            <input 
                type="text" 
                placeholder="Filter by symbol..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300 transition-all placeholder:text-gray-400"
            />
         </div>
         <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="secondary" size="sm" className="flex-1 sm:flex-none gap-2 shadow-sm text-gray-600 justify-center">
                <Filter size={14} />
                Filters
            </Button>
            <Button variant="primary" size="sm" className="flex-1 sm:flex-none gap-2 shadow-sm justify-center">
                <Download size={14} />
                Export CSV
            </Button>
         </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" noPadding>
        <div className="flex-1 overflow-auto rounded-xl custom-scrollbar">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="text-xs font-semibold text-gray-500 uppercase bg-gray-50/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
                    <tr>
                        <th className="px-4 sm:px-6 py-4 font-medium tracking-wider">Symbol</th>
                        <th className="px-4 sm:px-6 py-4 font-medium tracking-wider cursor-pointer hover:text-gray-700 group flex items-center gap-1">
                            Date <ChevronDown size={12} className="opacity-0 group-hover:opacity-50" />
                        </th>
                        <th className="px-4 sm:px-6 py-4 font-medium text-right tracking-wider">Open</th>
                        <th className="px-4 sm:px-6 py-4 font-medium text-right tracking-wider">High</th>
                        <th className="px-4 sm:px-6 py-4 font-medium text-right tracking-wider">Low</th>
                        <th className="px-4 sm:px-6 py-4 font-medium text-right tracking-wider">Close</th>
                        <th className="px-4 sm:px-6 py-4 font-medium text-right tracking-wider">Volume</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {filteredData.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50/80 transition-colors group">
                            <td className="px-4 sm:px-6 py-3 font-medium text-gray-900 group-hover:text-black">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-[10px] mr-3 text-gray-500 font-bold">
                                    {row.symbol[0]}
                                </span>
                                {row.symbol}
                            </td>
                            <td className="px-4 sm:px-6 py-3 text-gray-500 font-mono text-xs tabular-nums whitespace-nowrap">{row.date}</td>
                            <td className="px-4 sm:px-6 py-3 text-right text-gray-600 font-mono text-xs tabular-nums tracking-tight">${row.open.toFixed(2)}</td>
                            <td className="px-4 sm:px-6 py-3 text-right text-gray-600 font-mono text-xs tabular-nums tracking-tight">${row.high.toFixed(2)}</td>
                            <td className="px-4 sm:px-6 py-3 text-right text-gray-600 font-mono text-xs tabular-nums tracking-tight">${row.low.toFixed(2)}</td>
                            <td className="px-4 sm:px-6 py-3 text-right text-gray-900 font-bold font-mono text-xs tabular-nums tracking-tight bg-gray-50/30">${row.close.toFixed(2)}</td>
                            <td className="px-4 sm:px-6 py-3 text-right text-gray-500 font-mono text-xs tabular-nums">{row.volume.toLocaleString()}</td>
                        </tr>
                    ))}
                    {filteredData.length === 0 && (
                        <tr>
                            <td colSpan={7} className="px-6 py-24 text-center">
                                <div className="flex flex-col items-center justify-center text-gray-400">
                                    <Search size={48} className="mb-4 text-gray-200" strokeWidth={1} />
                                    <p className="text-sm font-medium text-gray-900">No results found</p>
                                    <p className="text-xs text-gray-500 mt-1">Try adjusting your filters or search query.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <div className="px-4 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <span>Showing {filteredData.length} of {STOCK_DATA.length} records</span>
            <div className="flex gap-2">
                <button className="px-3 py-1.5 hover:bg-white rounded border border-transparent hover:border-gray-200 transition-all disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1.5 hover:bg-white rounded border border-transparent hover:border-gray-200 transition-all">Next</button>
            </div>
        </div>
      </Card>
    </div>
  );
};