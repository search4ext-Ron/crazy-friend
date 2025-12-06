import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import FreeQuestion from './FreeQuestion';
import './Layout.css';

export default function Layout() {
  const { token, clearAuth } = useAuthStore();
  const location = useLocation();
  const [showFreeQuestion, setShowFreeQuestion] = useState(false);

  const handleLogout = () => {
    clearAuth();
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🤪</span>
            <span className="logo-text">Crazy Friend</span>
          </Link>
          
          <nav className="nav">
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}
            >
              About
            </Link>
            <Link 
              to="/faq" 
              className={location.pathname === '/faq' ? 'active' : ''}
            >
              FAQ
            </Link>
            
            <button 
              onClick={() => {
                console.log('Button clicked, opening modal');
                setShowFreeQuestion(true);
              }} 
              className="free-question-btn"
              type="button"
            >
              Ask Me Something
            </button>
            
            {token ? (
              <>
                <Link 
                  to="/chat" 
                  className={location.pathname === '/chat' ? 'active' : ''}
                >
                  Chat
                </Link>
                <Link 
                  to="/profile" 
                  className={location.pathname === '/profile' ? 'active' : ''}
                >
                  Profile
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register" className="register-btn">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      {showFreeQuestion && (
        <FreeQuestion 
          onClose={() => {
            console.log('Closing modal');
            setShowFreeQuestion(false);
          }} 
        />
      )}

      <footer className="footer">
        <div className="footer-content">
          <p className="disclaimer">
            ⚠️ The advice provided by this chatbot is for Entertainment Purposes Only 
            and is not a substitute for professional counsel.
          </p>
          <p>&copy; 2024 Crazy Friend. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

