import React, { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../components/Alertas/Mensaje";

const Update = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [cedulaUsuario, setCedulaUsuario] = useState("");
  const [direccionUsuario, setDireccionUsuario] = useState("");
  const [celularUsuario, setCelularUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");

  const [mensaje, setMensaje] = useState({ tipo: "", respuesta: "" });
  const [userId, setUserId] = useState(null); // Agregado: estado para el ID del usuario

  // Estados para la longitud de los campos
  const [nombreLength, setNombreLength] = useState(0);
  const [apellidoLength, setApellidoLength] = useState(0);
  const [cedulaLength, setCedulaLength] = useState(0);
  const [direccionLength, setDireccionLength] = useState(0);
  const [celularLength, setCelularLength] = useState(0);

  // Función para obtener el usuario
  const obtenerUsuario = async () => {
    try {
      const autenticado = localStorage.getItem('token');
      const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
        headers: {
          Authorization: `Bearer ${autenticado}`
        }
      });

      console.log("Respuesta del backend:", respuesta.data);

      const { nombre, apellido, cedula, direccion, celular, email } = respuesta.data;
      const id = respuesta.data.id;

      console.log("ID del usuario:", id);

      setNombreUsuario(nombre);
      setApellidoUsuario(apellido);
      setCedulaUsuario(cedula);
      setDireccionUsuario(direccion);
      setCelularUsuario(celular);
      setEmailUsuario(email);

      // Actualizar la longitud de los campos
      setNombreLength(nombre.length);
      setApellidoLength(apellido.length);
      setCedulaLength(cedula.length);
      setDireccionLength(direccion.length);
      setCelularLength(celular.length);

      // Retorna el userId junto con otros datos del usuario
      return { id, ...respuesta.data };
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
      throw error;
    }
  };

  useEffect(() => {
    const obtenerYSetearUsuario = async () => {
      try {
        const userData = await obtenerUsuario();
        setUserId(userData.id);
      } catch (error) {
        console.error("Error al obtener y setear el usuario:", error);
      }
    };

    obtenerYSetearUsuario();
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.value;

    // Validar la longitud de los campos
    switch (e.target.name) {
      case "nombreUsuario":
        setNombreUsuario(newValue.slice(0, 30)); // Limitar a 30 caracteres
        setNombreLength(newValue.length);
        break;
      case "apellidoUsuario":
        setApellidoUsuario(newValue.slice(0, 30)); // Limitar a 30 caracteres
        setApellidoLength(newValue.length);
        break;
      case "direccionUsuario":
        setDireccionUsuario(newValue.slice(0, 60)); // Limitar a 60 caracteres
        setDireccionLength(newValue.length);
        break;
      case "celularUsuario":
        setCelularUsuario(newValue.slice(0, 10)); // Limitar a 10 caracteres
        setCelularLength(newValue.length);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const autenticado = localStorage.getItem('token');

      if (!userId) {
        console.error("No se pudo obtener el ID del usuario");
        return;
      }

      const url = `${import.meta.env.VITE_BACKEND_URL}/update/${userId}`;

      const data = {
        nombre: nombreUsuario,
        apellido: apellidoUsuario,
        direccion: direccionUsuario,
        celular: celularUsuario,
        cedula: cedulaUsuario,
        email: emailUsuario
      };

      console.log("Datos a enviar:", data);

      const respuesta = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${autenticado}`,
        },
      });

      console.log("Respuesta del backend al actualizar:", respuesta.data);

      setMensaje({
        respuesta: respuesta.data.message || "Perfil actualizado correctamente",
        tipo: true,
      });
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      console.log("Respuesta del servidor:", error.response?.data);
      setMensaje({
        respuesta: error.response?.data.message || "Error al actualizar el perfil",
        tipo: 'error',
      });
    }
  };

  return (
    <>
      <div className="container mx-auto mt-5">
        <h2 className="text-center mb-4 text-4x1 font-bold">Actualizar perfil</h2>
        {mensaje.tipo && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label htmlFor="nombreUsuario" className="mb-2 block text-sm font-semibold">Nombre ({nombreLength}/30):</label>
            <input
              type="text"
              id="nombreUsuario"
              name="nombreUsuario"
              value={nombreUsuario}
              onChange={handleChange}
              placeholder="Ingresa tu nombre" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" 
              maxLength={30}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apellidoUsuario" className="mb-2 block text-sm font-semibold">Apellido ({apellidoLength}/30):</label>
            <input
              type="text"
              id="apellidoUsuario"
              name="apellidoUsuario"
              value={apellidoUsuario}
              onChange={handleChange}
              placeholder="Ingresa tu apellido" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500"
              maxLength={30}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cedulaUsuario" className="mb-2 block text-sm font-semibold">Cédula ({cedulaLength}/10):</label>
            <input
              type="text"
              id="cedulaUsuario"
              name="cedulaUsuario"
              value={cedulaUsuario}
              placeholder="Ingresa tu cédula" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500"
              disabled // Deshabilitar la edición
            />
          </div>
          <div className="mb-4">
            <label htmlFor="direccionUsuario" className="mb-2 block text-sm font-semibold">Dirección ({direccionLength}/60):</label>
            <input
              type="text"
              id="direccionUsuario"
              name="direccionUsuario"
              value={direccionUsuario}
              onChange={handleChange}
              placeholder="Ingresa tu dirección" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500"
              maxLength={60}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="celularUsuario" className="mb-2 block text-sm font-semibold">Celular ({celularLength}/10):</label>
            <input
              type="text"
              id="celularUsuario"
              name="celularUsuario"
              value={celularUsuario}
              onChange={handleChange}
              placeholder="Ingresa tu celular" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500"
              maxLength={10}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="emailUsuario" className="mb-2 block text-sm font-semibold">Correo electrónico:</label>
            <input
              type="text"
              id="emailUsuario"
              name="emailUsuario"
              value={emailUsuario}
              placeholder="Ingresa tu correo electrónico" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500"
              disabled // Deshabilitar la edición
            />
          </div>
          <button type="submit">Actualizar</button>
        </form>
      </div>
    </>
  );
};

export default Update;
