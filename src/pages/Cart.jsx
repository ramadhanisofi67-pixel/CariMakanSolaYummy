import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import {
  CartIcon,
  TrashIcon,
  LogoIcon,
  CheckIcon,
  CloseIcon,
  HomeIcon,
  ArrowLeftIcon,
  SparklesIcon,
  DeliveryIcon,
  StoreIcon,
  QrisIcon,
  BankIcon,
  CashIcon,
  NoteIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
  UserIcon,
  StarIcon,
} from "../components/Icons";

function formatRupiah(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
}

/* ---- Shared input style ---- */
const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  background: "var(--bg-elevated)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  color: "var(--text-primary)",
  fontFamily: "var(--font-body)",
  fontSize: "13px",
  outline: "none",
  transition: "border-color 0.3s ease",
  resize: "vertical",
};

/* ---- Option card style (reusable) ---- */
const optionCard = (selected) => ({
  flex: 1,
  minWidth: "110px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  padding: "16px 12px",
  background: selected ? "var(--primary-light)" : "var(--bg-elevated)",
  border: `2px solid ${selected ? "var(--primary)" : "var(--border)"}`,
  borderRadius: "var(--radius-md)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  color: selected ? "var(--primary)" : "var(--text-secondary)",
  fontWeight: selected ? 700 : 500,
  fontSize: "13px",
  textAlign: "center",
});

function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQty,
    clearCart,
    totalPrice,
    toasts,
  } = useCart();
  const { addOrder } = useOrders();

  const [checkoutStep, setCheckoutStep] = useState("cart");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  /* ---- NEW: Checkout options ---- */
  const [deliveryMethod, setDeliveryMethod] = useState("delivery"); // "delivery" | "pickup"
  const [paymentMethod, setPaymentMethod] = useState("qris"); // "qris" | "bank" | "cash"
  const [customerNote, setCustomerNote] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [starRating, setStarRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  /* ---- Saved state for success screen ---- */
  const [orderSummary, setOrderSummary] = useState(null);
  const [qrisCodeUrl, setQrisCodeUrl] = useState("");

  const RESTAURANT_ADDRESS = "Bandar Lampung";

  const ongkir = deliveryMethod === "pickup" ? 0 : cartItems.length > 0 ? 10000 : 0;
  const grandTotal = totalPrice + ongkir - discount;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === "CARIMAKAN") {
      setDiscount(15000);
      setPromoError("");
    } else {
      setPromoError("Kode promo tidak valid");
      setDiscount(0);
    }
  };

  const saveOrdersLocally = () => {
    for (const item of cartItems) {
      addOrder({
        menuName: item.name,
        menuImage: item.image,
        menuPrice: item.price,
        quantity: item.qty,
        totalPrice: item.price * item.qty,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        deliveryMethod,
        paymentMethod,
        address: buyerAddress.trim(),
        note: customerNote.trim(),
      });
    }
  };

  const handleCheckout = () => {
    if (!customerName.trim()) {
      alert("Mohon isi nama pemesan!");
      return;
    }
    if (!customerPhone.trim()) {
      alert("Mohon isi nomor HP pemesan!");
      return;
    }
    if (deliveryMethod === "delivery" && !buyerAddress.trim()) {
      alert("Mohon isi alamat pengiriman!");
      return;
    }

    const uniqueQrisId = `QRIS-PAY-RP${Math.max(0, grandTotal)}-${Date.now()}`;
    setQrisCodeUrl(`https://quickchart.io/qr?text=${encodeURIComponent(uniqueQrisId)}&size=200`);

    setOrderSummary({
      items: [...cartItems],
      delivery: deliveryMethod,
      payment: paymentMethod,
      note: customerNote,
      address: buyerAddress,
      customerName,
      customerPhone,
      total: Math.max(0, grandTotal),
      discount,
    });

    if (paymentMethod === "cash") {
      saveOrdersLocally();
      setCheckoutStep("success");
      clearCart();
    } else {
      setCheckoutStep("payment");
    }
  };

  const handlePaymentConfirm = () => {
    saveOrdersLocally();
    setCheckoutStep("success");
    clearCart();
  };

  const deliveryLabel = (v) => (v === "delivery" ? "Diantar ke Alamat" : "Ambil Sendiri");
  const paymentLabel = (v) =>
    v === "qris" ? "QRIS" : v === "bank" ? "Transfer Bank" : "Cash / Tunai";

  /* ===== PAYMENT SCREEN ===== */
  if (checkoutStep === "payment" && orderSummary) {
    return (
      <>
        <Navbar />
        <main className="page">
          <div className="container">
            <div className="empty-state animate-scale-in" style={{ minHeight: "60vh" }}>
              <h2 style={{ fontSize: "28px" }}>Menunggu Pembayaran</h2>
              <p>Selesaikan pembayaran untuk memproses pesananmu.</p>

              <div style={{
                width: "100%",
                maxWidth: "420px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                textAlign: "center",
                marginTop: "16px",
              }}>
                {orderSummary.payment === "qris" ? (
                  <>
                    <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "var(--text-primary)" }}>
                      Scan QRIS
                    </div>
                    <img
                      src={qrisCodeUrl}
                      alt="QRIS Code"
                      style={{ width: "200px", height: "200px", borderRadius: "var(--radius-md)", border: "4px solid white" }}
                    />
                    <div style={{ marginTop: "12px", fontSize: "12px", color: "var(--text-muted)" }}>
                      Kode transaksi: <br />
                      <strong>{qrisCodeUrl.includes('text=') ? decodeURIComponent(qrisCodeUrl.split('text=')[1].split('&')[0]) : 'Unknown'}</strong>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", color: "var(--text-primary)" }}>
                      Transfer Bank
                    </div>
                    <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                      BCA: <strong>1234567890</strong> (a.n. sola company)
                    </div>
                    <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                      Mandiri: <strong>0987654321</strong> (a.n. sola company)
                    </div>
                  </>
                )}

                <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--primary)", marginTop: "24px" }}>
                  Total: {formatRupiah(orderSummary.total)}
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={handlePaymentConfirm}
                style={{ marginTop: "24px", width: "100%", maxWidth: "420px", display: "inline-flex", justifyContent: "center" }}
              >
                <CheckIcon size="16px" /> Saya Sudah Bayar
              </button>

              <button
                className="btn btn-ghost"
                onClick={() => setCheckoutStep("cart")}
                style={{ marginTop: "12px", width: "100%", maxWidth: "420px", display: "inline-flex", justifyContent: "center" }}
              >
                Batal / Kembali ke Keranjang
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  /* ===== SUCCESS SCREEN ===== */
  if (checkoutStep === "success" && orderSummary) {
    return (
      <>
        <Navbar />
        <main className="page">
          <div className="container">
            <div
              className="empty-state animate-scale-in"
              style={{ minHeight: "60vh" }}
            >
              <div className="empty-icon">
                <CheckIcon size="64px" style={{ color: "var(--success)" }} />
              </div>
              <h2 style={{ fontSize: "28px" }}>Pesanan Berhasil!</h2>
              <p>
                Terima kasih! Pesananmu sedang diproses.
              </p>

              {/* Order receipt card */}
              <div
                className="receipt-container"
                style={{
                  width: "100%",
                  maxWidth: "420px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "24px",
                  textAlign: "left",
                  marginTop: "8px",
                }}
              >
                <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px", color: "var(--text-primary)" }}>
                  Detail Pesanan
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "12px", fontSize: "13px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)" }}>
                    <UserIcon size="16px" />
                    <span style={{ fontWeight: 600 }}>{orderSummary.customerName}</span>
                    <span style={{ color: "var(--text-muted)" }}>({orderSummary.customerPhone})</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                    Waktu Pesanan: {new Date().toLocaleString("id-ID")} | Total Item: {orderSummary.items.reduce((acc, curr) => acc + curr.qty, 0)}
                  </div>
                </div>

                {orderSummary.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      padding: "6px 0",
                      borderBottom: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <span>{item.name} x{item.qty}</span>
                    <span>{formatRupiah(item.price * item.qty)}</span>
                  </div>
                ))}

                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)" }}>
                    {orderSummary.delivery === "delivery" ? <DeliveryIcon size="16px" /> : <StoreIcon size="16px" />}
                    <span>{deliveryLabel(orderSummary.delivery)}</span>
                  </div>

                  {orderSummary.delivery === "delivery" ? (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", color: "var(--text-secondary)" }}>
                      <span style={{ minWidth: "70px", fontWeight: 600 }}>Alamat:</span>
                      <span>{orderSummary.address}</span>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", color: "var(--text-secondary)" }}>
                      <span style={{ minWidth: "70px", fontWeight: 600 }}>Restoran:</span>
                      <span>{RESTAURANT_ADDRESS}</span>
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)" }}>
                    {orderSummary.payment === "qris" ? <QrisIcon size="16px" /> : orderSummary.payment === "bank" ? <BankIcon size="16px" /> : <CashIcon size="16px" />}
                    <span>{paymentLabel(orderSummary.payment)}</span>
                  </div>
                  {orderSummary.note && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", color: "var(--text-muted)" }}>
                      <NoteIcon size="16px" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontStyle: "italic" }}>"{orderSummary.note}"</span>
                    </div>
                  )}
                </div>

                {orderSummary.discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--success)", marginTop: "12px" }}>
                    <span>Diskon Promo</span>
                    <span>− {formatRupiah(orderSummary.discount)}</span>
                  </div>
                )}

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "var(--primary)",
                  borderTop: "1px solid var(--border)",
                  paddingTop: "12px",
                  marginTop: "12px",
                }}>
                  <span>Total</span>
                  <span>{formatRupiah(orderSummary.total)}</span>
                </div>
              </div>

              <div
                style={{
                  padding: "16px 24px",
                  background: "var(--success-light)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--success)",
                  fontWeight: 600,
                  marginTop: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <CheckIcon size="16px" /> Estimasi {orderSummary.delivery === "delivery" ? "tiba: 20-40 menit" : "siap: 10-20 menit"}
              </div>
              {/* ====== REVIEW SECTION ====== */}
              {!reviewSubmitted ? (
                <div style={{
                  width: "100%",
                  maxWidth: "420px",
                  marginTop: "16px",
                  padding: "20px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  textAlign: "left",
                }}>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <SparklesIcon size="16px" /> Berikan Ulasan & Rating
                  </div>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "8px 0" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setStarRating(star)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "4px",
                          color: star <= starRating ? "#eab308" : "var(--text-muted)",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        <StarIcon size="28px" filled={star <= starRating} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Bagikan pengalaman kuliner Anda di sini..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setReviewSubmitted(true)}
                    style={{ fontSize: "13px", padding: "10px", display: "inline-flex", justifyContent: "center" }}
                  >
                    Kirim Ulasan
                  </button>
                </div>
              ) : (
                <div style={{
                  width: "100%",
                  maxWidth: "420px",
                  marginTop: "16px",
                  padding: "20px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--success)",
                  borderRadius: "var(--radius-lg)",
                  textAlign: "center",
                }}>
                  <div style={{ fontWeight: 700, color: "var(--success)", fontSize: "15px", marginBottom: "6px" }}>
                    Terima Kasih Atas Ulasan Anda!
                  </div>
                  <div style={{ display: "flex", gap: "4px", justifyContent: "center", marginBottom: "8px", color: "#eab308" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} size="16px" filled={star <= starRating} />
                    ))}
                  </div>
                  {reviewText && (
                    <div style={{ fontSize: "13px", color: "var(--text-secondary)", fontStyle: "italic", background: "var(--bg-elevated)", padding: "10px", borderRadius: "var(--radius-sm)" }}>
                      "{reviewText}"
                    </div>
                  )}
                </div>
              )}

              <button
                className="btn btn-primary"
                id="back-home-btn"
                onClick={() => navigate("/")}
                style={{ marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <HomeIcon /> Kembali ke Home
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  /* ===== MAIN CART SCREEN ===== */
  return (
    <>
      <Navbar />
      <main className="page">
        <div className="container">
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
                <CartIcon size="26px" /> Keranjang Belanja
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                {cartItems.length} item dalam keranjang
              </p>
            </div>
            {cartItems.length > 0 && (
              <button
                id="clear-cart-btn"
                className="btn btn-ghost"
                style={{
                  color: "var(--danger)",
                  borderColor: "rgba(239,68,68,0.4)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onClick={clearCart}
              >
                <TrashIcon size="14px" /> Kosongkan
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-state" style={{ minHeight: "50vh" }}>
              <div className="empty-icon">
                <CartIcon size="64px" style={{ color: "var(--text-muted)" }} />
              </div>
              <h3>Keranjang Kosong</h3>
              <p>Yuk tambahkan makanan lezat ke keranjangmu!</p>
              <button
                className="btn btn-primary"
                id="shop-now-btn"
                onClick={() => navigate("/")}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <LogoIcon /> Mulai Belanja
              </button>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Cart Items */}
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div
                    className="cart-item"
                    id={`cart-item-${item.id}`}
                    key={item.id}
                  >
                    <img
                      className="cart-item-img"
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop";
                      }}
                    />
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-cat">{item.category}</div>
                      <div className="cart-item-actions">
                        {/* Qty */}
                        <div className="cart-qty">
                          <button
                            id={`qty-minus-${item.id}`}
                            className="cart-qty-btn"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            disabled={item.qty <= 1}
                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <MinusIcon size="12px" />
                          </button>
                          <span className="cart-qty-num">{item.qty}</span>
                          <button
                            id={`qty-plus-${item.id}`}
                            className="cart-qty-btn"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <PlusIcon size="12px" />
                          </button>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div className="cart-item-price">
                            {formatRupiah(item.price * item.qty)}
                          </div>
                          <button
                            id={`remove-${item.id}`}
                            className="cart-item-remove"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Hapus ${item.name}`}
                            title="Hapus"
                          >
                            <TrashIcon size="14px" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="cart-summary">
                <h3 className="cart-summary-title" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <InfoIcon size="18px" /> Ringkasan Pesanan
                </h3>

                {cartItems.map((item) => (
                  <div
                    className="cart-summary-row"
                    key={item.id}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <span style={{ fontSize: "13px" }}>
                      {item.name} x{item.qty}
                    </span>
                    <span>{formatRupiah(item.price * item.qty)}</span>
                  </div>
                ))}

                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>{formatRupiah(totalPrice)}</span>
                </div>
                <div className="cart-summary-row" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <DeliveryIcon size="14px" /> Ongkos Kirim
                  </span>
                  <span style={{ marginLeft: "auto" }}>
                    {deliveryMethod === "pickup" ? (
                      <span style={{ color: "var(--success)", fontWeight: 600 }}>GRATIS</span>
                    ) : (
                      formatRupiah(ongkir)
                    )}
                  </span>
                </div>
                {discount > 0 && (
                  <div
                    className="cart-summary-row"
                    style={{ color: "var(--success)" }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <SparklesIcon size="14px" /> Diskon Promo
                    </span>
                    <span>− {formatRupiah(discount)}</span>
                  </div>
                )}

                {/* Promo Input */}
                <div style={{ margin: "16px 0" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    <input
                      id="promo-input"
                      type="text"
                      placeholder="Kode promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      style={{
                        ...inputStyle,
                        flex: 1,
                        width: "auto",
                        border: `1px solid ${promoError ? "var(--danger)" : "var(--border)"}`,
                      }}
                    />
                    <button
                      id="apply-promo-btn"
                      className="btn btn-outline"
                      style={{ padding: "8px 12px", fontSize: "13px" }}
                      onClick={handlePromo}
                    >
                      Pakai
                    </button>
                  </div>
                  {promoError && (
                    <p
                      style={{
                        color: "var(--danger)",
                        fontSize: "12px",
                        marginTop: "6px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <CloseIcon size="12px" /> {promoError}
                    </p>
                  )}
                  {discount > 0 && (
                    <p
                      style={{
                        color: "var(--success)",
                        fontSize: "12px",
                        marginTop: "6px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <CheckIcon size="12px" /> Promo berhasil! Hemat {formatRupiah(discount)}
                    </p>
                  )}
                </div>

                {/* ====== DATA PEMESAN ====== */}
                <div style={{ marginBottom: "16px" }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}>
                    <UserIcon size="16px" /> Data Pemesan
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px", display: "block" }}>
                        Nama Lengkap Pemesan
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Budi Santoso"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px", display: "block" }}>
                        No HP / Telepon Pemesan
                      </label>
                      <input
                        type="tel"
                        placeholder="Contoh: 081234567890"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                </div>

                {/* ====== DELIVERY METHOD ====== */}
                <div style={{ marginBottom: "16px" }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}>
                    <DeliveryIcon size="16px" /> Metode Pengiriman
                  </div>
                  <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
                    <button
                      type="button"
                      id="delivery-option"
                      style={optionCard(deliveryMethod === "delivery")}
                      onClick={() => setDeliveryMethod("delivery")}
                    >
                      <DeliveryIcon size="24px" />
                      Diantar
                    </button>
                    <button
                      type="button"
                      id="pickup-option"
                      style={optionCard(deliveryMethod === "pickup")}
                      onClick={() => setDeliveryMethod("pickup")}
                    >
                      <StoreIcon size="24px" />
                      Ambil Sendiri
                    </button>
                  </div>

                  {deliveryMethod === "delivery" ? (
                    <div>
                      <label
                        style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px", display: "block" }}
                      >
                        Alamat Pengiriman Lengkap
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Contoh: Jl. Merdeka No. 10, RT 01/02..."
                        value={buyerAddress}
                        onChange={(e) => setBuyerAddress(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  ) : (
                    <div style={{
                      padding: "12px",
                      background: "var(--primary-light)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                      fontSize: "13px",
                      color: "var(--text-primary)",
                    }}>
                      <div style={{ fontWeight: 600, marginBottom: "4px" }}>Alamat Restoran:</div>
                      <div>{RESTAURANT_ADDRESS}</div>
                    </div>
                  )}
                </div>

                {/* ====== PAYMENT METHOD ====== */}
                <div style={{ marginBottom: "16px" }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}>
                    <CashIcon size="16px" /> Metode Pembayaran
                  </div>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      id="pay-qris"
                      style={optionCard(paymentMethod === "qris")}
                      onClick={() => setPaymentMethod("qris")}
                    >
                      <QrisIcon size="24px" />
                      QRIS
                    </button>
                    <button
                      type="button"
                      id="pay-bank"
                      style={optionCard(paymentMethod === "bank")}
                      onClick={() => setPaymentMethod("bank")}
                    >
                      <BankIcon size="24px" />
                      Transfer Bank
                    </button>
                    <button
                      type="button"
                      id="pay-cash"
                      style={optionCard(paymentMethod === "cash")}
                      onClick={() => setPaymentMethod("cash")}
                    >
                      <CashIcon size="24px" />
                      Cash
                    </button>
                  </div>
                </div>

                {/* ====== CUSTOMER NOTE ====== */}
                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="customer-note"
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <NoteIcon size="16px" /> Catatan Pesanan
                  </label>
                  <textarea
                    id="customer-note"
                    rows={3}
                    placeholder="Contoh: Tidak pakai sambal, extra lalapan..."
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    style={{
                      ...inputStyle,
                      marginTop: "10px",
                    }}
                  />
                </div>

                <div className="cart-summary-row total">
                  <span>Total Pembayaran</span>
                  <span>{formatRupiah(Math.max(0, grandTotal))}</span>
                </div>

                <button
                  id="checkout-btn"
                  className="btn btn-primary cart-checkout-btn"
                  onClick={handleCheckout}
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                >
                  <CheckIcon size="16px" /> Checkout Sekarang
                </button>

                <button
                  className="btn btn-ghost"
                  style={{ width: "100%", marginTop: "8px", fontSize: "13px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                  onClick={() => navigate("/")}
                >
                  <ArrowLeftIcon size="14px" /> Lanjut Belanja
                </button>
              </div>
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

export default Cart;
