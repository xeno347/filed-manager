export interface HarvestOrder {
  id: string;
  orderNumber: string;
  tripNumber: string;
  harvestCardNumber: string;
  field: string;
  crop: string;
  area: string;
  estimatedYield: string;
  harvestDate: string;
  assignedTeam: string;
  supervisor: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'High' | 'Medium' | 'Low';
  harvestCarStatus: 'Available' | 'On Route' | 'Loading' | 'In Transit' | 'Delivered' | 'Maintenance';
  equipment: string[];
  remarks?: string;
}
