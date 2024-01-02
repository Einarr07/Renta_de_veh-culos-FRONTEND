import axios from 'axios';
import React, { useState } from "react";
import Mensaje from '../components/Alertas/Mensaje';
import { useSolicitudes } from './SolicitudesContext';

const RegisterVehiculo = () => {
  const { agregarSolicitud } = useSolicitudes();
  const [vehiculoData, setVehiculoData] = useState({
    tipo_vehiculo: "",
    marca: "",
    placas: "",
    numero_pasajero: 0,
    image_url: null,
    costo_alquiler: 0, 
    contacto: "",
    descripcion: ""
  });
  const [mensaje, setMensaje] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = typeof value === 'number' ? String(value) : value;
    setVehiculoData((prevData) => ({ ...prevData, [name]: newValue }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2097152) {
      setVehiculoData((prevData) => ({ ...prevData, image_url: file }));
    } else {
      console.error("El archivo es demasiado grande");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const autenticado = localStorage.getItem('token');
  
    try {
      const formData = new FormData();
      formData.append("tipo_vehiculo", vehiculoData.tipo_vehiculo);
      formData.append("marca", vehiculoData.marca);
      formData.append("placas", vehiculoData.placas);
      formData.append("numero_pasajero", vehiculoData.numero_pasajero);
      formData.append("image_url", vehiculoData.image_url);
      formData.append("costo_alquiler", vehiculoData.costo_alquiler);
      formData.append("contacto", vehiculoData.contacto);
      formData.append("descripcion", vehiculoData.descripcion);

      const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos`;
      const respuesta = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${autenticado}`,
          "Content-Type": "multipart/form-data",
        },
      });      
  
      setVehiculoData({
        tipo_vehiculo: "",
        marca: "",
        placas: "",
        numero_pasajero: 0,
        image_url: null,
        costo_alquiler: 0,
        contacto: "",
        descripcion: "",
      });

      console.log("Respuesta del servidor:", respuesta.data);

      setMensaje({
        respuesta: respuesta.data.msg || "Tu solicitud fue enviada correctamente",
        tipo: true,
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
      if (error.response) {
        console.error("Respuesta del servidor con error:", error.response.data);
        setMensaje({
          respuesta: error.response?.data.msg || "Respuesta erronea del servidor",
          tipo: false,
        });
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
        setMensaje({
          respuesta: error.response?.data.msg || "No se recibió respuesta del servidor",
          tipo: false,
        });
      } else {
        console.error("Error durante la solicitud:", error.message);
        setMensaje({
          respuesta: error.response?.data.msg || "Error durante la solicitud",
          tipo: false,
        });
      }
    }
  };
  
  return (
    <>
      <div className="container mx-auto mt-5">
        <h2 className="text-center mb-4 text-4xl font-bold">Nuevo vehículo</h2>
        {mensaje.tipo && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="tipo_vehiculo" className="block text-sm font-medium text-gray-600">
              Tipo de vehículo
            </label>
            <input
              type="text"
              id="tipo_vehiculo"
              name="tipo_vehiculo"
              value={vehiculoData.tipo_vehiculo}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="marca" className="block text-sm font-medium text-gray-600">
              Marca
            </label>
            <input
              type="text"
              id="marca"
              name="marca"
              value={vehiculoData.marca}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="placas" className="block text-sm font-medium text-gray-600">
              Placas del vehículo
            </label>
            <input
              type="text"
              id="placas"
              name="placas"
              value={vehiculoData.placas}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="numero_pasajero" className="block text-sm font-medium text-gray-600">
              Número máximo de pasajeros
            </label>
            <input
              type="number"
              id="numero_pasajero"
              name="numero_pasajero"
              value={vehiculoData.numero_pasajero}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-600">
              Imagen MAX (2MB)
            </label>
            <input
              type="file"
              id="image_url"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded-md"
              accept="image/*"
              maxfilesize={2097152}  // 2 MB en bytes
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="costo_alquiler" className="block text-sm font-medium text-gray-600">
              Costo de alquiler
            </label>
            <input
              type="number" // Cambié el tipo de entrada a 'number'
              id="costo_alquiler"
              name="costo_alquiler"
              value={vehiculoData.costo_alquiler}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="contacto" className="block text-sm font-medium text-gray-600">
              Número de contacto
            </label>
            <input
              type="text"
              id="contacto"
              name="contacto"
              value={vehiculoData.contacto}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-600">
              Descripciones generales
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows="3"
              value={vehiculoData.descripcion}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-black px-4 py-10 rounded-md hover:bg-blue-600"
          >
            Crear vehículo
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterVehiculo;
