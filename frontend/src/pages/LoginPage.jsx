// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const ROLES = ['Admin'];

export default function LoginPage() {
  const { login, forgotPassword } = useAuth();

  const [email, setEmail]           = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [remember, setRemember]     = useState(false);

  // Charger l'email sauvegardé au montage
  useEffect(() => {
    const savedEmail = localStorage.getItem('remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const [role, setRole]             = useState('Admin');
  const [view, setView]             = useState('login'); // 'login' | 'forgot'
  const [error, setError]           = useState('');
  const [success, setSuccess]       = useState('');
  const [loading, setLoading]       = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (view === 'login') {
        await login(email, motDePasse, remember);
        
        // Gérer la sauvegarde de l'email pour le pré-remplissage futur
        if (remember) {
          localStorage.setItem('remembered_email', email);
        } else {
          localStorage.removeItem('remembered_email');
        }
      } else {
        const res = await forgotPassword(email);
        setSuccess(res.message);
        setView('login');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      {/* ── Panneau gauche (hero) ── */}
      <div className="login-hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-brand">
            <span className="brand-dot" />
            <span className="brand-name">InterNat Stock</span>
          </div>

          <div className="hero-badge">
            <span>SYSTÈME DE GESTION</span>
          </div>

          <h1 className="hero-title">
            Gérez votre stock<br />avec précision
          </h1>
          <p className="hero-sub">
            Plateforme complète pour les internats — marchés publics,
            stock, finances et production alimentaire.
          </p>

          <ul className="hero-features">
            {[
              'Calcul automatique HT / TVA / TTC',
              'Suivi stock en temps réel avec alertes',
              'Génération de documents officiels PDF',
            ].map((f) => (
              <li key={f}>
                <span className="feat-dot" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Panneau droit (formulaire) ── */}
      <div className="login-panel">
        <a href="/" className="back-link">← Retour à l'accueil</a>

        <div className="login-card">
          <div className="card-header">
            <h2 className="card-title">
              InterNat <span className="accent">Stock</span>
            </h2>
            <p className="card-sub">
              {view === 'login' ? 'Connectez-vous à votre espace' : 'Récupération de mot de passe'}
            </p>
          </div>

          {/* Onglets */}
          <div className="tabs">
            <button 
              className={`tab ${view === 'login' ? 'active' : ''}`}
              onClick={() => { setView('login'); setError(''); setSuccess(''); }}
            >
              Connexion
            </button>
            <button 
              className={`tab ${view === 'forgot' ? 'active' : ''}`}
              onClick={() => { setView('forgot'); setError(''); setSuccess(''); }}
            >
              Mot de passe oublié
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {/* Email */}
            <div className="field-group">
              <label htmlFor="email">IDENTIFIANT (EMAIL)</label>
              <input
                id="email"
                type="email"
                placeholder="ex: admin@intarnet.ma"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            {view === 'login' && (
              <>
                {/* Mot de passe */}
                <div className="field-group">
                  <label htmlFor="password">MOT DE PASSE</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>

                {/* Remember Me & Forgot Password Link */}
                <div className="login-options">
                  <label className="remember-me">
                    <input 
                      type="checkbox" 
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    <span>Se souvenir de moi</span>
                  </label>
                  <button 
                    type="button" 
                    className="forgot-btn"
                    onClick={() => setView('forgot')}
                  >
                    Oublié ?
                  </button>
                </div>

                {/* Rôle */}
                <div className="field-group">
                  <label>RÔLE</label>
                  <div className="role-pills">
                    {ROLES.map((r) => (
                      <button
                        key={r}
                        type="button"
                        className={`role-pill ${role === r ? 'active' : ''}`}
                        onClick={() => setRole(r)}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Erreur / Succès */}
            {error && <div className="error-banner">{error}</div>}
            {success && <div className="success-banner">{success}</div>}

            {/* Bouton */}
            <button
              type="submit"
              className={`btn-connect ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner" />
              ) : (
                view === 'login' ? 'Se connecter →' : 'Envoyer le lien →'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
