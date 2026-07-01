import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { OrderProvider } from "./context/OrderContext";
import "./index.css";
import "./styles/app.css";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavoriteProvider>
          <OrderProvider>
            <AppRoutes />
          </OrderProvider>
        </FavoriteProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;