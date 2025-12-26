import React, { useState,useEffect } from 'react'
import cross from '../assets/close-fill.png'
import 'animate.css';
import api from '../service/api'
import name from '../assets/id-card.png'
import address from '../assets/add.png'
import phone from '../assets/phone-call.png'
import github from '../assets/github (3).png'
import linkedin from '../assets/linkedin.png'
import website from '../assets/internet.png'
import message from '../assets/message.png'

function View({viewOpen,setViewOpen,id}) {
    const close=()=>{
        setViewOpen(false);
    }
    const [info,setInfo]=useState({
        name:"",
        email:"",
        phone:"",
        address:"",
        linkedin:"",
        github:"",
        website:""
    })
    useEffect(()=>{
        const res=async()=>{
            const val=await api.get("/contact/get/"+id);
            setInfo(val.data);
            console.log(val);
        }
        res();
    },[id]);
  return (
    <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                            <div className={`md:h-95 animate__backInDown animate__animated mt-10 sm:w-120 p-4 h-95 w-70 rounded-xl bg-pink-300 border-7 border-white relative}`}>
                                <div onClick={close} className="flex justify-end cursor-pointer"><img src={cross}></img></div>
                                <div className='flex items-center gap-1 my-1'>
                                    <img className='w-10 h-10' src={name} alt="name" />
                                    <div className='text-xl font-bold'>{info.name}</div>
                                </div>
                                <div className='flex items-center gap-1 my-1'>
                                    <img className='w-10 h-10' src={message} alt="name" />
                                    <div className=' font-bold'>{info.email}</div>
                                </div>
                                <div className='flex items-center gap-1 my-1'>
                                    <img className='w-10 h-10' src={address} alt="name" />
                                    <div className='font-bold'>{info.address}</div>
                                </div>
                                <div className='flex items-center gap-1 my-1'>
                                    <img className='w-10 h-10' src={phone} alt="name" />
                                    <a href={info.phone}>Call {info.phone}</a>

                                    {/* <div className=' font-bold'>{info.phone}</div> */}
                                </div>
                               <div className={`flex bg-blue-500 items-center rounded sm:w-55 gap-2 w-full my-1 ${
                                    !info.linkedin ? " pointer-events-none bg-blue-300" : ""
                                }`}>
                                    <img className='w-10 opacity-70 h-10 p-2' src={linkedin} alt="name" />
                                    <a
                                    href={info.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=" font-bold text-xl text-white"
                                    >
                                    LinkedIn 
                                    </a>
                                </div>
                                <div className={`flex bg-white items-center rounded sm:w-55 my-1 gap-2 w-full ${
                                    !info.linkedin ? " pointer-events-none bg-gray-500" : ""
                                }`}>
                                    <img className='w-10 h-10 opacity-70 p-2' src={github} alt="name" />
                                    <a
                                    href={info.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=" text-xl font-bold  "
                                    >
                                    Github
                                    </a>
                                </div>
                                 <div className={`flex bg-yellow-500 items-center rounded sm:w-55 my-1 gap-2 w-full ${
                                    !info.linkedin ? " pointer-events-none bg-emerald-500" : ""
                                }`}>
                                    <img className='w-10 h-10 opacity-70 p-2' src={website} alt="name" />
                                    <a
                                    href={info.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=" text-xl font-bold  "
                                    >
                                    Website
                                    </a>
                                </div>
        
                                
                                
                            </div>
                        </div>
      
    </div>
  )
}

export default View
