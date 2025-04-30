export interface Farmer {
  id: string;
  name: string;
  image: string;
  contact: string;
  location: string;
  farmSize: string;
  joinedDate: string;
  status: 'active' | 'inactive';
}

export interface Crop {
  id: string;
  farmerId: string;
  name: string;
  plantingDate: string;
  expectedHarvestDate: string;
  quantity: number;
  status: 'growing' | 'harvested' | 'failed';
}

export interface Livestock {
  id: string;
  farmerId: string;
  type: string;
  quantity: number;
  acquiredDate: string;
  healthStatus: 'healthy' | 'sick' | 'vaccinated';
}

export interface Transaction {
  id: string;
  farmerId: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
}

export interface CalendarEvent {
  id: string;
  farmerId: string;
  title: string;
  date: string;
  type: 'planting' | 'harvesting' | 'vaccination' | 'meeting' | 'other';
  description: string;
}

export interface Notification {
  id: string;
  farmerId: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}