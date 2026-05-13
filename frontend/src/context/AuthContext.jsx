import { createContext, useContext, useState, useEffect } from 'react';
import { 
  login as apiLogin, 
  logout as apiLogout, 
  getMe,
  forgotPassword as apiForgotPassword,
  resetPassword as apiResetPassword,
  updateProfile as apiUpdateProfile,
  updatePassword as apiUpdatePassword
} from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(() => {
    return localStorage.getItem('intarnet_token') || sessionStorage.getItem('intarnet_token');
  });
  const [loading, setLoading] = useState(true);

  // Vérifier la session au montage
  useEffect(() => {
    if (token) {
      getMe(token)
        .then(setUser)
        .catch(() => {
          setToken(null);
          localStorage.removeItem('intarnet_token');
          sessionStorage.removeItem('intarnet_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, mot_de_passe, remember = false) => {
    const data = await apiLogin(email, mot_de_passe);
    
    if (remember) {
      localStorage.setItem('intarnet_token', data.token);
    } else {
      sessionStorage.setItem('intarnet_token', data.token);
    }

    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      if (token) await apiLogout(token);
    } catch (_) {
      // Ignorer
    } finally {
      localStorage.removeItem('intarnet_token');
      sessionStorage.removeItem('intarnet_token');
      setToken(null);
      setUser(null);
    }
  };

  const forgotPassword = async (email) => {
    return await apiForgotPassword(email);
  };

  const resetPassword = async (email, token, mdp, mdpConf) => {
    return await apiResetPassword(email, token, mdp, mdpConf);
  };

  const updateProfile = async (userData) => {
    const data = await apiUpdateProfile(token, userData);
    setUser(data.user);
    return data.user;
  };

  const updatePassword = async (passwordData) => {
    return await apiUpdatePassword(token, passwordData);
  };

  return (
    <AuthContext.Provider value={{ 
      user, token, loading, login, logout, forgotPassword, resetPassword, 
      updateProfile, updatePassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
