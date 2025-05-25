<div className="relative w-full max-w-3xl mx-auto rounded-lg shadow-lg overflow-hidden">
  {/* ✅ Image en fond */}
  {gameBackgroundImage && (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${gameBackgroundImage})` }}
    />
  )}

  {/* ✅ Jeu ou contenu superposé */}
  <div className="relative z-10 w-full h-full p-6 flex items-center justify-center">
    {campaign.gameComponent ? (
      <YourGameComponent config={campaign.gameConfig} />
    ) : (
      <div className="text-center text-gray-500">
        <p className="text-sm">Aucune image de fond</p>
        <p className="text-xs mt-1">
          Ajoutez une image dans l’onglet "Apparence visuelle"
        </p>
      </div>
    )}
  </div>
</div>
