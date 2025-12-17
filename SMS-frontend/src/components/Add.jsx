import React, { useState } from 'react'
import Header from './Header'
import { useLocation } from 'react-router-dom';
import api from '../service/api'

const Add = () => {
    const location=useLocation();
    const {username,name:currname}=location.state ||{};
    const [info,setInfo]=useState({
        name:"",
        address:"",
        phone:"",
        email:""
    })
    const [success,setSuccess]=useState(false);
    const handleChange=(e)=>{
        // console.log(e.target.name, e.target.value);
        setInfo({
            ...info,
            [e.target.name]:e.target.value
        })
    }
    const submit=async()=>{
        try{
            const res=await api.post("/contact/"+username+"/add",info);
            setSuccess(true);
            // console.log(res.data)

        }
        catch(e){
            // console.log("error"+e);
        }
        finally{
            setInfo({
                name:"",
                address:"",
                phone:"",
                email:""
            })
        }
    }
  return (
    <div className='bg-purple-300 w-full h-screen'>
      <Header username={currname}/>
      {success &&<div className='bg-emerald-500 text-2xl text-emerald-900 text-center font-bold'>Contact Saved Successfully</div>}
      <div className='mx-auto border align-center w-full md:w-[1000px] m-9'>
        <div className='p-8 bg-purple-300 text-black flex flex-col'>
            <div className='flex items-center'>
            <label className='mr-2 w-30'>Name</label>
            <input 
            onChange={handleChange}
            className='flex-1 border rounded p-2 my-2' 
            type='text' 
            name='name' 
            value={info.name}
            placeholder='Enter Name' /></div>


            <div className='flex items-center'>
            <label className='mr-2 w-30'>Address</label>
            <input 
            onChange={handleChange}
            className='flex-1 border rounded p-2 my-2' 
            type='text' 
            name='address' 
            value={info.address}
            placeholder='Enter Address' /></div>

            <div className='flex items-center'>
            <label className='mr-2 w-30'>Phone Number</label>
            <input 
            onChange={handleChange}
            className='flex-1 border rounded p-2 my-2' 
            type='text' 
            name='phone' 
            value={info.phone}
            placeholder='Enter Ph. no' /></div>

            <div className='flex items-center'>
            <label className='mr-2 w-30'>Email Address</label>
            <input 
            onChange={handleChange}
            className='flex-1 border rounded p-2 my-2' 
            type='email' 
            name='email' 
            value={info.email}
            placeholder='Enter Email Add.' /></div>

            <button onClick={submit} className='cursor-pointer px-4 w-45 mx-auto py-2 mt-5 bg-purple-900 text-xl rounded text-white font-semibold'>Add Contact</button>
        </div>
      </div>
    </div>
  )
}

export default Add
