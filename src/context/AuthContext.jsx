import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

const STORAGE_KEY = 'luxe_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const openAuth = useCallback((action = null) => {
    setPendingAction(action);
    setShowAuthModal(true);
  }, []);

  const closeAuth = useCallback(() => {
    setShowAuthModal(false);
    setPendingAction(null);
  }, []);

  const login = useCallback((userData) => {
    const u = { name: userData.name || userData.email.split('@')[0], email: userData.email };
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setShowAuthModal(false);
    // execute pending action if any
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  const signup = useCallback((userData) => {
    const u = { name: userData.name, email: userData.email };
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setShowAuthModal(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, showAuthModal, openAuth, closeAuth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
