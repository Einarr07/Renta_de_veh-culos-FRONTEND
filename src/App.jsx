import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Auth from './layout/Auth';
// Páginas
import { NotFound } from './pages/NotFound';
import Login from './pages/Login';
import { LandingPage } from './pages/LandiPage';
import { Forgot } from './pages/Forgot';
import { RegisterCliente } from './components/Cliente/RegisterCliente'; 
import { RegisterPropietario} from './components/Propietario/RegisterPropietario';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='*' element={<NotFound/>}/>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/forgot/:id' element={<Forgot />} />
          <Route path='/register/Cliente' element={<RegisterCliente />} />
          <Route path='/register/Propietario' element={<RegisterPropietario />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
