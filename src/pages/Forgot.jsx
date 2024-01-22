import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Mensaje from '../components/Alertas/Mensaje';
// Importa la imagen
import llavesForgot from '../assets/images/llavesForgot.jpg';

export const Forgot = () => {
  const [mensaje, setMensaje] = useState({});
  const [mail, setMail] = useState({});

  const handleChange = (e) => {
    setMail({
      ...mail,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/forgot-password`;
      const respuesta = await axios.post(url, mail);
      setMensaje({ 
        respuesta: respuesta.data.msg || "Revisa tu correo electronico, para restablecer la contraseña",
        tipo: true });
      setMail("");
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg || "Lo sentimos el usuario no se encuentra registrado", 
      tipo: false });
    }
  };

  return (
    <>
      <div className="flex">
        {/* Formulario en el lado izquierdo */}
        <div className="bg-white flex justify-center items-center w-full md:w-1/2">
          <div className="md:w-4/5 sm:w-full">
            <div className="text-center mt-16"> {/* Margen superior de 16 (ajusta según tu preferencia) y centrado verticalmente */}
              <h1 className="text-3xl font-semibold mb-2 uppercase text-gray-500">
                ¿Olvidaste tu contraseña?
              </h1>
              <small className="text-gray-400 block my-4 text-sm">
                No te preocupes, por favor ingresa tus datos
              </small>
              {Object.keys(mensaje).length > 0 && (
                <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <label className="mb-2 block text-sm font-semibold">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="Introduce tu correo electrónico"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                    name="email"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">
                    Enviar correo electrónico
                  </button>
                </div>
              </form>

              <div className="mt-5 text-xs border-b-2 py-4"></div>

              <div className="mt-3 text-sm flex justify-between items-center">
                <p>¿Ya te acordaste?</p>
                <Link
                  to="/login"
                  className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Imagen a la derecha en pantallas medianas y más grandes */}
        <div className="hidden sm:block w-full md:w-1/2 h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${llavesForgot})` }}></div>
      </div>
    </>
  );
};
