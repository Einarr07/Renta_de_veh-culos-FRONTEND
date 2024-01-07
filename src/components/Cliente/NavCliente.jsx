// NavCliente.jsx
import React, {useEffect, useState} from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../../assets/images/logo.png';
import axios from "axios";

const NavCliente = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const autenticado = localStorage.getItem('token');
                const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${autenticado}`,
                    },
                });

                console.log('Respuesta del servidor:', respuesta.data);

                // Extrae el nombre del usuario de la respuesta del servidor y actualiza el estado
                setNombreUsuario(respuesta.data.nombre);
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
            }
        };

        obtenerUsuario();
    }, []);

    const handleLogout = () => {
        // Muestra el modal de confirmación
        setShowConfirmation(true);
    };

    const confirmLogout = async () => {
        try {
            const autenticado = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${autenticado}`,
                    },
                }
            );

            if (response.data.res) {
                // Eliminar el token almacenado en el localStorage
                localStorage.removeItem('token');

                // Redirigir a la página de inicio (o cualquier otra página deseada)
                navigate('/');
            } else {
                // Manejar caso en que la API responde con error
                console.error('Error al cerrar sesión:', response.data.message);
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error('Error al cerrar sesión:', error);
        } finally {
            // Cierra el modal de confirmación
            setShowConfirmation(false);
        }
    };

    const cancelLogout = () => {
        // Cancela el logout y cierra el modal de confirmación
        setShowConfirmation(false);
    };

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
                <Link to="/cliente/historial-pedidos" style={getLinkStyles('/cliente/historial-pedidos')}>Historial de Pedidos</Link>
                <Link to="/cliente/vehiculos-en-alquiler" style={getLinkStyles('/cliente/vehiculos-en-alquiler')}>Vehículos en Alquiler</Link>
                <div to="/cliente/perfil" style={getLinkStyles('/cliente/perfil')}>{nombreUsuario}</div>
                {/* Enlace para abrir la confirmación */}
                <button onClick={handleLogout} style={getLogoutStyles()}>Salir</button>

                {/* Modal de confirmación */}
                {showConfirmation && (
                    <div className="confirmation-modal">
                        <p>¿Estás seguro de que deseas cerrar la sesión?</p>
                        <button onClick={confirmLogout}>Sí</button>
                        <button onClick={cancelLogout}>No</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavCliente;