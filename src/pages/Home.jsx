import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FoodCard, { FoodCardSkeleton } from "../components/FoodCard";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { SparklesIcon, StarIcon, FlameIcon, SearchIcon, PortionIcon, InfoIcon } from "../components/Icons";

// ---- Mock data (ganti dengan useFetch ke API nanti) ----
const MOCK_FOODS = [
  { id: 1, name: "Spaghetti Carbonara", category: "Pasta", price: 85000, rating: 4.8, time: "20-30", isNew: false, isPopular: true, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop" },
  { id: 2, name: "Margherita Pizza", category: "Pizza", price: 95000, rating: 4.9, time: "25-35", isNew: false, isPopular: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },
  { id: 3, name: "Croissant Sandwich", category: "Pastry", price: 45000, rating: 4.7, time: "10-15", isNew: true, isPopular: false, image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop" },
  { id: 4, name: "Classic Wagyu Burger", category: "Burger", price: 120000, rating: 4.6, time: "20-30", isNew: true, isPopular: false, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
  { id: 5, name: "Sushi Omakase Platter", category: "Sushi", price: 250000, rating: 4.9, time: "15-25", isNew: false, isPopular: true, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop" },
  { id: 6, name: "Beef Wellington", category: "Daging", price: 350000, rating: 4.8, time: "40-50", isNew: false, isPopular: true, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop" },
  { id: 7, name: "Caesar Salad", category: "Salad", price: 55000, rating: 4.5, time: "10-15", isNew: false, isPopular: true, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop" },
  { id: 8, name: "Fish and Chips", category: "Seafood", price: 85000, rating: 4.7, time: "20-30", isNew: true, isPopular: true, image: "https://images.unsplash.com/photo-1580216513906-8d19eeb2531d?w=400&h=300&fit=crop" },
  { id: 9, name: "Pad Thai", category: "Noodles", price: 75000, rating: 4.6, time: "15-20", isNew: false, isPopular: true, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop" },
  { id: 10, name: "Tacos al Pastor", category: "Mexican", price: 65000, rating: 4.8, time: "15-20", isNew: false, isPopular: false, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop" },
  { id: 11, name: "Macaron Assortment", category: "Dessert", price: 90000, rating: 4.7, time: "5-10", isNew: true, isPopular: false, image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=300&fit=crop" },
  { id: 12, name: "French Onion Soup", category: "Soup", price: 70000, rating: 4.9, time: "15-25", isNew: true, isPopular: false, image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop" },
];

const CATEGORIES = ["Semua", "Pasta", "Pizza", "Pastry", "Burger", "Sushi", "Daging", "Salad", "Seafood", "Noodles", "Mexican", "Dessert", "Soup"];

const SORT_OPTIONS = [
  { value: "default", label: "Relevansi" },
  { value: "price-asc", label: "Harga Terendah" },
  { value: "price-desc", label: "Harga Tertinggi" },
  { value: "rating", label: "Rating Tertinggi" },
  { value: "name", label: "Nama A-Z" },
];

function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("default");
  const [loading] = useState(false); // ganti dengan useFetch loading
  const { toasts } = useCart();

  const filteredFoods = useMemo(() => {
    let result = [...MOCK_FOODS];

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (activeCategory !== "Semua") {
      result = result.filter((f) => f.category === activeCategory);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [search, activeCategory, sortBy]);

  const popularFoods = MOCK_FOODS.filter((f) => f.isPopular);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <SparklesIcon size="14px" /> Platform Kuliner Terbaik Indonesia
            </div>
            <h1 className="hero-title">
              Temukan{" "}
              <span className="gradient-text">Makanan Lezat</span>{" "}
              Favoritmu
            </h1>
            <p className="hero-desc">
              Bagoyang di mulut, Baputar di lidah ~~
            </p>

            {/* Search in Hero */}
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSearch={(val) => setSearch(val)}
            />
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">500+</div>
              <div className="hero-stat-label">Menu Tersedia</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">50+</div>
              <div className="hero-stat-label">Kategori</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num" style={{ display: "inline-flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
                4.9<StarIcon size="18px" style={{ color: "var(--secondary)" }} />
              </div>
              <div className="hero-stat-label">Rating Rata-rata</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">10K+</div>
              <div className="hero-stat-label">Pelanggan Puas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="page" style={{ paddingTop: "40px" }}>
        <div className="container">

          {/* Promo Banner */}
          <div className="promo-banner">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <SparklesIcon size="28px" style={{ color: "var(--secondary)" }} />
              <div>
                <div className="promo-title">Promo Hari Ini!</div>
                <div className="promo-sub">Gratis ongkir untuk 3 pesanan pertamamu. Kode: <strong>CARIMAKAN</strong></div>
              </div>
            </div>
            <button className="btn btn-primary" id="promo-btn">
              Pakai Promo
            </button>
          </div>

          {/* Popular Foods */}
          {!search && activeCategory === "Semua" && (
            <section style={{ marginBottom: "48px" }}>
              <div className="section-header">
                <div>
                  <h2 className="section-title" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <FlameIcon size="22px" style={{ color: "var(--primary)" }} /> Paling Populer
                  </h2>
                  <p className="section-subtitle">Pilihan terfavorit pelanggan kami</p>
                </div>
                <Link to="?category=popular" className="section-link">
                  Lihat Semua →
                </Link>
              </div>
              <div className="grid-food">
                {popularFoods.slice(0, 4).map((food, i) => (
                  <FoodCard key={food.id} food={food} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* All Foods */}
          <section>
            <div className="section-header">
              <div>
                <h2 className="section-title" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  {search ? (
                    <>
                      <SearchIcon size="22px" /> Hasil "{search}"
                    </>
                  ) : activeCategory !== "Semua" ? (
                    <>
                      <PortionIcon size="22px" style={{ color: "var(--primary)" }} /> {activeCategory}
                    </>
                  ) : (
                    <>
                      <PortionIcon size="22px" style={{ color: "var(--primary)" }} /> Semua Menu
                    </>
                  )}
                </h2>
                <p className="section-subtitle">
                  {filteredFoods.length} menu tersedia
                </p>
              </div>

              {/* Sort */}
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  padding: "8px 12px",
                  borderRadius: "var(--radius-md)",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  outline: "none",
                }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="category-filter" style={{ marginBottom: "24px" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  id={`cat-${cat}`}
                  className={`category-btn ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Food Grid */}
            {loading ? (
              <div className="grid-food">
                {Array.from({ length: 8 }).map((_, i) => (
                  <FoodCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredFoods.length > 0 ? (
              <div className="grid-food">
                {filteredFoods.map((food, i) => (
                  <FoodCard key={food.id} food={food} index={i} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <InfoIcon size="64px" style={{ color: "var(--text-muted)" }} />
                </div>
                <h3>Makanan Tidak Ditemukan</h3>
                <p>
                  Coba kata kunci lain atau pilih kategori yang berbeda
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("Semua");
                  }}
                >
                  Reset Filter
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />

      {/* Toast Notifications */}
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

export default Home;