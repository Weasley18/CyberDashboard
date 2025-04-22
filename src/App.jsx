import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ShieldAlert, Network, Target, FileText, AlertTriangle, BarChart2, Settings, User, LogOut, Bell, CheckCircle, XCircle, Clock } from 'lucide-react';

// Mock Data (Replace with actual data from your backend)
const networkTrafficData = [
  { name: 'Mon', sent: 4000, received: 2400 },
  { name: 'Tue', sent: 3000, received: 1398 },
  { name: 'Wed', sent: 2000, received: 9800 },
  { name: 'Thu', sent: 2780, received: 3908 },
  { name: 'Fri', sent: 1890, received: 4800 },
  { name: 'Sat', sent: 2390, received: 3800 },
  { name: 'Sun', sent: 3490, received: 4300 },
];

const intrusionAlertsData = [
  { name: '00:00', failedLogins: 5, firewallBlocks: 2 },
  { name: '04:00', failedLogins: 12, firewallBlocks: 8 },
  { name: '08:00', failedLogins: 8, firewallBlocks: 5 },
  { name: '12:00', failedLogins: 15, firewallBlocks: 10 },
  { name: '16:00', failedLogins: 7, firewallBlocks: 3 },
  { name: '20:00', failedLogins: 20, firewallBlocks: 15 },
];

const vulnerabilityData = [
  { name: 'Critical', value: 15, fill: '#dc2626' }, // red-600
  { name: 'High', value: 45, fill: '#f97316' },     // orange-500
  { name: 'Medium', value: 80, fill: '#facc15' },   // yellow-400
  { name: 'Low', value: 120, fill: '#22c55e' },    // green-500
];

const systemLogsData = [
  { time: '14:32:10', user: 'admin', action: 'File Access', status: 'Success', icon: <CheckCircle className="text-green-500" size={16} /> },
  { time: '14:30:05', user: 'j.doe', action: 'Login Attempt', status: 'Failed', icon: <XCircle className="text-red-500" size={16} /> },
  { time: '14:28:55', user: 'system', action: 'Service Start', status: 'Success', icon: <CheckCircle className="text-green-500" size={16} /> },
  { time: '14:25:11', user: 'api_user', action: 'Data Export', status: 'Success', icon: <CheckCircle className="text-green-500" size={16} /> },
  { time: '14:22:01', user: 'guest', action: 'Access Denied', status: 'Denied', icon: <XCircle className="text-yellow-500" size={16} /> },
];

const threatIntelData = [
    { ip: '198.51.100.12', reputation: 'Malicious', reason: 'Scanning Host', timestamp: '2025-04-22 14:15', icon: <AlertTriangle className="text-red-500" size={16}/> },
    { ip: '203.0.113.5', reputation: 'Suspicious', reason: 'TOR Exit Node', timestamp: '2025-04-22 13:55', icon: <AlertTriangle className="text-yellow-500" size={16}/> },
    { ip: '192.0.2.88', reputation: 'Clean', reason: '-', timestamp: '2025-04-22 13:40', icon: <CheckCircle className="text-green-500" size={16}/> },
];

const complianceData = [
    { name: 'OS Patches', value: 74, fill: '#3b82f6' }, // blue-500
    { name: 'AV Definitions', value: 85, fill: '#10b981' }, // emerald-500
    { name: 'AV Service Running', value: 70, fill: '#6366f1' }, // indigo-500
    { name: 'Supported OS', value: 49, fill: '#f97316' }, // orange-500
    { name: 'Services', value: 24, fill: '#ec4899' }, // pink-500
    { name: 'Installed Software', value: 41, fill: '#a855f7' }, // purple-500
];

// --- Components ---

// Sidebar Navigation
const Sidebar = ({ setActiveView }) => {
  const menuItems = [
    { name: 'Dashboard', icon: BarChart2, view: 'dashboard' },
    { name: 'Network Traffic', icon: Network, view: 'network' },
    { name: 'Intrusion Alerts', icon: ShieldAlert, view: 'intrusion' },
    { name: 'Vulnerabilities', icon: Target, view: 'vulnerabilities' },
    { name: 'System Logs', icon: FileText, view: 'logs' },
    { name: 'Threat Intelligence', icon: AlertTriangle, view: 'threats' },
    { name: 'Settings', icon: Settings, view: 'settings' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-gray-200 flex flex-col min-h-screen p-4 fixed h-full">
      <div className="text-2xl font-bold mb-10 text-white flex items-center">
        <ShieldAlert className="mr-2 text-blue-400" /> CyberDash
      </div>
      <nav className="flex-grow">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-4">
              <button
                onClick={() => setActiveView(item.view)}
                className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out"
              >
                <item.icon className="mr-3" size={20} />
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto border-t border-gray-700 pt-4">
         <button className="flex items-center w-full py-2 px-3 rounded hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out">
            <LogOut className="mr-3" size={20} />
            Logout
         </button>
      </div>
    </div>
  );
};

// Header Bar
const Header = () => {
  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">Project Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="relative text-gray-600 hover:text-gray-800 focus:outline-none">
          <Bell size={24} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
        <div className="flex items-center">
           <img
             src="https://placehold.co/40x40/E2E8F0/4A5568?text=U" // Placeholder for user avatar
             alt="User Avatar"
             className="w-8 h-8 rounded-full mr-2"
             onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/E2E8F0/4A5568?text=U'; }}
           />
           <span className="text-gray-700">Admin User</span>
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
const DashboardCard = ({ title, icon, children }) => {
  const IconComponent = icon;
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        {IconComponent && <IconComponent className="mr-3 text-blue-600" size={24} />}
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

// --- Dashboard Views ---

const DashboardOverview = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Example Summary Cards */}
     <DashboardCard title="Active Alerts" icon={AlertTriangle}>
        <p className="text-4xl font-bold text-red-600">12</p>
        <p className="text-sm text-gray-500 mt-1">Critical issues require attention</p>
     </DashboardCard>
     <DashboardCard title="Vulnerabilities Found" icon={Target}>
        <p className="text-4xl font-bold text-orange-500">68</p>
        <p className="text-sm text-gray-500 mt-1">Across 15 systems</p>
     </DashboardCard>
     <DashboardCard title="Network Throughput" icon={Network}>
        <p className="text-4xl font-bold text-blue-600">1.2 Gbps</p>
        <p className="text-sm text-gray-500 mt-1">Current average traffic</p>
     </DashboardCard>

    {/* Charts */}
    <div className="md:col-span-2 lg:col-span-2">
        <DashboardCard title="Intrusion Attempts (Last 24h)" icon={ShieldAlert}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={intrusionAlertsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="failedLogins" stroke="#ef4444" name="Failed Logins" />
              <Line type="monotone" dataKey="firewallBlocks" stroke="#f97316" name="Firewall Blocks" />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>
    </div>
     <div>
        <DashboardCard title="Vulnerability Severity" icon={Target}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={vulnerabilityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {vulnerabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </DashboardCard>
     </div>
     <div className="lg:col-span-3">
        <DashboardCard title="Recent System Events" icon={FileText}>
            <LogTable data={systemLogsData.slice(0, 5)} /> {/* Show first 5 */}
        </DashboardCard>
     </div>
  </div>
);

const NetworkTrafficView = () => (
    <DashboardCard title="Network Traffic Analysis" icon={Network}>
      <p className="text-sm text-gray-600 mb-4">Packets Sent vs Received (Mock Data)</p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={networkTrafficData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sent" fill="#3b82f6" name="Packets Sent" />
          <Bar dataKey="received" fill="#10b981" name="Packets Received" />
        </BarChart>
      </ResponsiveContainer>
      {/* Add Protocol Distribution Chart Here */}
    </DashboardCard>
);

const IntrusionDetectionView = () => (
    <DashboardCard title="Intrusion Detection Alerts" icon={ShieldAlert}>
        <p className="text-sm text-gray-600 mb-4">Failed Logins and Firewall Blocks (Mock Data)</p>
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={intrusionAlertsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="failedLogins" stroke="#ef4444" name="Failed Logins" />
              <Line type="monotone" dataKey="firewallBlocks" stroke="#f97316" name="Firewall Blocks" />
            </LineChart>
        </ResponsiveContainer>
        {/* Add Table for detailed alerts here */}
    </DashboardCard>
);

const VulnerabilityMonitoringView = () => (
    <DashboardCard title="Vulnerability Monitoring" icon={Target}>
        <p className="text-sm text-gray-600 mb-4">Open Ports and CVE Tracking (Mock Data)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 className="font-semibold mb-2 text-gray-700">Vulnerability Severity Distribution</h4>
                 <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={vulnerabilityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {vulnerabilityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
            </div>
             <div>
                 <h4 className="font-semibold mb-2 text-gray-700">Risk & Compliance Overview</h4>
                 <ResponsiveContainer width="100%" height={300}>
                    <BarChart layout="vertical" data={complianceData} margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} unit="%"/>
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} unit="%"/>
                    </BarChart>
                 </ResponsiveContainer>
             </div>
        </div>
         {/* Add Table for specific CVEs/Open Ports here */}
         <div className="mt-6">
            <h4 className="font-semibold mb-2 text-gray-700">Tracked CVEs (Placeholder)</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
                <li>CVE-2025-XXXX - Critical - Apache Server</li>
                <li>CVE-2025-YYYY - High - OpenSSL Library</li>
                <li>CVE-2025-ZZZZ - Medium - Kernel Module</li>
            </ul>
         </div>
    </DashboardCard>
);

// Generic Log Table Component
const LogTable = ({ data }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((log, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    <Clock size={16} className="mr-2 text-gray-400"/> {log.timestamp || log.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.ip && `IP: ${log.ip} - `}
                    {log.user && `User: ${log.user} - `}
                    {log.action || log.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="flex items-center">
                    {log.icon}
                    <span className="ml-2">{log.status || log.reputation}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
);


const SystemLogsView = () => (
    <DashboardCard title="System Logs & Events" icon={FileText}>
        <p className="text-sm text-gray-600 mb-4">Displaying recent system activities (Mock Data)</p>
        <LogTable data={systemLogsData} />
        {/* Add filtering and pagination controls here */}
    </DashboardCard>
);

const ThreatIntelligenceView = () => (
    <DashboardCard title="Threat Intelligence Feed" icon={AlertTriangle}>
        <p className="text-sm text-gray-600 mb-4">IP Reputation and Suspicious Activity (Mock Data from VirusTotal/Shodan/AbuseIPDB)</p>
        <LogTable data={threatIntelData} />
        {/* Add filtering and search capabilities here */}
    </DashboardCard>
);

const SettingsView = () => (
    <DashboardCard title="Settings" icon={Settings}>
        <p className="text-sm text-gray-600 mb-4">Configure dashboard settings, API keys, and user management.</p>
        {/* Add forms for settings here */}
        <div className="space-y-4">
            <div>
                <label htmlFor="vt-api" className="block text-sm font-medium text-gray-700">VirusTotal API Key</label>
                <input type="password" id="vt-api" name="vt-api" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="********"/>
            </div>
             <div>
                <label htmlFor="shodan-api" className="block text-sm font-medium text-gray-700">Shodan API Key</label>
                <input type="password" id="shodan-api" name="shodan-api" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="********"/>
            </div>
            <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">Notification Settings</h4>
                <div className="flex items-center">
                    <input id="email-alerts" name="email-alerts" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <label htmlFor="email-alerts" className="ml-2 block text-sm text-gray-900">Enable Email Alerts for Critical Issues</label>
                </div>
            </div>
             <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Save Settings
             </button>
        </div>
    </DashboardCard>
);


// Main App Component
export default function App() {
  const [activeView, setActiveView] = useState('dashboard'); // Default view

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'network':
        return <NetworkTrafficView />;
      case 'intrusion':
        return <IntrusionDetectionView />;
      case 'vulnerabilities':
        return <VulnerabilityMonitoringView />;
      case 'logs':
        return <SystemLogsView />;
      case 'threats':
        return <ThreatIntelligenceView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col ml-64"> {/* Adjust margin-left to match sidebar width */}
        <Header />
        <main className="flex-1 p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
