import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { StoreSettingsService, StoreSettings } from "@/lib/services";
import { Save, Upload, Image as ImageIcon, X, Check, Globe, Palette, Layout, Facebook, Instagram } from "lucide-react";
import { toast } from "sonner";

const StoreSettingsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery<StoreSettings>({
    queryKey: ["store-settings"],
    queryFn: StoreSettingsService.get
  });

  const [formData, setFormData] = useState<Partial<StoreSettings>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
      if (settings.logo_url) setLogoPreview(settings.logo_url.startsWith('http') || settings.logo_url.startsWith('data:') ? settings.logo_url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${settings.logo_url}`);
      if (settings.banner_image_url) setBannerPreview(settings.banner_image_url.startsWith('http') || settings.banner_image_url.startsWith('data:') ? settings.banner_image_url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${settings.banner_image_url}`);
    }
  }, [settings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La taille du fichier doit être inférieure à 5 Mo");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'logo') {
          setLogoFile(file);
          setLogoPreview(reader.result as string);
        } else {
          setBannerFile(file);
          setBannerPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const updateMutation = useMutation({
    mutationFn: (data: FormData) => StoreSettingsService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store-settings"] });
      toast.success("Paramètres mis à jour avec succès !");
    },
    onError: (err: any) => {
      toast.error(err.message || "Échec de la mise à jour des paramètres");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        data.append(key, value.toString());
      }
    });

    if (logoFile) data.append('logo', logoFile);
    if (bannerFile) data.append('banner', bannerFile);

    updateMutation.mutate(data);
  };

  if (isLoading) return <AdminLayout><div className="p-8 text-center">Chargement des paramètres...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Globe size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Paramètres de la Boutique</h1>
            <p className="text-sm text-muted">Personnalisez l'apparence et les réseaux sociaux de votre boutique</p>
          </div>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={updateMutation.isPending}
          className="btn btn-primary flex items-center gap-2"
        >
          {updateMutation.isPending ? "Enregistrement..." : <><Save size={18} /> Enregistrer les modifications</>}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Branding Section */}
          <section className="chart-card">
            <div className="flex items-center gap-2 mb-6">
              <Layout size={20} className="text-primary" />
              <h2 className="text-lg font-bold m-0">Identité Visuelle</h2>
            </div>
            
            <div className="form-group mb-6">
              <label>Nom de la Boutique</label>
              <input 
                name="store_name"
                className="form-input" 
                value={formData.store_name || ""} 
                onChange={handleInputChange}
                placeholder="Ex: Ma Boutique Inc."
              />
            </div>

            <div className="form-group">
              <label>Logo de la Boutique</label>
              <div className="flex items-center gap-6">
                <div style={{ position: "relative", width: "96px", height: "96px", borderRadius: "var(--radius-lg)", border: "2px dashed var(--border-strong)", background: "var(--bg-subtle)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }} />
                  ) : (
                    <ImageIcon style={{ color: "var(--fg-light)" }} size={28} />
                  )}
                  <input 
                    type="file" 
                    style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
                    onChange={(e) => handleFileChange(e, 'logo')}
                    accept="image/*"
                  />
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--fg-muted)" }}>
                  <p style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Formats PNG ou SVG</p>
                  <p>Taille recommandée : 200x50px</p>
                  <p>Taille max : 5Mo</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact & Social Section */}
          <section className="chart-card">
            <div className="flex items-center gap-2 mb-6">
              <Globe size={20} className="text-primary" />
              <h2 className="text-lg font-bold m-0">Contact &amp; Réseaux Sociaux</h2>
            </div>

            <div className="form-group">
              <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.77 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.68 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 5.27 5.27l1.28-1.02a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
                Numéro de Téléphone
              </label>
              <input
                name="phone"
                className="form-input"
                value={formData.phone || ""}
                onChange={handleInputChange}
                placeholder="+216 XX XXX XXX"
              />
            </div>

            <div className="form-group">
              <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Adresse Email
              </label>
              <input
                name="email"
                type="email"
                className="form-input"
                value={formData.email || ""}
                onChange={handleInputChange}
                placeholder="contact@votreboutique.tn"
              />
            </div>

            <div className="form-group">
              <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Facebook size={14} className="text-blue-600" /> Facebook
              </label>
              <input
                name="facebook_url"
                className="form-input"
                value={formData.facebook_url || ""}
                onChange={handleInputChange}
                placeholder="https://facebook.com/votre-boutique"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Instagram size={14} className="text-pink-600" /> Instagram
              </label>
              <input
                name="instagram_url"
                className="form-input"
                value={formData.instagram_url || ""}
                onChange={handleInputChange}
                placeholder="https://instagram.com/votre-boutique"
              />
            </div>
          </section>
        </div>

        {/* Hero Section */}
        <section className="chart-card">
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon size={20} className="text-primary" />
            <h2 className="text-lg font-bold m-0">Section Héro (Bannière)</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="form-group">
                <label>Titre Principal</label>
                <input 
                  name="hero_title"
                  className="form-input" 
                  value={formData.hero_title || ""} 
                  onChange={handleInputChange}
                  placeholder="Le titre principal sur votre accueil"
                />
              </div>
              <div className="form-group">
                <label>Sous-titre</label>
                <textarea 
                  name="hero_subtitle"
                  className="form-input" 
                  value={formData.hero_subtitle || ""} 
                  onChange={handleInputChange}
                  placeholder="Texte secondaire sous le titre"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Image de la Bannière</label>
              <div style={{ position: "relative", width: "100%", height: "176px", borderRadius: "var(--radius-xl)", border: "2px dashed var(--border-strong)", background: "var(--bg-subtle)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {bannerPreview ? (
                  <img src={bannerPreview} alt="Banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ textAlign: "center", padding: "16px" }}>
                    <Upload style={{ margin: "0 auto 8px", color: "var(--fg-light)" }} size={28} />
                    <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--fg-light)" }}>Cliquez pour uploader</p>
                  </div>
                )}
                <input 
                  type="file" 
                  style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
                  onChange={(e) => handleFileChange(e, 'banner')}
                  accept="image/*"
                />
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--fg-light)", marginTop: "8px", textAlign: "center" }}>Ratio suggéré: 21:9 (ex: 1920x800px)</p>
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSubmit} 
            disabled={updateMutation.isPending}
            className="btn btn-primary btn-lg"
            style={{ minWidth: "260px" }}
          >
            {updateMutation.isPending ? "Traitement..." : "Enregistrer les paramètres"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default StoreSettingsPage;
