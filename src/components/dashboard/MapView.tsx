import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Report } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, MapPin } from 'lucide-react';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapViewProps {
  reports: Report[];
}

// Custom icons for different report types and severities
const getMarkerIcon = (type: string, severity: string) => {
  const colors = {
    critical: '#ef4444',
    high: '#f97316',
    medium: '#eab308',
    low: '#22c55e',
  };

  const color = colors[severity as keyof typeof colors] || '#6b7280';
  
  return L.divIcon({
    html: `
      <div style="
        background: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 16px;
          font-weight: bold;
        ">
          ${type === 'accident' ? '!' : '⚠'}
        </div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const MapController = ({ reports }: { reports: Report[] }) => {
  const map = useMap();

  useEffect(() => {
    if (reports.length > 0) {
      const bounds = L.latLngBounds(
        reports.map((report) => [report.latitude, report.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [reports, map]);

  return null;
};

export const MapView = ({ reports }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);

  // Default center (Bangalore)
  const defaultCenter: [number, number] = [12.9716, 77.5946];

  const getSeverityColor = (severity: string) => {
    const colors = {
      critical: 'destructive',
      high: 'default',
      medium: 'secondary',
      low: 'outline',
    };
    return colors[severity as keyof typeof colors] || 'outline';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'destructive',
      pending: 'default',
      resolved: 'outline',
    };
    return colors[status as keyof typeof colors] || 'outline';
  };

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden border shadow-lg">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        className="h-full w-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController reports={reports} />
        
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={getMarkerIcon(report.type, report.severity)}
          >
            <Popup maxWidth={300}>
              <div className="p-2 space-y-2">
                <div className="flex items-start gap-2">
                  {report.type === 'accident' ? (
                    <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  ) : (
                    <MapPin className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base capitalize">{report.type}</h3>
                    <p className="text-sm text-muted-foreground">{report.locationName}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant={getSeverityColor(report.severity) as any} className="text-xs">
                    {report.severity}
                  </Badge>
                  <Badge variant={getStatusColor(report.status) as any} className="text-xs">
                    {report.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {report.zone}
                  </Badge>
                </div>
                
                <p className="text-sm mt-2">{report.description}</p>
                
                <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
                  <div>Reported: {new Date(report.reportedAt).toLocaleString()}</div>
                  {report.reportedBy && <div>By: {report.reportedBy}</div>}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
