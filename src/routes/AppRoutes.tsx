import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

import { Navbar } from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";

import { HomePage } from "../pages/Home";
import { ProductsPage } from "../pages/Products";
import { LoginPage } from "../pages/Login";
import { WishlistPage } from "../pages/WishList";
import { CartPage } from "../pages/CartPage";
import { ProfilePage } from "../pages/Profile";
import { OrdersPage } from "../pages/OrdersPage";
import { AdminPage } from "../pages/AdminPage";

interface RequireAuthProps {
  children: ReactNode;
  roles?: string[];
}

const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-[#faf9f6]">
    <div className="w-12 h-12 border-4 border-black border-dashed rounded-full animate-spin"></div>
  </div>
);

const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log("Current Route:", location.pathname);

  console.log("Loading:", loading);
  console.log("User:", user);
  console.log("Location:", location);

  if (loading) return <Loader />;

  if (!user) {
    console.log("Redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  if (roles && !user.roles.some(r => roles.includes(r))) {
    console.log("User is not authorized.");
    return <Navigate to="/" replace />;
  }

  if (location.pathname === '/products' && user.roles.includes('ADMIN')) {
    console.log("Redirecting to admin.");
    return <Navigate to="/admin" replace />;
  }

  console.log("Rendering protected page.");

  return <>{children}</>;
};

export default function AppRoutes() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">

      {!isAdmin && <Navbar />}

        <main className="flex-grow">
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />

            {/* Protected Routes */}
            <Route path="/products" element={ <RequireAuth><ProductsPage /></RequireAuth> } />
            <Route path="/wishlist" element={ <RequireAuth><WishlistPage /></RequireAuth> } />
            <Route path="/cart" element={ <RequireAuth><CartPage /></RequireAuth> } />
            <Route path="/profile" element={ <RequireAuth><ProfilePage /></RequireAuth> } />
            <Route path="/orders" element={ <RequireAuth><OrdersPage /></RequireAuth> } />

            {/* Admin */}
            {/* <Route path="/admin" element={ <RequireAuth roles={["ADMIN"]}><AdminPage /></RequireAuth> } /> */}

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </main>

      {!isAdmin && <Footer />}

    </div>
  );
}