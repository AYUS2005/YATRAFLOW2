import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Report, ReportType, SeverityLevel } from '@/lib/types';
import { addReport } from '@/lib/storage';
import { toast } from 'sonner';

interface AddReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReportAdded: () => void;
}

export const AddReportDialog = ({ open, onOpenChange, onReportAdded }: AddReportDialogProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    zone: '',
    locationName: '',
    latitude: '',
    longitude: '',
    type: 'accident' as ReportType,
    severity: 'medium' as SeverityLevel,
    description: '',
  });

  const zones = ['North Zone', 'South Zone', 'East Zone', 'West Zone', 'Central Zone'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.zone || !formData.locationName || !formData.description || !formData.latitude || !formData.longitude) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newReport: Report = {
      id: Date.now().toString(),
      zone: formData.zone,
      locationName: formData.locationName,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      type: formData.type,
      severity: formData.severity,
      description: formData.description,
      reportedAt: new Date().toISOString(),
      status: 'active',
      reportedBy: user?.name || 'User',
      statusHistory: [{
        status: 'active',
        timestamp: new Date().toISOString(),
        changedBy: user?.name || 'User',
      }],
    };

    addReport(newReport);
    onReportAdded();
    onOpenChange(false);
    
    // Reset form
    setFormData({
      zone: '',
      locationName: '',
      latitude: '',
      longitude: '',
      type: 'accident',
      severity: 'medium',
      description: '',
    });

    toast.success('Report added successfully');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Report</DialogTitle>
          <DialogDescription>
            Report a new accident or road hazard
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="zone">Zone *</Label>
            <Select value={formData.zone} onValueChange={(value) => setFormData({ ...formData, zone: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="locationName">Location Name *</Label>
            <Input
              id="locationName"
              placeholder="e.g., MG Road Junction"
              value={formData.locationName}
              onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude *</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                placeholder="e.g., 12.9716"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude *</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                placeholder="e.g., 77.5946"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData({ ...formData, type: value as ReportType })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accident">Accident</SelectItem>
                  <SelectItem value="hazard">Hazard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Severity *</Label>
              <Select 
                value={formData.severity} 
                onValueChange={(value) => setFormData({ ...formData, severity: value as SeverityLevel })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed description of the incident..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Report</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
