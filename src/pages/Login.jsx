import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Mensaje from '../components/Alertas/Mensaje';
import autoLoginImage from '../assets/images/autoLogin.jpg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [mensajeCliente, setMensajeCliente] = useState(null);
  const [mensajePropietario, setMensajePropietario] = useState(null);
  // Define setAuth en el componente
  const [auth, setAuth] = useState(null);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
      const respuesta = await axios.post(url, form);
  
      if (respuesta && respuesta.data) {
        localStorage.setItem('token', respuesta.data.token);
        localStorage.setItem('role', respuesta.data.role || '');
        setAuth(respuesta.data);
        console.log("Token almacenado en localStorage:", localStorage.getItem('token'));
        console.log("Rol almacenado en localStorage:", localStorage.getItem('role'));
  
        // Aquí podrías redirigir a diferentes rutas según el rol del usuario
        if (respuesta.data.role === 'propietario') {
          navigate('/propietario'); // Cambia la ruta según tu estructura de rutas
        } else if (respuesta.data.role === 'admin') {
          navigate('/admin'); // Cambia la ruta según tu estructura de rutas
        } else {
          // Otro rol, redirige a una ruta predeterminada
          navigate('/cliente'); // Cambia la ruta según tu estructura de rutas
        }
      } else {
        console.error('La respuesta o su propiedad "data" no están definidas correctamente:', respuesta);
        // Manejo de errores cuando la respuesta o su propiedad "data" no están definidas correctamente
      }
    } catch (error) {
      if (error.response) {
        // Respuesta del servidor con detalles de error
        console.error('Error en la respuesta del servidor:', error.response.data);
        setMensaje({
          respuesta: error.response?.data.msg || 'Cuenta o Contraseña invalidos',
          tipo: false,
        });
      } else if (error.request) {
        // La solicitud fue realizada, pero no se recibió respuesta
        console.error('Error en la solicitud, no se recibió respuesta del servidor:', error.request);
        setMensaje({
          respuesta: error.response?.data.msg || 'El servidor no responde',
          tipo: false,
        });
      } else {
        // Error durante la configuración de la solicitud
        console.error('Error durante la configuración de la solicitud:', error.message);
        setMensaje({
          respuesta: error.response?.data.msg || 'Error durante la solicuitud',
          tipo: false,
        });
      }

      setForm({});
  
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };
  
  
  

  const handleRegisterClick = (role) => {
    setSelectedRole(role);
  };

  const closeModal = () => {
    setSelectedRole(null);
  };

  return (
    <>
      <div className="flex font-serif h-screen">
        <div
          className={`hidden sm:block w-full md:w-1/2 h-screen bg-cover bg-center bg-no-repeat`}
          style={{ backgroundImage: `url(${autoLoginImage})` }}
        ></div>

        <div className="w-full md:w-1/2 bg-white flex flex-col md:flex-row justify-center items-center">
          <div className="md:w-4/5">
            {Object.keys(mensaje).length > 0 && (
              <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}

            <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">
              Bienvenido
            </h1>
            <small className="text-gray-400 block my-4 text-sm">
              Por favor ingresa tus datos
            </small>

            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="mb-3">
                <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="Introduce tu correo electrónico"
                  name='email'
                  value={form.email || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
                />
              </div>

              <div className="mb-3">
                <label className="mb-2 block text-sm font-semibold">Contraseña</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********************"
                  name="password"
                  value={form.password || ''}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-gray-500 underline mt-2 cursor-pointer"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'} contraseña
                </button>
              </div>

              <div className="my-4">
              <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">
                  Iniciar sesión
                </button>
              </div>
            </form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm"></p>
              <hr className="border-gray-400" />
            </div>

            <div className="mt-3 text-xs border-b-2 py-2">
              <Link
                to="/forgot/id"
                className="underline text-sm text-gray-400 hover:text-gray-900"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <div className="mt-3 text-sm">
              <p className="mb-2">¿No tienes una cuenta?</p>
              <button
                className="block w-full py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white mb-2"
                onClick={() => {
                  handleRegisterClick('Cliente');
                  setMensajeCliente("Seleccionaste crear una cuenta como Cliente");
                  setMensajePropietario(null);
                }}
              >
                Crear una cuenta (Cliente)
              </button>
              
              
              <button
                className="block w-full py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
                onClick={() => {
                  handleRegisterClick('Propietario');
                  setMensajePropietario("Seleccionaste crear una cuenta como Propietario");
                  setMensajeCliente(null);
                }}
              >
                Crear una cuenta (Propietario)
              </button>
              
            </div>
      {/* Modal de registro */}
      {selectedRole && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md">
            <p className="text-xl font-semibold mb-4">Selecciona tipo de cuenta</p>
            <div className="flex justify-between">
              {/* Puedes ajustar los enlaces según tus rutas */}
              <Link
                to={`/register/${selectedRole}`}
                className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white mr-4"
              >
                Continuar como {selectedRole}
              </Link>
              <button
                className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
                onClick={closeModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
            <div className="mt-3 text-sm">
              <Link
                to="/"
                className="underline text-gray-400 hover:text-gray-900"
              >
                Volver a la página principal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;