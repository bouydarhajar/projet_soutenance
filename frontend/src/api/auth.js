// src/api/auth.js
// Compatible CRA (process.env) ET Vite (import.meta.env)

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
  (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) ||
  'http://127.0.0.1:8000/api';

/**
 * Effectue la connexion d'un utilisateur
 * @param {string} email
 * @param {string} mot_de_passe
 * @returns {Promise<{token: string, user: object}>}
 */
export async function login(email, mot_de_passe, remember = false) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, mot_de_passe, remember }),
  });

  const data = await response.json();

  if (!response.ok) {
    // Extraire le premier message d'erreur du validator Laravel
    const firstError =
      data?.errors?.email?.[0] ||
      data?.errors?.mot_de_passe?.[0] ||
      data?.message ||
      'Erreur de connexion.';
    throw new Error(firstError);
  }

  return data; // { success, token, user, message }
}

/**
 * Déconnecte l'utilisateur courant
 * @param {string} token
 */
export async function logout(token) {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
}

/**
 * Récupère le profil de l'utilisateur connecté
 * @param {string} token
 * @returns {Promise<object>}
 */
export async function getMe(token) {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Session expirée.');
  }

  return data.user;
}

/**
 * Demander un lien de réinitialisation de mot de passe
 * @param {string} email
 */
export async function forgotPassword(email) {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erreur lors de l\'envoi du lien.');
  return data;
}

/**
 * Réinitialiser le mot de passe avec le token
 */
export async function resetPassword(email, token, mot_de_passe, mot_de_passe_confirmation) {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      email,
      token,
      mot_de_passe,
      mot_de_passe_confirmation,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erreur lors de la réinitialisation.');
  return data;
}

/**
 * Mettre à jour le profil
 */
export async function updateProfile(token, userData) {
  const response = await fetch(`${API_BASE_URL}/auth/update-profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erreur lors de la mise à jour.');
  return data;
}

/**
 * Modifier le mot de passe
 */
export async function updatePassword(token, passwordData) {
  const response = await fetch(`${API_BASE_URL}/auth/update-password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(passwordData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erreur lors du changement de mot de passe.');
  return data;
}