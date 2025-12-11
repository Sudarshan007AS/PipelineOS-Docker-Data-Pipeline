import React, { useState } from 'react';
import { Card } from '../components/Card';
import { BookOpen, Code, Database, Server, Terminal, Play, FileJson, AlertCircle, Check, Copy, ChevronRight, Info, Layers, ArrowRight } from 'lucide-react';

const CodeBlock = ({ title, language, children }: { title: string, language: string, children: React.ReactNode }) => (
  <div className="rounded-lg overflow-hidden border border-gray-200 bg-[#0d1117] shadow-sm my-6 group">
    <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-800">
      <span className="text-xs font-medium text-gray-400 font-mono">{title}</span>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{language}</span>
        <Copy size={12} className="text-gray-500 cursor-pointer hover:text-white transition-colors" />
      </div>
    </div>
    <div className="p-4 overflow-x-auto custom-scrollbar">
      <pre className="text-xs sm:text-sm font-mono text-gray-300 leading-relaxed whitespace-pre">
        {children}
      </pre>
    </div>
  </div>
);

const Step = ({ number, title, children }: { number: string, title: string, children?: React.ReactNode }) => (
  <div className="relative pl-10 md:pl-12 pb-12 md:pb-16 border-l border-gray-200 last:border-0 last:pb-0 ml-2">
    <div className="absolute -left-[17px] top-0 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center z-10">
      <span className="text-sm font-bold text-gray-900">{number}</span>
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">{title}</h3>
    <div className="text-gray-600 space-y-4 text-sm sm:text-base">
      {children}
    </div>
  </div>
);

const SystemSpecs: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 animate-fade-in">
    <div className="lg:col-span-2 space-y-10 lg:space-y-12">
        <section>
            <div className="flex items-center gap-2 mb-4">
                <BookOpen className="text-gray-400" size={20} />
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Executive Summary</h2>
            </div>
            <div className="text-gray-600 leading-7 space-y-4 text-sm sm:text-[15px]">
                <p>
                    The <strong>Stock Data Pipeline</strong> is a robust, automated ETL (Extract, Transform, Load) system designed to process high-frequency financial market data. It serves as the backbone for our quantitative analysis engine, ensuring that downstream applications receive clean, validated, and normalized data with sub-second latency overhead.
                </p>
                <p>
                    Built on top of Airflow and PostgreSQL, the system prioritizes data integrity and fault tolerance. In the event of an API failure from the primary provider (AlphaVantage), the system automatically attempts failover routines or pauses ingestion until stability is restored.
                </p>
            </div>
        </section>

        <section>
            <div className="flex items-center gap-2 mb-4">
                <Server className="text-gray-400" size={20} />
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Architecture & Components</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-blue-600 font-bold text-xs">01</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Ingestion Layer</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Handles connection pooling and rate limiting for the AlphaVantage API. Implements exponential backoff for 429 errors.
                    </p>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-amber-600 font-bold text-xs">02</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Orchestration</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Apache Airflow manages DAG dependencies. The primary `stock_daily_etl` DAG triggers at 16:30 EST.
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mb-3">
                            <span className="text-purple-600 font-bold text-xs">03</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Transformation</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Pandas/NumPy based cleaning services running in stateless Docker containers. Calculates SMA, EMA, and RSI.
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
                            <span className="text-emerald-600 font-bold text-xs">04</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Storage</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        TimescaleDB (PostgreSQL extension) for efficient time-series partitioning and compression.
                    </p>
                </div>
            </div>
        </section>

        <section>
            <div className="flex items-center gap-2 mb-4">
                <Database className="text-gray-400" size={20} />
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Data Dictionary</h2>
            </div>
            <Card className="overflow-hidden bg-white shadow-sm" noPadding>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Field Name</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Data Type</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider text-xs">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[
                                { name: 'symbol', type: 'VARCHAR(10)', desc: 'Unique stock ticker identifier (e.g. AAPL)' },
                                { name: 'market_date', type: 'DATE', desc: 'Date of the trading session (YYYY-MM-DD)' },
                                { name: 'adj_close', type: 'DECIMAL(10,2)', desc: 'Closing price adjusted for splits and dividends' },
                                { name: 'volume', type: 'BIGINT', desc: 'Total number of shares traded' },
                                { name: 'ingested_at', type: 'TIMESTAMP', desc: 'UTC timestamp of record creation' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-3 font-mono text-gray-900 font-medium text-xs">{row.name}</td>
                                    <td className="px-6 py-3 text-blue-600 font-mono text-xs">{row.type}</td>
                                    <td className="px-6 py-3 text-gray-600 leading-snug min-w-[200px]">{row.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </section>
    </div>

    {/* Sidebar Navigation for Docs */}
    <div className="hidden lg:block">
        <div className="sticky top-24">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">On this page</h3>
            <ul className="space-y-3 text-sm border-l border-gray-200">
                <li><a href="#" className="block pl-4 text-gray-900 font-medium border-l-2 border-gray-900 -ml-[1px]">Overview</a></li>
                <li><a href="#" className="block pl-4 text-gray-500 hover:text-gray-900 transition-colors">Architecture</a></li>
                <li><a href="#" className="block pl-4 text-gray-500 hover:text-gray-900 transition-colors">Data Dictionary</a></li>
                <li><a href="#" className="block pl-4 text-gray-500 hover:text-gray-900 transition-colors">API Reference</a></li>
            </ul>
            
            <div className="mt-8 p-4 bg-gray-900 rounded-xl text-white">
                <div className="flex items-center gap-2 mb-2">
                    <Code size={16} />
                    <span className="font-semibold text-sm">Need help?</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">
                    Check out the repository README for setup instructions or contact the Data Engineering team.
                </p>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors">
                    View Repository
                </button>
            </div>
        </div>
    </div>
  </div>
);

const ImplementationGuide: React.FC = () => (
    <div className="max-w-3xl animate-fade-in">
        <div className="mb-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
            <h3 className="text-blue-900 font-semibold mb-2 flex items-center gap-2">
                <Info size={18} />
                Beginner's Guide
            </h3>
            <p className="text-blue-800 text-sm leading-relaxed">
                This manual walks you through building a production-grade data pipeline from scratch using Docker, Airflow, and PostgreSQL. No prior experience is required, but a basic understanding of Python is helpful.
            </p>
        </div>

        <Step number="01" title="Prerequisites & Setup">
            <p>Before we write code, we need to set up our environment. We will use <strong>Docker</strong> to containerize our database and scheduler. This ensures the project runs exactly the same on your machine as it does in production.</p>
            
            <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-sm">
                    <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Install <strong>Docker Desktop</strong> for your OS (Windows/Mac/Linux).</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                    <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Install <strong>VS Code</strong> or your preferred code editor.</span>
                </li>
            </ul>

            <p className="text-sm font-medium text-gray-900">Create your project folder:</p>
            <CodeBlock title="Terminal" language="BASH">
{`mkdir stock-pipeline
cd stock-pipeline
mkdir dags plugins logs`}
            </CodeBlock>
        </Step>

        <Step number="02" title="Define Infrastructure (Docker Compose)">
            <p>We will define our services in a <code>docker-compose.yaml</code> file. This file tells Docker to spin up a <strong>PostgreSQL</strong> database and an <strong>Airflow</strong> instance.</p>
            <p className="text-sm text-gray-500">Create a file named <code>docker-compose.yaml</code> in your root folder:</p>
            
            <CodeBlock title="docker-compose.yaml" language="YAML">
{`version: '3'
services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_USER=airflow
      - POSTGRES_PASSWORD=airflow
      - POSTGRES_DB=stock_data
    ports:
      - "5432:5432"

  airflow:
    image: apache/airflow:2.7.1
    environment:
      - AIRFLOW__CORE__EXECUTOR=LocalExecutor
      - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres/stock_data
      - AIRFLOW__CORE__LOAD_EXAMPLES=False
    volumes:
      - ./dags:/opt/airflow/dags
      - ./logs:/opt/airflow/logs
    ports:
      - "8080:8080"
    command: standalone`}
            </CodeBlock>
            
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-800">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <p><strong>Note:</strong> In a real production environment, you would use separate containers for the Scheduler, Webserver, and Worker. We are using `standalone` mode here for simplicity.</p>
            </div>
        </Step>

        <Step number="03" title="The ETL Script (Python)">
            <p>Now we write the logic to fetch data from AlphaVantage (Extract), clean it (Transform), and save it to Postgres (Load).</p>
            <p className="text-sm text-gray-500">Create <code>dags/stock_etl.py</code>:</p>

            <CodeBlock title="dags/stock_etl.py" language="PYTHON">
{`import requests
import psycopg2
from airflow.decorators import dag, task
from datetime import datetime

@dag(
    schedule="@daily", 
    start_date=datetime(2023, 1, 1), 
    catchup=False
)
def stock_pipeline():

    @task
    def create_table():
        # Connect to the Postgres container
        conn = psycopg2.connect(
            "host=postgres dbname=stock_data user=airflow password=airflow"
        )
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS stock_prices (
                symbol VARCHAR(10),
                date DATE,
                close DECIMAL(10,2),
                PRIMARY KEY (symbol, date)
            );
        """)
        conn.commit()
        conn.close()

    @task
    def fetch_and_load():
        # Fetch data from API (Using a mock URL for demo)
        url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo"
        r = requests.get(url)
        data = r.json()['Time Series (Daily)']

        conn = psycopg2.connect(
            "host=postgres dbname=stock_data user=airflow password=airflow"
        )
        cur = conn.cursor()
        
        for date, values in data.items():
            close_price = values['4. close']
            # Upsert data to avoid duplicates
            cur.execute("""
                INSERT INTO stock_prices (symbol, date, close)
                VALUES (%s, %s, %s)
                ON CONFLICT (symbol, date) DO NOTHING;
            """, ('IBM', date, close_price))
            
        conn.commit()
        conn.close()

    create_table() >> fetch_and_load()

stock_pipeline()`}
            </CodeBlock>
            
            <div className="bg-gray-50 border-l-4 border-gray-900 p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-900 text-sm mb-1">What is happening here?</h4>
                <p className="text-gray-600 text-sm">
                    We define an Airflow DAG that runs daily. The `create_table` task ensures our storage exists. The `fetch_and_load` task hits the API, parses the JSON response, and inserts rows into PostgreSQL.
                </p>
            </div>
        </Step>

        <Step number="04" title="Running the Pipeline">
            <p>Everything is set! Let's spin up the containers and watch the magic happen.</p>
            
            <CodeBlock title="Terminal" language="BASH">
{`docker-compose up`}
            </CodeBlock>

            <p className="mt-4">Once the logs stop scrolling wildly:</p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mt-2">
                <li>Open your browser to <code>http://localhost:8080</code>.</li>
                <li>Login with username <strong>admin</strong> and the password printed in the terminal logs.</li>
                <li>Find <code>stock_pipeline</code> in the DAGs list and toggle it <strong>ON</strong>.</li>
                <li>Click the "Play" button to trigger a manual run.</li>
            </ol>
        </Step>
        
        <div className="mt-12 p-8 bg-gray-900 rounded-2xl text-center">
            <h4 className="text-white text-xl font-bold mb-2">Data Pipeline Deployment Complete! 🎉</h4>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto text-sm sm:text-base">
                You have successfully built and deployed a containerized data pipeline. You now have a system that automatically wakes up, fetches financial data, and stores it safely every single day.
            </p>
        </div>
    </div>
);

export const DocumentationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'specs' | 'guide'>('specs');

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fade-in pb-20">
      <div className="border-b border-gray-200 pb-1">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4 sm:mb-6">Documentation</h1>
        <div className="flex gap-6 sm:gap-8 overflow-x-auto">
           <button 
             onClick={() => setActiveTab('specs')}
             className={`pb-3 text-sm font-medium transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                 activeTab === 'specs' 
                 ? 'border-gray-900 text-gray-900' 
                 : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
             }`}
           >
             <Layers size={16} />
             System Architecture
           </button>
           <button 
             onClick={() => setActiveTab('guide')}
             className={`pb-3 text-sm font-medium transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                 activeTab === 'guide' 
                 ? 'border-gray-900 text-gray-900' 
                 : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
             }`}
           >
             <Terminal size={16} />
             Implementation Guide
             <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1">NEW</span>
           </button>
        </div>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'specs' ? <SystemSpecs /> : <ImplementationGuide />}
      </div>
    </div>
  );
};