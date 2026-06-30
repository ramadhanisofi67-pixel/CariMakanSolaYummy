import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useFavorite } from "../context/FavoriteContext";
import { useCart } from "../context/CartContext";
import {
  HeartIcon,
  BrokenHeartIcon,
  LogoIcon,
  StarIcon,
  TimeIcon,
  CartIcon,
  ArrowLeftIcon
} from "../components/Icons";

function formatRupiah(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
}

function Favorite() {
  const navigate = useNavigate();
  const { favorites, removeFavorite, totalFavorites } = useFavorite();
  const { addToCart, toasts } = useCart();

  return (
    <>
      <Navbar />
      <main className="page">
        <div className="container">
          {/* Header */}
          <div
            style={{
              marginBottom: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h1 style={{ fontSize: "28px", marginBottom: "4px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <HeartIcon filled={true} size="24px" style={{ color: "var(--danger)" }} /> Makanan Favorit
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                {totalFavorites} makanan tersimpan
              </p>
            </div>
          </div>

          {/* Empty */}
          {favorites.length === 0 ? (
            <div className="empty-state" style={{ minHeight: "50vh" }}>
              <div className="empty-icon">
                <BrokenHeartIcon size="64px" style={{ color: "var(--text-muted)" }} />
              </div>
              <h3>Belum Ada Favorit</h3>
              <p>
                Klik ikon hati pada makanan yang kamu suka untuk
                menyimpannya di sini!
              </p>
              <button
                className="btn btn-primary"
                id="explore-btn"
                onClick={() => navigate("/")}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <LogoIcon /> Jelajahi Menu
              </button>
            </div>
          ) : (
            <div className="grid-food">
              {favorites.map((food, i) => (
                <div
                  key={food.id}
                  className="food-card"
                  id={`fav-card-${food.id}`}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  {/* Image */}
                  <div
                    className="food-card-img-wrap"
                    onClick={() => navigate(`/detail/${food.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className="food-card-img"
                      src={food.image}
                      alt={food.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop";
                      }}
                    />
                    <div className="food-card-overlay" />

                    {/* Remove Fav Button */}
                    <button
                      className="food-card-fav active"
                      id={`remove-fav-${food.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(food.id);
                      }}
                      aria-label="Hapus dari favorit"
                      title="Hapus favorit"
                    >
                      <HeartIcon filled={true} size="16px" style={{ color: "var(--danger)" }} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="food-card-body">
                    <div
                      className="food-card-name"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/detail/${food.id}`)}
                      title={food.name}
                    >
                      {food.name}
                    </div>
                    <div className="food-card-category">{food.category}</div>

                     <div className="food-card-meta">
                      <div className="food-card-rating" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <StarIcon size="14px" style={{ color: "var(--secondary)" }} />
                        <span style={{ color: "var(--secondary)" }}>
                          {food.rating}
                        </span>
                      </div>
                      <div className="food-card-time" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <TimeIcon size="12px" /> {food.time} min
                      </div>
                    </div>

                    <div className="food-card-footer">
                      <div className="food-card-price">
                        {formatRupiah(food.price)}
                      </div>
                      <button
                        id={`fav-add-cart-${food.id}`}
                        className="food-card-add-btn"
                        onClick={() => addToCart(food)}
                        aria-label={`Tambah ${food.name} ke keranjang`}
                        title="Tambah ke Keranjang"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Row */}
          {favorites.length > 0 && (
            <div
              style={{
                marginTop: "40px",
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn btn-ghost"
                onClick={() => navigate("/")}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <ArrowLeftIcon /> Tambah Lebih Banyak
              </button>
              <button
                className="btn btn-primary"
                id="add-all-cart-btn"
                onClick={() => favorites.forEach((f) => addToCart(f))}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <CartIcon /> Tambah Semua ke Keranjang
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Toasts */}
      <div className="toast">
        {toasts.map((t) => (
          <div key={t.id} className={`toast-item ${t.type}`}>
            {t.msg}
          </div>
        ))}
      </div>
    </>
  );
}

export default Favorite;
