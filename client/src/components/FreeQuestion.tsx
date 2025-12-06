import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import './FreeQuestion.css';

interface Character {
  id: number;
  name: string;
  gender: string;
  persona_type: string;
}

interface FreeQuestionProps {
  characters: Character[];
  onClose: () => void;
}

export default function FreeQuestion({ characters, onClose }: FreeQuestionProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [question, setQuestion] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuestion(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
        alert('Speech recognition error. Please try typing instead.');
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when text updates
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedText]);

  const startRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (error) {
        alert('Microphone access denied. Please enable microphone permissions.');
        setIsRecording(false);
      }
    } else {
      alert('Speech recognition not supported in your browser. Please type your question.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCharacter || !question.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    setDisplayedText('');
    setShowResponse(true);

    try {
      // Use the free question endpoint (no auth required)
      const messageRes = await api.post('/free-question', {
        characterId: selectedCharacter.id,
        question: question,
      });

      const aiResponse = messageRes.data.response;
      setResponse(aiResponse);

      // Animate text display (typewriter effect)
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < aiResponse.length) {
          setDisplayedText(aiResponse.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          // Start speaking after text is displayed
          speakResponse(aiResponse);
        }
      }, 30);

    } catch (error: any) {
      console.error('Error:', error);
      const errorMsg = error.response?.data?.error || 'Failed to get response. Please try again.';
      setResponse(errorMsg);
      setDisplayedText(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const speakResponse = (text: string) => {
    if (synthRef.current && selectedCharacter) {
      const utterance = new SpeechSynthesisUtterance(text);
      const characterName = selectedCharacter.name.toLowerCase();
      
      // Select voice settings based on character
      if (characterName.includes('brooklyn') || characterName.includes('new yorker')) {
        utterance.rate = 1.2; // Faster for New Yorker
      } else if (characterName.includes('cowboy') || characterName.includes('tex')) {
        utterance.rate = 0.9; // Slower for Cowboy
      } else if (characterName.includes('valley') || characterName.includes('brittany')) {
        utterance.pitch = 1.2; // Higher pitch for Valley Girl
      }
      
      utterance.volume = 1;
      utterance.rate = utterance.rate || 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };


  if (!selectedCharacter) {
    return (
      <div className="free-question-modal">
        <div className="free-question-content">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>Try One Question Free!</h2>
          <p className="subtitle">Choose a character to get started</p>
          
          <div className="characters-grid-free">
            {characters.map((char) => (
              <button
                key={char.id}
                className="character-card-free"
                onClick={() => setSelectedCharacter(char)}
              >
                <div className="character-emoji-free">
                  {char.gender === 'male' ? '👨' : '👩'}
                </div>
                <div className="character-name-free">{char.name}</div>
                <div className="character-type-free">{char.persona_type.replace('_', ' ')}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="free-question-modal">
      <div className="free-question-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="selected-character-header">
          <button className="back-btn" onClick={() => setSelectedCharacter(null)}>← Back</button>
          <div className="character-info-free">
            <span className="character-emoji-small">
              {selectedCharacter.gender === 'male' ? '👨' : '👩'}
            </span>
            <span className="character-name-header">{selectedCharacter.name}</span>
          </div>
        </div>

        {!showResponse ? (
          <form onSubmit={handleSubmit} className="question-form">
            <label htmlFor="question">Ask your question:</label>
            <div className="input-group">
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question or use the microphone..."
                rows={4}
                disabled={isLoading}
                className="question-input"
              />
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`mic-btn ${isRecording ? 'recording' : ''}`}
                disabled={isLoading}
                title={isRecording ? 'Stop recording' : 'Record voice'}
              >
                🎤
              </button>
            </div>
            {isRecording && (
              <div className="recording-indicator">
                <span className="pulse"></span>
                Recording... Speak now!
              </div>
            )}
            <button
              type="submit"
              disabled={!question.trim() || isLoading}
              className="submit-question-btn"
            >
              {isLoading ? 'Getting Response...' : 'Ask Question'}
            </button>
          </form>
        ) : (
          <div className="response-container">
            <div className="response-header">
              <h3>{selectedCharacter.name}'s Response:</h3>
              <div className="audio-controls">
                {isSpeaking ? (
                  <button onClick={stopSpeaking} className="stop-audio-btn">
                    ⏸ Stop
                  </button>
                ) : (
                  <button onClick={() => speakResponse(response)} className="play-audio-btn">
                    ▶ Play
                  </button>
                )}
              </div>
            </div>
            <div className="scrolling-text" ref={scrollRef}>
              {displayedText || response}
              {isLoading && <span className="typing-cursor">|</span>}
            </div>
            <div className="response-actions">
              <button
                onClick={() => {
                  setShowResponse(false);
                  setQuestion('');
                  setResponse('');
                  setDisplayedText('');
                  stopSpeaking();
                }}
                className="ask-another-btn"
              >
                Ask Another Question
              </button>
              <Link to="/register" className="signup-cta-btn">
                Sign Up for Unlimited Questions
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

