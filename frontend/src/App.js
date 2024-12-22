import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar'
import Home from './components/layout/Home'
import Products from './components/product/Products'
import Footer from './components/layout/Footer'
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login'
import Signup from './components/user/Signup'
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import Cart from './components/cart/Cart';
import ShippingDetails from './components/cart/ShippingDetails';
import ConfirmOrder from './components/cart/ConfirmOrder';
import UserOrders from './components/user/UserOrders';
import Dashboard from './components/admin/Dashboard';
import AllProducts from './components/admin/AllProducts';
import AllOrders from './components/admin/AllOrders';
import AllUsers from './components/admin/AllUsers';
import AllReviews from './components/admin/AllReviews';
import CreateProduct from './components/admin/CreateProduct';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import UpdateProduct from './components/admin/UpdateProduct';
import UpdateOrder from './components/admin/UpdateOrder';
import UpdateUser from './components/admin/UpdateUser';
import NoPage from './components/layout/NoPage';
import PlacedOrder from './components/cart/PlacedOrder';
import OrderDetails from './components/user/OrderDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="product-details/:id" element={<ProductDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="password/forgot" element={<ForgotPassword />} />
            <Route path="password/reset/:token" element={<ResetPassword />} />
            <Route path="profile" element={<Profile />} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route path="cart" element={<Cart />} />
            <Route path="shipping-details" element={<ShippingDetails />} />
            <Route path="confirm-order" element={<ConfirmOrder />} />
            <Route path="placed-order" element={<PlacedOrder />} />
            <Route path="user-orders" element={<UserOrders />} />
            <Route path="order-details/:id" element={<OrderDetails />} />

            <Route path="admin-dashboard" element={<Dashboard />} />
            <Route path="admin-products" element={<AllProducts />} />
            <Route path="admin-create-product" element={<CreateProduct />} />
            <Route path="admin-update-product/:id" element={<UpdateProduct />} />
            <Route path="admin-orders" element={<AllOrders />} />
            <Route path="admin-update-order/:id" element={<UpdateOrder />} />
            <Route path="admin-users" element={<AllUsers />} />
            <Route path="admin-update-user/:id" element={<UpdateUser />} />
            <Route path="admin-reviews" element={<AllReviews />} />

            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
