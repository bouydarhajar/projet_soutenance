import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';
import Marches from './Marches';
import ResetPasswordPage from './ResetPasswordPage';

const ROLE_LABELS = {
  admin:      'Administrateur',
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('marches');

  return (
    <div className="dashboard-root layout-sidebar">
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <span className="brand-dot" />
          IntarNet <span className="accent">Stock</span>
        </div>

        <nav className="dash-nav">
          <button 
            className={`nav-btn ${activeTab === 'marches' ? 'active' : ''}`}
            onClick={() => setActiveTab('marches')}
          >
            Marchés
          </button>
          <button 
            className={`nav-btn ${activeTab === 'statistiques' ? 'active' : ''}`}
            onClick={() => setActiveTab('statistiques')}
          >
            Statistiques
          </button>
          <button 
            className={`nav-btn ${activeTab === 'motdepasse' ? 'active' : ''}`}
            onClick={() => setActiveTab('motdepasse')}
          >
            Mot de passe
          </button>
        </nav>

        <div className="dash-user">
          <div className="user-info">
            <span className="user-name">{user?.prenom} {user?.nom}</span>
            <span className="user-role">{ROLE_LABELS[user?.role] || user?.role}</span>
          </div>
          <button className="btn-logout" onClick={logout}>
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="dash-main">
        {activeTab === 'marches' && <Marches />}
        
        {activeTab === 'statistiques' && (
          <div className="welcome-card">
            <div className="welcome-icon">📊</div>
            <h1>Statistiques</h1>
            <p>Module de statistiques en cours de développement.</p>
          </div>
        )}

        {activeTab === 'motdepasse' && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '600px', border: '1px solid var(--border)' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--dark)', fontFamily: 'Playfair Display, serif' }}>Changer le mot de passe</h2>
            <ResetPasswordPage hideBackLink={true} />
          </div>
        )}
      </main>
    </div>
  );
}
