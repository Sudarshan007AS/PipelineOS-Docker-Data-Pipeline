import { LogEntry, Metric, StockData } from './types';
import { Activity, Server, Database, Layers, LayoutDashboard } from 'lucide-react';

export const METRICS: Metric[] = [
  { label: 'System Health', value: '99.9%', status: 'healthy', trend: 'Optimal' },
  { label: 'Uptime', value: '24d 13h', status: 'neutral' },
  { label: 'Total Records', value: '42.5M', status: 'neutral', trend: '+120k today' },
  { label: 'Avg Latency', value: '42ms', status: 'healthy', trend: '-3ms' },
];

export const PIPELINE_STEPS = [
  { id: 'api', label: 'AlphaVantage API', icon: Activity, description: 'External Data Source' },
  { id: 'airflow', label: 'Airflow Scheduler', icon: Layers, description: 'Orchestration & Cron' },
  { id: 'tasks', label: 'Processing Tasks', icon: Server, description: 'Python ETL Jobs' },
  { id: 'db', label: 'PostgreSQL', icon: Database, description: 'Relational Storage' },
  { id: 'dash', label: 'Dashboard UI', icon: LayoutDashboard, description: 'Data Visualization' },
];

// Generate some mock stock data
export const STOCK_DATA: StockData[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `stk_${i}`,
  symbol: i % 3 === 0 ? 'AAPL' : i % 3 === 1 ? 'GOOGL' : 'MSFT',
  date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
  open: 150 + Math.random() * 50,
  high: 155 + Math.random() * 50,
  low: 148 + Math.random() * 50,
  close: 152 + Math.random() * 50,
  volume: Math.floor(1000000 + Math.random() * 5000000),
}));

export const LOGS: LogEntry[] = [
  { id: '1', timestamp: '2023-10-27 10:00:01', level: 'INFO', component: 'Airflow', message: 'DAG stock_pipeline_daily started.' },
  { id: '2', timestamp: '2023-10-27 10:00:05', level: 'INFO', component: 'API Client', message: 'Fetching daily bars for AAPL.' },
  { id: '3', timestamp: '2023-10-27 10:00:08', level: 'DEBUG', component: 'Transformation', message: 'Normalizing currency formats.' },
  { id: '4', timestamp: '2023-10-27 10:01:12', level: 'WARN', component: 'API Client', message: 'Rate limit approaching (450/500).' },
  { id: '5', timestamp: '2023-10-27 10:02:30', level: 'INFO', component: 'PostgreSQL', message: 'Batch insert of 1500 records committed.' },
  { id: '6', timestamp: '2023-10-27 10:03:00', level: 'ERROR', component: 'Data Quality', message: 'Null value detected in critical column "close". Record skipped.' },
  { id: '7', timestamp: '2023-10-27 10:03:05', level: 'INFO', component: 'Airflow', message: 'Task "validate_data" completed.' },
  { id: '8', timestamp: '2023-10-27 10:03:10', level: 'INFO', component: 'Airflow', message: 'DAG stock_pipeline_daily finished successfully.' },
  { id: '9', timestamp: '2023-10-27 10:05:00', level: 'INFO', component: 'System', message: 'Health check passed.' },
  { id: '10', timestamp: '2023-10-27 10:15:00', level: 'INFO', component: 'System', message: 'Backup routine started.' },
];
