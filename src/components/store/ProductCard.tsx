import React from "react";
import { Link } from "react-router-dom";
import { getPlaceholderImage } from "@/lib/api";
import { useStoreSettings } from "@/contexts/StoreSettingsContext";

interface Props {
  product: any;
  categoryName?: string;
}

const ProductCard: React.FC<Props> = ({ product, categoryName }) => {
  const { getImageUrl } = useStoreSettings();
  const stock = product.stock || 0;
  
  const currentPrice = product.is_on_promo && product.promo_price ? product.promo_price : product.price;
  const oldPrice = product.is_on_promo ? product.price : null;
  const discount = oldPrice ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) : 0;

  const stockLabel = stock === 0
    ? { text: "Rupture de stock", cls: "out" }
    : stock <= 5
    ? { text: `Plus que ${stock} restant(s)`, cls: "low" }
    : null;

  return (
    <div className="product-card group">
      <Link to={`/product/${product.id}`} className="product-card-img">
        <img 
          src={product.image_url ? getImageUrl(product.image_url) : getPlaceholderImage(product.id)} 
          alt={product.name} 
          loading="lazy" 
        />
        {discount > 0 && <span className="product-card-discount">-{discount}%</span>}
      </Link>
      <div className="product-card-info">
        <div className="flex justify-between items-start mb-2">
           <span className="product-card-category">{categoryName || "Général"}</span>
           {stockLabel && <span className={`product-card-stock ${stockLabel.cls} text-[10px] uppercase font-bold`}>{stockLabel.text}</span>}
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-card-name group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="product-card-price">
          <span className="current">{parseFloat(currentPrice.toString()).toLocaleString()} <small className="text-[10px] font-bold">TND</small></span>
          {oldPrice && <span className="old">{parseFloat(oldPrice.toString()).toLocaleString()} TND</span>}
        </div>
        <div className="mt-auto pt-4">
           <Link to={`/product/${product.id}`} className="block">
             <button className="product-card-btn font-bold">Voir le Produit</button>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
