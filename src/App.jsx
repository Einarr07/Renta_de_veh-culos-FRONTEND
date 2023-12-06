// En el archivo App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Auth from './layout/Auth';
import { LandingPage } from './pages/LandiPage';

function App() {
  return (
    <BrowserRouter>
      <div>
    
        
        <Routes>
            

            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<Login />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
