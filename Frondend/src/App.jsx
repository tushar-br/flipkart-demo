import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import AddProduct from './Admin/AddProduct';
import AddCategory from './Admin/AddCategory';
import ProtectedRoute from './ProtectedRoute';
import AdminNavbar from './Admin/AdminNavbar';
import OrderPage from './pages/OrderPage';
import AdminOrder from './Admin/AdminOrder';
import Profile from './pages/Profile'
import AdminProfile from './pages/AdminProfile'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="products" element={
              <ProtectedRoute role="user">
                <Shop />
              </ProtectedRoute>
            } />

            {/* <Route path="products/:id" element={<ProductDetail />} /> */}
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="profile" element={<ProtectedRoute role="user">
              <Profile />
            </ProtectedRoute>} />

              <Route path="admin/profile" element={<ProtectedRoute role="admin" >
              <AdminProfile />
            </ProtectedRoute>} />

            <Route path="cart" element={
              <ProtectedRoute role="user">
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="order" element={
              <ProtectedRoute role="user">
                <OrderPage />
              </ProtectedRoute>
            } />
            <Route path="products/:id" element={
              <ProtectedRoute role="user">
                <ProductDetail />
              </ProtectedRoute>
            } />


            <Route path="admin" element={
              <ProtectedRoute role="admin">
                <AdminNavbar />
              </ProtectedRoute>
            } />
            <Route path="admin/manage-order" element={
              <ProtectedRoute role="admin">
                <AdminOrder />
              </ProtectedRoute>
            } />

            <Route path="admin/product" element={
              <ProtectedRoute role="admin">
                <AddProduct />
              </ProtectedRoute>
            } />
            <Route path="admin/category" element={
              <ProtectedRoute role="admin"><AddCategory /></ProtectedRoute>} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App