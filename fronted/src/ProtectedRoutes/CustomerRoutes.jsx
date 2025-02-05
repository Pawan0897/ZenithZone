
import { Route, Routes } from 'react-router-dom'
import Home from '../Customer/Home'
import Products from '../Customer/Products'
import WishList from '../Customer/WishList'
import Category from '../Customer/Category'
import CartProduct from '../Customer/CartProduct'
import CheckOut from '../Customer/CheckOut'
import ProductDetails from '../Customer/ProductDetails'

export default function CustomerRoutes() {
  return (
    <>
    
    <Routes>
        <Route path='/home' element={<Home />} />
         <Route path='/product' element={<Products />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/category/:id' element={<Category />}  />
        <Route path='/cartproduct' element={<CartProduct />} />
        <Route path='/checkout' element={<CheckOut />} />
        <Route path='/productdetails/:id' element={<ProductDetails />} />

    </Routes>
      
    </>
  )
}
