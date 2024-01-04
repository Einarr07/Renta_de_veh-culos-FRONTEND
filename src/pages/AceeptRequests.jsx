import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSolicitudes } from './SolicitudesContext';

const AceeptRequests = ({ id }) => {
  const { state, actualizarSolicitudes } = useSolicitudes();
  const [loading, setLoading] = useState(true);
  const [noVehiclesMessage, setNoVehiclesMessage] = useState('');

  useEffect(() => {
    const obtenerVehiculosPendientes = async () => {
      try {
        const autenticado = localStorage.getItem('token');
        const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/solicitudes/pendientes-aprobadas`, {
          headers: {
            Authorization: `Bearer ${autenticado}`,
          },
        });

        console.log('Respuesta del servidor:', respuesta.data);

        if (
          respuesta.data.success &&
          Array.isArray(respuesta.data.solicitudes) &&
          respuesta.data.solicitudes.some(solicitud => Array.isArray(solicitud.vehiculos) && solicitud.vehiculos.length > 0)
        ) {
          actualizarSolicitudes(respuesta.data.solicitudes);
          setLoading(false);
        } else {
          setNoVehiclesMessage('AUN NO SE ENCUENTRAN VEHÍCULOS REGISTRADOS POR PARTE DE LOS PROPIETARIOS');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener la lista de vehículos pendientes:', error);
        setLoading(false);
      }
    };

    obtenerVehiculosPendientes();
  }, []);

  const handleAccept = async (solicitudId) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/estado/${solicitudId}`);
      console.log('Solicitud de aceptación exitosa');
      actualizarSolicitudes();
    } catch (error) {
      console.error('Error al aceptar la solicitud:', error);
    }
  };

  const handleReject = async (solicitudId) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/estado/${solicitudId}/rechazar`);
      console.log('Solicitud de rechazo exitosa');
      actualizarSolicitudes();
    } catch (error) {
      console.error('Error al rechazar la solicitud:', error);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-5">
        <h2 className="text-center mb-4 text-4xl font-bold">Solicitudes Pendientes</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : state.solicitudes.length === 0 ? (
          <p>{noVehiclesMessage}</p>
        ) : (
          <div className="flex flex-wrap -mx-4">
            {state.solicitudes.map((solicitud) => (
              <div key={solicitud.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-4">
                <div className="bg-white p-4 rounded-md shadow-md">
                  {solicitud.vehiculos && solicitud.vehiculos.length > 0 ? (
                    solicitud.vehiculos.map((vehiculo) => (
                      <div key={vehiculo.id} className="mb-4">
                        <img
                          src={vehiculo.imagen} 
                          alt="Imagen del vehículo"
                          className="w-full h-32 object-cover mb-4"
                        />
                        <div className="mb-2 text-xl font-semibold">{vehiculo.marca}</div>
                        <div className="text-gray-600">${vehiculo.costoPorDia} por día</div>
                        <div>Tipo de vehículo: {vehiculo.tipo_vehiculo}</div>
                        <div>Placas: {vehiculo.placas}</div>
                        <div>Número de pasajeros: {vehiculo.numero_pasajero}</div>
                        <div style={{ backgroundColor: '#3889B7' }} className="mt-4 flex space-x-2">
                          <button className="button-green" onClick={() => console.log('Mostrar más información')}>
                            Más información
                          </button>
                          <button className="button-blue" onClick={() => handleAccept(solicitud.id)}>
                            Aceptar
                          </button>
                          <button className="button-red" onClick={() => handleReject(solicitud.id)}>
                            Rechazar
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No hay vehículos asociados a esta solicitud.</p>
                  )}
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
