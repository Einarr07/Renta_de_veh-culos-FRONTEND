import llavesForgot from '../assets/images/llavesForgot.jpg';
import { Link } from 'react-router-dom';
import Mensaje from '../components/Alertas/Mensaje';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Restore = () => {
  const { token } = useParams();
  const [mensaje, setMensaje] = useState({});
  const [tokenback, setTokenBack] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const verifyToken = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/reset-password/${token}`;
      const respuesta = await axios.get(url);
      setTokenBack(true);
      setMensaje({
        respuesta: respuesta.data.msg || "Token confirmado, ingresa los datos para continuar",
        tipo: true,
      });
    } catch (error) {
      setMensaje({
        respuesta: error.response?.data.msg || "Algo salió mal, no se puede verificar el token",
        tipo: false,
      });
    }
  };

  const handleResetPassword = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/reset-password`;
      const data = {
        email,
        password,
        passwordConfirmation,
        token,
      };
      const respuesta = await axios.post(url, data);
      setMensaje({ 
        respuesta: respuesta.data.message || 'Contraseña cambiada correctamente',
        tipo: true,
      });
    } catch (error) {
      setMensaje({ 
        respuesta: error.response?.data.message || 'Algo salió mal', 
        tipo: false,
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100">
      <div className="md:w-1/2 md:bg-white md:shadow-md md:rounded-md md:p-8 md:mr-4">
        <h2 className="text-2xl font-bold mb-4">Restablecer Contraseña</h2>
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}
        {tokenback && (
          <>
            <div className="mb-4">
              <label className="block text-gray-600">Correo Electrónico:</label>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Nueva Contraseña:</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nueva contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                />
                <button
                  onClick={toggleShowPassword}
                  className="absolute top-0 right-0 p-2 focus:outline-none"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Confirmar Contraseña:</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                />
                <button
                  onClick={toggleShowPassword}
                  className="absolute top-0 right-0 p-2 focus:outline-none"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <button
                onClick={handleResetPassword}
                className="w-full p-3 text-white bg-gray-600 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray"
                style={{ margin: "0 auto" }}
              >
                Restablecer Contraseña
              </button>
            </div>
          </>
        )}
        <p className="text-gray-600">
          Ya puedes iniciar sesión. <Link to="/login" className="text-blue-500">Iniciar Sesión</Link>
        </p>
      </div>
      <div className="md:w-1/2">
        <img
          className="object-cover h-80 w-full rounded-md"
          src={llavesForgot}
          alt="image description"
        />
      </div>
    </div>
  );
};

export default Restore;
