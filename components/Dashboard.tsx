
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
// Fixed: Added missing ShieldCheck to the imports from lucide-react
import { Cpu, HardDrive, Network, Activity, ShieldCheck } from 'lucide-react';

const performanceData = [
  { name: '00:00', cpu: 45, mem: 60, net: 20 },
  { name: '04:00', cpu: 32, mem: 58, net: 15 },
  { name: '08:00', cpu: 65, mem: 72, net: 55 },
  { name: '12:00', cpu: 82, mem: 85, net: 90 },
  { name: '16:00', cpu: 70, mem: 78, net: 65 },
  { name: '20:00', cpu: 55, mem: 68, net: 40 },
];

const resourceDistribution = [
  { name: 'Frontend-01', pods: 12, cpu: 15 },
  { name: 'Auth-Service', pods: 4, cpu: 22 },
  { name: 'Postgres-DB', pods: 3, cpu: 45 },
  { name: 'Redis-Cache', pods: 6, cpu: 18 },
  { name: 'Security-Scan', pods: 8, cpu: 30 },
];

const StatCard: React.FC<{ icon: any, label: string, value: string, trend: string, color: string }> = ({ 
  icon: Icon, label, value, trend, color 
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg bg-opacity-10 ${color}`}>
        <Icon className={color.replace('bg-', 'text-')} size={24} />
      </div>
      <span className="text-xs font-bold text-green-600 px-2 py-1 bg-green-50 rounded">
        {trend}
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{label}</h3>
    <p className="text-2xl font-black text-gray-900">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Cpu} 
          label="Cluster CPU Usage" 
          value="64.2%" 
          trend="+2.4%" 
          color="bg-blue-600" 
        />
        <StatCard 
          icon={HardDrive} 
          label="Persistent Storage" 
          value="1.2 TB / 2 TB" 
          trend="Steady" 
          color="bg-orange-600" 
        />
        <StatCard 
          icon={Network} 
          label="Network Ingress" 
          value="482 MB/s" 
          trend="-12%" 
          color="bg-purple-600" 
        />
        <StatCard 
          icon={Activity} 
          label="Active Deployments" 
          value="24" 
          trend="+4" 
          color="bg-primary" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Cluster Performance Metrics</h3>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg p-1.5 focus:ring-primary focus:border-primary">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EE0000" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#EE0000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="cpu" stroke="#EE0000" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} />
                <Area type="monotone" dataKey="mem" stroke="#151515" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Node Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceDistribution} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" fontSize={10} width={70} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="pods" fill="#EE0000" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-dark p-6 rounded-lg shadow-lg text-white">
            <h3 className="text-md font-bold mb-3 flex items-center gap-2">
              <ShieldCheck className="text-primary" size={18} />
              Platform Security Health
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Image Vulnerability</span>
                  <span className="text-green-400">Secure</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5 rounded-full">
                  <div className="bg-green-500 h-1.5 rounded-full w-[95%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Network Isolation</span>
                  <span className="text-yellow-400">Audit Req.</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5 rounded-full">
                  <div className="bg-yellow-500 h-1.5 rounded-full w-[70%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
