import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { InfoIcon, HomeIcon, ArrowLeftIcon } from "../components/Icons";

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main
        className="page"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="notfound animate-scale-in">
          <div className="notfound-emoji">
            <InfoIcon size="64px" style={{ color: "var(--text-muted)" }} />
          </div>
          <div className="notfound-code">404</div>
          <h1 className="notfound-msg">Halaman Tidak Ditemukan</h1>
          <p className="notfound-sub">
            Sepertinya halaman yang kamu cari sudah habis atau tidak pernah ada.
            <br />
            Mungkin menu lainnya bisa mengobati rasa penasaranmu?
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              id="go-home-btn"
              className="btn btn-primary"
              onClick={() => navigate("/")}
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <HomeIcon /> Kembali ke Home
            </button>
            <button
              id="go-back-btn"
              className="btn btn-ghost"
              onClick={() => navigate(-1)}
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <ArrowLeftIcon /> Halaman Sebelumnya
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default NotFound;
