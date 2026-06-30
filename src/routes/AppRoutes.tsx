import { lazy, Suspense, type ReactNode } from "react"
import { useAuth } from "../hooks/useAuth"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/auth/Login"))
const Register = lazy(() => import("../pages/auth/Register"))
const AppLayout = lazy(() => import("../pages/admin/AppLayout"))
const Dashboard = lazy(() => import("../pages/admin/Dashboard"))
const ProductPage = lazy(() => import("../pages/admin/ProductPage"))
const CustomerPage = lazy(() => import("../pages/admin/CustomerPage"))
const OrderPage = lazy(() => import("../pages/admin/OrderPage"))
const CouponPage = lazy(() => import("../pages/admin/CouponPage"))
const SettingsPage = lazy(() => import("../pages/admin/SettingPage"))
const Products = lazy(() => import("../pages/Products"))
const WishList = lazy(() => import("../pages/WishList"))
const Cart = lazy(() => import("../pages/CartPage"))
const Profile = lazy(() => import("../pages/Profile"))
const Checkout = lazy(() => import("../pages/Checkout"))
const OrderSuccessPage = lazy(() => import("../pages/OrderSuccessPage"))

type RequireAuthTypes = {
    children: ReactNode
    roles?: string[]
}

const RequireAuth = ({ children, roles }: RequireAuthTypes) => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to={"/login"} replace />
    }

    if (roles && !roles.some((role) => user?.roles?.includes(role))) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold mb-2">Access Denied</h2>
                <p>You don't have permission to view this page.</p>
            </div>
        )
    }

    return <>{children}</>
}

const Router = () => {
    return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/" element={ <AppLayout /> }>
            <Route path="admin" element={ <RequireAuth roles={["ADMIN"]}><Dashboard /> </RequireAuth> } />
            <Route path="admin/products" element={ <RequireAuth roles={["ADMIN"]}><ProductPage /> </RequireAuth> } />
            <Route path="admin/customers" element={ <RequireAuth roles={["ADMIN"]}><CustomerPage /> </RequireAuth> } />
            <Route path="admin/orders" element={ <RequireAuth roles={["ADMIN"]}><OrderPage /> </RequireAuth> } />
            <Route path="admin/coupons" element={ <RequireAuth roles={["ADMIN"]}><CouponPage /> </RequireAuth> } />
            <Route path="admin/settings" element={ <RequireAuth roles={["ADMIN"]}><SettingsPage /> </RequireAuth> } />
          </Route>
          <Route path="/products" element={ <RequireAuth><Products /> </RequireAuth> } />
          <Route path="/wishlist" element={ <RequireAuth><WishList /> </RequireAuth> } />
          <Route path="/cart" element={ <RequireAuth><Cart /> </RequireAuth> } />
          <Route path="/profile" element={ <RequireAuth><Profile /> </RequireAuth> } />
          <Route path="/checkout" element={ <RequireAuth><Checkout /> </RequireAuth> } />
          <Route path="/orderSuccess" element={ <RequireAuth><OrderSuccessPage /> </RequireAuth> } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router