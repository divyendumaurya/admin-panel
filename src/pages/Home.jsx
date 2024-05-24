import React, { useState } from 'react'
import { Link } from 'react-router-dom'



function getUser(){
  let user = localStorage.getItem('user');
  if(user){
    user = JSON.parse(user);
  }
  else{
    user = null;
  }
  return user;
}


const Home = () => {
const [user,setUser]=useState(getUser());

const handleLogout = ()=>{
  localStorage.removeItem('user');
  setUser(null);
}

  return (
    <>
    {user?(
      <div>
        <h4>hello , {user.firstName} {user.lastName}</h4>
        <h5>{user.email}</h5>
        <button className='bg-green-400' onClick={handleLogout}>LOGOUT</button>
      </div>) :(
      
      <Link to ="/login"><button className='border bg-blue-400 text-xl'>Login</button></Link>
      )}


      <div>
        <Link to ="/signUp"><button className='bg-purple-700 border-2'>Sign Up</button></Link>
      </div>
    </>
  )
}

export default Home
