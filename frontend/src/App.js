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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './features/userSlice';
import About from './components/layout/About';
import Contact from './components/layout/Contact';

function App() {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector(state => state.user);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  console.log(user, isAuth);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="products" element={<Products />} />
            <Route path="product-details/:id" element={<ProductDetails />} />
            <Route path="login" element={isAuth ? <Profile /> : <Login />} />
            <Route path="signup" element={isAuth ? <Profile /> : <Signup />} />
            <Route path="password/forgot" element={!isAuth ? <ForgotPassword /> : <NoPage />} />
            <Route path="password/reset/:token" element={!isAuth ? <ResetPassword /> : <NoPage />} />
            <Route path="profile" element={isAuth ? <Profile /> : <Login />} />
            <Route path="update-profile" element={isAuth ? <UpdateProfile /> : <Login />} />
            <Route path="update-password" element={isAuth ? <UpdatePassword /> : <Login />} />
            <Route path="cart" element={<Cart />} />
            <Route path="shipping-details" element={isAuth ? <ShippingDetails /> : <Login />} />
            <Route path="confirm-order" element={isAuth ? <ConfirmOrder /> : <Login />} />
            <Route path="placed-order" element={isAuth ? <PlacedOrder /> : <Login />} />
            <Route path="user-orders" element={isAuth ? <UserOrders /> : <Login />} />
            <Route path="order-details/:id" element={isAuth ? <OrderDetails /> : <Login />} />

            <Route path="admin-dashboard" element={(isAuth && user?.role === "admin") ? <Dashboard /> : <NoPage />} />
            <Route path="admin-products" element={(isAuth && user?.role === "admin") ? <AllProducts /> : <NoPage />} />
            <Route path="admin-create-product" element={(isAuth && user?.role === "admin") ? <CreateProduct /> : <NoPage />} />
            <Route path="admin-update-product/:id" element={(isAuth && user?.role === "admin") ? <UpdateProduct /> : <NoPage />} />
            <Route path="admin-orders" element={(isAuth && user?.role === "admin") ? <AllOrders /> : <NoPage />} />
            <Route path="admin-update-order/:id" element={(isAuth && user?.role === "admin") ? <UpdateOrder /> : <NoPage />} />
            <Route path="admin-users" element={(isAuth && user?.role === "admin") ? <AllUsers /> : <NoPage />} />
            <Route path="admin-update-user/:id" element={(isAuth && user?.role === "admin") ? <UpdateUser /> : <NoPage />} />
            <Route path="admin-reviews" element={(isAuth && user?.role === "admin") ? <AllReviews /> : <NoPage />} />

            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
