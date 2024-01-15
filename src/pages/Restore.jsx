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
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const verifyToken = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/reset-password/${token}`;
      const respuesta = await axios.get(url);

      if (respuesta.data && respuesta.data.msg) {
        setMensaje({
          respuesta: `Token confirmado: ${respuesta.data.msg}`,
          tipo: true,
        });
      } else {
        setMensaje({
          respuesta: 'Ingrese sus datos para continuar',
          tipo: true,
        });
      }
      setTokenBack(true);
    } catch (error) {
      let errorMsg = 'Algo salió mal, no se puede verificar el token';

      if (error.response && error.response.data && error.response.data.msg) {
        errorMsg = error.response.data.msg;
      }

      setMensaje({
        respuesta: errorMsg,
        tipo: false,
      });
    }
  };

  const handleResetPassword = async () => {
    if (password !== password_confirmation) {
      setMensaje({
        respuesta: 'Las contraseñas no coinciden.',
        tipo: false,
      });
      return;
    }
  
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/reset-password`;
      const data = {
        email,
        password,
        password_confirmation,
        token,
      };
      const respuesta = await axios.post(url, data);
      setMensaje({
        respuesta: respuesta.data.message || 'Contraseña cambiada correctamente',
        tipo: true,
      });
  
      // Restablecer los estados independientemente del resultado
      setEmail('');
      setPassword('');
      setPassword_confirmation('');
    } catch (error) {
      setMensaje({
        respuesta: error.response?.data.message || 'Algo salió mal',
        tipo: false,
      });
    }
  };
  

  const toggleShowPassword = (isConfirmPassword) => {
    if (isConfirmPassword) {
      setShowConfirmPassword(!showConfirmPassword);
    } else {
      setShowPassword(!showPassword);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100">
        <div className="md:w-1/2 md:bg-white md:shadow-md md:rounded-md md:p-8 md:mr-4 mt-8 m-4">
          <h2 className="text-2xl font-bold mb-4">Restablecer Contraseña</h2>
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
          {tokenback && (
            <>
              <div className="mb-4">
                <label className="block text-gray-600 ">Correo Electrónico:</label>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 ">Nueva Contraseña: (minimo 8 caracteres)</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded "
                  />
                  <button
                    onClick={() => toggleShowPassword(false)}
                    className="absolute top-0 right-0 p-2 focus:outline-none"
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>
              <div className="mb-1">
                <label className="block text-gray-600 ">Confirmar Contraseña:</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmar contraseña"
                    value={password_confirmation}
                    onChange={(e) => setPassword_confirmation(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded "
                  />
                  <button
                    onClick={() => toggleShowPassword(true)}
                    className="absolute top-0 right-0 p-2 focus:outline-none "
                  >
                    {showConfirmPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <button
                  onClick={handleResetPassword}
                  className="block w-full py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white "
                  style={{ margin: "0 auto" }}
                >
                  Restablecer Contraseña
                </button>
              </div>
            </>
          )}
          <div className="mt-4 text-sm flex justify-between items-center">
            <p>Ya puedes iniciar sesión</p>
            <Link to="/login" className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white mr-4">Iniciar sesión</Link>
          </div>
        </div>
        <div className="md:w-1/2 hidden md:block">
          <img
            className="object-cover h-80 w-full rounded-md"
            src={llavesForgot}
            alt="image description"
          />
        </div>
      </div>
    </>
  );
};

export default Restore;
