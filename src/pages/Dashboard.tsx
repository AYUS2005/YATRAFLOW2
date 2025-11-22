import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Search, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ChartsSection } from '@/components/dashboard/ChartsSection';
import { ReportsTable } from '@/components/dashboard/ReportsTable';
import { AddReportDialog } from '@/components/dashboard/AddReportDialog';
import { Report } from '@/lib/types';
import { getReports, initializeStorage } from '@/lib/storage';
import { toast } from 'sonner';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    initializeStorage();
    loadReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchQuery]);

  const loadReports = () => {
    const data = getReports();
    setReports(data);
  };

  const filterReports = () => {
    let filtered = [...reports];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(report =>
        report.locationName.toLowerCase().includes(query) ||
        report.zone.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query) ||
        report.type.toLowerCase().includes(query) ||
        report.severity.toLowerCase().includes(query) ||
        report.status.toLowerCase().includes(query)
      );
    }

    setFilteredReports(filtered);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Zone', 'Location', 'Type', 'Severity', 'Description', 'Reported At', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredReports.map(r => [
        r.id,
        r.zone,
        r.locationName,
        r.type,
        r.severity,
        `"${r.description}"`,
        new Date(r.reportedAt).toLocaleString(),
        r.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yatraflow-reports-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast.success('Reports exported successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">YatraFlow Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                <span className="text-sm text-muted-foreground">Welcome,</span>
                <span className="text-sm font-medium">{user?.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  user?.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-secondary text-secondary-foreground'
                }`}>
                  {user?.role}
                </span>
              </div>
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Search and Actions Bar */}
          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location, zone, type, severity, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleExportCSV} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        <StatsCards reports={reports} />
        <ChartsSection reports={reports} />
        <ReportsTable reports={filteredReports} onReportsChange={loadReports} />
      </main>

      {/* Add Report Dialog */}
      <AddReportDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onReportAdded={loadReports}
      />
    </div>
  );
}
