import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Search, Filter, Loader2, ChevronRight, Phone, User, Calendar, MapPin, X } from "lucide-react";
import { OrderService } from "@/lib/services";

const statusOptions = ["pending", "confirmed", "shipped", "delivered", "rejected"];

const statusClass = (s: string) => `badge-${s.toLowerCase().replace(/ /g, "-")}`;

const OrdersPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: OrderService.getAll,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => OrderService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const filteredOrders = (orders || []).filter((o: any) => {
    const matchesStatus = filter === "All" || o.status?.toLowerCase() === filter.toLowerCase();
    
    let matchesDate = true;
    if (dateFilter) {
      const orderDate = o.created_at || o.createdAt;
      if (orderDate) {
        try {
          matchesDate = new Date(orderDate).toISOString().split('T')[0] === dateFilter;
        } catch (e) {
          matchesDate = false;
        }
      } else {
        matchesDate = false;
      }
    }

    return matchesStatus && matchesDate;
  });

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div className="flex items-center gap-3">
          <h1>Commandes</h1>
          <span className="badge badge-secondary">{filteredOrders.length} trouvées</span>
        </div>
      </div>
      <div className="table-wrapper">
        <div className="table-toolbar">
          <div className="flex flex-wrap items-center gap-4">
            <div className="table-search">
              <Search size={16} />
              <input placeholder="Rechercher..." />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--bg-subtle)", padding: "8px 12px", borderRadius: "var(--radius-md)", border: "1.5px solid var(--border)" }}>
              <Calendar size={14} style={{ color: "var(--fg-muted)" }} />
              <input 
                type="date" 
                style={{ background: "transparent", border: "none", fontSize: "0.8125rem", fontWeight: 600, outline: "none", color: "var(--fg-main)" }}
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              {dateFilter && <button onClick={() => setDateFilter("")} style={{ color: "var(--fg-muted)", display: "flex" }}><X size={14} /></button>}
            </div>
          </div>
          <div className="table-actions">
            <Filter size={15} style={{ color: "var(--fg-light)" }} />
            <div style={{ display: "flex", gap: "4px", background: "var(--bg-subtle)", padding: "4px", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
              {["All", "Pending", "Confirmed", "Delivered"].map(f => (
                <button 
                  key={f} 
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.8rem",
                    fontWeight: f === filter ? 700 : 500,
                    background: f === filter ? "var(--bg-main)" : "transparent",
                    color: f === filter ? "var(--primary)" : "var(--fg-muted)",
                    boxShadow: f === filter ? "var(--shadow-xs)" : "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {f === "All" ? "Toutes" : f === "Pending" ? "En Attente" : f === "Confirmed" ? "Confirmées" : "Livrées"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID Commande</th>
              <th>Client</th>
              <th>Destination</th>
              <th>Total</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o: any) => (
              <tr key={o.id}>
                <td style={{ fontWeight: 600 }}>#{o.id}</td>
                <td>
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1 font-medium"><User size={12} className="text-muted" /> {o.customer_name || o.Customer?.full_name || "Guest"}</span>
                    <span className="flex items-center gap-1 text-xs text-muted"><Phone size={12} /> {o.customer_phone || o.Customer?.phone || "-"}</span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col text-xs">
                    <span className="flex items-center gap-1"><MapPin size={12} className="text-primary" /> {o.governorate}</span>
                    <span className="text-muted pl-4">{o.city}</span>
                  </div>
                </td>
                <td className="tabular font-semibold">{parseFloat(o.total_price || 0).toLocaleString()} TND</td>
                <td className="text-xs text-muted">
                  <div className="flex items-center gap-1"><Calendar size={12} /> {(o.created_at || o.createdAt) ? new Date(o.created_at || o.createdAt).toLocaleDateString() : "-"}</div>
                </td>
                <td>
                  <div className="inline-flex items-center gap-2">
                    <select 
                      className={`status-select-inline badge ${statusClass(o.status || 'pending')}`}
                      value={o.status || 'pending'}
                      onChange={(e) => updateStatusMutation.mutate({ id: o.id, status: e.target.value })}
                      disabled={updateStatusMutation.isPending}
                    >
                      {statusOptions.map(s => (
                        <option key={s} value={s}>
                          {s === 'pending' ? 'En Attente' : 
                           s === 'confirmed' ? 'Confirmée' : 
                           s === 'shipped' ? 'Expédiée' : 
                           s === 'delivered' ? 'Livrée' : 'Rejetée'}
                        </option>
                      ))}
                    </select>
                    {updateStatusMutation.isPending && updateStatusMutation.variables?.id === o.id && (
                      <Loader2 size={14} className="animate-spin text-primary" />
                    )}
                  </div>
                </td>
                <td>
                  <Link to={`/admin/orders/${o.id}`} className="btn btn-sm btn-icon btn-ghost" title="Detailed View">
                    <ChevronRight size={18} />
                  </Link>
                </td>
              </tr>
            ))}
            {!filteredOrders?.length && !isLoading && (
              <tr><td colSpan={7} className="text-center p-12 text-muted italic">Aucune commande ne correspond à ce filtre</td></tr>
            )}
            {isLoading && (
              <tr><td colSpan={7} className="text-center p-12"><Loader2 className="animate-spin inline mr-2" /> Chargement des commandes...</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default OrdersPage;
