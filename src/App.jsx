import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import "./index.css";
import "./styles/app.css";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavoriteProvider>
          <AppRoutes />
        </FavoriteProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;