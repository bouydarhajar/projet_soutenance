// src/App.jsx
import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage  from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ResetPasswordPage from './pages/ResetPasswordPage';

function AppRoutes() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState('home');

  // Si on a un token dans l'URL, on affiche la page de réinitialisation
  const isReset = window.location.search.includes('token=');

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'DM Sans, sans-serif',
        color: '#7A6552',
        background: '#FBF6EF',
        fontSize: '1rem',
      }}>
        Chargement…
      </div>
    );
  }

  // Utilisateur connecté → Dashboard
  if (user) return <Dashboard />;

  if (isReset) {
    return <ResetPasswordPage onBack={() => window.location.href = '/'} />;
  }

  // Navigation manuelle entre les pages publiques
  if (page === 'login') {
    return <LoginPage onBack={() => setPage('home')} />;
  }

  return <HomePage onNavigateToLogin={() => setPage('login')} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
