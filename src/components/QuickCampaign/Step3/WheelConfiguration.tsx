
import React from 'react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';
import { PrizeData } from '../../../stores/quickCampaign/types';

const WheelConfiguration: React.FC = () => {
  const {
    segmentCount,
    setSegmentCount,
    advancedMode,
    pointerImageUrl,
    setPointerImage,
    setPointerImageUrl,
    borderRadius,
    setBorderRadius,
    segmentPrizes,
    setPrize
  } = useQuickCampaignStore();

  const handlePointerUpload = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      setPointerImage(file);
      if (pointerImageUrl) {
        URL.revokeObjectURL(pointerImageUrl);
      }
      const url = URL.createObjectURL(file);
      setPointerImageUrl(url);
    }
  };

  const handlePrizeImageUpload = (index: number, files: FileList | null) => {
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      setPrize(index, { ...segmentPrizes[index], image: url });
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration de la roue</h3>
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Nombre de segments: <span className="text-blue-600 font-semibold">{segmentCount}</span>
          </label>
          <input
            type="range"
            min="4"
            max="12"
            value={segmentCount}
            onChange={(e) => setSegmentCount(parseInt(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>4 segments</span>
            <span>12 segments</span>
          </div>
        </div>

        {advancedMode && (
          <>
            <div className="bg-gray-50 rounded-xl p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">Pointeur personnalisé</label>
              <div className="flex items-center space-x-3">
                {pointerImageUrl && (
                  <img src={pointerImageUrl} alt="Aperçu pointeur" className="h-10" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePointerUpload(e.target.files)}
                  className="text-sm"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Arrondi du cadre: <span className="text-blue-600 font-semibold">{borderRadius}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="40"
                value={borderRadius}
                onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0</span>
                <span>40</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">Récompenses</label>
              {segmentPrizes.slice(0, segmentCount).map((prize: PrizeData, idx: number) => (
                <div key={idx} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={prize.label}
                    onChange={(e) => setPrize(idx, { ...prize, label: e.target.value })}
                    placeholder={`Segment ${idx + 1}`}
                    className="flex-1 border rounded px-2 py-1 text-sm"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePrizeImageUpload(idx, e.target.files)}
                    className="text-sm"
                  />
                  {prize.image && <img src={prize.image} alt="prize" className="h-8" />}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WheelConfiguration;
