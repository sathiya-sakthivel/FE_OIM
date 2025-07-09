// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import OrderPage from "./pages/OrderPage";
import InventoryPage from "./pages/InventoryPage";
import CartPage from "./pages/CartPage"; // ✅ Import CartPage
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import OrdersListPage from "./pages/OrdersListPage";
import { CartProvider } from "./context/CartContext";
import "./styles/global.css";

// Layout Component
function Layout({ children }) {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div
      className="app-container"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {!isAuthPage && <Header toggleSidebar={toggleSidebar} />}
      <div style={{ display: "flex", flexGrow: 1 }}>
        {!isAuthPage && sidebarVisible && <Sidebar />}
        <div className="main-content" style={{ flexGrow: 1, padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  const token = localStorage.getItem("token");

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/orderslistpage" element={<OrdersListPage />} />
        <Route path="/cart" element={<CartPage />} /> {/* ✅ Cart Page */}
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CartProvider>
  );
}
