import React from "react";
import { Link } from "react-router-dom";
import { useStoreSettings } from "@/contexts/StoreSettingsContext";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const Footer: React.FC = () => {
  const { settings } = useStoreSettings();
  
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("/categories").then(res => res.data),
  });

  return (
    <footer className="store-footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand + Description + Social */}
          <div className="footer-brand">
            <span className="store-logo" style={{ color: "var(--primary)" }}>
              {settings.store_name}
            </span>
            <p>Votre boutique de confiance en Tunisie. Spécialiste des huiles moteurs et accessoires automobiles de haute qualité.</p>

            {/* Contact Info */}
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {settings.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "#94a3b8", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
                >
                  <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.77 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.68 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 5.27 5.27l1.28-1.02a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
                  </span>
                  {settings.phone}
                </a>
              )}
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "#94a3b8", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
                >
                  <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  {settings.email}
                </a>
              )}
            </div>

            {/* Social Links */}
            {(settings.facebook_url || settings.instagram_url) && (
              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                {settings.facebook_url && (
                  <a
                    href={settings.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label="Facebook"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                )}
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label="Instagram"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4>Catégories</h4>
            {categories ? (categories.slice(0, 5).map((cat: any) => (
              <Link key={cat.id} to={`/categories/${cat.slug}`}>{cat.name}</Link>
            ))) : (
              <Link to="/categories">Toutes les catégories</Link>
            )}
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Boutique</h4>
            <Link to="/">Accueil</Link>
            <Link to="/categories">Catalogue</Link>
            <Link to="/cart">Mon Panier</Link>
          </div>

          {/* Admin */}
          <div className="footer-col">
            <h4>Espace Admin</h4>
            <Link to="/admin">Tableau de Bord</Link>
            <Link to="/admin/products">Gestion Produits</Link>
            <Link to="/admin/orders">Commandes</Link>
          </div>

        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} {settings.store_name}. Tous droits réservés. Spécialiste Huiles Moteurs Tunisie 🇹🇳
        </div>
      </div>
    </footer>
  );
};

export default Footer;
