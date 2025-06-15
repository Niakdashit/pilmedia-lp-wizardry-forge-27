
import { CampaignType } from '../../utils/campaignTypes';

export interface AdminCampaign {
  id: string;
  name: string;
  description: string;
  clientName: string;
  clientId: string;
  status: 'draft' | 'active' | 'archived';
  type: CampaignType;
  participants: number;
  views: number;
  conversionRate: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface AdminStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalClients: number;
  totalParticipations: number;
  avgConversionRate: number;
  topGameType: string;
  topClient: string;
}

export interface RecentActivity {
  id: string;
  type: 'campaign_created' | 'campaign_published' | 'status_change' | 'participation_spike';
  message: string;
  time: string;
  campaignName?: string;
  clientName?: string;
}
