import { replace, useNavigate } from 'react-router-dom';
import logo from '../assets/account.png'
import React, { useState } from 'react';

const Navbar = ({username}) => {
    const [open,setOpen]=useState(false);
    const nav=()=>{
        setOpen(!open);
    }
    const navigate=useNavigate();
    const handleLogout=()=>{
      localStorage.removeItem('token');
      navigate('/',{replace:true});
    }
  return (
    <>
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black border-b'>
        <h1 className='font-bold text-[6vw] lg:text-5xl'>ContactManagement</h1>
        <div onClick={nav} className='cursor-pointer flex flex-col'>
            <img className='h-12 w-12' src={logo} alt='logo' />
            <p className='text-center'>{username}</p>
        </div>
    </div>
{open && <div className="relative max-w-[1240px] mx-auto">
  <div className="bg-black text-white mt-0 w-40 absolute top-0 right-0 h-50 ml-auto rounded-xl flex flex-col items-center justify-evenly">
    <div className='cursor-pointer'>Profile</div>
    <div className='cursor-pointer'>Settings</div>
    <div className='cursor-pointer'>Help Center</div>
    <div onClick={handleLogout} className='bg-red-700 w-30 text-center rounded-xl h-8 cursor-pointer'>Logout</div>
  </div>
</div>}
    </>
  )
}

export default Navbar
