import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Auth from './layout/Auth';
//Páginas
import Login from './pages/Login';
import { LandingPage } from './pages/LandiPage';
import {Forgot} from './pages/Forgot';

function App() {
  return (
    <BrowserRouter>
      <div>
    
        
        <Routes>
            

            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<Login />} />
            <Route path='/forgot/:id' element={<Forgot />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
