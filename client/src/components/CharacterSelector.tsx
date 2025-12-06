import { useState } from 'react';
import './CharacterSelector.css';

interface Character {
  id: number;
  name: string;
  gender: string;
  persona_type: string;
  comedy_styles: string[];
}

interface CharacterSelectorProps {
  characters: Character[];
  onSelect: (character: Character, styles?: string[]) => void;
}

const COMEDY_STYLES = [
  'observational',
  'anecdotal',
  'satirical',
  'dark',
  'deadpan',
  'prop',
  'character',
  'physical',
  'surreal',
  'blue',
  'yogi_ism',
];

export default function CharacterSelector({ characters, onSelect }: CharacterSelectorProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [showStyleSelection, setShowStyleSelection] = useState(false);

  const groupedCharacters = characters.reduce((acc, char) => {
    const key = char.persona_type;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(char);
    return acc;
  }, {} as Record<string, Character[]>);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setSelectedStyles(character.comedy_styles);
    setShowStyleSelection(true);
  };

  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => {
      if (prev.includes(style)) {
        return prev.filter((s) => s !== style);
      } else if (prev.length < 3) {
        return [...prev, style];
      }
      return prev;
    });
  };

  const handleStartChat = () => {
    if (selectedCharacter) {
      onSelect(selectedCharacter, selectedStyles.length > 0 ? selectedStyles : undefined);
    }
  };

  return (
    <div className="character-selector">
      <div className="characters-grid">
        {Object.entries(groupedCharacters).map(([personaType, chars]) => (
          <div key={personaType} className="persona-group">
            <h3 className="persona-title">{personaType.replace('_', ' ').toUpperCase()}</h3>
            <div className="characters-row">
              {chars.map((char) => (
                <button
                  key={char.id}
                  className={`character-card ${selectedCharacter?.id === char.id ? 'selected' : ''}`}
                  onClick={() => handleCharacterSelect(char)}
                >
                  <div className="character-avatar">
                    {char.gender === 'male' ? '👨' : '👩'}
                  </div>
                  <div className="character-name">{char.name}</div>
                  <div className="character-gender">{char.gender}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showStyleSelection && selectedCharacter && (
        <div className="style-selection">
          <h3>Choose Comedy Styles (up to 3)</h3>
          <p className="style-hint">
            Current: {selectedCharacter.comedy_styles.join(', ')} (default)
          </p>
          <div className="styles-grid">
            {COMEDY_STYLES.map((style) => (
              <button
                key={style}
                className={`style-btn ${selectedStyles.includes(style) ? 'selected' : ''}`}
                onClick={() => handleStyleToggle(style)}
                disabled={!selectedStyles.includes(style) && selectedStyles.length >= 3}
              >
                {style.replace('_', ' ')}
              </button>
            ))}
          </div>
          <button
            className="start-chat-btn"
            onClick={handleStartChat}
            disabled={selectedStyles.length === 0}
          >
            Start Chat
          </button>
        </div>
      )}
    </div>
  );
}

