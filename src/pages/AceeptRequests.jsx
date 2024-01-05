import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AceeptRequests = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [noVehiclesMessage, setNoVehiclesMessage] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const obtenerVehiculosPendientes = async () => {
      try {
        const autenticado = localStorage.getItem('token');
        const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/solicitudes/pendientes`, {
          headers: {
            Authorization: `Bearer ${autenticado}`,
          },
        });

        console.log('Respuesta del servidor:', respuesta.data);

        if (respuesta.data.success && Array.isArray(respuesta.data.vehiculos_pendientes) && respuesta.data.vehiculos_pendientes.length > 0) {
          console.log('Vehículos pendientes del servidor:', respuesta.data.vehiculos_pendientes);
          setSolicitudes(respuesta.data.vehiculos_pendientes);
          setLoading(false);
        } else {
          setLoading(false);
          setNoVehiclesMessage('No hay vehículos pendientes.');
        }
      } catch (error) {
        console.error('Error al obtener la lista de vehículos pendientes:', error);
        setLoading(false);
        setNoVehiclesMessage('Error al obtener la lista de vehículos pendientes.');
      }
    };

    obtenerVehiculosPendientes();
  }, []);

  const handleAccept = async (solicitudId) => {
    try {
      const autenticado = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/estado/${solicitudId}`,
        { estado: 'aceptado' },
        {
          headers: {
            Authorization: `Bearer ${autenticado}`,
          },
        }
      );
      console.log('Solicitud de aceptación exitosa');
      obtenerVehiculosPendientes(); // Actualiza la lista después de aceptar
    } catch (error) {
      console.error('Error al aceptar la solicitud:', error);
    }
  };
  
  const handleReject = async (solicitudId) => {
    try {
      const autenticado = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/estado/${solicitudId}`,
        { estado: 'rechazado' },
        {
          headers: {
            Authorization: `Bearer ${autenticado}`,
          },
        }
      );
      console.log('Solicitud de rechazo exitosa');
      obtenerVehiculosPendientes(); // Actualiza la lista después de rechazar
    } catch (error) {
      console.error('Error al rechazar la solicitud:', error);
    }
  };
  
  return (
    <>
      <div className="container mx-auto mt-5">
        <h2 className="text-center mb-4 text-4xl font-bold">Vehículos Pendientes</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : solicitudes.length === 0 ? (
          <p>{noVehiclesMessage}</p>
        ) : (
          <div className="flex flex-wrap -mx-4">
            {solicitudes.map((vehiculo) => (
              <div key={vehiculo.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-4">
                <div className="bg-white p-4 rounded-md shadow-md">
                  <img
                    src={vehiculo.image_url} 
                    alt="Imagen del vehículo"
                    className="w-full h-32 object-cover mb-4"
                  />
                  <div className="mb-2 text-xl font-semibold">{vehiculo.marca}</div>
                  <div className="text-gray-600">${vehiculo.costo_alquiler} por día</div>
                  <div>Tipo de vehículo: {vehiculo.tipo_vehiculo}</div>
                  <div>Placas: {vehiculo.placas}</div>
                  <div>Número de pasajeros: {vehiculo.numero_pasajero}</div>
                  <div style={{ backgroundColor: '#3889B7' }} className="mt-4 flex space-x-2">
                    <button className="button-green" onClick={() => console.log('Mostrar más información')}>
                      Más información
                    </button>
                    <button className="button-blue" onClick={() => handleAccept(vehiculo.id)}>
                      Aceptar
                    </button>
                    <button className="button-red" onClick={() => handleReject(vehiculo.id)}>
                      Rechazar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AceeptRequests;
