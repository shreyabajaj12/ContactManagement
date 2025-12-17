import React from 'react'
import {useLocation} from "react-router-dom"
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Header from'./Header';
import api from '../service/api'
import { useState,useEffect } from 'react';
import user from '../assets/account.png';
import edits from '../assets/edit.png';
import view from '../assets/view.png'
import del from '../assets/bin.png'
import { useAuth } from './useAuth';
const Home = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const {username,name}=location.state ||{};
    const params = new URLSearchParams(location.search);
    const Newusername = username ?? params.get("username");
const Newname = name ?? params.get("name");
console.log(Newname)
console.log(Newusername)

    const [contacts,setContacts]=useState([]);
 
    const add=()=>{
        navigate("/add",{state:{username:Newusername,name:Newname}})
    }

    useEffect(()=>{
        const fetchAllContact=async()=>{
            try{
                const res=await api.get("/contact/"+Newusername+"/")
                // console.log(typeof res);
                setContacts(Array.isArray(res.data) ? res.data : []);
                console.log("contacts value:", res.data);
                console.log("typeof:", typeof res.data);
                console.log("isArray:", Array.isArray(res.data));

            }
            catch(e){
                console.log("error",e);
            }
        }
        if(Newusername){
            fetchAllContact();
        }
    },[Newusername])
    const remove=async(id)=>{
        // console.log("/login/"+userId+"/student/delete/"+id);
        try{
            // console.log("/login/"+userId+"/student/delete/"+id);
            const res=await api.delete("/contact/"+Newusername+"/delete/"+id);
            // console.log(res)
             setContacts(prevContacts =>
            prevContacts.filter(contact => contact.Id !== id)
        );
        }
        catch(e){
            console.log("error"+e);
        }
    }
    const edit=(contact)=>{
        // console.log("+++++++++++++++++++")
        // console.log(userId)
        console.log(contact);
        console.log("heeeee")
        navigate("/edit",{state:{username:Newusername,currname:Newname,info:contact}});
    }

  return (
    <div className=' bg-purple-300 w-full min-h-screen'>
      <Header username={Newname}/>
<div className='w-full max-w-[1240px] bg-purple-900 justify-end h-12 rounded p-4 flex mt-5 items-center mx-auto'> 
     <div onClick={add} className='bg-green-500 w-45 text-xl font-bold mx-2 text-center rounded h-8 cursor-pointer'>Add Contacts</div>
     <input className='bg-white w-60 items-center rounded h-8 mx-2 p-2' placeholder='Search'></input>
</div>
    <div className='w-full max-w-[1240px] mx-auto'>
        {
            contacts.map((contact,index)=>(
            <div key={index} className="p-2 border mb-2  bg-purple-400 mt-3 rounded flex justify-between ">
            <div className='flex items-center'>
                <img className='h-12 w-12' src={user} alt='user'/>
                <div>
                <p className='text-xl font-bold px-5 text-purple-950'>{contact.name}</p>
                <p className='px-5 text-black-700'>{contact.email}</p>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='h-12 w-35 p-3 bg-gray-600 text-white rounded flex items-center justify-center '>{contact.phone}</div>
                <div className='h-10 w-10 mx-3 cursor-pointer'><img src={view}/></div>
                <div onClick={()=>edit(contact)} className='h-10 w-10 mx-3 cursor-pointer'><img src={edits}/></div>
                <div onClick={()=>remove(contact.Id)} className='h-10 w-10 mx-3 cursor-pointer'><img src={del}/></div>
                
            </div>
            {/* <p>Reg No: {contact.userId}</p>
            <p>Address: {contact.address}</p> */}
            
        </div> 
    ))}
    </div>
    </div>
  )
}
export default Home
