import { useEffect, useRef } from 'react';
import './MessageList.css';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  is_voice?: boolean;
  created_at: string;
}

interface MessageListProps {
  messages: Message[];
  onFeedback: (messageId: number, type: string) => void;
  isLoading: boolean;
}

export default function MessageList({ messages, onFeedback, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="message-list">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
        >
          <div className="message-content">
            {message.content}
          </div>
          {message.role === 'assistant' && (
            <button
              className="funny-btn"
              onClick={() => onFeedback(message.id, 'funny')}
              title="This is funny!"
            >
              😂
            </button>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="message assistant-message">
          <div className="message-content loading">
            <span className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

