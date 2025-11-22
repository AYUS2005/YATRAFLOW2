// src/lib/dynamicgenerator.ts
import { Report } from './types';
import { getReports, updateReportsStorage } from './storage';

// Interval ID for cleanup
let generationInterval: NodeJS.Timeout | null = null;

// Random helper functions
const randomFromArray = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const severityLevels: Report['severity'][] = ['low', 'medium', 'high', 'critical'];
const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D'];
const statuses: Report['status'][] = ['active', 'resolved'];

/**
 * Start automatic report generation.
 * @param callback Function to update state in React.
 * @param intervalMs Interval in milliseconds (default 2000)
 * @returns intervalId
 */
export function startAutoGeneration(callback: (reports: Report[]) => void, intervalMs = 2000) {
  generationInterval = setInterval(() => {
    const newReports: Report[] = [];

    // Generate 2-3 accidents
    const accidentCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
    for (let i = 0; i < accidentCount; i++) {
      newReports.push({
        id: Date.now().toString() + i,
        zone: randomFromArray(zones),
        locationName: `Location ${Math.floor(Math.random() * 100)}`,
        type: 'accident',
        severity: randomFromArray(severityLevels),
        description: 'Auto-generated accident report',
        reportedAt: new Date().toISOString(),
        status: randomFromArray(statuses),
      });
    }

    // Generate 1 hazard
    newReports.push({
      id: (Date.now() + 99).toString(),
      zone: randomFromArray(zones),
      locationName: `Location ${Math.floor(Math.random() * 100)}`,
      type: 'hazard',
      severity: randomFromArray(severityLevels),
      description: 'Auto-generated hazard report',
      reportedAt: new Date().toISOString(),
      status: randomFromArray(statuses),
    });

    const currentReports = getReports();
    const updatedReports = [...newReports, ...currentReports];

    // Update storage
    updateReportsStorage(updatedReports);

    // Trigger callback to update React state
    callback(updatedReports);

    // Optional: dispatch a custom event for other listeners
    window.dispatchEvent(new Event('reportsUpdated'));
  }, intervalMs);

  return generationInterval;
}

/** Stop automatic report generation */
export function stopAutoGeneration(intervalId?: NodeJS.Timeout) {
  if (intervalId) {
    clearInterval(intervalId);
  } else if (generationInterval) {
    clearInterval(generationInterval);
    generationInterval = null;
  }
}
