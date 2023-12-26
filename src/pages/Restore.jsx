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

  const verifyToken = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/reset-password/${token}`;
      const respuesta = await axios.get(url);
      setTokenBack(true);
      setMensaje({
        respuesta: respuesta.data.msg || "Su contraseña fue cambiada correctamente",
        tipo: true,
      });
    } catch (error) {
      setMensaje({
        respuesta: error.response?.data.msg || "Algo salió mal",
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
      setMensaje({ respuesta: respuesta.data.msg, tipo: true });
    } catch (error) {
      setMensaje({ respuesta: error.response?.data.msg, tipo: false });
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img
          className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600"
          src={llavesForgot}
          alt="image description"
        />

        <div className="flex flex-col items-center justify-center">
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
          {tokenback && (
            <>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="my-4 p-2 border border-gray-400 rounded"
              />
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="my-4 p-2 border border-gray-400 rounded"
              />
              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="my-4 p-2 border border-gray-400 rounded"
              />
              <div className="my-4">
                <button
                  onClick={handleResetPassword}
                  className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-black"
                >
                  Restablecer Contraseña
                </button>
              </div>
            </>
          )}
          <p className="md:text-lg lg:text-xl text-gray-600 mt-8">
            Ya puedes iniciar sesión
          </p>
          <Link
            to="/login"
            className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Restore;
