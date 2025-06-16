
import React from 'react';
import { Target, Users } from 'lucide-react';

interface CampaignGoalsProps {
  config: {
    campaignGoal: string;
    targetAudience: string;
  };
  onChange: (data: any) => void;
}

const CampaignGoals: React.FC<CampaignGoalsProps> = ({
  config,
  onChange
}) => {
  const goalOptions = [
    { value: 'lead-generation', label: 'Lead Generation', description: 'Collect contact information and build your email list' },
    { value: 'brand-awareness', label: 'Brand Awareness', description: 'Increase visibility and recognition of your brand' },
    { value: 'customer-engagement', label: 'Customer Engagement', description: 'Boost interaction and engagement with existing customers' },
    { value: 'product-launch', label: 'Product Launch', description: 'Generate excitement for a new product or service' },
    { value: 'event-promotion', label: 'Event Promotion', description: 'Drive attendance and awareness for an upcoming event' },
    { value: 'sales-conversion', label: 'Sales Conversion', description: 'Drive direct sales and revenue generation' }
  ];

  const audienceOptions = [
    { value: 'young-adults', label: 'Young Adults (18-30)', description: 'Tech-savvy, social media active generation' },
    { value: 'professionals', label: 'Working Professionals (25-45)', description: 'Career-focused individuals with disposable income' },
    { value: 'families', label: 'Families with Children', description: 'Parents looking for family-oriented products and services' },
    { value: 'seniors', label: 'Seniors (55+)', description: 'Mature audience with established purchasing power' },
    { value: 'entrepreneurs', label: 'Business Owners & Entrepreneurs', description: 'Decision-makers looking for B2B solutions' },
    { value: 'students', label: 'Students & Recent Graduates', description: 'Budget-conscious, education-focused demographic' }
  ];

  const handleConfigChange = (field: string, value: string) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Target className="w-6 h-6 mr-2" />
          Campaign Goals
        </h2>
        <p className="text-gray-600">Define your campaign objectives and target audience</p>
      </div>

      {/* Campaign Goal */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-700">
          Primary Campaign Goal *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goalOptions.map((goal) => (
            <button
              key={goal.value}
              onClick={() => handleConfigChange('campaignGoal', goal.value)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                config.campaignGoal === goal.value
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="font-semibold text-gray-900 mb-2">{goal.label}</h3>
              <p className="text-sm text-gray-600">{goal.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Target Audience */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-700 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Target Audience *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {audienceOptions.map((audience) => (
            <button
              key={audience.value}
              onClick={() => handleConfigChange('targetAudience', audience.value)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                config.targetAudience === audience.value
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="font-semibold text-gray-900 mb-2">{audience.label}</h3>
              <p className="text-sm text-gray-600">{audience.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignGoals;
