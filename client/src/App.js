import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js'
import NoPage from './pages/NoPage.js';

function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Home/> } />  
          <Route path='/register' element={<Register/> } />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NoPage/>}/>
        </Routes>
    </>
  );
}

export default App;
