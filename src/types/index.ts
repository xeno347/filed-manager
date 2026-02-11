export interface Task {
  id: string;
  title: string;
  field: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  description?: string;
}

export interface Request {
  id: string;
  type: 'Equipment' | 'Supplies' | 'Maintenance' | 'Labor' | 'Transport' | 'Other';
  priority: 'High' | 'Medium' | 'Low';
  subject: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  timestamp: string;
}

export interface Profile {
  name: string;
  employeeId: string;
  phone: string;
  email: string;
  department: string;
  role: string;
  tasksCompleted: number;
  activeAssignments: number;
  teamsManaged: number;
  yearsOfService: number;
}
