import React, { useState } from 'react'
import api from "../service/api"
import Home from './Home';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
    const [info,setInfo]=useState(
        {username:"",
        password:""}
    )
    const handleChange=(e)=>{
        //  console.log(e.target.name, e.target.value);
        setInfo({
            ...info,
            [e.target.name]:e.target.value
        });
    };
    const[success,setSuccess]=useState(null);
    
    const submit= async()=>{
        try{
          const res=await api.post("/auth/login",info);
          setSuccess(true);
          // console.log(res.data+"////");
          const{token,username,name}=res.data;
          console.log(token)
          localStorage.setItem("token",token)
          navigate("/home",{state:{username:username,name:name}});
        }
        catch(e){
          setSuccess(false)
          // console.log("user not found");
        }
    }

  return (
    <div className='mx-auto align-center w-full md:w-[600px] m-9'>
        {success===false &&<div className='bg-red-600 text-2xl text-red-900'>User Not found</div>}
        {/* {success===true &&<div className='bg-green-600 text-2xl text-green-900'>User Not found</div>} */}
      <div className='p-8 bg-gradient-to-br from-violet-600 via-pink-200 to-violet-600 text-black flex flex-col'>
        <input className='w-full border rounded p-2 my-2'type='text' onChange={handleChange} value={info.username} name='username' 
        placeholder='Enter Username'></input>
        {/* <div className='text-red-700'>* Username taken</div> */}
        {/* {nameError1 && <div className='text-red-700'>* Invalid Username</div>} */}
        
        
        
        <input className='w-full border rounded p-2 my-2'type='password'onChange={handleChange}value={info.password} name='password' placeholder=
        'Enter Password'></input>
        {/* {passwordError && <div className='text-red-700'>* Invalid Username</div>} */}

        <button onClick={submit} className='cursor-pointer px-4 w-45 mx-auto py-2 mt-5 bg-gradient-to-r from-purple-900 to-purple-700 text-xl rounded text-white font-semibold'>Submit</button>
      </div>
    </div>
  )
}

export default Register
