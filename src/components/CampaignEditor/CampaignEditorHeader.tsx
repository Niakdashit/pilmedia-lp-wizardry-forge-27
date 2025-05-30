
import React from 'react';
import { ArrowLeft, Eye, Save, Sparkles, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CampaignEditorHeaderProps {
  isNewCampaign: boolean;
  campaignName: string;
  onPreview: () => void;
  onSave: (continueEditing?: boolean) => void;
}

const CampaignEditorHeader: React.FC<CampaignEditorHeaderProps> = ({
  isNewCampaign,
  campaignName,
  onPreview,
  onSave
}) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="bg-white border-b border-gray-200/50 shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center space-x-6">
          <motion.button
            onClick={() => navigate('/campaigns')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors group"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:text-[#841b60] transition-colors" />
            <span className="font-medium">Retour</span>
          </motion.button>
          
          <div className="h-6 w-px bg-gray-300"></div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#841b60] to-[#a855f7] rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {campaignName || 'Nouvelle Campagne'}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{isNewCampaign ? 'En création' : 'En cours d\'édition'}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Modifié maintenant</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <motion.button
            onClick={onPreview}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-4 h-4" />
            <span className="font-semibold">Aperçu</span>
          </motion.button>

          <motion.button
            onClick={() => onSave(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-[#841b60] text-[#841b60] rounded-xl hover:bg-[#841b60] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save className="w-4 h-4" />
            <span className="font-semibold">Sauvegarder</span>
          </motion.button>

          <motion.button
            onClick={() => onSave(false)}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-[#841b60] to-[#a855f7] text-white rounded-xl hover:from-[#7c1d5c] hover:to-[#9333ea] transition-all duration-200 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save className="w-4 h-4" />
            <span className="font-semibold">Publier</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignEditorHeader;
