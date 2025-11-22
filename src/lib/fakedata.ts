import { v4 as uuidv4 } from 'uuid';
import { Report, ReportType, SeverityLevel, ReportStatus } from './types';

const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D'];
const types: ReportType[] = ['accident', 'hazard'];
const severities: SeverityLevel[] = ['low', 'medium', 'high', 'critical'];
const statuses: ReportStatus[] = ['active', 'resolved'];

export const generateFakeReports = (count: number): Report[] => {
  const reports: Report[] = [];

  for (let i = 0; i < count; i++) {
    const zone = zones[Math.floor(Math.random() * zones.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    reports.push({
      id: uuidv4(),
      zone,
      locationName: `${zone} - Location ${i + 1}`,
      type,
      severity,
      description: `Sample report ${i + 1}`,
      reportedAt: new Date(
        Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000
      ).toISOString(),
      status,
      statusHistory: [],
    });
  }

  return reports;
};
