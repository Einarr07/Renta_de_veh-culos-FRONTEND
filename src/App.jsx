import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './layout/Auth';
import { NotFound } from './pages/NotFound';
import Login from './pages/Login';
import { LandingPage } from './pages/LandiPage';
import { Forgot } from './pages/Forgot';
import { RegisterCliente } from './components/Cliente/RegisterCliente';
import { RegisterPropietario } from './components/Propietario/RegisterPropietario';
import { RegisterVehiculo } from './pages/RegisterVehiculo';
import AceeptRequests from './pages/AceeptRequests';
import { SolicitudesProvider } from './pages/SolicitudesContext';

function App() {
  return (
    <SolicitudesProvider>
      <Router>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/forgot/:id' element={<Forgot />} />
          <Route path='/register/Cliente' element={<RegisterCliente />} />
          <Route path='/register/Propietario' element={<RegisterPropietario />} />
          <Route path='/register/Vehiculo' element={<RegisterVehiculo/>} />
          <Route path='/aceptar-solicitudes' element={<AceeptRequests />} />
        </Routes>
      </Router>
    </SolicitudesProvider>
  );
}

export default App;
