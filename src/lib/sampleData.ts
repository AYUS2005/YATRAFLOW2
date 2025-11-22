import { Report } from './types';

export const sampleReports: Report[] = [
  {
    id: '1',
    zone: 'North Zone',
    locationName: 'MG Road Junction',
    latitude: 12.9756,
    longitude: 77.6065,
    type: 'accident',
    severity: 'high',
    description: 'Two-vehicle collision blocking left lane. Minor injuries reported.',
    reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    reportedBy: 'System',
    statusHistory: [{
      status: 'active',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      changedBy: 'System'
    }]
  },
  {
    id: '2',
    zone: 'South Zone',
    locationName: 'Brigade Road',
    latitude: 12.9716,
    longitude: 77.6070,
    type: 'hazard',
    severity: 'critical',
    description: 'Large pothole causing vehicle damage. Water accumulation.',
    reportedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    reportedBy: 'System',
    statusHistory: [{
      status: 'pending',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      changedBy: 'System'
    }]
  },
  {
    id: '3',
    zone: 'East Zone',
    locationName: 'Whitefield Main Road',
    latitude: 12.9698,
    longitude: 77.7499,
    type: 'accident',
    severity: 'medium',
    description: 'Single vehicle skidded off road. No injuries.',
    reportedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'resolved',
    reportedBy: 'System',
    statusHistory: [
      {
        status: 'active',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        changedBy: 'System'
      },
      {
        status: 'resolved',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        changedBy: 'Admin'
      }
    ]
  },
  {
    id: '4',
    zone: 'West Zone',
    locationName: 'Rajajinagar 3rd Block',
    latitude: 12.9915,
    longitude: 77.5540,
    type: 'hazard',
    severity: 'low',
    description: 'Faded road markings reducing visibility at night.',
    reportedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    reportedBy: 'System',
    statusHistory: [{
      status: 'active',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      changedBy: 'System'
    }]
  },
  {
    id: '5',
    zone: 'Central Zone',
    locationName: 'Cubbon Park Circle',
    latitude: 12.9767,
    longitude: 77.5920,
    type: 'accident',
    severity: 'critical',
    description: 'Multi-vehicle pileup. Emergency services on site.',
    reportedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    reportedBy: 'System',
    statusHistory: [{
      status: 'active',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      changedBy: 'System'
    }]
  },
  {
    id: '6',
    zone: 'North Zone',
    locationName: 'Hebbal Flyover',
    latitude: 13.0358,
    longitude: 77.5970,
    type: 'hazard',
    severity: 'medium',
    description: 'Loose gravel on bridge approach. Slippery conditions.',
    reportedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    reportedBy: 'System',
    statusHistory: [{
      status: 'pending',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      changedBy: 'System'
    }]
  },
  {
    id: '7',
    zone: 'South Zone',
    locationName: 'Bannerghatta Road',
    latitude: 12.8997,
    longitude: 77.5951,
    type: 'accident',
    severity: 'low',
    description: 'Minor fender bender. Vehicles moved to side.',
    reportedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'resolved',
    reportedBy: 'System',
    statusHistory: [
      {
        status: 'active',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        changedBy: 'System'
      },
      {
        status: 'resolved',
        timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
        changedBy: 'Admin'
      }
    ]
  },
  {
    id: '8',
    zone: 'East Zone',
    locationName: 'KR Puram Signal',
    latitude: 13.0126,
    longitude: 77.6966,
    type: 'hazard',
    severity: 'high',
    description: 'Traffic signal malfunction causing congestion.',
    reportedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    reportedBy: 'System',
    statusHistory: [{
      status: 'active',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      changedBy: 'System'
    }]
  },
  {
    id: '9',
    zone: 'West Zone',
    locationName: 'Yeshwanthpur Junction',
    latitude: 13.0280,
    longitude: 77.5380,
    type: 'accident',
    severity: 'medium',
    description: 'Bus-car collision. Right lane blocked.',
    reportedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    reportedBy: 'System',
    statusHistory: [{
      status: 'pending',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      changedBy: 'System'
    }]
  },
  {
    id: '10',
    zone: 'Central Zone',
    locationName: 'Vidhana Soudha',
    latitude: 12.9794,
    longitude: 77.5912,
    type: 'hazard',
    severity: 'low',
    description: 'Construction debris on shoulder. No obstruction.',
    reportedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'resolved',
    reportedBy: 'System',
    statusHistory: [
      {
        status: 'active',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        changedBy: 'System'
      },
      {
        status: 'resolved',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        changedBy: 'Admin'
      }
    ]
  },
  {
    id: '11',
    zone: 'North Zone',
    locationName: 'Yelahanka New Town',
    latitude: 13.1007,
    longitude: 77.5963,
    type: 'accident',
    severity: 'high',
    description: 'Pedestrian hit. Ambulance dispatched.',
    reportedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    reportedBy: 'System',
    statusHistory: [{
      status: 'active',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      changedBy: 'System'
    }]
  },
  {
    id: '12',
    zone: 'South Zone',
    locationName: 'Electronic City Phase 1',
    latitude: 12.8446,
    longitude: 77.6600,
    type: 'hazard',
    severity: 'critical',
    description: 'Oil spill covering 100m stretch. Highly slippery.',
    reportedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    status: 'active',
    reportedBy: 'System',
    statusHistory: [{
      status: 'active',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      changedBy: 'System'
    }]
  },
  {
    id: '13',
    zone: 'East Zone',
    locationName: 'Marathahalli Bridge',
    latitude: 12.9591,
    longitude: 77.6974,
    type: 'accident',
    severity: 'low',
    description: 'Two-wheeler fell. Rider stable.',
    reportedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'resolved',
    reportedBy: 'System',
    statusHistory: [
      {
        status: 'active',
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        changedBy: 'System'
      },
      {
        status: 'resolved',
        timestamp: new Date(Date.now() - 5.5 * 24 * 60 * 60 * 1000).toISOString(),
        changedBy: 'Admin'
      }
    ]
  },
  {
    id: '14',
    zone: 'West Zone',
    locationName: 'Peenya Industrial Area',
    latitude: 13.0294,
    longitude: 77.5186,
    type: 'hazard',
    severity: 'medium',
    description: 'Street light outage for 500m. Poor visibility.',
    reportedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    reportedBy: 'System',
    statusHistory: [{
      status: 'pending',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      changedBy: 'System'
    }]
  },
  {
    id: '15',
    zone: 'Central Zone',
    locationName: 'Majestic Bus Stand',
    latitude: 12.9766,
    longitude: 77.5713,
    type: 'accident',
    severity: 'medium',
    description: 'Auto-rickshaw collision. Minor traffic delays.',
    reportedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    reportedBy: 'System',
    statusHistory: [{
      status: 'active',
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      changedBy: 'System'
    }]
  }
];
