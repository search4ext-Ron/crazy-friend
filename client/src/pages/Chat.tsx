import { useState, useEffect, useRef } from 'react';
import api from '../api/client';
import { useAuthStore } from '../store/authStore';
import VoiceVisualizer from '../components/VoiceVisualizer';
import MessageList from '../components/MessageList';
import CharacterSelector from '../components/CharacterSelector';
import './Chat.css';

interface Character {
  id: number;
  name: string;
  gender: string;
  persona_type: string;
  comedy_styles: string[];
}

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  is_voice?: boolean;
  created_at: string;
}

export default function Chat() {
  const { userId: _userId } = useAuthStore();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const res = await api.get('/characters');
      setCharacters(res.data.characters);
    } catch (error) {
      console.error('Failed to load characters:', error);
    }
  };

  const startSession = async (characterId: number, comedyStyles?: string[]) => {
    try {
      const res = await api.post('/chat/session', { characterId, comedyStyles });
      setSessionId(res.data.sessionId);
      setSelectedCharacter(res.data.character);
      setMessages([]);
      setSessionEnded(false);
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const sendMessage = async (text: string, isVoice = false) => {
    if (!sessionId || !text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: text,
      is_voice: isVoice,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await api.post('/chat/message', {
        sessionId,
        message: text,
        isVoice,
      });

      if (res.data.sessionEnded) {
        setSessionEnded(true);
        // Haptic feedback for crisis response
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200, 100, 200]);
        }
      }

      const assistantMessage: Message = {
        id: res.data.messageId,
        role: 'assistant',
        content: res.data.response,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Haptic feedback for message received
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    } catch (error: any) {
      console.error('Failed to send message:', error);
      if (error.response?.data?.limitReached) {
        alert('Daily message limit reached. Upgrade to premium for unlimited chats.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        // In production, send audio to speech-to-text API
        // For now, we'll use a placeholder
        const text = await transcribeAudio(audioBlob);
        if (text) {
          sendMessage(text, true);
        }
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Microphone access denied. Please enable microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (_audioBlob: Blob): Promise<string> => {
    // Placeholder - in production, use a speech-to-text API
    // For now, return a mock transcription
    return 'Mock transcription - implement speech-to-text API';
  };

  const handleFeedback = async (messageId: number, type: string) => {
    try {
      await api.post('/chat/feedback', {
        messageId,
        sessionId,
        feedbackType: type,
      });

      // Haptic feedback for funny response
      if (navigator.vibrate && type === 'funny') {
        navigator.vibrate([100, 50, 100, 50, 100, 50, 200]);
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  if (!selectedCharacter) {
    return (
      <div className="chat-container">
        <div className="character-selection">
          <h2>Choose Your Crazy Friend</h2>
          <CharacterSelector
            characters={characters}
            onSelect={(character, styles) => startSession(character.id, styles)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="character-info">
          <h2>{selectedCharacter.name}</h2>
          <span className="persona-badge">{selectedCharacter.persona_type.replace('_', ' ')}</span>
        </div>
        <button
          className="change-character-btn"
          onClick={() => {
            setSelectedCharacter(null);
            setSessionId(null);
            setMessages([]);
          }}
        >
          Change Character
        </button>
      </div>

      {sessionEnded && (
        <div className="crisis-alert">
          <p>⚠️ If you're in crisis, please call {import.meta.env.VITE_CRISIS_HOTLINE || '988'}</p>
        </div>
      )}

      <div className="chat-warning">
        ⚠️ The advice provided is for Entertainment Purposes Only
      </div>

      <MessageList
        messages={messages}
        onFeedback={handleFeedback}
        isLoading={isLoading}
      />

      <VoiceVisualizer isRecording={isRecording} />

      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message or use voice..."
            disabled={isLoading || sessionEnded}
            className="chat-input"
          />
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`voice-btn ${isRecording ? 'recording' : ''}`}
            disabled={isLoading || sessionEnded}
          >
            🎤
          </button>
        </div>
        <button
          type="submit"
          disabled={!input.trim() || isLoading || sessionEnded}
          className="send-btn"
        >
          Send
        </button>
      </form>
    </div>
  );
}

