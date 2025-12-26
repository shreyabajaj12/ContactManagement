import React from 'react'
import { useLocation } from "react-router-dom"
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import api from '../service/api'
import { useState, useEffect } from 'react';
import user from '../assets/account.png';
import edits from '../assets/edit.png';
import view from '../assets/view.png'
import del from '../assets/bin.png'
import { useAuth } from './useAuth';
import email from '../assets/message (1).png'
import cross from '../assets/close-fill.png'
import dots from '../assets/dots.png'
import 'animate.css';
import { ToastContainer, toast } from 'react-toastify';
import View from "./View";
const Home = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [showMail, setShowMail] = useState(false);
    const [Newname, setNewname] = useState("");
    const [Newusername, setNewusername] = useState("");
    const [viewOpen, setViewOpen] = useState(false);
    const [viewId, setViewId] = useState(null);
    const [menuOpenId, setMenuOpenId] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState
        ({
            id: null,
            name: ""
        });


    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await api.get("/auth/me");
                setNewname(res.data.name);
                setNewusername(res.data.username);
            } catch (e) {
                navigate("/login");
            }
        };

        fetchMe();
    }, []);

    const viewChange = (id) => {
        setViewOpen(true);
        setViewId(id);
    }


    const mail = (email) => {
        setShowMail(true);
        setInfo(prev => ({
            ...prev,
            to: email
        }));
    }
    const close = () => {
        setShowMail(false);
    }
    const [info, setInfo] = useState({
        from: "",
        to: "",
        message: ""
    })

    const mailChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })

    }
    const [sendOn, setSendOn] = useState(false)
    const submitEmail = async () => {
        try {
            const res = await api.post(`/email/item`, info);
            toast.success("Email sent successfully");
            setShowMail(false);
        }
        catch (e) {
            toast.error("Error occurred")
        }
        finally {
            setSendOn(false);
            setInfo({
                from: "",
                message: "",
            })
        }
    }


    const add = () => {
        navigate("/add", { state: { username: Newusername, name: Newname } })
    }
    const [searchBy, setSearchBy] = useState("name");
    const [open, setOpen] = useState(false);

    const totalPages = result?.totalPages || 0;
    const [page, setPage] = useState(0);
    const goPrev = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const goNext = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        // const params = new URLSearchParams(location.search);
        const size = 5;
        const fetchAllContact = async () => {
            try {
                const res = await api.get(`/contact?page=${page ?? 0}&size=${size}`)
                setResult(res.data);
                setContacts(res.data.content || []);

            }
            catch (e) {
                console.log("error", e);
            }
        }
        fetchAllContact();
    }, [Newusername, page])

    const remove = async (id) => {
        try {
            const res = await api.delete("/contact" + "/delete/" + id);
            setContacts(prevContacts =>
                prevContacts.filter(contact => contact.Id !== id)
            );
        }
        catch (e) {
            console.log("error" + e);
        }
    }
    const edit = (id) => {
        navigate("/edit", { state: { username: Newusername, currname: Newname, id: id } });
    }

    // Searching based on the match result
    const [searchChange, setSearchChange] = useState({
        match: ""
    })
    const look = async (e) => {
        const value = e.target.value;

        setSearchChange({
            match: value
        });

        const res = await api.get(
            `/contact/search?field=${searchBy}&keyword=${value}`
        );
        setResult(res.data);
        setContacts(res.data.content); // assuming backend returns list
    };


    return (
        <div className=' bg-gradient-to-br from-purple-400 via-pink-200 to-violet-600 w-full min-h-screen h-full overflow-hidden'>
            <Header username={Newname} />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
            <div className='w-full max-w-[1240px] bg-purple-900 justify-between h-12 rounded p-4 flex mt-5 items-center mx-auto'>
                {/* dropdown for the search by option */}
                <div className="relative">
                    {/* Dropdown button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="bg-white px-2 h-8 rounded text-sm flex items-center gap-2"
                    >
                        Search by: <span className="capitalize">{searchBy}</span>
                    </button>

                    {/* Dropdown menu */}
                    {open && (
                        <div className="absolute top-10 left-0 bg-white rounded shadow-md w-32 z-10">
                            {["name", "email", "phone"].map((option) => (
                                <div
                                    key={option}
                                    onClick={() => {
                                        setSearchBy(option);
                                        setOpen(false);
                                    }}
                                    className="px-4 py-2 hover:bg-purple-100 cursor-pointer capitalize text-sm"
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                <div className='flex'>
                    <div onClick={add} className='bg-gradient-to-r from-green-500  to-lime-400 w-20  sm:w-45 text-xl font-bold mx-2 text-center rounded h-8 cursor-pointer'><span className="sm:hidden">Add</span>
                        <span className="hidden sm:inline">Add Contacts</span></div>
                    <input onChange={look} value={searchChange.match} name="match" className='bg-white sm:w-60 w-20 items-center rounded h-8 mx-2 p-2' placeholder='Search'></input>

                </div>
            </div>
            {
                viewOpen && <View viewOpen={viewOpen} setViewOpen={setViewOpen} id={viewId} />
            }
            {
                openDelete &&
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
                    <div
                        className="
      bg-black text-white rounded-xl p-6 text-lg
      w-[60%] h-[45%]           
      sm:w-[360px] sm:h-64    
      md:w-[420px] md:h-60     
      flex flex-col justify-between items-center
    "
                    >
                        <div className="text-center">
                            Are you sure you want to delete ?
                        </div>

                        <div className="text-center font-bold md:text-lg lg:text-xl text-red-400">
                            {deleteTarget.name}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <button onClick={async()=>{
                                await remove(deleteTarget.id);
                                setOpenDelete(false);
                                setDeleteTarget({id:null,name:""})
                            }} className="bg-gradient-to-r cursor-pointer from-green-500 to-lime-400 h-12 rounded-2xl font-semibold w-full sm:w-28">
                                YES
                            </button>
                            <button onClick={() => {setOpenDelete(false);
                                setDeleteTarget({id:null,name:""})}} className=" cursor-pointer bg-red-700 h-12 rounded-2xl font-semibold w-full sm:w-28">
                                NO
                            </button>
                        </div>
                    </div>
                </div>

            }


            {
                showMail &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className={`lg:h-95 animate__animated animate__bounceInRight mt-10 lg:w-120 p-4 h-95 w-70 rounded-xl bg-pink-300 border-7 border-white relative}`}>
                        <div onClick={close} className="flex justify-end cursor-pointer"><img src={cross}></img></div>
                        <div className="mb-4 flex">
                            <label className="block font-bold text-sm mb-1">From:</label>
                            <input onChange={mailChange} className="w-full ml-2 bg-transparent outline-none border-0 border-b border-gray-700" value={info.from} name="from" />
                        </div>

                        <div className="mb-4 flex">
                            <label className="block text-sm font-bold mb-1" >To:</label>
                            <input className="ml-6 w-full bg-transparent outline-none border-b border-0" name="to" value={info.to} readOnly />
                        </div>
                        <div>
                            <label className="block font-bold text-sm mb-1">Message:</label>
                            <textarea
                                rows={6}
                                onChange={mailChange}
                                className="w-full bg-transparent outline-none border border resize-none p-2" name="message" value={info.message}
                            />
                        </div>
                        <div onClick={() => { setSendOn(true), submitEmail() }} className='flex justify-center'><button disabled={sendOn} className='bg-lime-700 w-20 text-white rounded p-1 mt-2 cursor-pointer'>{sendOn ? <div>loading...</div> : <div>send...</div>}</button></div>
                    </div>
                </div>
            }

            <div className='w-full max-w-[1240px] mx-auto pb-15'>
                {
                    contacts.map((contact, index) => (
                        <div key={index} className="p-2 border mb-2  bg-purple-400 mt-3 rounded flex justify-between ">
                            <div className='flex items-center'>
                                <img className='h-13 w-13' src={`https://api.dicebear.com/9.x/adventurer/svg?seed=` + index} alt={user} />
                                <div>
                                    <p className='text-xl font-bold px-5 text-purple-950'>{contact.name}</p>
                                    <p className='px-5 text-black-700 sm:flex hidden'>{contact.email}</p>
                                    <p className='px-5 text-black-700 sm:hidden flex'>{contact.phone}</p>

                                </div>
                            </div>
                            <div className='sm:flex hidden items-center'>
                                <div className='px-10' onClick={() => mail(contact.email)}><img className='w-10 h-10 cursor-pointer  bg-purple-500 rounded-full' src={email}></img> </div>
                                <div className='h-12 w-35 p-3 bg-gradient-to-r from-pink-500 to bg-violet-800 text-white rounded flex items-center justify-center '>{contact.phone}</div>
                                <div onClick={() => viewChange(contact.Id)} className='h-10 w-10 mx-3 cursor-pointer border bg-purple-500 rounded-full'><img src={view} /></div>
                                <div onClick={() => edit(contact.Id)} className='h-10 w-10 mx-3 bg-purple-500  cursor-pointer'><img src={edits} /></div>
                                <div onClick={() => {if (openDelete) return; setDeleteTarget({id:contact.Id,name:contact.name});setOpenDelete(true);}} className='h-10 w-10 mx-3 bg-purple-500 cursor-pointer'><img src={del} /></div>
                            </div>
                            <div className="relative sm:hidden flex items-center">

                                {/* Conditional menu */}
                                {menuOpenId === contact.Id && (
                                    <div className="absolute right-10 z-20 animate__bounceInRight animate__animated bg-gradient-to-r from-pink-300 to-violet-300 w-40 h-12 rounded-xl shadow-lg flex items-center justify-around">
                                        <div onClick={() => viewChange(contact.Id)} className='h-7 w-7 mx-3 cursor-pointer'><img src={view} /></div>

                                        <div onClick={() => edit(contact.Id)} className='h-7 w-7 mx-3  cursor-pointer'><img src={edits} /></div>

                                        <div onClick={() => {
                                            if (openDelete) return;
                                            setDeleteTarget({ id: contact.Id, name: contact.name });
                                            setOpenDelete(true);
                                        }} className='h-7 w-7 mx-3 cursor-pointer'><img src={del} /></div>

                                    </div>
                                )}

                                {/* Email icon */}
                                <div className="pr-2" onClick={() => mail(contact.email)}>
                                    <img className="w-10 h-10 bg-purple-500 cursor-pointer rounded-full" src={email} />
                                </div>

                                {/* Dots icon */}
                                <img
                                    className="w-10 h-10 cursor-pointer"
                                    src={dots}
                                    alt="functions"
                                    onClick={() =>
                                        setMenuOpenId(menuOpenId === contact.Id ? null : contact.Id)
                                    }
                                />
                            </div>

                        </div>
                    )
                    )
                }

                <nav aria-label="Page navigation example" className='fixed bottom-0 shadow-md-emerald-700 left-1/2 -translate-x-1/2 w-full bg-purple-800'>
                    <ul className="flex -space-x-px text-sm justify-center p-2 text-white">
                        <li>
                            <button onClick={goPrev} disabled={page === 0} className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium
       hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm px-3 h-10 focus:outline-none">Previous</button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i}>
                                <button
                                    onClick={(e) => { e.preventDefault(); setPage(i); }}
                                    className={`flex items-center justify-center text-body
         bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-10 h-10 focus:outline-none ${page === i ? "bg-purple-400" : ""}`}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button onClick={goNext} disabled={page === totalPages - 1} className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border 
      border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm px-3 h-10 focus:outline-none">Next</button>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    )
}
export default Home
