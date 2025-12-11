import React from 'react';
import { METRICS, PIPELINE_STEPS } from '../constants';
import { Card } from '../components/Card';
import { ArrowDown, TrendingUp, Activity } from 'lucide-react';

export const Overview: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric, idx) => (
          <Card key={idx} className="transition-all hover:-translate-y-1 duration-300">
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  {metric.label}
                  {idx === 0 && <Activity size={14} className="text-gray-400" />}
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                   <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-mono">{metric.value}</h3>
                </div>
              </div>
              <div className="flex items-center mt-5 pt-4 border-t border-gray-50">
                {metric.status === 'healthy' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Operational
                  </span>
                )}
                {metric.trend && (
                  <span className={`ml-auto text-xs font-medium flex items-center gap-1 ${metric.trend.includes('+') ? 'text-emerald-600' : 'text-gray-600'}`}>
                    {metric.trend.includes('+') && <TrendingUp size={12} />}
                    {metric.trend}
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pipeline Architecture */}
      <Card title="Pipeline Topology" subtitle="Real-time end-to-end data flow monitoring" className="min-h-[300px]">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 py-8 lg:py-16 px-4 lg:px-8 overflow-x-auto scrollbar-hide">
          
          {/* Connecting Line Layer (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gray-100 -translate-y-1/2 z-0 px-20">
             <div className="w-full h-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>

          {PIPELINE_STEPS.map((step, idx) => {
            const Icon = step.icon;
            
            return (
              <React.Fragment key={step.id}>
                <div className="relative z-10 flex flex-col items-center text-center group min-w-[120px] lg:min-w-[140px]">
                  {/* Icon Circle */}
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-center mb-3 lg:mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] group-hover:border-gray-300">
                    <Icon className="text-gray-400 group-hover:text-gray-900 transition-colors duration-300" size={24} strokeWidth={1.5} />
                  </div>
                  
                  {/* Label */}
                  <div className="bg-white/50 backdrop-blur-sm px-3 py-1 rounded-lg">
                      <h4 className="text-xs lg:text-sm font-semibold text-gray-900">{step.label}</h4>
                      <p className="text-[10px] lg:text-[11px] text-gray-500 mt-1 uppercase tracking-wider font-medium">{step.description}</p>
                  </div>
                </div>
                
                {/* Mobile Arrow */}
                {idx !== PIPELINE_STEPS.length - 1 && (
                  <div className="lg:hidden my-1 text-gray-300 animate-pulse">
                    <ArrowDown size={16} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Card>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Task Throughput" subtitle="Jobs processed per minute" className="col-span-2 h-72 sm:h-80">
           <div className="w-full h-full flex items-end gap-1 pt-8 pb-2 px-2">
              {Array.from({ length: 40 }).map((_, i) => {
                  const height = 30 + Math.random() * 60;
                  return (
                      <div 
                        key={i} 
                        className="flex-1 bg-gray-900/5 hover:bg-gray-900/80 rounded-t-sm transition-all duration-300" 
                        style={{ height: `${height}%` }}
                      />
                  )
              })}
           </div>
        </Card>

        <Card title="Resource Usage" subtitle="Cluster CPU load" className="h-72 sm:h-80">
            <div className="h-full flex flex-col justify-end gap-3 px-2 pb-2">
                {[
                  { label: 'Airflow Worker', usage: 78 },
                  { label: 'DB Writer', usage: 45 },
                  { label: 'API Poller', usage: 62 },
                  { label: 'Web Server', usage: 24 }
                ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-medium text-gray-500">
                            <span>{item.label}</span>
                            <span>{item.usage}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gray-900 rounded-full transition-all duration-1000 ease-out" 
                                style={{ width: `${item.usage}%`, opacity: 0.6 + (item.usage / 200) }} 
                            />
                        </div>
                    </div>
                ))}
                <div className="mt-4 border-t border-gray-50 text-xs text-gray-400 text-center">
                    Updated 30s ago
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
};