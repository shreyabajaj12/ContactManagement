import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import api from '../service/api'
import { useNavigate } from 'react-router-dom';

function Edit() {
    const navigate=useNavigate();
    const location=useLocation();
    const {username,currname,info}=location.state ||{};
    const [data,setData]=useState({
      name:info.name,
      address:info.address,
      phone:info.phone,
      email:info.email
    })
    const handleChange=(e)=>{
        setData({
          ...data,
          [e.target.name]:e.target.value
        })
    }
    // console.log(info.Id)
    const save=async()=>{
      try{
        // console.log("/contact/"+username+"/put/"+info.Id)
        const res=await api.put("/contact/"+username+"/put/"+info.Id,data);
      }
      catch(e){
        console.log("error"+e);
      }
      finally{
        navigate(-1);
      }
    }
      
  return (
    <div className='bg-gradient-to-bl from-purple-400 via-pink-200
    to-purple-400 min-h-screen w-full'>
        <Header username={currname} />

        <div className='mx-auto border rounded align-center w-full md:w-[1000px] m-9'>
        <div className='p-8 bg-gradient-to-br from-purple-200 via-pink-200
    to-purple-200 text-black flex flex-col'>
            <div className='flex items-center'>
            <label className='mr-2 w-30'>Name</label>
            <input 
            onChange={handleChange}
            className='flex-1 border rounded p-2 my-2' 
            type='text' 
            name='name' 
            value={data.name}
            placeholder='Enter Name' /></div>

            <div className='flex items-center'>
            <label className='mr-2 w-30'>Address</label>
            <input 
            onChange={handleChange}
            className='flex-1 border rounded p-2 my-2' 
            type='text' 
            name='address' 
            value={data.address}
            placeholder='Enter Address' /></div>

            <div className='flex items-center'>
            <label className='mr-2 w-30'>Phone Number</label>
            <input 
            onChange={handleChange}
            className='flex-1 border rounded p-2 my-2' 
            type='text' 
            name='phone' 
            value={data.phone}
            placeholder='Enter Ph. no' /></div>

            <div className='flex items-center'>
            <label className='mr-2 w-30'>Email Address</label>
            <input 
            onChange={handleChange}
            className='flex-1 border rounded p-2 my-2' 
            type='email' 
            name='email' 
            value={data.email}
            placeholder='Enter Email Add.' /></div>

            <button onClick={save} className='cursor-pointer px-4 w-45 mx-auto py-2 mt-5 bg-gradient-to-r from-purple-900 to-purple-700 text-xl rounded text-white font-semibold'>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Edit
