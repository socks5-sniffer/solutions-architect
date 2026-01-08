
export enum View {
  DASHBOARD = 'DASHBOARD',
  SECURITY = 'SECURITY',
  COMPLIANCE = 'COMPLIANCE',
  KB = 'KB',
  AI_ADVISOR = 'AI_ADVISOR'
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'critical';
  service: string;
  message: string;
}

export interface Skill {
  name: string;
  proficiency: number;
  category: 'frontend' | 'backend' | 'devsecops' | 'security';
  description: string;
}

export interface KnowledgeEntry {
  id: string;
  title: string;
  tags: string[];
  summary: string;
  content: string;
}
