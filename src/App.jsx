import React from 'react'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import "../src/index.css"
import Signup from './pages/SignUp'
import ProductList from './components/ProductList'
import CreateProduct from './components/CreateProduct'
import EditProduct from './components/EditProduct'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path ="/" element={<Home/>}/>
        <Route path ="/login" element ={<Login/>}/>
        <Route path ="/signUp" element={<Signup/>}/>
        <Route path ="/products" element={<ProductList/>}/>
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </Router>
    
    </>
  )
}

export default App
