import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useFavorite } from "../context/FavoriteContext";
import { useState } from "react";
import {
  HomeIcon,
  InfoIcon,
  PortionIcon,
  CalorieIcon,
  SparklesIcon,
  FlameIcon,
  CheckIcon,
  StarIcon,
  TimeIcon,
  MinusIcon,
  PlusIcon,
  HeartIcon,
  CartIcon,
  ChevronRightIcon,
  ArrowLeftIcon
} from "../components/Icons";

// Mock foods (sama dengan di Home - dalam real app pakai API/Context)
const MOCK_FOODS = [
  { id: 1, name: "Spaghetti Carbonara", category: "Pasta", price: 85000, rating: 4.8, time: "20-30", isNew: false, isPopular: true, description: "Classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.", calories: 550, servings: 1, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=450&fit=crop" },
  { id: 2, name: "Margherita Pizza", category: "Pizza", price: 95000, rating: 4.9, time: "25-35", isNew: false, isPopular: true, description: "Traditional Neapolitan pizza topped with San Marzano tomato sauce, fresh mozzarella, and basil.", calories: 800, servings: 2, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=450&fit=crop" },
  { id: 3, name: "Croissant Sandwich", category: "Pastry", price: 45000, rating: 4.7, time: "10-15", isNew: true, isPopular: false, description: "Flaky butter croissant filled with premium ham, gruyere cheese, and fresh greens.", calories: 420, servings: 1, image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&h=450&fit=crop" },
  { id: 4, name: "Classic Wagyu Burger", category: "Burger", price: 120000, rating: 4.6, time: "20-30", isNew: true, isPopular: false, description: "Juicy wagyu beef patty with melted cheddar, fresh lettuce, tomatoes, and house special sauce in a brioche bun.", calories: 850, servings: 1, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=450&fit=crop" },
  { id: 5, name: "Sushi Omakase Platter", category: "Sushi", price: 250000, rating: 4.9, time: "15-25", isNew: false, isPopular: true, description: "Chef's selection of premium nigiri, sashimi, and maki rolls made with the freshest seasonal catch.", calories: 600, servings: 2, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=450&fit=crop" },
  { id: 6, name: "Beef Wellington", category: "Daging", price: 350000, rating: 4.8, time: "40-50", isNew: false, isPopular: true, description: "Tender beef tenderloin coated with mushroom duxelles and prosciutto, wrapped in puff pastry and baked to perfection.", calories: 950, servings: 2, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=450&fit=crop" },
  { id: 7, name: "Caesar Salad", category: "Salad", price: 55000, rating: 4.5, time: "10-15", isNew: false, isPopular: true, description: "Crisp romaine lettuce with parmesan cheese, croutons, and classic Caesar dressing. Optional grilled chicken.", calories: 350, servings: 1, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&h=450&fit=crop" },
  { id: 8, name: "Fish and Chips", category: "Seafood", price: 85000, rating: 4.7, time: "20-30", isNew: true, isPopular: true, description: "Golden beer-battered cod served with thick-cut chips, mushy peas, and tartar sauce.", calories: 780, servings: 1, image: "https://images.unsplash.com/photo-1580216513906-8d19eeb2531d?w=600&h=450&fit=crop" },
  { id: 9, name: "Pad Thai", category: "Noodles", price: 75000, rating: 4.6, time: "15-20", isNew: false, isPopular: true, description: "Stir-fried rice noodles with eggs, tofu, peanuts, bean sprouts, and authentic tamarind sauce.", calories: 520, servings: 1, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&h=450&fit=crop" },
  { id: 10, name: "Tacos al Pastor", category: "Mexican", price: 65000, rating: 4.8, time: "15-20", isNew: false, isPopular: false, description: "Three soft corn tortillas filled with marinated pork, pineapple, cilantro, and onions.", calories: 480, servings: 1, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=450&fit=crop" },
  { id: 11, name: "Macaron Assortment", category: "Dessert", price: 90000, rating: 4.7, time: "5-10", isNew: true, isPopular: false, description: "A box of six colorful French macarons featuring flavors like pistachio, raspberry, vanilla, and salted caramel.", calories: 300, servings: 2, image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&h=450&fit=crop" },
  { id: 12, name: "French Onion Soup", category: "Soup", price: 70000, rating: 4.9, time: "15-25", isNew: true, isPopular: false, description: "Rich beef broth with caramelized onions, topped with a crouton and melted gruyere cheese.", calories: 380, servings: 1, image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=450&fit=crop" },
];

function formatRupiah(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
}

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toasts } = useCart();
  const { toggleFavorite, isFavorite } = useFavorite();
  const [qty, setQty] = useState(1);

  const food = MOCK_FOODS.find((f) => f.id === Number(id));
  const fav = food ? isFavorite(food.id) : false;

  const related = food
    ? MOCK_FOODS.filter(
        (f) => f.category === food.category && f.id !== food.id
      ).slice(0, 4)
    : [];

  if (!food) {
    return (
      <>
        <Navbar />
        <div className="page">
          <div className="container">
            <div className="empty-state">
              <div className="empty-icon">
                <InfoIcon size="64px" style={{ color: "var(--text-muted)" }} />
              </div>
              <h3>Makanan Tidak Ditemukan</h3>
              <p>Menu yang kamu cari tidak tersedia</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/")}
                style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <ArrowLeftIcon /> Kembali ke Home
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const handleAddCart = () => {
    for (let i = 0; i < qty; i++) addToCart(food);
  };

  return (
    <>
      <Navbar />
      <main className="page">
        <div className="container">
          {/* Breadcrumb */}
          <nav
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              marginBottom: "32px",
              fontSize: "14px",
              color: "var(--text-muted)",
            }}
            aria-label="breadcrumb"
          >
            <button
              onClick={() => navigate("/")}
              style={{
                background: "none",
                border: "none",
                color: "var(--primary)",
                cursor: "pointer",
                fontSize: "14px",
                fontFamily: "var(--font-body)",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <HomeIcon /> Home
            </button>
            <ChevronRightIcon size="12px" />
            <span>{food.category}</span>
            <ChevronRightIcon size="12px" />
            <span style={{ color: "var(--text-primary)" }}>{food.name}</span>
          </nav>

          {/* Detail Layout */}
          <div className="detail-layout">
            {/* Image Side */}
            <div className="animate-scale-in">
              <div className="detail-img-wrap">
                <img
                  className="detail-img"
                  src={food.image}
                  alt={food.name}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=450&fit=crop";
                  }}
                />
              </div>

              {/* Additional info */}
              <div
                style={{
                  marginTop: "16px",
                  padding: "16px",
                  background: "var(--bg-elevated)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <InfoIcon size="14px" /> Kategori: <strong style={{ color: "var(--text-primary)" }}>{food.category}</strong>
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <PortionIcon size="14px" /> Porsi: <strong style={{ color: "var(--text-primary)" }}>{food.servings} orang</strong>
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <CalorieIcon size="14px" /> Kalori: <strong style={{ color: "var(--text-primary)" }}>{food.calories} kcal</strong>
                </span>
              </div>
            </div>

            {/* Info Side */}
            <div className="animate-fade-in-up">
              {/* Badges */}
              <div className="detail-badges">
                {food.isNew && (
                  <span className="badge badge-primary" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <SparklesIcon size="12px" /> Baru
                  </span>
                )}
                {food.isPopular && (
                  <span
                    className="badge"
                    style={{
                      background: "rgba(255,179,71,0.15)",
                      color: "var(--secondary)",
                      border: "1px solid rgba(255,179,71,0.3)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <FlameIcon size="12px" /> Populer
                  </span>
                )}
                <span className="badge badge-success" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <CheckIcon size="12px" /> Tersedia
                </span>
              </div>

              <h1 className="detail-title">{food.name}</h1>
              <p className="detail-desc">{food.description}</p>

              {/* Meta Grid */}
              <div className="detail-meta-grid">
                <div className="detail-meta-item">
                  <span className="detail-meta-val" style={{ display: "inline-flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
                    <StarIcon size="16px" style={{ color: "var(--secondary)" }} /> {food.rating}
                  </span>
                  <span className="detail-meta-key">Rating</span>
                </div>
                <div className="detail-meta-item">
                  <span className="detail-meta-val" style={{ display: "inline-flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
                    <TimeIcon size="16px" /> {food.time}
                  </span>
                  <span className="detail-meta-key">Menit</span>
                </div>
                <div className="detail-meta-item">
                  <span className="detail-meta-val" style={{ display: "inline-flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
                    <CalorieIcon size="16px" /> {food.calories}
                  </span>
                  <span className="detail-meta-key">Kalori</span>
                </div>
              </div>

              {/* Price Row */}
              <div className="detail-price-row">
                <div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "4px" }}>
                    Harga per porsi
                  </div>
                  <div className="detail-price">{formatRupiah(food.price)}</div>
                </div>

                {/* Quantity Selector */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <button
                    id="qty-minus"
                    className="cart-qty-btn"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Kurangi"
                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <MinusIcon size="12px" />
                  </button>
                  <span
                    className="cart-qty-num"
                    style={{ fontSize: "18px", fontWeight: 800 }}
                  >
                    {qty}
                  </span>
                  <button
                    id="qty-plus"
                    className="cart-qty-btn"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Tambah"
                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <PlusIcon size="12px" />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div
                style={{
                  textAlign: "right",
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  marginBottom: "16px",
                }}
              >
                Total:{" "}
                <strong style={{ color: "var(--primary)", fontSize: "16px" }}>
                  {formatRupiah(food.price * qty)}
                </strong>
              </div>

              {/* Actions */}
              <div className="detail-actions">
                <button
                  id={`detail-fav-${food.id}`}
                  className={`btn ${fav ? "btn-outline" : "btn-ghost"}`}
                  style={{
                    flex: "0 0 auto",
                    color: fav ? "var(--danger)" : undefined,
                    borderColor: fav ? "var(--danger)" : undefined,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  onClick={() => toggleFavorite(food)}
                  aria-label={fav ? "Hapus dari favorit" : "Tambah ke favorit"}
                >
                  <HeartIcon filled={fav} size="16px" style={{ color: fav ? "var(--danger)" : "var(--text-secondary)" }} /> Favorit
                </button>
                <button
                  id={`detail-add-cart-${food.id}`}
                  className="btn btn-primary"
                  style={{ flex: 1, display: "inline-flex", alignItems: "center", gap: "6px" }}
                  onClick={handleAddCart}
                >
                  <CartIcon /> Tambah ke Keranjang
                </button>
              </div>

              <button
                className="btn btn-ghost"
                style={{ width: "100%", marginTop: "12px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                onClick={() => navigate("/")}
              >
                <ArrowLeftIcon /> Kembali Belanja
              </button>
            </div>
          </div>

          {/* Related Foods */}
          {related.length > 0 && (
            <section style={{ marginTop: "60px" }}>
              <div className="section-header">
                <div>
                  <h2 className="section-title" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <PortionIcon size="22px" style={{ color: "var(--primary)" }} /> Menu Serupa
                  </h2>
                  <p className="section-subtitle">Mungkin juga kamu suka ini</p>
                </div>
              </div>
              <div className="grid-food">
                {related.map((f, i) => (
                  <div
                    key={f.id}
                    className="food-card"
                    style={{ animationDelay: `${i * 0.1}s`, cursor: "pointer" }}
                    onClick={() => navigate(`/detail/${f.id}`)}
                  >
                    <div className="food-card-img-wrap">
                      <img
                        className="food-card-img"
                        src={f.image}
                        alt={f.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="food-card-body">
                      <div className="food-card-name">{f.name}</div>
                      <div className="food-card-footer" style={{ marginTop: 8 }}>
                        <div className="food-card-price">
                          {formatRupiah(f.price)}
                        </div>
                        <span style={{ fontSize: "13px", color: "var(--secondary)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <StarIcon size="14px" style={{ color: "var(--secondary)" }} /> {f.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
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

export default Detail;
