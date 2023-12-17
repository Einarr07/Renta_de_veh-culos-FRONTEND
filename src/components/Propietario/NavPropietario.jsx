import React from "react";
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../../assets/images/logo.png';

const NavPropietario = () => {
    const location = useLocation();

    const getLinkStyles = (path) => {
        const isSelected = location.pathname === path;
        return {
            color: isSelected ? 'white' : 'black',
            backgroundColor: isSelected ? '#3FD7BB' : 'transparent',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
        };
    };

    const getLogoutStyles = () => {
        return {
            color: 'white',
            backgroundColor: '#E53737',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
        };
    };

    return (
        <nav style={{ backgroundColor: '#3889B7' }} className="flex items-center justify-between p-5 bg-gray-800 text-white">
            <div className="flex items-center space-x-4">
                <img src={logoImage} alt="Logo" className="h-8 w-8" /> 
            </div>
            <div className="flex items-center space-x-4 ">
                <Link to="/dashboard" style={getLinkStyles('/dashboard')}>Editar Catálogo</Link>
                <Link to="/register/Vehiculo" style={getLinkStyles('/register/Vehiculo')}>Registrar un vehículo</Link>
                <span className="text-gray-300">Nombre de Usuario</span>
                <Link to="/logout" style={getLogoutStyles()}>Salir</Link>
            </div>
        </nav>
    );
};

export default NavPropietario;
