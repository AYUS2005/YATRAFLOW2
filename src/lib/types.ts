export type ReportType = 'accident' | 'hazard';
export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';
export type ReportStatus = 'active' | 'pending' | 'resolved';
export type UserRole = 'admin' | 'user';

export interface Report {
  id: string;
  zone: string;
  locationName: string;
  type: ReportType;
  severity: SeverityLevel;
  description: string;
  reportedAt: string;
  status: ReportStatus;
  reportedBy?: string;
  statusHistory?: StatusChange[];
}

export interface StatusChange {
  status: ReportStatus;
  timestamp: string;
  changedBy: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
