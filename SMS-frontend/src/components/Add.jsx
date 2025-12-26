import React, { useState } from 'react'
import Header from './Header'
import { useLocation } from 'react-router-dom';
import api from '../service/api'
import git from '../assets/git.png'
import linkedin from '../assets/linkedin.png'
import back from '../assets/back-button.png'
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const location=useLocation();
    const {username,name:currname}=location.state ||{};
    const [errors, setErrors] = useState({});
    const [info,setInfo]=useState({
        name:"",
        address:"",
        phone:"",
        email:"",
        linkedin:"",
        github:"",
        website:""
    })
    const navigate=useNavigate();
    const [success,setSuccess]=useState(false);
    const validate = () => {
        let newErrors = {};

        // Required fields
        if (!info.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!info.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!info.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(info.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
        };


    const handleChange=(e)=>{
        // console.log(e.target.name, e.target.value);
        setInfo({
            ...info,
            [e.target.name]:e.target.value
        })
    }
    const submit=async()=>{
        if (!validate()) return;
        try{
            const res=await api.post("/contact"+"/add",info);
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
                email:"",
                linkedin:"",
                github:"",
                website:""
            })
        }
    }
  return (
    <div className='bg-gradient-to-bl from-purple-400 via-pink-200
    to-purple-400 w-full min-h-screen '>
      <Header username={currname}/>
      
      {success &&<div className='bg-emerald-500 text-2xl text-emerald-900 text-center font-bold'>Contact Saved Successfully</div>}
      <div className='mx-auto align-center w-full justify-center flex py-9'>
    <div className='h-14 sm:flex hidden w-14 p-3 cursor-pointer' onClick={() => navigate(-1)}><img className='w-8 h-8' src={back} alt="back" /></div>

        <div className='p-8 bg-gradient-to-br from-purple-200 max-w-full via-pink-200 rounded-2xl border
    to-purple-200 text-black flex flex-col'>
            <div className='flex items-center'>
            <label className='mr-2 w-30'>Name<span className='text-red-700'> *</span></label>
            <input 
            onChange={handleChange}
            className='flex-1 border rounded p-2 my-2' 
            type='text' 
            name='name' 
            value={info.name}
            placeholder='Enter Name' /></div>
            {errors.name && <div className="text-red-700 text-sm">{errors.name}</div>}


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
            <label className='mr-2 w-30'>Phone Number<span className='text-red-700'> *</span></label>
            <input 
            onChange={handleChange}
            className='flex-1 border rounded p-2 my-2' 
            type='text' 
            name='phone' 
            value={info.phone}
            placeholder='Enter Ph. no' /></div>
            {errors.phone && <div className="text-red-700 text-sm">{errors.phone}</div>}

            <div className='flex items-center'>
            <label className='mr-2 w-30'>Email Address<span className='text-red-700'> *</span></label>
            <input 
            onChange={handleChange}
            className='flex-1 border rounded p-2 my-2' 
            type='email' 
            name='email' 
            value={info.email}
            placeholder='Enter Email Add.' /></div>
            {errors.email && <div className="text-red-700 text-sm">{errors.email}</div>}

            <div className='md:flex justify-between gap-8'>
                <div className='flex items-center'>
                    <label className='mr-2 w-30'>LinkeIn Id</label>
                    <input type="text"className='flex-1 border rounded p-2 my-2'placeholder='Enter LinkedIn Id'  name='linkedin'  value={info.linkedin}
      onChange={handleChange}/>
                </div>
                <div className='flex items-center'>
                    <label className='w-30'>Github Id</label>
                    <input type="text"className='flex-1 border rounded p-2 my-2' placeholder='Enter Github Id' name='github' value={info.github}
      onChange={handleChange} />
                </div>
            </div>
            <div className='flex items-center'>
            <label className='mr-2 w-30'>Website Link</label>
            <input 
            onChange={handleChange}
            className='flex-1 border rounded p-2 my-2' 
            type='text' 
            name='website' 
            value={info.website}
            placeholder='Enter Website Link' /></div>

            <button onClick={submit} className='cursor-pointer px-4 w-45 mx-auto py-2 mt-5 bg-gradient-to-r from-purple-900 to-purple-700 text-xl rounded text-white font-semibold'>Add Contact</button>
        </div>
      </div>
    </div>
  )
}

export default Add
