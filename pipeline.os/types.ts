export enum View {
  OVERVIEW = 'overview',
  STOCK_DATA = 'stock_data',
  LOGS = 'logs',
  DOCUMENTATION = 'documentation',
}

export interface Metric {
  label: string;
  value: string;
  trend?: string; // e.g., "+2.5%"
  status?: 'healthy' | 'warning' | 'error' | 'neutral';
}

export interface StockData {
  id: string;
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  component: string;
  message: string;
}

export enum LogFilter {
  ALL = 'ALL',
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARN = 'WARN',
}
