// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// General
import { LandingPage } from './pages/LandinPage';
import Login from './pages/Login';
import { Forgot } from './pages/Forgot';
import { RegisterCliente } from './components/Cliente/RegisterCliente';
import { RegisterPropietario } from './components/Propietario/RegisterPropietario';
import UnAuthorized from './pages/UnAuthorized';
import Confirm from './pages/Confirm';
import Restore from './pages/Restore';
import { NotFound } from './pages/NotFound';
import {PrivateRoute} from './routes/PrivateRoute'
// Propietario
import NavPropietario from './components/Propietario/NavPropietario';
import  RegisterVehiculo  from './pages/RegisterVehiculo';
import  EditVehiculo  from './pages/EditVehiculo';
import { SolicitudesProvider } from './pages/SolicitudesContext';
// Administrador
import NavAdministrador from './components/Administrador/NavAdministrador'
import AceeptRequests from './pages/AceeptRequests';
// Cliente
import NavCliente from './components/Cliente/NavCliente';
import ViewVehiculo from './pages/ViewVehiculo';
import ViewHistorialPedidos from './pages/ViewHistorialPedidos';

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

          <Route 
            path='/propietario/*'
            element={
              <PrivateRoute>
                <NavPropietario/>
                <Routes>
                  <Route path='edit-vehiculo' element={<EditVehiculo />} />
                  <Route path='register-vehiculo' element={<RegisterVehiculo />} />
                </Routes>
              </PrivateRoute>
            }
          />

          <Route 
            path='/admin/*'
            element={
              <PrivateRoute>
                <NavAdministrador/>
                <Routes>
                  <Route path='aceptar-solicitudes' element={<AceeptRequests />} />
                </Routes>
              </PrivateRoute>
            }
          />

          <Route 
            path='/cliente/*'
            element={
              <PrivateRoute>
                <NavCliente/>
                <Routes>
                  <Route path='historial-pedidos' element={<ViewHistorialPedidos />} />
                  <Route path='vehiculos-en-alquiler' element={<ViewVehiculo />} />
                </Routes>
              </PrivateRoute>
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
