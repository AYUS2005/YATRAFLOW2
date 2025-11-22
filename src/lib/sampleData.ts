import { Report } from './types';

export const sampleReports: Report[] = [
  {
    id: '1',
    zone: 'North Zone',
    locationName: 'MG Road Junction',
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
