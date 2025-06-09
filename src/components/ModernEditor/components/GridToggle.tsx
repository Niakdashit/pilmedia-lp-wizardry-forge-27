
import React from 'react';
import { Grid } from 'lucide-react';

interface GridToggleProps {
  showGridLines: boolean;
  onToggle: () => void;
}

const GridToggle: React.FC<GridToggleProps> = ({
  showGridLines,
  onToggle
}) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-xl transition-all duration-200 ${
        showGridLines 
          ? 'bg-[#841b60] text-white shadow-lg' 
          : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-gray-900'
      } border border-gray-200/50 shadow-sm hover:shadow-md`}
      title={showGridLines ? 'Masquer la grille' : 'Afficher la grille'}
    >
      <Grid className="w-4 h-4" />
    </button>
  );
};

export default GridToggle;
