import React, { useEffect, useState, ChangeEvent } from 'react';
import '../../styles/Game.css'; // Importing styles for the Game component
import Win from './Win'; // Importing Win component
import Lose from './Lose'; // Importing Lose component
import { fetchNewVerb, updateHistory, updateVerb } from '../../requests'; // Importing functions for API requests

const Game: React.FC = () => {
  const [frenchVerbId, setFrenchVerbId] = useState<number>(-1);
  const [frenchVerb, setFrenchVerb] = useState<string>('');
  const [englishTranslation, setEnglishTranslation] = useState<string|null>(null);
  const [engLength, setEngLength] = useState<number>(0);
  const [idsToExclude, setIdsToExclude] = useState<string>("");

  const [warningMessage, setWarningMessage] = useState<string>('');
  const [score, setScore] = useState<number>(10);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [showPosGrade, setShowPosGrade] = useState<boolean>(false);
  const [showNegGrade, setShowNegGrade] = useState<boolean>(false);

  // Initialize game state
  const initGame = (id : number, french : string, english : string, len : number) => {
    // We set the french verb ID here because later we want to update the difficulty of the word
    setFrenchVerbId(id);
    // IdsToExclude because we don't want the same words to be repeated 
    setIdsToExclude(prevIds => {
      if (prevIds === "") {
        return String(id);
      } else {
        return prevIds + "," + String(id);
      }
    });

    setFrenchVerb(french);
    setEnglishTranslation(english);
    setEngLength(len);
  }

  // Fetch new verb when game starts or idsToExclude changes
  useEffect(() => {
    if (isPlaying) {
      fetchNewVerb(false, idsToExclude).then(data => {
      initGame(data.id, data.french, data.english, data.english.length);
    })
    }
  }, []);

  // Handle changes in englishTranslation
  useEffect ( () => {
  }, [englishTranslation, frenchVerb, engLength])

  // Handle score changes and game end conditions
  useEffect(() => {
    if (englishTranslation && englishTranslation.length > 0) {
      setInputValue(englishTranslation[0]);
    }
  }, [englishTranslation]);

  // Check if the player won
  useEffect(() => {
    if (score === 20) {
      setHasWon(true);
      updateHistory(true);
      setIsPlaying(false);
    } else if (score === 0) {
      setHasWon(false);
      updateHistory(false);
      setIsPlaying(false);
    }

  }, [score]);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShowPosGrade(false);
    setShowNegGrade(false);
    
    // for a better user experience, we don't let the user change the first character
    if (englishTranslation) {
      if (event.target.value.length === 0) {
        setInputValue(englishTranslation[0]);
      } else if (event.target.value[0] !== englishTranslation[0]) {
        setInputValue(englishTranslation[0]);
      } else {
        setInputValue(event.target.value);
      }
    }
  };

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (englishTranslation  && inputValue.length !== englishTranslation.length) {
        setWarningMessage("Input too short!")
        setTimeout(() => {
          setWarningMessage("");
        }, 1000);
      } else {
        submitForm();
      }
    }
  };

  const submitForm = async () => {
    try {
      let updatedDifficulty;

      // Determine if translation is correct
      if (englishTranslation && inputValue.toLowerCase() === englishTranslation.toLowerCase()) {
        updatedDifficulty = true;
        await updateVerb(frenchVerbId, updatedDifficulty); // Update verb
        setScore(score + 1);
        setShowPosGrade(true);
      } else {
        updatedDifficulty = false;
        await updateVerb(frenchVerbId, updatedDifficulty); // Update verb
        setScore(score - 1);
        setShowNegGrade(true);
      }

      setInputValue('');
  
      // Fetch new verb based on updated difficulty
      const data = await fetchNewVerb(updatedDifficulty, idsToExclude);
      initGame(data.id, data.french, data.english, data.english.length);
  
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };
  
  
  return (
    <div>
      { !isPlaying && hasWon && <Win /> }
      { !isPlaying && !hasWon && <Lose /> }
      { isPlaying && englishTranslation && frenchVerb && engLength > 0 && 
        (
          <div className="game bg-gray-900">
            <div className="absolute top-2.5 right-2.5 text-white text-2xl font-semibold">
              Score: {score} / 20
            </div>
            <div className="absolute top-2.5 left-2.5 text-white text-2xl font-semibold">
              <a href="/">French or Fraud?</a>
            </div>
            <p className="text-xl text-gray-500">What's the English translation of this word?</p>
            <br />
            <p className="text-3xl text-bold">{frenchVerb}</p>
            <input
              type="text"
              maxLength={engLength}
              style={{
                display: 'block',
                margin: '2em auto',
                border: 'none',
                padding: 0,
                width: `calc(${engLength} * (1ch + 0.5ch))`,
                background: `repeating-linear-gradient(
                  90deg,
                  dimgrey 0,
                  dimgrey 1ch,
                  transparent 0,
                  transparent calc(1ch + 0.5ch)
                ) 0 100% / calc((${engLength} * (1ch + 0.5ch)) - 0.5ch) 2px no-repeat`,
                font: '5ch droid sans mono, consolas, monospace',
                letterSpacing: `0.5ch`,
              }}
              onFocus={(e) => e.target.style.outline = 'none'}
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleEnterKeyPress}
            />
            { showPosGrade && <div className="floating-point positive-grade">+1</div> }
            { showNegGrade && <div className="floating-point negative-grade">-1</div> }
            {warningMessage}
          </div>
        )
      }
    </div>
  )
}

export default Game;
