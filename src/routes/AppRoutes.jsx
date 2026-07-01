import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Cart from "../pages/Cart";
import Favorite from "../pages/Favorite";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import TrackOrder from "../pages/TrackOrder";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/track" element={<TrackOrder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;