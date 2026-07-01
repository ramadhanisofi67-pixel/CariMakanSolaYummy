import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Hardcode admin login as requested
    setTimeout(() => {
      if (formData.username === "admin" && formData.password === "admin123") {
        const adminUser = {
          id: 1,
          name: "Admin",
          username: "admin",
          role: "admin",
          token: "dummy-admin-token-123"
        };

        localStorage.setItem("token", adminUser.token);
        localStorage.setItem("user", JSON.stringify(adminUser));
        navigate("/admin");
      } else {
        setError("Username atau password salah!");
      }
      setLoading(false);
    }, 500); // Simulate short network delay
  };

  return (
    <>
      <Navbar />
      <main className="page auth-container animate-fade-in-up">
        <div className="auth-card">
          <h1 className="auth-title">Masuk</h1>
          {error && (
            <div style={{ color: "var(--danger)", marginBottom: "16px", textAlign: "center", fontSize: "14px", background: "var(--danger-light)", padding: "10px", borderRadius: "8px" }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                placeholder="Masukkan username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }} disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Login;
