import React, { useContext } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const Dashboard = () => {
  const location = useLocation();
  const urlActual = location.pathname;
  const { auth } = useContext(AuthContext);
  const autenticado = localStorage.getItem('token');
  const rolesPermitidos = ['admin', 'propietario', 'cliente'];

  // Verifica si el usuario tiene permisos para acceder al dashboard
  const tienePermisos = autenticado && rolesPermitidos.includes(auth?.rol);

  if (!tienePermisos) {
    // Redirige a una página de acceso no autorizado u otra acción
    return <Navigate to="/unauthorized" />;
  }

  const getMenuSegunRol = () => {
    switch (auth?.rol) {
      case 'admin':
        return (
          <ul>
            <li>
              <Link to='/admin/dashboard'>Dashboard Admin</Link>
            </li>
            <li>
              <Link to='/admin/configuracion'>Configuración Admin</Link>
            </li>
          </ul>
        );
      case 'propietario':
        return (
          <ul>
            <li>
              <Link to='/propietario/dashboard'>Dashboard Propietario</Link>
            </li>
            <li>
              <Link to='/propietario/vehiculos'>Vehículos Propietario</Link>
            </li>
          </ul>
        );
      case 'cliente':
        return (
          <ul>
            <li>
              <Link to='/cliente/dashboard'>Dashboard Cliente</Link>
            </li>
            <li>
              <Link to='/cliente/mis-vehiculos'>Mis Vehículos Cliente</Link>
            </li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 py-2 flex items-center justify-between text-white">
        <div className="ml-8 text-2xl font-semibold">CarGod</div>
        <div className="mr-8">
          <p>Bienvenido - {auth?.nombre}</p>
          <Link
            to="/"
            className="text-white mr-3 text-md inline-block hover:bg-red-900 text-center bg-red-800 px-4 py-1 rounded-lg"
            onClick={() => {
              localStorage.removeItem('token');
            }}
          >
            Salir
          </Link>
        </div>
      </header>

      <div className="flex-1 flex bg-gray-100">
        <nav className="md:w-1/5 bg-gray-800 px-5 py-4">
          {getMenuSegunRol()}
        </nav>

        <div className="flex-1 overflow-y-scroll p-8">
          {autenticado ? <Outlet /> : <Navigate to="/login" />}
        </div>
      </div>

      <footer className="bg-gray-800 h-12">
        <p className="text-center text-white leading-[2.9rem] underline">
          Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
