// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './layout/Auth';
// General
import { LandingPage } from './pages/LandiPage';
import Login from './pages/Login';
import { Forgot } from './pages/Forgot';
import { RegisterCliente } from './components/Cliente/RegisterCliente';
import { RegisterPropietario } from './components/Propietario/RegisterPropietario';
import UnAuthorized from './pages/unauthorized';
import Confirm from './pages/Confirm';
import Restore from './pages/Restore';
import { NotFound } from './pages/NotFound';
// Propietario
import NavPropietario from './components/Propietario/NavPropietario';
import { RegisterVehiculo } from './pages/RegisterVehiculo';
import { EditVehiculo } from './pages/EditVehiculo';
import { SolicitudesProvider } from './pages/SolicitudesContext';
// Administrador
import AceeptRequests from './pages/AceeptRequests';


function App() {
  return (
    <SolicitudesProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/forgot/:id' element={<Forgot />} />
          <Route path='/register/Cliente' element={<RegisterCliente />} />
          <Route path='/register/Propietario' element={<RegisterPropietario />} />
          <Route path='/confirmar/:token' element={<Confirm />} />
          <Route path='/reset-password/:token' element={<Restore />} />

          {/* Rutas protegidas por roles */}
          <Route
            path='/propietario/*'
            element={
              <Auth allowedRoles={['propietario']}>
                <NavPropietario>
                  <Route index element={<RegisterVehiculo />} />
                  <Route path='/edit-vehiculo' element={<EditVehiculo />} />
                </NavPropietario>
              </Auth>
            }
          />
          <Route
            path='/aceptar-solicitudes'
            element={
              <Auth allowedRoles={['admin']}>
                <AceeptRequests />
              </Auth>
            }
          />

          {/* Página de no autorizado */}
          <Route path='/unauthorized' element={<UnAuthorized />} />

          {/* Página por defecto para rutas no encontradas */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </SolicitudesProvider>
  );
}

export default App;
