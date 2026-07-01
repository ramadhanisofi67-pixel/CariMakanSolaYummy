import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard() {
  const navigate = useNavigate();
  const { orders, updateOrderStatus, deleteOrder } = useOrders();
  const [activeTab, setActiveTab] = useState("orders");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) { navigate("/login"); return; }
    const user = JSON.parse(userStr);
    if (user.role !== "admin") { navigate("/"); return; }
  }, [navigate]);

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    setSuccessMsg("Status pesanan diperbarui!");
  };

  const handleDeleteOrder = (id) => {
    if (!window.confirm("Yakin ingin menghapus pesanan ini?")) return;
    deleteOrder(id);
    setSuccessMsg("Pesanan berhasil dihapus!");
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Stats
  const totalRevenue = orders.filter((o) => o.status === "completed").reduce((s, o) => s + (o.totalPrice || 0), 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;

  return (
    <>
      <Navbar />
      <main className="page container animate-fade-in-up">
        {/* Header */}
        <div className="admin-header" style={{ marginTop: "32px" }}>
          <div>
            <h1 className="gradient-text" style={{ fontSize: "32px", marginBottom: "8px" }}>Dashboard Admin</h1>
            <p style={{ color: "var(--text-secondary)" }}>Kelola pesanan pelanggan Anda.</p>
          </div>
          <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "20px" }}>
            <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px" }}>Total Pesanan</div>
            <div style={{ fontSize: "28px", fontWeight: 700 }}>{orders.length}</div>
          </div>
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "20px" }}>
            <div style={{ fontSize: "13px", color: "#F59E0B", marginBottom: "8px" }}>Menunggu</div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "#F59E0B" }}>{pendingCount}</div>
          </div>
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "20px" }}>
            <div style={{ fontSize: "13px", color: "var(--success)", marginBottom: "8px" }}>Selesai</div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--success)" }}>{completedCount}</div>
          </div>
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "20px" }}>
            <div style={{ fontSize: "13px", color: "var(--primary)", marginBottom: "8px" }}>Pendapatan</div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--primary)" }}>{formatPrice(totalRevenue)}</div>
          </div>
        </div>

        {/* Success Message */}
        {successMsg && (
          <div style={{ color: "var(--success)", background: "var(--success-light)", padding: "12px 16px", borderRadius: "12px", marginBottom: "16px", fontSize: "14px", fontWeight: 500 }}>
            ✓ {successMsg}
          </div>
        )}

        {/* Orders Table */}
        {orders.length === 0 ? (
          <div className="empty-state" style={{ padding: "60px 24px" }}>
            <div style={{ fontSize: "48px" }}>📋</div>
            <h3>Belum Ada Pesanan</h3>
            <p>Pesanan dari pelanggan akan muncul di sini secara otomatis.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Waktu</th>
                  <th>Pelanggan</th>
                  <th>Menu</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Pengiriman</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 600 }}>#{String(order.id).slice(-4)}</td>
                    <td style={{ fontSize: "13px" }}>{formatDate(order.createdAt)}</td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{order.customerName}</div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{order.customerPhone}</div>
                    </td>
                    <td style={{ fontWeight: 500 }}>{order.menuName || "-"}</td>
                    <td>{order.quantity}x</td>
                    <td style={{ fontWeight: 600, color: "var(--primary)" }}>{formatPrice(order.totalPrice)}</td>
                    <td>
                      <span className="badge badge-primary" style={{ fontSize: "11px" }}>
                        {order.deliveryMethod === "delivery" ? "Antar" : "Ambil"}
                      </span>
                    </td>
                    <td>
                      <select className={`status-select ${order.status}`} value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="processing">Diproses</option>
                        <option value="completed">Selesai</option>
                        <option value="cancelled">Dibatalkan</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: "12px", color: "var(--danger)" }} onClick={() => handleDeleteOrder(order.id)}>Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default AdminDashboard;
