import { Task, Request, Profile } from '../types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Irrigation System Inspection',
    field: 'Field A - North Zone',
    dueDate: '2026-02-10',
    status: 'Pending',
    priority: 'High',
    assignee: 'Rajesh Kumar',
    description: 'Check all irrigation valves and pipes for leaks'
  },
  {
    id: '2',
    title: 'Pest Control Monitoring',
    field: 'Field C - East Zone',
    dueDate: '2026-02-09',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Priya Singh',
    description: 'Monitor crop health and pest activity'
  },
  {
    id: '3',
    title: 'Equipment Maintenance Check',
    field: 'Equipment Yard',
    dueDate: '2026-02-12',
    status: 'Pending',
    priority: 'Medium',
    assignee: 'Amit Patel',
    description: 'Routine maintenance of tractors and harvesters'
  },
  {
    id: '4',
    title: 'Crop Health Assessment',
    field: 'Field B - South Zone',
    dueDate: '2026-02-11',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Sunita Verma',
    description: 'Weekly crop health monitoring'
  },
  {
    id: '5',
    title: 'Worker Attendance Review',
    field: 'Main Office',
    dueDate: '2026-02-09',
    status: 'Completed',
    priority: 'Low',
    assignee: 'Vijay Sharma',
    description: 'Review and approve weekly attendance'
  },
  {
    id: '6',
    title: 'Fertilizer Application',
    field: 'Field D - West Zone',
    dueDate: '2026-02-13',
    status: 'Pending',
    priority: 'High',
    assignee: 'Anjali Reddy',
    description: 'Apply NPK fertilizer as per schedule'
  },
  {
    id: '7',
    title: 'Harvest Coordination',
    field: 'Field E - Central Zone',
    dueDate: '2026-02-14',
    status: 'Pending',
    priority: 'Medium',
    assignee: 'Ravi Kumar',
    description: 'Coordinate with harvest team for upcoming harvest'
  },
  {
    id: '8',
    title: 'Water Quality Testing',
    field: 'Field F - North Zone',
    dueDate: '2026-02-15',
    status: 'Pending',
    priority: 'Low',
    assignee: 'Meera Nair',
    description: 'Test water quality for irrigation'
  },
  {
    id: '9',
    title: 'Soil pH Testing',
    field: 'Field G - East Zone',
    dueDate: '2026-02-10',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Kiran Patel',
    description: 'Test soil pH levels across the field'
  },
  {
    id: '10',
    title: 'Equipment Inventory',
    field: 'Storage Facility',
    dueDate: '2026-02-08',
    status: 'Completed',
    priority: 'Low',
    assignee: 'Deepak Singh',
    description: 'Complete monthly equipment inventory'
  }
];

export const mockRequests: Request[] = [
  {
    id: 'REQ-001',
    type: 'Equipment',
    priority: 'High',
    subject: 'New Harvester Required',
    description: 'Current harvester is showing signs of wear. Need replacement for upcoming season.',
    status: 'Pending',
    timestamp: '2026-02-08 10:30 AM'
  },
  {
    id: 'REQ-002',
    type: 'Supplies',
    priority: 'Medium',
    subject: 'Fertilizer Stock Replenishment',
    description: 'NPK fertilizer stock running low. Need 50 bags for next month.',
    status: 'Approved',
    timestamp: '2026-02-07 02:15 PM'
  },
  {
    id: 'REQ-003',
    type: 'Maintenance',
    priority: 'High',
    subject: 'Irrigation Pump Repair',
    description: 'Main irrigation pump making unusual noise. Requires immediate attention.',
    status: 'Approved',
    timestamp: '2026-02-06 09:00 AM'
  },
  {
    id: 'REQ-004',
    type: 'Labor',
    priority: 'Medium',
    subject: 'Additional Workers for Harvest',
    description: 'Need 10 additional workers for the upcoming harvest season.',
    status: 'Pending',
    timestamp: '2026-02-05 11:45 AM'
  },
  {
    id: 'REQ-005',
    type: 'Transport',
    priority: 'Low',
    subject: 'Transport Vehicle for Market',
    description: 'Request for transport vehicle to deliver produce to market.',
    status: 'Rejected',
    timestamp: '2026-02-04 03:30 PM'
  },
  {
    id: 'REQ-006',
    type: 'Other',
    priority: 'Low',
    subject: 'Office Supplies',
    description: 'Need stationery and office supplies for field office.',
    status: 'Approved',
    timestamp: '2026-02-03 08:20 AM'
  }
];

export const mockProfile: Profile = {
  name: 'Rajesh Kumar',
  employeeId: 'EMP-2024-001',
  phone: '+91 98765 43210',
  email: 'rajesh.kumar@farmconnect.com',
  department: 'Field Operations',
  role: 'Field Supervisor',
  tasksCompleted: 47,
  activeAssignments: 12,
  teamsManaged: 4,
  yearsOfService: 5
};
