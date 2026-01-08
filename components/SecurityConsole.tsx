
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Search, Terminal, Filter, RefreshCw } from 'lucide-react';
import { SecurityEvent } from '../types';

const SecurityConsole: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [events, setEvents] = useState<SecurityEvent[]>([
    { id: '1', timestamp: '2024-05-15 14:22:01', level: 'warning', service: 'Auth-Gateway', message: 'Brute force attempt detected from 192.168.1.42' },
    { id: '2', timestamp: '2024-05-15 14:20:15', level: 'info', service: 'Kube-API', message: 'RBAC Policy updated for ServiceAccount: dev-bot' },
    { id: '3', timestamp: '2024-05-15 14:15:33', level: 'critical', service: 'Ingress-Controller', message: 'TLS Handshake failure: Expired certificate detected in namespace: production' },
    { id: '4', timestamp: '2024-05-15 14:10:02', level: 'info', service: 'Logging-Stack', message: 'Log rotation completed successfully' },
  ]);

  const runScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const newEvent: SecurityEvent = {
        id: Math.random().toString(),
        timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
        level: 'info',
        service: 'Sec-Scanner',
        message: 'Full cluster scan completed. 0 vulnerabilities found.'
      };
      setEvents([newEvent, ...events]);
      setIsScanning(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Security Command Center</h1>
          <p className="text-gray-500">Real-time monitoring of cluster-wide security events and pod health.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={runScan}
            disabled={isScanning}
            className={`flex items-center gap-2 px-4 py-2 bg-rh-red text-white font-bold rounded shadow-md hover:bg-red-700 transition-colors ${isScanning && 'opacity-70 cursor-not-allowed'}`}
          >
            {isScanning ? <RefreshCw className="animate-spin" size={18} /> : <ShieldAlert size={18} />}
            {isScanning ? 'Scanning Cluster...' : 'Initiate Security Scan'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters/Summary */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Filter size={16} /> Filters
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-rh-red focus:ring-rh-red" defaultChecked />
                Critical Events
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-rh-red focus:ring-rh-red" defaultChecked />
                Warnings
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-rh-red focus:ring-rh-red" />
                Info Logs
              </label>
            </div>
          </div>

          <div className="bg-rh-charcoal p-4 rounded text-white shadow-lg">
            <h3 className="font-bold mb-3">Threat Exposure</h3>
            <div className="text-3xl font-black text-rh-red mb-1">Low</div>
            <p className="text-xs text-gray-400">Last updated: 2 mins ago</p>
          </div>
        </div>

        {/* Event Logs */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
              <Terminal size={18} className="text-gray-400" />
              <span className="font-bold text-gray-700 text-sm">Security Log Stream</span>
            </div>
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {events.map((event) => (
                <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors flex gap-4">
                  <div className={`shrink-0 w-2 h-2 rounded-full mt-2 ${
                    event.level === 'critical' ? 'bg-rh-red' : 
                    event.level === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-bold font-mono text-gray-400">{event.timestamp}</span>
                      <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                        event.level === 'critical' ? 'bg-red-100 text-red-700' : 
                        event.level === 'warning' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {event.level}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-gray-800 bg-gray-100 px-1 rounded">[{event.service}]</span>
                      <p className="text-sm text-gray-700">{event.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityConsole;
