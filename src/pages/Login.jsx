import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  //states
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  // Redux state 
    const {loading , error} = useSelector((state)=>state.user);


  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin =(e)=>{
    e.preventDefault();
    let userCred={
      email,password
    }
    dispatch(loginUser(userCred)).then((result)=>{
      if(result.payload){

          setEmail('');
          setPassword('');
          navigate('/');
      }
    })
   }


  return (
    <>
    <form onSubmit={handleLogin}>
    <label htmlFor="email">email</label>
    <input type="email" required  className='border bg-slate-400' value={email} onChange={(e)=> setEmail(e.target.value)}/>
    <br/>
    <label htmlFor="password">pass</label>
    <input type="password" required className='border bg-slate-400' value={password} onChange={(e)=>setPassword(e.target.value)} />
    <br/>

    <button type='submit'>{loading?"Loading..." :  "Login"}</button>
    {error&&(
      <div className='bg-red-500' role='alert'>{error}</div>
    )}
    </form>
    
    
    </>
  )
}

export default Login
