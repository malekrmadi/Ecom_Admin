import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService, CategoryService, Product } from "@/lib/services";
import { 
  Save, Trash2, ArrowLeft, Loader2, Upload, 
  Image as ImageIcon, X, Check, Gauge, Container, 
  Droplets, Tag, Info, AlertCircle 
} from "lucide-react";

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    promo_price: undefined,
    is_on_promo: false,
    stock: 0,
    category_id: 1,
    is_active: true,
    is_visible: true,
    viscosity: "",
    motor_type: "Synthétique",
    volume: "1L",
    packaging: "Bouteille"
  });

  const [isSaving, setIsSaving] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: categories } = useQuery({ 
    queryKey: ["categories"], 
    queryFn: CategoryService.getAll 
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const createProductMutation = useMutation({
    mutationFn: (data: FormData) => ProductService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Produit créé avec succès");
      navigate("/admin/products");
    },
    onError: (err: any) => alert(err.message || "Erreur lors de la création")
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const g = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val !== undefined) g.append(key, val.toString());
      });
      if (image) g.append('image', image);
      
      await createProductMutation.mutateAsync(g);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div className="flex items-center gap-4">
          <Link to="/admin/products" className="btn btn-icon btn-ghost"><ArrowLeft size={20} /></Link>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Nouveau Produit</h1>
        </div>
        <button onClick={handleSubmit} className="btn btn-primary shadow-lg shadow-primary/20 flex items-center gap-2" disabled={isSaving}>
          {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Publier le Produit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        <div className="lg:col-span-2 space-y-8">
          {/* Base Info */}
          <section className="chart-card space-y-6">
            <h2 className="text-xl font-bold border-b border-gray-100 pb-4 m-0">Description</h2>
            <div className="form-group">
              <label>Nom du Produit*</label>
              <input 
                className="form-input" 
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })} 
                placeholder="Ex: Huile Moteur 5W30 Titanium"
                required 
              />
            </div>
            <div className="form-group">
              <label>Description Détaillée</label>
              <textarea 
                className="form-input" 
                value={formData.description} 
                onChange={e => setFormData({ ...formData, description: e.target.value })} 
                rows={5} 
                placeholder="Spécifications, avantages, compatibilité..."
              />
            </div>
          </section>

          {/* Oil Specs */}
          <section className="chart-card">
            <h2 className="text-xl font-bold border-b border-gray-100 pb-4 mb-6 m-0">Spécifications Techniques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="form-group">
                  <label className="flex items-center gap-2 mb-2"><Gauge size={14} className="text-primary" /> Viscosité</label>
                  <select 
                    className="form-input" 
                    value={formData.viscosity} 
                    onChange={e => setFormData({ ...formData, viscosity: e.target.value })}
                  >
                    <option value="">Sélectionner</option>
                    <option value="0W20">0W20</option>
                    <option value="5W30">5W30</option>
                    <option value="5W40">5W40</option>
                    <option value="10W40">10W40</option>
                    <option value="15W40">15W40</option>
                    <option value="20W50">20W50</option>
                  </select>
               </div>
               <div className="form-group">
                  <label className="flex items-center gap-2 mb-2"><Droplets size={14} className="text-primary" /> Type de Moteur</label>
                  <select 
                    className="form-input" 
                    value={formData.motor_type} 
                    onChange={e => setFormData({ ...formData, motor_type: e.target.value })}
                  >
                    <option value="Synthétique">Synthétique</option>
                    <option value="Semi-Synthétique">Semi-Synthétique</option>
                    <option value="Minérale">Minérale</option>
                    <option value="Diesel Spécial">Diesel Spécial</option>
                    <option value="Essence">Essence</option>
                  </select>
               </div>
               <div className="form-group">
                  <label className="flex items-center gap-2 mb-2"><Container size={14} className="text-primary" /> Volume</label>
                  <select 
                    className="form-input" 
                    value={formData.volume} 
                    onChange={e => setFormData({ ...formData, volume: e.target.value })}
                  >
                    <option value="1L">1 Litre</option>
                    <option value="4L">4 Litres</option>
                    <option value="5L">5 Litres</option>
                    <option value="20L">20 Litres</option>
                    <option value="60L">60 Litres</option>
                    <option value="208L">208 Litres</option>
                  </select>
               </div>
               <div className="form-group">
                  <label className="flex items-center gap-2 mb-2"><Tag size={14} className="text-primary" /> Conditionnement</label>
                  <select 
                    className="form-input" 
                    value={formData.packaging} 
                    onChange={e => setFormData({ ...formData, packaging: e.target.value })}
                  >
                    <option value="Bouteille">Bouteille</option>
                    <option value="Bidon">Bidon</option>
                    <option value="Fut">Fut</option>
                    <option value="Vrac">Vrac</option>
                  </select>
               </div>
            </div>
          </section>
          
          <section className="chart-card">
            <h2 className="text-xl font-bold border-b border-gray-100 pb-4 mb-6 m-0">Gestion du Stock</h2>
            <div className="flex items-center gap-6 p-6 bg-primary/5 rounded-2xl border border-primary/10">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/10">
                  <Container size={32} />
               </div>
               <div className="flex-1">
                  <label className="block text-sm font-bold uppercase tracking-widest text-muted mb-2">Quantité en Stock</label>
                  <input 
                    type="number"
                    className="form-input text-2xl font-black w-32" 
                    value={formData.stock} 
                    onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })} 
                  />
               </div>
               <div className="hidden md:block text-xs text-muted max-w-[200px]">
                  Votre stock est mis à jour instantanément après chaque vente.
               </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="chart-card">
            <h2 className="text-xl font-bold mb-6">Prix et Promo</h2>
            <div className="form-group mb-6">
              <label className="label">Prix Standard (TND)</label>
              <input 
                className="form-input text-xl font-bold" 
                type="number" 
                value={formData.price} 
                onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) || 0})} 
              />
            </div>
            
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 space-y-4">
              <div className="flex items-center justify-between">
                 <span className="text-sm font-bold text-orange-800">En Promotion ?</span>
                 <input 
                   type="checkbox" 
                   className="w-5 h-5 accent-orange-600" 
                   checked={formData.is_on_promo} 
                   onChange={e => setFormData({...formData, is_on_promo: e.target.checked})} 
                 />
              </div>
              {formData.is_on_promo && (
                <div className="form-group animate-in fade-in slide-in-from-top-2">
                  <label className="text-xs font-bold text-orange-700">Prix Promo (TND)</label>
                  <input 
                    className="form-input border-orange-200 focus:border-orange-500" 
                    type="number" 
                    value={formData.promo_price || ""} 
                    onChange={e => setFormData({ ...formData, promo_price: parseFloat(e.target.value) || 0 })} 
                  />
                </div>
              )}
            </div>
          </section>

          <section className="chart-card">
            <h2 className="text-xl font-bold mb-6">Image Principale</h2>
            <div 
                className={`relative w-full aspect-square rounded-2xl border-2 border-dashed transition-all flex items-center justify-center overflow-hidden bg-gray-50 ${
                  imagePreview ? 'border-primary/30' : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => { setImage(null); setImagePreview(null); }}
                      className="absolute top-4 right-4 p-2 bg-white/90 text-red-500 rounded-full shadow-lg hover:bg-white"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-400">
                       <Upload size={24} />
                    </div>
                    <p className="text-sm font-bold text-gray-500">Cliquez pour charger</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG ou WEBP • Max 5Mo</p>
                  </div>
                )}
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                />
              </div>
          </section>

          <section className="chart-card">
            <h2 className="text-xl font-bold mb-6">Catégorie et Visibilité</h2>
            <div className="space-y-4">
              <div className="form-group">
                <label>Catégorie</label>
                <select 
                  className="form-input" 
                  value={formData.category_id} 
                  onChange={e => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                >
                  {(categories || []).map((c: any) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                 <input 
                   type="checkbox" 
                   id="isVisible"
                   className="w-4 h-4" 
                   checked={formData.is_visible} 
                   onChange={e => setFormData({...formData, is_visible: e.target.checked})} 
                 />
                 <label htmlFor="isVisible" className="text-sm font-medium cursor-pointer">Visible sur la boutique</label>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProductPage;
