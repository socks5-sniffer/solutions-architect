
import React, { useState } from 'react';
import { Search, Tag, ExternalLink } from 'lucide-react';
import { KnowledgeEntry } from '../types';

const KnowledgeBase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const entries: KnowledgeEntry[] = [
    {
      id: '1',
      title: 'DevSecOps in OpenShift',
      tags: ['OpenShift', 'Security', 'CI/CD'],
      summary: 'Implementing automated security gating within the Tekton pipeline architecture.',
      content: 'Integrating static code analysis (SAST) and dynamic analysis (DAST) into the build process...'
    },
    {
      id: '2',
      title: 'Zero Trust Network Policies',
      tags: ['Networking', 'K8s', 'Security'],
      summary: 'Configuring default-deny ingress and egress rules to prevent lateral threat movement.',
      content: 'Using NetworkPolicy resources to isolate namespaces and secure pod-to-pod communication...'
    },
    {
      id: '3',
      title: 'Managing Secret Objects',
      tags: ['Security', 'Configuration'],
      summary: 'Best practices for handling sensitive data using SealedSecrets or HashiCorp Vault.',
      content: 'Avoiding plain-text secrets in Git repositories by using encrypted storage providers...'
    },
    {
      id: '4',
      title: 'RHEL Hardening Standards',
      tags: ['RHEL', 'OS', 'Security'],
      summary: 'STIG-compliant OS configurations for enterprise-grade security.',
      content: 'Implementing SELinux mandatory access control and minimizing attack surfaces on the host OS...'
    }
  ];

  const filtered = entries.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search knowledge base (e.g., 'OpenShift', 'NIST')..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded focus:ring-rh-red focus:border-rh-red outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['OpenShift', 'Security', 'K8s'].map(tag => (
            <button 
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-xs font-bold transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(entry => (
          <article key={entry.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-rh-red transition-all group">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-black text-gray-900 group-hover:text-rh-red transition-colors">{entry.title}</h3>
              <ExternalLink size={16} className="text-gray-300 group-hover:text-rh-red" />
            </div>
            <p className="text-gray-600 text-sm mb-4">{entry.summary}</p>
            <div className="flex flex-wrap gap-2">
              {entry.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-[10px] uppercase font-black text-gray-400 border border-gray-200 px-2 py-0.5 rounded">
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No entries found matching "{searchTerm}"</p>
          <button onClick={() => setSearchTerm('')} className="mt-2 text-rh-red font-bold underline">Clear filters</button>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;
