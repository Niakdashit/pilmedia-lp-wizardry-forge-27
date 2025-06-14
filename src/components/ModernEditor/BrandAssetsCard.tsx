
import React from 'react';
import { Palette, Upload } from 'lucide-react';

interface BrandAssetsCardProps {
  campaign: any;
  setCampaign: (updater: (prev: any) => any) => void;
}

const BrandAssetsCard: React.FC<BrandAssetsCardProps> = ({ campaign, setCampaign }) => {
  return (
    <div className="bg-gradient-to-br from-[#841b60]/5 to-[#6d164f]/5 rounded-xl p-6 border border-[#841b60]/10">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Palette className="w-5 h-5 mr-2 text-[#841b60]" />
        Identité de marque
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#841b60] transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Glissez votre logo ici</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Couleur principale</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={campaign.brandAssets.primaryColor}
                onChange={(e) => setCampaign((prev: any) => ({
                  ...prev,
                  brandAssets: { ...prev.brandAssets, primaryColor: e.target.value }
                }))}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={campaign.brandAssets.primaryColor}
                onChange={(e) => setCampaign((prev: any) => ({
                  ...prev,
                  brandAssets: { ...prev.brandAssets, primaryColor: e.target.value }
                }))}
                className="flex-1 px-3 py-2 bg-white/50 border-0 rounded-lg focus:ring-2 focus:ring-[#841b60]"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Couleur secondaire</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={campaign.brandAssets.secondaryColor}
                onChange={(e) => setCampaign((prev: any) => ({
                  ...prev,
                  brandAssets: { ...prev.brandAssets, secondaryColor: e.target.value }
                }))}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={campaign.brandAssets.secondaryColor}
                onChange={(e) => setCampaign((prev: any) => ({
                  ...prev,
                  brandAssets: { ...prev.brandAssets, secondaryColor: e.target.value }
                }))}
                className="flex-1 px-3 py-2 bg-white/50 border-0 rounded-lg focus:ring-2 focus:ring-[#841b60]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandAssetsCard;
