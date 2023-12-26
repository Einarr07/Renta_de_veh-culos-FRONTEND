import Mensaje from '../components/Alertas/Mensaje';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Confirm = () => {
  const { token } = useParams();
  const [mensaje, setMensaje] = useState({});

  const verifyToken = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/confirmar/${token}`;
      console.log('Token:', token); // Agrega este log para verificar el token
      const respuesta = await axios.get(url);
      setMensaje({ respuesta: respuesta.data.msg, tipo: true });
    } catch (error) {
      console.error('Error al confirmar:', error.response);
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
    }
  };

  useEffect(() => {
    verifyToken();
  }, [token]); // Agrega el token como dependencia para que se vuelva a verificar cuando cambie

  return (
    <div className="flex flex-col items-center justify-center">
      {Object.keys(mensaje).length > 0 && (
        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
      )}

      <img
        className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600"
        src={llavesForgot}
        alt="image description"
      />

      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">
          Muchas Gracias
        </p>
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
  );
};

export default Confirm;