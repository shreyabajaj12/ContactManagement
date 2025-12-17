import React, { useState } from 'react'
import Navbar from './Navbar'
import Register from './Register'
import SignIn from'./SignIn'

const Login = () => {
    const [isSignUp,setIsSignUp]=useState(true);
    const toggleMode = () => {
    setIsSignUp(prev => !prev);
  };
  return (
    <div className='h-screen w-full bg-purple-400'>
        <Navbar isSignUp={isSignUp} onToggle={toggleMode}/>
         {isSignUp ? <Register /> : <SignIn />}
    </div>
  )
}

export default Login
