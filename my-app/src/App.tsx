import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './layout/Header'
import Home from './Pages/Home/Home'
import Pricing from './Pages/Pricing/Pricing'
import Product from './Pages/Product/Product'
import Contact from './Pages/Contact/Contact'
import About from './Pages/About/About'
import SingleDetails from './Pages/Product/ProductDetails'
import Post from './Pages/Post/Post'
import SinglePost from './Pages/Post/SinglePost'
import Signin from './Pages/signin/Signin'
import Register from './Pages/register/Register'
import { NOTFOUND } from 'dns'
import NotFound from './Pages/notfound/notFound'
import Dashboard from './Pages/dashboard/Dashboard'
import Auth from './layout/auth_layout/Auth'
import DefaultLayout from './layout/default/Default'
import ProductForm from './Pages/dashboard/product/product'
import GetProduct from './Pages/dashboard/product/getProduct'
import GetCategory from './Pages/dashboard/category/GetCategory'
import GetCustomer from './Pages/dashboard/customers/GetCustomers'
import GetOrder from './Pages/dashboard/Orders/GetOrder'
import UpdateProductForm from './Pages/dashboard/product/updateProduct/updateProductForm'
import UpdateProductPage from './Pages/dashboard/product/updateProduct/updateProduct'
import UserLayout from './layout/user-layout/user-layout'
import UserDashboard from './Pages/dashboard/user-dashboard/user-dashboard'
import Cart from './Pages/dashboard/carts/Cart'
import AddCategoryForm from './Pages/dashboard/category/add-catrgory'
import UpdateCategoryPage from './Pages/dashboard/category/update-category/update-category'
import UserPage from './Pages/dashboard/user/get-user'
import AdminLayout from './layout/user-layout/admin-layout'
import Shipping from './Pages/dashboard/shipping/shipping'
import OrderRequests from './Pages/dashboard/shipping/order-requests'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<DefaultLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Product />} />
          <Route path='/products/:id' element={<SingleDetails />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/post' element={<Post />} />
          <Route path='/post/:id' element={<SinglePost />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/register' element={<Register />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
        <Route element={<Auth />}>

        <Route element={<AdminLayout />}>


          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/add-product' element={<ProductForm />} />
          <Route path='/dashboard/update-product/:id' element={<UpdateProductPage />} />

          <Route path='/dashboard/Products' element={<GetProduct />} />
          <Route path='/dashboard/category' element={<GetCategory />} />
          <Route path='/dashboard/order' element={<GetOrder />} />
          <Route path='/dashboard/customers' element={<GetCustomer />} />

          {/* Category */}
          <Route path="/dashboard/add-category" element={<AddCategoryForm />} />
          <Route path="/dashboard/category" element={<GetCategory />} />
          <Route path="/dashboard/update-category/:id" element={<UpdateCategoryPage />} />


          {/* Orders */}
          <Route path="/dashboard/orders" element={<GetOrder />} />

          {/* Customers */}
          <Route path="/dashboard/customers" element={<UserPage />} />
        </Route>


        <Route element={<UserLayout />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/carts" element={<Cart />} />
       
          <Route path="/shipping" element={<OrderRequests />} />
          <Route path="/shipping/:id" element={<Shipping />} />

        </Route>

      </Route>

    </Routes>
    </BrowserRouter >

  )
}

export default App
