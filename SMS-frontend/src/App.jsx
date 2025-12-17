import React from 'react'
import Login from './components/Login'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from'./components/Home';
import Add from './components/Add'
import Edit from './components/Edit'
import { useAuth } from './components/useAuth';

const App = () => {
  const {user,loading}=useAuth();
  if(loading)return <div>loading.....</div>
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'element={<Login/>}/>
      <Route path='/home'element={<Home/>}/>
      <Route path='/add' element={<Add/>}/>
      <Route path='/edit' element={<Edit/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
