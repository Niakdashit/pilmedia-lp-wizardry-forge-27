import React, { useEffect } from 'react';
import QuickCampaignCreator from '../components/QuickCampaign/QuickCampaignCreator';
import { useQuickCampaignStore } from '../stores/quickCampaignStore';

const QuickCampaign: React.FC = () => {
  const { reset } = useQuickCampaignStore();

  useEffect(() => {
    // Reset du store quand on arrive sur la page
    reset();
  }, [reset]);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
      {/* Fond Canva en absolute */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <iframe
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "8px",
          }}
          src="https://www.canva.com/design/DAGoxTSx5zw/n_I0y1W4ixWxUjVG-NmCQQ/view?embed"
          allowFullScreen
          allow="fullscreen"
          title="Design Canva"
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute w-full h-full top-0 left-0 z-10 pointer-events-none bg-gradient-to-br from-[#841b60] via-[#f5e6f2] to-[#3a78db] opacity-70"></div>

      {/* Contenu principal */}
      <div className="relative z-20 w-full">
        <QuickCampaignCreator />
        <div className="mt-4 flex justify-center">
          <a
            href="https://www.canva.com/design/DAGoxTSx5zw/n_I0y1W4ixWxUjVG-NmCQQ/view?utm_content=DAGoxTSx5zw&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
            target="_blank"
            rel="noopener"
            className="text-white underline text-sm"
          >
            Design par Jonathan
          </a>
        </div>
      </div>
    </div>
  );
};

export default QuickCampaign;
