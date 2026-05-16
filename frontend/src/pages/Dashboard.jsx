// src/pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const ROLE_LABELS = {
  admin:      'Administrateur',

};

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-root">
      <header className="dash-header">
        <div className="dash-brand">
          <span className="brand-dot" />
          IntarNet <span className="accent">Stock</span>
        </div>

        <div className="dash-user">
          <div className="user-info">
            <span className="user-name">{user?.prenom} {user?.nom}</span>
            <span className="user-role">{ROLE_LABELS[user?.role] || user?.role}</span>
          </div>
          <button className="btn-logout" onClick={logout}>
            Déconnexion
          </button>
        </div>
      </header>

      <main className="dash-main">
        <div className="welcome-card">
          <div className="welcome-icon">🏫</div>
          <h1>Bienvenue, <span className="accent">{user?.prenom}</span> !</h1>
          <p>
            Vous êtes connecté en tant que <strong>{ROLE_LABELS[user?.role]}</strong>.
            <br />
            Dernière connexion : {user?.derniere_connexion || 'Première connexion'}
          </p>

          <div className="user-card">
            <div className="user-detail">
              <span>Nom complet</span>
              <strong>{user?.prenom} {user?.nom}</strong>
            </div>
            <div className="user-detail">
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>
            <div className="user-detail">
              <span>Rôle</span>
              <strong className="role-badge">{ROLE_LABELS[user?.role]}</strong>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
