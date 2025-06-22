
import { useEffect, useRef } from 'react';
import { useQuickCampaignStore } from '../stores/quickCampaignStore';

interface UseAdvancedWheelEffectsProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isSpinning: boolean;
}

export const useAdvancedWheelEffects = ({
  canvasRef,
  isSpinning
}: UseAdvancedWheelEffectsProps) => {
  const { wheelCustomization, advancedMode } = useQuickCampaignStore();
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!advancedMode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fonction pour appliquer les effets de texture
    const applyTextureEffect = () => {
      if (!wheelCustomization.texture) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      switch (wheelCustomization.texture) {
        case 'metallic':
          for (let i = 0; i < data.length; i += 4) {
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = Math.min(255, brightness * 1.2);     // Rouge
            data[i + 1] = Math.min(255, brightness * 1.1); // Vert
            data[i + 2] = Math.min(255, brightness * 0.9); // Bleu
          }
          break;
          
        case 'glass':
          for (let i = 0; i < data.length; i += 4) {
            data[i + 3] = Math.min(255, data[i + 3] * 0.8); // Alpha pour transparence
          }
          break;
          
        case 'neon':
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * 1.3);     // Rouge intensifié
            data[i + 2] = Math.min(255, data[i + 2] * 1.3); // Bleu intensifié
          }
          break;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Fonction pour les effets de particules
    const drawParticles = () => {
      if (!wheelCustomization.particleEffect) return;

      const particles = [];
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          alpha: Math.random(),
          speed: Math.random() * 2 + 1
        });
      }

      particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    // Animation continue si activée
    const animate = () => {
      if (wheelCustomization.continuousRotation && !isSpinning) {
        // Rotation continue lente
        const now = Date.now();
        const rotation = (now * 0.0005) % (Math.PI * 2);
        
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotation);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        
        // Redessiner la roue avec la rotation
        ctx.restore();
      }

      if (wheelCustomization.particleEffect) {
        drawParticles();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Appliquer les effets
    applyTextureEffect();
    
    if (wheelCustomization.continuousRotation || wheelCustomization.particleEffect) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [wheelCustomization, advancedMode, isSpinning, canvasRef]);

  return {
    applyAdvancedEffects: () => {
      // Fonction pour appliquer manuellement les effets
    }
  };
};
