// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import './HomePage.css';

export default function HomePage({ onNavigateToLogin }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="home-root">
      {/* ── NAVBAR ── */}
      <nav className={`home-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-brand">
          <span className="brand-dot" />
          <span className="brand-name">Internat Stock</span>
        </div>
        <button className="nav-btn-connect" onClick={onNavigateToLogin}>
          Se connecter
        </button>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="hero-bg-overlay" />

        <div className="hero-body">
          <div className="hero-badge">
            <span className="badge-dot" />
            GESTION DES MARCHÉS PUBLICS ALIMENTAIRES
          </div>

          <h1 className="hero-heading">
            Stock &amp; <br />
            <em>Marchés</em><br />
            Centralisés
          </h1>

          <p className="hero-description">
            Digitalisez la gestion complète de votre internat — fournisseurs,
            commandes, livraisons, stock, menus et finances en un seul endroit.
          </p>

          <button className="hero-cta" onClick={onNavigateToLogin}>
            Commencer maintenant →
          </button>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section className="features-section">
        <div className="features-inner">
          <div className="section-label">POURQUOI INTERNAT STOCK ?</div>
          <h2 className="section-title">
            Tout ce dont votre internat<br />a besoin
          </h2>

          <div className="features-grid">
            {[
              {  title: 'Marchés Publics', desc: 'Gérez vos appels d\'offres, fournisseurs et contrats en toute conformité.' },
              { title: 'Stock en Temps Réel', desc: 'Suivi des entrées/sorties avec alertes automatiques de seuil critique.' },
              { title: 'Finances & TVA', desc: 'Calcul automatique HT / TVA / TTC et génération de factures PDF.' },
              {  title: 'Production Alimentaire', desc: 'Planification des menus et gestion des rations par internat.' },
              { title: 'Documents Officiels', desc: 'Bons de livraison, PV de réception et rapports en un clic.' },
              { title: 'Multi-Rôles', desc: 'Intendant, Comptable, Directeur — chacun son espace dédié.' },
            ].map((f) => (
              <div className="feature-card" key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2>Prêt à digitaliser votre internat ?</h2>
          <p>Connectez-vous à votre espace de gestion dès maintenant.</p>
          <button className="hero-cta" onClick={onNavigateToLogin}>
            Accéder à la plateforme →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="home-footer">
        <div className="footer-brand">
          <span className="brand-dot" />
          IntarNet Stock
        </div>
        <span className="footer-copy">© 2026 IntarNet Stock. Tous droits réservés.</span>
      </footer>
    </div>
  );
}
