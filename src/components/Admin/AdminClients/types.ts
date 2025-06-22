
export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  totalCampaigns: number;
  activeCampaigns: number;
  totalViews: number;
  avgConversionRate: number;
  createdAt: string;
  lastActivity: string;
  status: 'active' | 'inactive';
}
