import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorite } from "../context/FavoriteContext";
import { StarIcon, SparklesIcon, FlameIcon, HeartIcon, CartIcon, TimeIcon } from "./Icons";

// Format rupiah
function formatRupiah(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
}

// Food Card Skeleton loader
export function FoodCardSkeleton() {
  return (
    <div className="food-card-skeleton">
      <div className="skeleton skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton" style={{ height: 18, width: "70%" }} />
        <div className="skeleton" style={{ height: 14, width: "40%" }} />
        <div
          style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}
        >
          <div className="skeleton" style={{ height: 22, width: "35%" }} />
          <div className="skeleton" style={{ height: 36, width: 36, borderRadius: 10 }} />
        </div>
      </div>
    </div>
  );
}

function FoodCard({ food, index = 0 }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorite();

  const fav = isFavorite(food.id);

  const handleCardClick = (e) => {
    // Jangan navigate kalau klik tombol
    if (e.target.closest("button")) return;
    navigate(`/detail/${food.id}`);
  };

  const handleAddCart = (e) => {
    e.stopPropagation();
    addToCart(food);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(food);
  };

  // Rating bintang
  const renderStars = (rating = 4.5) => {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
        <StarIcon size="14px" style={{ color: "var(--secondary)" }} />
        <span style={{ marginLeft: 2, color: "var(--secondary)", fontWeight: 600 }}>
          {rating.toFixed(1)}
        </span>
      </span>
    );
  };

  return (
    <div
      className="food-card"
      id={`food-card-${food.id}`}
      onClick={handleCardClick}
      style={{ animationDelay: `${index * 0.05}s` }}
      role="article"
      aria-label={food.name}
    >
      {/* Image */}
      <div className="food-card-img-wrap">
        <img
          className="food-card-img"
          src={
            food.image ||
            `https://source.unsplash.com/400x300/?food,${encodeURIComponent(food.name || "food")}`
          }
          alt={food.name}
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop";
          }}
        />
        <div className="food-card-overlay" />

        {/* Badges */}
        <div className="food-card-badges">
          {food.isNew && (
            <span className="badge badge-primary">
              <SparklesIcon size="12px" /> Baru
            </span>
          )}
          {food.isPopular && (
            <span className="badge" style={{
              background: "rgba(255,179,71,0.15)",
              color: "var(--secondary)",
              border: "1px solid rgba(255,179,71,0.3)",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}>
              <FlameIcon size="12px" /> Populer
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          className={`food-card-fav ${fav ? "active" : ""}`}
          id={`fav-btn-${food.id}`}
          onClick={handleFavorite}
          aria-label={fav ? "Hapus dari favorit" : "Tambah ke favorit"}
          title={fav ? "Hapus favorit" : "Tambah favorit"}
        >
          <HeartIcon filled={fav} size="16px" style={{ color: fav ? "var(--danger)" : "var(--text-secondary)" }} />
        </button>

        {/* Quick Add overlay */}
        <button
          className="btn btn-primary food-card-quick-add"
          onClick={handleAddCart}
          id={`quick-add-${food.id}`}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <CartIcon /> Tambah ke Keranjang
        </button>
      </div>

      {/* Body */}
      <div className="food-card-body">
        <div className="food-card-name" title={food.name}>
          {food.name}
        </div>
        <div className="food-card-category">
          {food.category || "Makanan"}
        </div>

        <div className="food-card-meta">
          <div className="food-card-rating">
            {renderStars(food.rating || 4.5)}
          </div>
          <div className="food-card-time" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <TimeIcon size="12px" /> {food.time || "15-25"} min
          </div>
        </div>

        <div className="food-card-footer">
          <div className="food-card-price">
            {formatRupiah(food.price || 25000)}
          </div>
          <button
            className="food-card-add-btn"
            id={`add-cart-${food.id}`}
            onClick={handleAddCart}
            aria-label={`Tambah ${food.name} ke keranjang`}
            title="Tambah ke Keranjang"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
