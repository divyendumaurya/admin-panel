import React from 'react'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import "../src/index.css"
import Signup from './pages/SignUp'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path ="/" element={<Home/>}/>
        <Route path ="/login" element ={<Login/>}/>
        <Route path ="/signUp" element={<Signup/>}/>
      </Routes>
    </Router>
    
    </>
  )
}

export default App
