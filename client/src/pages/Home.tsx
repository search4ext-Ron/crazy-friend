import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import FreeQuestion from '../components/FreeQuestion';
import './Home.css';

export default function Home() {
  const { token } = useAuthStore();
  const [showFreeQuestion, setShowFreeQuestion] = useState(false);

  return (
    <div className="home-container">
      <section className="hero">
        <div className="characters-display">
          <div className="character-emoji">👨‍💼</div>
          <div className="character-emoji">🤠</div>
          <div className="character-emoji">👩‍🎤</div>
          <div className="character-emoji">🧘</div>
          <div className="character-emoji">👨‍🎨</div>
        </div>
        <h1 className="hero-title">Crazy Friend</h1>
        <p className="hero-subtitle">
          Where terrible life decisions meet absolutely unhinged AI advice
        </p>
        <p className="hero-description">
          Look, we get it. Your real friends are too busy (or too smart) to give you advice. 
          That's where we come in! Meet your new crew of AI characters who have zero filter, 
          questionable judgment, and the comedic timing of a stand-up comedian on espresso. 
          Whether you're debating pineapple on pizza or questioning your entire life choices, 
          our characters will give you advice so hilariously bad it's good. 
          Each one has their own personality, accent, and special brand of chaos. 
          Warning: Side effects may include uncontrollable laughter, questioning your sanity, 
          and wanting to chat with AI more than actual humans. You've been warned! 😂
        </p>
        {!token && (
          <div className="hero-actions">
            <button
              onClick={() => setShowFreeQuestion(true)}
              className="cta-button primary free-question-btn"
            >
              🎁 Try One Question Free
            </button>
            <Link to="/register" className="cta-button secondary">
              Get Started Free
            </Link>
            <Link to="/login" className="cta-button secondary">
              Login
            </Link>
          </div>
        )}
        {token && (
          <div className="hero-actions">
            <Link to="/chat" className="cta-button primary">
              Start Chatting
            </Link>
          </div>
        )}
      </section>

      <section className="features">
        <h2>Why Your Real Friends Sent You Here</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎭</div>
            <h3>Diverse Characters</h3>
            <p>
              Choose from multiple personas including The New Yorker, The Redneck, 
              The Cowboy, The Valley Girl, and The Portlandia Hipster.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎤</div>
            <h3>Voice & Text</h3>
            <p>
              Interact via text or voice input. See real-time visualizations of 
              your voice and AI responses.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">😂</div>
            <h3>10+ Comedy Styles</h3>
            <p>
              From observational to surreal, dark to deadpan. AI automatically 
              suggests styles based on your profile.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Personalized</h3>
            <p>
              Responses adapt to your age, location, and preferences. The AI 
              learns what makes you laugh.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>
              Your data is encrypted and protected. We prioritize your privacy 
              and security.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>PWA Ready</h3>
            <p>
              Install as an app on your phone. Works offline and provides a 
              native app experience.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Make Questionable Life Choices?</h2>
        <p>Join thousands of people who've given up on good advice and embraced the chaos. Your future self will thank you... probably. 😅</p>
        {!token && (
          <Link to="/register" className="cta-button primary large">
            Sign Up Free
          </Link>
        )}
      </section>

      {showFreeQuestion && (
        <FreeQuestion
          onClose={() => setShowFreeQuestion(false)}
        />
      )}
    </div>
  );
}

