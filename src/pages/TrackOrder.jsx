import { useState } from "react";
import { useOrders } from "../context/OrderContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SearchIcon, NoteIcon } from "../components/Icons";

function formatRupiah(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
}

function TrackOrder() {
  const { getOrdersByPhone } = useOrders();
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(false);
  const [foundOrders, setFoundOrders] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    const results = getOrdersByPhone(phone.trim());
    setFoundOrders(results);
    setSearched(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending": return <span className="badge" style={{ background: "rgba(245,158,11,0.2)", color: "#F59E0B" }}>Menunggu</span>;
      case "processing": return <span className="badge" style={{ background: "rgba(59,130,246,0.2)", color: "#3B82F6" }}>Diproses</span>;
      case "completed": return <span className="badge" style={{ background: "rgba(34,197,94,0.2)", color: "var(--success)" }}>Selesai</span>;
      case "cancelled": return <span className="badge" style={{ background: "rgba(239,68,68,0.2)", color: "var(--danger)" }}>Dibatalkan</span>;
      default: return null;
    }
  };

  return (
    <>
      <Navbar />
      <main className="page container animate-fade-in-up" style={{ minHeight: "70vh" }}>
        <div style={{ maxWidth: "600px", margin: "40px auto 0" }}>
          <h1 className="gradient-text" style={{ fontSize: "32px", textAlign: "center", marginBottom: "8px" }}>Lacak Pesanan</h1>
          <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "32px" }}>Masukkan nomor HP yang Anda gunakan saat memesan.</p>

          <form onSubmit={handleSearch} style={{ display: "flex", gap: "12px", marginBottom: "40px" }}>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: 08123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ flex: 1, padding: "14px 20px", fontSize: "16px" }}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ padding: "0 24px" }}>
              <SearchIcon size="20px" /> Cari
            </button>
          </form>

          {searched && (
            <div className="animate-scale-in">
              {foundOrders.length === 0 ? (
                <div className="empty-state">
                  <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>Pesanan tidak ditemukan</h3>
                  <p>Tidak ada riwayat pesanan dengan nomor HP tersebut.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>Riwayat Pesanan Anda:</h3>
                  {foundOrders.map((order) => (
                    <div key={order.id} className="receipt-container" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px" }}>
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
                        <div>
                          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>ID Pesanan: #{String(order.id).slice(-4)}</div>
                          <div style={{ fontSize: "14px", fontWeight: 600 }}>{new Date(order.createdAt).toLocaleString("id-ID")}</div>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "var(--text-primary)" }}>
                        <span style={{ fontWeight: 500 }}>{order.menuName} x{order.quantity}</span>
                        <span>{formatRupiah(order.menuPrice * order.quantity)}</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>
                        <span>Pengiriman: {order.deliveryMethod === "delivery" ? "Diantar" : "Ambil Sendiri"}</span>
                        <span>Pembayaran: {order.paymentMethod.toUpperCase()}</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px dashed var(--border)" }}>
                        <span style={{ fontSize: "16px", fontWeight: 600 }}>Total</span>
                        <span style={{ fontSize: "20px", fontWeight: 700, color: "var(--primary)" }}>{formatRupiah(order.totalPrice)}</span>
                      </div>

                      <div className="no-print" style={{ marginTop: "24px" }}>
                        <button className="btn btn-outline" style={{ width: "100%", display: "flex", justifyContent: "center", gap: "8px" }} onClick={() => window.print()}>
                          <NoteIcon size="16px" /> Cetak Struk
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default TrackOrder;
