
import React from 'react';
import { CheckCircle2, AlertCircle, Lock, Server, FileText } from 'lucide-react';

const ComplianceVault: React.FC = () => {
  const complianceItems = [
    { standard: 'SOC 2 Type II', status: 'Compliant', lastAudit: '2024-01-10', score: 100 },
    { standard: 'HIPAA Security Rule', status: 'Partially Compliant', lastAudit: '2024-03-22', score: 85 },
    { standard: 'NIST 800-53', status: 'Compliant', lastAudit: '2023-12-15', score: 92 },
    { standard: 'PCI DSS v4.0', status: 'In Progress', lastAudit: 'N/A', score: 45 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-dark to-[#2a2d30] p-8 rounded-xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-black mb-4">Enterprise Compliance & Regulatory Vault</h1>
          <p className="text-gray-300 text-lg mb-6">
            Ensuring all deployed microservices adhere to global security protocols and zero-trust architecture.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-white text-dark font-bold rounded hover:bg-gray-100 transition-colors flex items-center gap-2">
              <FileText size={18} /> Download Audit Reports
            </button>
            <button className="px-6 py-2 border border-gray-500 text-white font-bold rounded hover:bg-white hover:text-dark transition-all">
              Schedule Review
            </button>
          </div>
        </div>
        <Lock className="absolute right-[-20px] top-[-20px] text-primary opacity-10" size={300} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complianceItems.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded ${item.status === 'Compliant' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {item.status === 'Compliant' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                </div>
                <div>
                  <h3 className="font-black text-gray-800 text-lg">{item.standard}</h3>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">{item.status}</p>
                </div>
              </div>
              <span className="text-2xl font-black text-dark">{item.score}%</span>
            </div>
            
            <div className="w-full bg-gray-100 h-2 rounded-full mb-6">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${item.score > 90 ? 'bg-green-500' : 'bg-yellow-500'}`} 
                style={{ width: `${item.score}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-500 border-t pt-4">
              <div className="flex items-center gap-1">
                <Server size={14} /> Nodes covered: 14/14
              </div>
              <span>Last Audit: {item.lastAudit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded shadow-sm">
        <h3 className="text-blue-800 font-bold mb-2 flex items-center gap-2">
          <AlertCircle size={18} /> Compliance Recommendation
        </h3>
        <p className="text-blue-700 text-sm">
          Detected unencrypted data at rest in the 'legacy-reports' PVC. 
          Recommendation: Apply OpenShift Container Storage (OCS) encryption policies immediately to satisfy HIPAA requirement 164.312(a)(2)(iv).
        </p>
      </div>
    </div>
  );
};

export default ComplianceVault;
