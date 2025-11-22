import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Report } from '@/lib/types';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartsSectionProps {
  reports: Report[];
}

export const ChartsSection = ({ reports }: ChartsSectionProps) => {
  // Type Distribution Data
  const typeData = [
    { name: 'Accidents', value: reports.filter(r => r.type === 'accident').length },
    { name: 'Hazards', value: reports.filter(r => r.type === 'hazard').length },
  ];

  // Severity Distribution Data
  const severityData = [
    { name: 'Low', count: reports.filter(r => r.severity === 'low').length },
    { name: 'Medium', count: reports.filter(r => r.severity === 'medium').length },
    { name: 'High', count: reports.filter(r => r.severity === 'high').length },
    { name: 'Critical', count: reports.filter(r => r.severity === 'critical').length },
  ];

  // Zone-wise Distribution
  const zones = [...new Set(reports.map(r => r.zone))];
  const zoneData = zones.map(zone => ({
    name: zone,
    count: reports.filter(r => r.zone === zone).length,
  }));

  // Trend Over Time (Last 7 Days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const trendData = last7Days.map(date => {
    const dayReports = reports.filter(r => {
      const reportDate = new Date(r.reportedAt).toISOString().split('T')[0];
      return reportDate === date;
    });
    
    return {
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      accidents: dayReports.filter(r => r.type === 'accident').length,
      hazards: dayReports.filter(r => r.type === 'hazard').length,
      total: dayReports.length,
    };
  });

  const COLORS = {
    accidents: 'hsl(var(--destructive))',
    hazards: 'hsl(var(--warning))',
    low: 'hsl(var(--success))',
    medium: 'hsl(var(--warning))',
    high: 'hsl(var(--accent))',
    critical: 'hsl(var(--destructive))',
    primary: 'hsl(var(--primary))',
  };

  const PIE_COLORS = [COLORS.accidents, COLORS.hazards];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Type Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Severity Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Severity Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={severityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Bar dataKey="count" fill={COLORS.primary} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Zone-wise Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Zone-wise Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={zoneData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Bar dataKey="count" fill={COLORS.primary} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Trend Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              <Legend />
              <Line type="monotone" dataKey="accidents" stroke={COLORS.accidents} strokeWidth={2} />
              <Line type="monotone" dataKey="hazards" stroke={COLORS.hazards} strokeWidth={2} />
              <Line type="monotone" dataKey="total" stroke={COLORS.primary} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
