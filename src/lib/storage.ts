import { Report, User, AuthState } from './types';
import { sampleReports } from './sampleData';

const STORAGE_KEYS = {
  REPORTS: 'yatraflow_reports',
  AUTH: 'yatraflow_auth',
  THEME: 'yatraflow_theme',
};

// Initialize storage with sample data if empty
export const initializeStorage = () => {
  const existingReports = localStorage.getItem(STORAGE_KEYS.REPORTS);
  if (!existingReports) {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(sampleReports));
  }
};

// Reports management
export const getReports = (): Report[] => {
  const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
  return data ? JSON.parse(data) : [];
};

export const saveReports = (reports: Report[]): void => {
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
};

export const addReport = (report: Report): void => {
  const reports = getReports();
  reports.unshift(report);
  saveReports(reports);
};

export const updateReport = (id: string, updates: Partial<Report>): void => {
  const reports = getReports();
  const index = reports.findIndex(r => r.id === id);
  if (index !== -1) {
    reports[index] = { ...reports[index], ...updates };
    saveReports(reports);
  }
};

export const deleteReport = (id: string): void => {
  const reports = getReports();
  const filtered = reports.filter(r => r.id !== id);
  saveReports(filtered);
};

// Auth management
export const getAuthState = (): AuthState => {
  const data = localStorage.getItem(STORAGE_KEYS.AUTH);
  return data ? JSON.parse(data) : { user: null, isAuthenticated: false };
};

export const setAuthState = (authState: AuthState): void => {
  localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authState));
};

export const clearAuth = (): void => {
  localStorage.removeItem(STORAGE_KEYS.AUTH);
};

// Theme management
export const getTheme = (): string => {
  return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
};

export const setTheme = (theme: string): void => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};
