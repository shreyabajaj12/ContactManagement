import React from 'react'

const Navbar = ({isSignUp,onToggle}) => {
  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black border-b'>
        <h1 className='font-bold text-[6vw] lg:text-5xl'>ContactManagement</h1>
        <button 
        onClick={onToggle}
        className='cursor-pointer px-4 py-2 bg-purple-900 text-xl rounded text-white font-semibold'>
            {isSignUp?"Sign Here":"Login Here"}
        </button>
    
    </div>
  )
}

export default Navbar
