import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Marches.css';

export default function Marches() {
  const { token } = useAuth();
  const [marches, setMarches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pour l'ajout rapide
  const [showAddForm, setShowAddForm] = useState(false);
  const [nouveauTitre, setNouveauTitre] = useState('');
  const [nouvelleDesc, setNouvelleDesc] = useState('');

  const API_URL = 'http://127.0.0.1:8000/api/marches';

  useEffect(() => {
    fetchMarches();
  }, []);

  const fetchMarches = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setMarches(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAjouter = async (e) => {
    e.preventDefault();
    if (!nouveauTitre) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ titre: nouveauTitre, description: nouvelleDesc })
      });

      if (res.ok) {
        const data = await res.json();
        setMarches([data, ...marches]);
        setNouveauTitre('');
        setNouvelleDesc('');
        setShowAddForm(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="marches-container">
      <div className="marches-header">
        <h2>Gestion des Marchés</h2>
        <button className="btn-add" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Fermer' : '+ Ajouter un marché'}
        </button>
      </div>

      {showAddForm && (
        <form className="add-marche-form" onSubmit={handleAjouter}>
          <input
            type="text"
            placeholder="Titre du marché"
            value={nouveauTitre}
            onChange={e => setNouveauTitre(e.target.value)}
            required
          />
          <textarea
            placeholder="Description (optionnelle)"
            value={nouvelleDesc}
            onChange={e => setNouvelleDesc(e.target.value)}
          />
          <button type="submit" className="btn-save">Enregistrer</button>
        </form>
      )}

      {loading ? (
        <p>Chargement des marchés...</p>
      ) : marches.length === 0 ? (
        <p className="no-data">Aucun marché trouvé. Ajoutez-en un !</p>
      ) : (
        <div className="marches-grid">
          {marches.map(marche => (
            <div key={marche.id} className="marche-card">
              <h3>{marche.titre}</h3>
              <p className="marche-status">
                Statut: <span className="badge-status">{marche.statut}</span>
              </p>
              <div className="marche-actions">
                <button className="btn-action btn-view">Voir détails</button>
                <button className="btn-action btn-open">Ouvrir</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
