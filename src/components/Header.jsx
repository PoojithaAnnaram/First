import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';
import AuthModal from './AuthModal';

function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      addToast(error.message, 'error');
    } else {
      addToast('Logged out successfully', 'success');
    }
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="header-title">Court Data Fetcher</h1>
          </div>
          <div className="header-right">
            <button
              onClick={toggleTheme}
              className="icon-btn"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            {user ? (
              <>
                <span className="user-email">{user.email}</span>
                <button onClick={handleSignOut} className="btn-outline">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => openAuthModal('login')} className="btn-outline">
                  Log In
                </button>
                <button onClick={() => openAuthModal('signup')} className="btn-primary">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </>
  );
}

export default Header;
