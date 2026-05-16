// src/pages/ResetPasswordPage.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css'; // On réutilise les styles

export default function ResetPasswordPage({ onBack, hideBackLink }) {
  const { resetPassword } = useAuth();
  
  const query = new URLSearchParams(window.location.search);
  const [token]   = useState(query.get('token') || '');
  const [email]   = useState(query.get('email') || '');
  
  const [password, setPassword]         = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError]               = useState('');
  const [success, setSuccess]           = useState('');
  const [loading, setLoading]           = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmation) return setError('Les mots de passe ne correspondent pas.');
    
    setError('');
    setLoading(true);

    try {
      await resetPassword(email, token, password, confirmation);
      setSuccess('Mot de passe réinitialisé avec succès !');
      setTimeout(onBack, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <div className="login-panel" style={{ margin: 'auto', flex: 'none', width: '450px' }}>
        {!hideBackLink && (
          <button onClick={onBack} className="back-link" style={{ background: 'none', border: 'none', padding: 0 }}>
            ← Retour
          </button>
        )}
        <div className="login-card">
          <div className="card-header">
            <h2 className="card-title">Nouveau <span className="accent">Mot de passe</span></h2>
            <p className="card-sub">Définissez votre nouveau secret pour {email}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="field-group">
              <label>NOUVEAU MOT DE PASSE</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <div className="field-group">
              <label>CONFIRMATION</label>
              <input 
                type="password" 
                value={confirmation} 
                onChange={e => setConfirmation(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && <div className="error-banner">{error}</div>}
            {success && <div className="success-banner">{success}</div>}

            <button type="submit" className="btn-connect" disabled={loading}>
              {loading ? 'Réinitialisation...' : 'Changer le mot de passe'}
            </button>
            {!hideBackLink && (
              <button type="button" className="forgot-btn" onClick={onBack} style={{ marginTop: '1rem' }}>
                Retour à la connexion
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
