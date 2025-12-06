import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import './FreeQuestion.css';

interface FreeQuestionProps {
  onClose: () => void;
}

export default function FreeQuestion({ onClose }: FreeQuestionProps) {
  const [question, setQuestion] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [characterName, setCharacterName] = useState('Your Crazy Friend');
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Try to load a character, but don't block if it fails
    const loadDefaultCharacter = async () => {
      try {
        const res = await api.get('/characters', { timeout: 5000 });
        const chars = res.data.characters || res.data || [];
        if (chars.length > 0) {
          // Use first character as default
          setCharacterName(chars[0].name);
        }
      } catch (error) {
        // Silently fail - use default name
        console.log('Using default character name');
      }
    };
    loadDefaultCharacter();

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
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    setDisplayedText('');
    setShowResponse(true);

    try {
      // Try to get a character first, or use default ID
      let characterId = 1; // Default to first character
      try {
        const charsRes = await api.get('/characters', { timeout: 3000 });
        const chars = charsRes.data.characters || charsRes.data || [];
        if (chars.length > 0) {
          characterId = chars[0].id;
          setCharacterName(chars[0].name);
        }
      } catch (err) {
        // Use default character ID
        console.log('Using default character ID');
      }

      console.log('Sending question to API:', { 
        characterId, 
        question: question.substring(0, 50) + '...',
        apiUrl: api.defaults.baseURL 
      });

      // Use the free question endpoint (no auth required)
      const messageRes = await api.post('/free-question', {
        characterId: characterId,
        question: question,
      }, {
        timeout: 30000, // 30 second timeout for AI response
      });
      
      console.log('API response received:', messageRes.data);

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
          // Start speaking after text is fully displayed
          setTimeout(() => {
            speakResponse(aiResponse);
          }, 500);
        }
      }, 30);

    } catch (error: any) {
      console.error('Error getting response:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        request: error.request,
        config: error.config?.url
      });
      
      let errorMsg = 'Failed to get response. ';
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMsg += 'Backend not found (404). The Railway service may not be running. Please check Railway dashboard.';
        } else if (error.response.status === 500) {
          errorMsg += 'Server error (500). Please check Railway logs.';
        } else {
          errorMsg += error.response.data?.error || `Error ${error.response.status}. Check console for details.`;
        }
      } else if (error.request) {
        errorMsg += 'Cannot connect to server. The backend at ' + (api.defaults.baseURL || '/api') + ' is not responding. Please check if Railway service is running.';
      } else if (error.message) {
        errorMsg += error.message + '. Check browser console for details.';
      } else {
        errorMsg += 'Unknown error. Check browser console (F12) for details.';
      }
      
      setResponse(errorMsg);
      setDisplayedText(errorMsg);
      
      // Still try to speak the error message
      speakResponse(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const speakResponse = (text: string) => {
    if (synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      const name = characterName.toLowerCase();
      
      // Select voice settings based on character name
      if (name.includes('brooklyn') || name.includes('new yorker')) {
        utterance.rate = 1.2; // Faster for New Yorker
      } else if (name.includes('cowboy') || name.includes('tex')) {
        utterance.rate = 0.9; // Slower for Cowboy
      } else if (name.includes('valley') || name.includes('brittany')) {
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


  return (
    <div className="free-question-modal">
      <div className="free-question-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="selected-character-header">
          <div className="character-info-free">
            <span className="character-emoji-small">🤪</span>
            <span className="character-name-header">{characterName}</span>
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
                placeholder="Type your question or click the microphone to speak..."
                rows={4}
                disabled={isLoading || isRecording}
                className="question-input"
              />
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`mic-btn ${isRecording ? 'recording' : ''}`}
                disabled={isLoading}
                title={isRecording ? 'Stop recording' : 'Click to speak your question'}
                aria-label={isRecording ? 'Stop recording' : 'Start voice recording'}
              >
                {isRecording ? '🔴' : '🎤'}
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
              disabled={!question.trim() || isLoading || isRecording}
              className="submit-question-btn"
            >
              {isLoading ? 'Getting Response...' : 'Ask Question'}
            </button>
          </form>
        ) : (
          <div className="response-container">
            <div className="response-header">
              <h3>{characterName}'s Response:</h3>
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

