import { Report } from './types';
import { generateFakeReports } from './fakedata';

// ========================= REPORTS =========================
let reports: Report[] = generateFakeReports(50);

export const getReports = (): Report[] => reports;

export const addReport = (report: Report): void => {
  reports.push(report);
  window.dispatchEvent(new Event('reportsUpdated'));
};

export const updateReportsStorage = (newReports: Report[]): void => {
  reports = newReports;
  window.dispatchEvent(new Event('reportsUpdated'));
};

export const updateReport = (updatedReport: Report): void => {
  reports = reports.map(r => (r.id === updatedReport.id ? updatedReport : r));
  window.dispatchEvent(new Event('reportsUpdated'));
};

export const deleteReport = (id: string): void => {
  reports = reports.filter(r => r.id !== id);
  window.dispatchEvent(new Event('reportsUpdated'));
};

export const initializeStorage = (): void => {
  if (!reports.length) {
    reports = generateFakeReports(50);
  }
};

// ========================= AUTH USERS =========================
export type AppUser = {
  id: string;
  name: string;
  email: string;
  password: string; 
  role: "admin" | "user";
  createdAt: string;
};

const USERS_KEY = "yatra_users_v1";
const AUTH_KEY = "yatra_auth_v1";

// -------- USERS --------
export const getUsers = (): AppUser[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as AppUser[]) : [];
  } catch {
    return [];
  }
};

export const saveUsers = (users: AppUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email: string) => {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const addUser = (user: AppUser) => {
  const users = getUsers();
  users.unshift(user);
  saveUsers(users);
};

// ========================= AUTH STATE (MATCHING AUTHCONTEXT) =========================

// ✔ AuthContext.tsx expects: saveAuthState()
export const saveAuthState = (state: { user: AppUser; isAuthenticated: boolean }) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(state));
};

// ✔ AuthContext.tsx expects: getAuthState()
export const getAuthState = (): { user: AppUser; isAuthenticated: boolean } | null => {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// ✔ AuthContext.tsx expects: clearAuthState()
export const clearAuthState = () => {
  localStorage.removeItem(AUTH_KEY);
};

// ========================= THEME =========================
let theme: "light" | "dark" = "light";

export const getTheme = () => theme;

export const setTheme = (newTheme: "light" | "dark") => {
  theme = newTheme;
};
