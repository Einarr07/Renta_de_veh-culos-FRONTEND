import React, { useState } from "react";
import NavPropietario from '/src/components/Propietario/NavPropietario.jsx';
import { useSolicitudes } from './SolicitudesContext';

export const RegisterVehiculo = () => {
    const { agregarSolicitud } = useSolicitudes();
    const [vehiculoData, setVehiculoData] = useState({
        tipo: "",
        marca: "",
        placasVehiculo: "",
        maxPasajeros: "",
        imagen: null,
        costoAlquiler: "",
        numeroContacto: "",
        descripcionesGenerales: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setVehiculoData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setVehiculoData((prevData) => ({ ...prevData, imagen: file }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de envío del formulario
        console.log("Datos del vehículo:", vehiculoData);
        // Agregar solicitud al contexto
        agregarSolicitud(vehiculoData);
      };
    
    
    return (
        <>
        <NavPropietario/>
        <div className="container mx-auto mt-5">
        <h2 className="text-center mb-4 text-4xl font-bold">Nuevo vehículo</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-600">
              Tipo de vehículo
            </label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={vehiculoData.tipo}
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
            <label htmlFor="placasVehiculo" className="block text-sm font-medium text-gray-600">
              Placas del vehículo
            </label>
            <input
              type="text"
              id="placasVehiculo"
              name="placasVehiculo"
              value={vehiculoData.placasVehiculo}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="maxPasajeros" className="block text-sm font-medium text-gray-600">
              Número máximo de pasajeros
            </label>
            <input
              type="text"
              id="maxPasajeros"
              name="maxPasajeros"
              value={vehiculoData.maxPasajeros}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="imagen" className="block text-sm font-medium text-gray-600">
              Imagen
            </label>
            <input
              type="file"
              id="imagen"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="costoAlquiler" className="block text-sm font-medium text-gray-600">
              Costo de alquiler
            </label>
            <input
              type="text"
              id="costoAlquiler"
              name="costoAlquiler"
              value={vehiculoData.costoAlquiler}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="numeroContacto" className="block text-sm font-medium text-gray-600">
              Número de contacto
            </label>
            <input
              type="text"
              id="numeroContacto"
              name="numeroContacto"
              value={vehiculoData.numeroContacto}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="descripcionesGenerales" className="block text-sm font-medium text-gray-600">
              Descripciones generales
            </label>
            <textarea
              id="descripcionesGenerales"
              name="descripcionesGenerales"
              rows="3"
              value={vehiculoData.descripcionesGenerales}
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
