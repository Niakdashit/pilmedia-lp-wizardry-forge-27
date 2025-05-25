<div className="relative rounded-lg shadow-lg h-[300px] w-full overflow-hidden">
  {gameBackgroundImage && (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${gameBackgroundImage})` }}
    />
  )}
  <div className="relative z-10 flex items-center justify-center w-full h-full p-6">
    {!gameBackgroundImage && (
      <div className="text-center text-gray-500">
        <p className="text-sm">Aucune image de fond</p>
        <p className="text-xs mt-1">
          Ajoutez une image dans l’onglet "Apparence visuelle"
        </p>
      </div>
    )}
  </div>
</div>
