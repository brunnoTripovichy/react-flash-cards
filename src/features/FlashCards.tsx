import { useState } from 'react';
import questions, { type Question } from './data.ts';

const FlashCards = () => {
  const [flashCards] = useState<Question[]>(questions);
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({});

  const toggleFlip = (id: number) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {flashCards.map((flashCard) => {
        const isFlipped = flipped[flashCard.id];

        return (
          <div
            key={flashCard.id}
            className={`relative w-64 h-40 cursor-pointer border border-gray-300 rounded-lg shadow-lg 
            flex items-center justify-center text-center p-4 transition-colors duration-500 ${
              isFlipped ? 'bg-blue-500 text-white' : 'bg-white text-gray-900'
            }`}
            onClick={() => toggleFlip(flashCard.id)}
          >
            {/* Flashcard Inner Container */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              {/* Question Text (Fade In/Out Sync with Background) */}
              <h2
                className={`absolute text-lg font-semibold transition-opacity duration-300 ${
                  isFlipped ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {flashCard.question}
              </h2>

              {/* Answer Text (Fade In/Out Sync with Background) */}
              <p
                className={`absolute text-base transition-opacity duration-300 ${
                  isFlipped ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {flashCard.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlashCards;
