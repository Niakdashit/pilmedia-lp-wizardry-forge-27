import React, { useState, useEffect } from 'react';

interface PuzzleProps {
  imageUrl: string;
  gridSize?: number;
}

const Puzzle: React.FC<PuzzleProps> = ({ imageUrl, gridSize = 3 }) => {
  const [pieces, setPieces] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    // Initialize puzzle pieces
    const initialPieces = Array.from({ length: gridSize * gridSize }, (_, i) => i);
    setPieces(shuffleArray([...initialPieces]));
  }, [gridSize]);

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handlePieceClick = (index: number) => {
    const emptyIndex = pieces.indexOf(gridSize * gridSize - 1);
    
    // Check if clicked piece is adjacent to empty space
    if (isAdjacent(index, emptyIndex, gridSize)) {
      const newPieces = [...pieces];
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);
      
      // Check if puzzle is solved
      const isSolved = newPieces.every((piece, index) => piece === index);
      setSolved(isSolved);
    }
  };

  const isAdjacent = (index1: number, index2: number, size: number) => {
    const row1 = Math.floor(index1 / size);
    const col1 = index1 % size;
    const row2 = Math.floor(index2 / size);
    const col2 = index2 % size;
    
    return (
      (Math.abs(row1 - row2) === 1 && col1 === col2) ||
      (Math.abs(col1 - col2) === 1 && row1 === row2)
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="grid gap-1 bg-gray-200 p-2 rounded-lg"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: '300px',
          height: '300px'
        }}
      >
        {pieces.map((piece, index) => (
          <div
            key={index}
            onClick={() => handlePieceClick(index)}
            className={`relative overflow-hidden ${
              piece === gridSize * gridSize - 1 ? 'bg-gray-300' : 'cursor-pointer'
            }`}
            style={{
              aspectRatio: '1',
            }}
          >
            {piece !== gridSize * gridSize - 1 && (
              <div
                className="w-full h-full bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundPosition: `${(piece % gridSize) * (100 / (gridSize - 1))}% ${
                    Math.floor(piece / gridSize) * (100 / (gridSize - 1))
                  }%`,
                  backgroundSize: `${gridSize * 100}%`,
                }}
              />
            )}
          </div>
        ))}
      </div>
      {solved && (
        <div className="text-green-600 font-bold text-lg">
          Congratulations! Puzzle solved!
        </div>
      )}
    </div>
  );
};

export default Puzzle;

export { Puzzle }