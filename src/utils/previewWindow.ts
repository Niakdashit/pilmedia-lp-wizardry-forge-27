
export interface PreviewWindowConfig {
  campaign: any;
  title: string;
  width?: number;
  height?: number;
}

export class PreviewWindowManager {
  private static openWindows: Map<string, Window> = new Map();

  static openPreviewWindow(config: PreviewWindowConfig): void {
    const { campaign, title, width = 1200, height = 800 } = config;
    
    // Calculer la position pour centrer la fenêtre
    const left = Math.round((screen.width - width) / 2);
    const top = Math.round((screen.height - height) / 2);
    
    const windowFeatures = [
      `width=${width}`,
      `height=${height}`,
      `left=${left}`,
      `top=${top}`,
      'resizable=yes',
      'scrollbars=yes',
      'status=no',
      'toolbar=no',
      'menubar=no',
      'location=no'
    ].join(',');

    // Fermer la fenêtre existante si elle existe
    const existingWindow = this.openWindows.get(campaign.id);
    if (existingWindow && !existingWindow.closed) {
      existingWindow.close();
    }

    // Ouvrir une nouvelle fenêtre
    const newWindow = window.open('', `preview_${campaign.id}`, windowFeatures);
    
    if (newWindow) {
      this.openWindows.set(campaign.id, newWindow);
      
      // Générer le HTML pour la nouvelle fenêtre
      const previewHtml = this.generatePreviewHTML(campaign, title);
      
      newWindow.document.write(previewHtml);
      newWindow.document.close();
      
      // Nettoyer quand la fenêtre est fermée
      newWindow.addEventListener('beforeunload', () => {
        this.openWindows.delete(campaign.id);
      });
    } else {
      console.error('Impossible d\'ouvrir la fenêtre d\'aperçu. Vérifiez que les popups ne sont pas bloqués.');
      alert('Impossible d\'ouvrir la fenêtre d\'aperçu. Veuillez autoriser les popups pour ce site.');
    }
  }

  private static generatePreviewHTML(campaign: any, title: string): string {
    const baseUrl = window.location.origin;
    
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: system-ui, -apple-system, sans-serif;
            background: #f8fafc;
        }
        .preview-container {
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .preview-header {
            background: white;
            border-bottom: 1px solid #e2e8f0;
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .preview-content {
            flex: 1;
            overflow: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .device-frame {
            max-width: 100%;
            max-height: 100%;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div class="preview-container">
        <div class="preview-header">
            <div>
                <h1 class="text-lg font-semibold text-gray-900">${title}</h1>
                <p class="text-sm text-gray-500">Aperçu dans une fenêtre indépendante</p>
            </div>
            <button onclick="window.close()" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">
                Fermer
            </button>
        </div>
        <div class="preview-content">
            <div class="device-frame">
                <div id="campaign-preview">
                    <div class="p-8 text-center">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p class="mt-4 text-gray-600">Chargement de l'aperçu...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Données de la campagne injectées
        window.campaignData = ${JSON.stringify(campaign)};
        
        // Simulation de rendu de campagne (remplacé par le vrai composant React dans une vraie implémentation)
        setTimeout(() => {
            const previewElement = document.getElementById('campaign-preview');
            if (previewElement) {
                previewElement.innerHTML = \`
                    <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[600px] flex items-center justify-center">
                        <div class="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4">\${window.campaignData.name}</h2>
                            <div class="mb-6">
                                <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span class="text-white text-2xl font-bold">\${window.campaignData.type?.toUpperCase()}</span>
                                </div>
                                <p class="text-gray-600">Type de jeu: \${window.campaignData.type || 'Non défini'}</p>
                            </div>
                            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                Jouer maintenant !
                            </button>
                            <p class="text-xs text-gray-500 mt-4">Aperçu - Fenêtre indépendante</p>
                        </div>
                    </div>
                \`;
            }
        }, 1000);
    </script>
</body>
</html>`;
  }

  static closeAllWindows(): void {
    this.openWindows.forEach((window) => {
      if (!window.closed) {
        window.close();
      }
    });
    this.openWindows.clear();
  }
}
