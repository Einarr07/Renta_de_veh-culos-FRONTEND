import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from "react-icons/hi";
import { IoMdPerson } from "react-icons/io";
import { AiOutlineHistory, AiOutlineCar } from "react-icons/ai";
import { RiUserFill } from "react-icons/ri"; // Importar el icono de perfil genérico
import logoImage from '../../assets/images/logo.png';
import axios from "axios";

const NavCliente = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [avatar, setAvatar] = useState(null); // Nuevo estado para almacenar el avatar
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Función para obtener estilos de enlace activo
    const getLinkStyles = (path) => {
        const isSelected = location.pathname === path;
        return {
            color: isSelected ? 'white' : 'black',
            backgroundColor: isSelected ? '#3FD7BB' : 'transparent',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
        };
    };

    // Efecto secundario para obtener información del usuario al cargar el componente
    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const autenticado = localStorage.getItem('token');
                const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${autenticado}`,
                    },
                });

                // Extraer el nombre del usuario y el avatar de la respuesta del servidor y actualizar el estado
                setNombreUsuario(respuesta.data.nombre);
                setAvatar(respuesta.data.avatar);
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
            }
        };

        obtenerUsuario();
    }, []);

    // Manejador para iniciar el proceso de cierre de sesión
    const handleLogout = () => {
        // Mostrar el modal de confirmación
        setShowConfirmation(true);
    };

    // Confirmar el cierre de sesión
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
            // Cerrar el modal de confirmación
            setShowConfirmation(false);
        }
    };

    // Cancelar el cierre de sesión
    const cancelLogout = () => {
        // Cancelar el logout y cerrar el modal de confirmación
        setShowConfirmation(false);
    };

    // Obtener estilos del botón de cierre de sesión
    const getLogoutStyles = () => {
        return {
            color: 'white',
            backgroundColor: '#E53737',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
        };
    };

    return (
        <nav style={{ backgroundColor: '#3889B7' }} className="flex flex-col sm:flex-row items-center justify-between p-5 bg-gray-800 text-white">
            <div className="logo m-3 flex items-center space-x-4">
                <img src={logoImage} alt="Logo" className="h-8 w-8" />
            </div>
            <div className="flex items-center space-x-4 sm:space-x-8">
                {/* Enlaces a las distintas secciones y Avatar/Icono de perfil */}
                <div className="nav-links">
                    <Link to="/cliente/historial-pedidos" style={getLinkStyles('/cliente/historial-pedidos')}>
                        <AiOutlineHistory size={20} />
                        <span className="sm:hidden">Historial</span>
                    </Link>
                    <Link to="/cliente/vehiculos-en-alquiler" style={getLinkStyles('/cliente/vehiculos-en-alquiler')}>
                        <AiOutlineCar size={20} />
                        <span className="sm:hidden">Vehículos</span>
                    </Link>
                    <Link to="/cliente/perfil" style={getLinkStyles('/cliente/perfil')}>
                        {avatar ? (
                            <img src={avatar} alt="Avatar" className="rounded-full h-8 w-8" />
                        ) : (
                            <RiUserFill size={20} />
                        )}
                        <span className="sm:hidden">{nombreUsuario}</span>
                    </Link>
                    
                    {/* Botón de cierre de sesión */}
                    <button onClick={handleLogout} style={getLogoutStyles()}><HiOutlineLogout /> Salir</button>
                </div>
    
                {/* Modal de confirmación */}
                {showConfirmation && (
                    <div className="confirmation-overlay">
                        <div className="confirmation-modal">
                            <p>¿Estás seguro de que deseas cerrar la sesión?</p>
                            <button onClick={confirmLogout}>Sí</button>
                            <button onClick={cancelLogout}>No</button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavCliente;
