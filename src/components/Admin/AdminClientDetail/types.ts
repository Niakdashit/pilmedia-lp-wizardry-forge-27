
export interface ClientData {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  address: string;
  website: string;
  createdAt: string;
  lastActivity: string;
  status: 'active' | 'inactive';
  notes: string;
}

export interface ClientCampaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'archived';
  type: string;
  participants: number;
  views: number;
  conversionRate: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}
