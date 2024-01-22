import { Link } from 'react-router-dom';
import { useState } from 'react';
import Mensaje from '../Alertas/Mensaje';
import axios from 'axios';
import vehiculosPropietarios from "../../assets/images/vehiculosPropietarios.jpg";

export const RegisterPropietario = () => {
    const [mensaje, setMensaje] = useState({});
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        direccion: "",
        celular: "",
        email: "",
        password: ""
    });

    // Estados para la longitud de los campos
    const [nombreLength, setNombreLength] = useState(0);
    const [apellidoLength, setApellidoLength] = useState(0);
    const [cedulaLength, setCedulaLength] = useState(0);
    const [direccionLength, setDireccionLength] = useState(0);
    const [celularLength, setCelularLength] = useState(0);
    const [emailLength, setEmailLength] = useState(0);
    const [passwordLength, setPasswordLength] = useState(0);

    const handleChange = (e) => {
        const newValue = e.target.value;
        const maxLengths = {
            nombre: 30,
            apellido: 30,
            cedula: 10,
            direccion: 60,
            celular: 10,
            email: 50,
            password: 20
        };

        // Validar si el campo de teléfono solo contiene números
        if (e.target.name === "celular" && !/^\d*$/.test(newValue)) {
            return; // Si no son números, no actualices el estado
        }

        if (newValue.length <= maxLengths[e.target.name]) {
            setForm({
                ...form,
                [e.target.name]: newValue
            });

            // Actualizar la longitud según el campo correspondiente
            switch (e.target.name) {
                case "nombre":
                    setNombreLength(newValue.length);
                    break;
                case "apellido":
                    setApellidoLength(newValue.length);
                    break;
                case "direccion":
                    setDireccionLength(newValue.length);
                    break;
                case "cedula":
                    setCedulaLength(newValue.length);
                    break;
                case "celular":
                    setCelularLength(newValue.length);
                    break;
                case "email":
                    setEmailLength(newValue.length);
                    break;
                case "password":
                    setPasswordLength(newValue.length);
                    break;
                default:
                    break;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/registro`;

            // Agregar el campo "role" al objeto form
            const formWithRole = {
                ...form,
                role_id: 2, 
            };

            const respuesta = await axios.post(url, formWithRole);

            setMensaje({
                respuesta: respuesta.data.msg || "Ya puedes iniciar sesión",
                tipo: true
            });
            setForm({});
        } catch (error) {
            console.error("Error en la solicitud:", error);
            if (error.response) {
                console.error("Respuesta del servidor con error:", error.response.data);
                setMensaje({
                    respuesta: error.response?.data.msg || "Respuesta erronea del servidor",
                    tipo: false
                });
            } else if (error.request) {
                console.error("No se recibió respuesta del servidor:", error.request);
                setMensaje({
                    respuesta: error.response?.data.msg || "No se recibió respuesta del servidor",
                    tipo: false
                });
            } else {
                console.error("Error durante la solicitud:", error.message);
                setMensaje({
                    respuesta: error.response?.data.msg || "Error durante la solicitud",
                    tipo: false
                });
            }
        }
    };

    return (
        <>
            <div className="bg-white min-h-screen flex justify-center items-center">
                <div className="w-full md:w-1/2 h-screen">
                    <div className="md:w-4/5 sm:w-full" style={{ margin: '20px auto 0' }}>
                        <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">Bienvenido</h1>
                        <small className="text-gray-400 block my-4 text-sm">Como propietario tienes la opción de poder rentar vehículos a nuestros clientes.<br />Ingresa tus datos para poder registrarte:</small>
                        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                        <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="nombre">
                                Nombre ({nombreLength}/30):
                            </label>
                            <input type="text" id="nombre" name='nombre'
                                value={form.nombre || ""} onChange={handleChange}
                                placeholder="Ingresa tu nombre" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="apellido">
                                Apellido ({apellidoLength}/30):
                            </label>
                            <input type="text" id="apellido" name='apellido'
                                value={form.apellido || ""} onChange={handleChange}
                                placeholder="Ingresa tu apellido" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="cedula">
                                Cédula ({cedulaLength}/10):
                            </label>
                            <input type="tel" id="cedula" name='cedula'
                                value={form.cedula || ""} onChange={handleChange}
                                placeholder="Ingresa tu cédula" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="direccion">
                                Dirección ({direccionLength}/60):
                            </label>
                            <input type="text" id="direccion" name='direccion'
                                value={form.direccion || ""} onChange={handleChange}
                                placeholder="Ingresa tu dirección" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="celular">
                                Celular ({celularLength}/10):
                            </label>
                            <input type="tel" id="celular" name='celular'
                                value={form.celular || ""} onChange={handleChange}
                                placeholder="Ingresa tu celular" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="email">Correo electrónico ({emailLength}/50):</label>
                            <input type="email" id="email" name='email'
                            value={form.email || ""} onChange={handleChange}
                            placeholder="Ingresa tu correo electrónico" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="password">Contraseña ({passwordLength}/20): (Minimo 8 caracteres)</label>
                            <input type="password" id="password" name='password'
                                value={form.password || ""} onChange={handleChange}
                                placeholder="********************" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-1">
                            <button className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Registrar</button>
                        </div>
                            <hr className="border-gray-400" />
                            <hr className="border-gray-400" />
                        <div className="mt-3 text-sm flex justify-between items-center">
                            <p>¿Ya tienes una cuenta? Dirígete al login para poder iniciar sesión.</p>
                            <Link to="/login" className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white mr-4">Iniciar sesión</Link>
                        </div>
                        </form>
                    </div>
                </div>
                <div 
                    className={`hidden sm:block w-full md:w-1/2 h-screen bg-cover bg-center bg-no-repeat float-right`}
                    style={{ backgroundImage: `url(${vehiculosPropietarios})` }}
                ></div>
            </div>
        </>
    );
}

export default RegisterPropietario;