import React, { useState,useEffect } from 'react'
import api from "../service/api"
import github from "../assets/github.png"
import google from "../assets/google.png"
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate=useNavigate();
    const [info,setInfo]=useState(
        {username:"",
        password:"",
        name:""}
    )

    useEffect(() => {
    api.post("/auth/logout");
    }, []);

    const handleChange=(e)=>{
        //  console.log(e.target.name, e.target.value);
        setInfo({
            ...info,
            [e.target.name]:e.target.value
        });
    };
    const[UsernameError1,setUserNameError1]=useState(false);
    const[UsernameError2,setUserNameError2]=useState(false);
    const[nameError,setNameError]=useState(false);
    const[passwordError,setPasswordError]=useState(false);
    const[success,setSuccess]=useState(false);
    const submit=async()=>{
         setUserNameError1(false);
        setUserNameError2(false);
        setNameError(false);
        setPasswordError(false);
        setSuccess(false);
        const Username=info.username;
        const pass=info.password;
        const name=info.name;
        let valid=true;
        if(Username.length<8){
            setUserNameError1(true);
            valid=false;
        }
        if(name.length<3){
            setNameError(true);
            valid=false;
        }
        if(pass.length<5){
            setPasswordError(true);
            valid=false;
        }
        if(valid){
            try{
                const res=await api.post("/auth/signup",info);
                // console.log(res.data);
                setSuccess(true);
            }
            catch(err){
                setUserNameError2(true);
            }
            finally{
                setInfo({
                    username: "",
                    name: "",
                    password: ""
                });
            }
        }
    }
    const googleLogin = () => {
  window.location.href = "https://contact-management-latest.onrender.com/oauth2/authorization/google";
};

const githubLogin = () => {
  window.location.href = "https://contact-management-latest.onrender.com/oauth2/authorization/github";
};

  
  return (
    <div className='mx-auto align-center w-full md:w-[600px] m-9'>
        {success &&<div className='bg-emerald-500 text-2xl text-emerald-900 text-center font-bold'>Contact Saved Successfully</div>}
      <div className='p-8  bg-gradient-to-br from-violet-600 via-pink-200 to-violet-600 text-black flex flex-col'>

        <input className='w-full border rounded p-2 my-2'type='text' onChange={handleChange} value={info.username} name='username' 
        placeholder='Enter Username'></input>
        {UsernameError1 && <div className='text-red-700'>* Invalid Username</div>}
        {UsernameError2 && <div className='text-red-700'>* Username taken</div>
}
        <input className='w-full border rounded p-2 my-2'type='text' onChange={handleChange}value={info.name}name='name' placeholder='Enter Name'>
        </input>
        {nameError && <div className='text-red-700'>* Invalid Name</div>}
        

        <input className='w-full border rounded p-2 my-2'type='password'onChange={handleChange}value={info.password} name='password' placeholder=
        'Enter Password'></input>
        {passwordError && <div className='text-red-700'>* Password must be 5 characters</div>}

        <button onClick={submit} className='cursor-pointer px-4 w-45 mx-auto py-2 mt-5  bg-gradient-to-r from-purple-900 to-purple-600 text-xl rounded text-white font-semibold'>Submit</button>
        <div className='sm:flex justify-around my-4'>
            <div onClick={googleLogin}  className='flex  bg-white p-2 rounded cursor-pointer'>
                <img className='h-10 w-10' src={google} alt='google'/>
                <div className='p-2'>Sign in with Google</div>
            </div>
            <div onClick={githubLogin} className='flex  bg-white p-2 rounded cursor-pointer sm:mt-0 mt-3'>
                <img className='h-10 w-10' src={github} alt='github'/>
                <div className='p-2'>Sign in with Github</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Register
