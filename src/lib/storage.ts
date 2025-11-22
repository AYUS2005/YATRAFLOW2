import { Report } from './types';
import { generateFakeReports } from './fakedata';

// ------------------- Reports -------------------
let reports: Report[] = generateFakeReports(50); // initial fake reports

// Get all reports
export const getReports = (): Report[] => reports;

// Add a new report
export const addReport = (report: Report): void => {
  reports.push(report);
  window.dispatchEvent(new Event('reportsUpdated'));
};

// Update storage completely
export const updateReportsStorage = (newReports: Report[]): void => {
  reports = newReports;
  window.dispatchEvent(new Event('reportsUpdated'));
};

// Update a single report
export const updateReport = (updatedReport: Report): void => {
  reports = reports.map(r => (r.id === updatedReport.id ? updatedReport : r));
  window.dispatchEvent(new Event('reportsUpdated'));
};

// Delete a report by id
export const deleteReport = (id: string): void => {
  reports = reports.filter(r => r.id !== id);
  window.dispatchEvent(new Event('reportsUpdated'));
};

// Initialize storage (optional, used in Dashboard)
export const initializeStorage = (): void => {
  if (!reports.length) {
    reports = generateFakeReports(50);
  }
};

// ------------------- Auth -------------------
let authState: { user?: any } = {};

export const getAuthState = () => authState;
export const setAuthState = (state: { user?: any }) => { authState = state; };
export const clearAuth = () => { authState = {}; };

// ------------------- Theme -------------------
let theme: 'light' | 'dark' = 'light';

export const getTheme = () => theme;
export const setTheme = (newTheme: 'light' | 'dark') => { theme = newTheme; };
