import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService, CategoryService } from "@/lib/services";
import { getPlaceholderImage, API_BASE } from "@/lib/api";
import { Edit, Trash2, Plus, Search, Tag } from "lucide-react";

const ProductsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: ProductService.getAll,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryService.getAll,
  });

  const categoriesMap = useMemo(() => {
    const map: Record<number, string> = {};
    if (categories) categories.forEach((c: any) => { map[c.id] = c.name; });
    return map;
  }, [categories]);

  const deleteMutation = useMutation({
    mutationFn: ProductService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      deleteMutation.mutate(id);
    }
  };

  const filteredProducts = (products || []).filter((p: any) => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h1 className="uppercase tracking-tight font-black">Inventaire Produits</h1>
        <Link to="/admin/products/new" className="btn btn-primary shadow-lg shadow-primary/20">
          <Plus size={18} className="mr-2" /> Nouveau Produit
        </Link>
      </div>

      <div className="table-wrapper chart-card">
        <div className="table-toolbar">
          <div className="table-search">
            <Search size={16} />
            <input 
              placeholder="Rechercher un produit..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Catégorie</th>
              <th>Prix (TND)</th>
              <th>Stock</th>
              <th>Statut</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p: any) => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <img 
                      src={p.image_url ? `${API_BASE}${p.image_url}` : getPlaceholderImage(p.id)} 
                      alt="" 
                      className="product-thumb"
                    />
                    <div>
                      <span style={{ fontWeight: 700, color: "var(--fg-main)", display: "block" }}>{p.name}</span>
                      {p.is_on_promo && <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>En Promotion</span>}
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, background: "var(--bg-muted)", padding: "3px 8px", borderRadius: "var(--radius-sm)", color: "var(--fg-muted)" }}>
                    {categoriesMap[p.category_id] || "Général"}
                  </span>
                </td>
                <td className="tabular font-bold">
                  {p.is_on_promo ? (
                    <div className="flex flex-col">
                      <span className="text-primary">{parseFloat(p.promo_price).toLocaleString()}</span>
                      <span className="text-[10px] text-muted line-through">{parseFloat(p.price).toLocaleString()}</span>
                    </div>
                  ) : (
                    <span>{parseFloat(p.price).toLocaleString()}</span>
                  )}
                </td>
                <td className="tabular">
                   <span style={{ fontWeight: 700, color: p.stock === 0 ? "var(--danger)" : p.stock <= 5 ? "var(--warning)" : "var(--fg-secondary)" }}>
                      {p.stock}
                   </span>
                </td>
                <td>
                  {p.stock === 0 
                    ? <span className="badge badge-out-of-stock">Rupture</span>
                    : <span className={`badge badge-${p.is_active ? 'active' : 'draft'}`}>{p.is_active ? 'Actif' : 'Brouillon'}</span>
                  }
                </td>
                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                    <button 
                      className="btn btn-sm btn-icon btn-ghost"
                      onClick={() => navigate(`/admin/products/${p.id}`)}
                      title="Modifier"
                    >
                      <Edit size={15} />
                    </button>
                    <button 
                      className="btn btn-sm btn-icon"
                      style={{ background: "var(--danger-light)", color: "var(--danger)" }}
                      onClick={() => handleDelete(p.id)}
                      title="Supprimer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && !isLoading && (
              <tr><td colSpan={6} className="text-center p-20 text-muted italic">Aucun produit trouvé</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ProductsPage;
