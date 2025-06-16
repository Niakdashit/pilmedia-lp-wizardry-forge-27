
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GameMechanicSelection from '../components/GameMechanicSelection/GameMechanicSelection';

const GameMechanicSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedType = searchParams.get('type') || undefined;

  const handleMechanicSelect = (mechanicId: string) => {
    // Navigate to the next step with the selected mechanic
    navigate(`/gamification/editor/new?type=${mechanicId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <GameMechanicSelection
        preSelectedType={preSelectedType}
        onSelect={handleMechanicSelect}
      />
    </div>
  );
};

export default GameMechanicSelectionPage;
