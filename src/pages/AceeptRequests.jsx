import React from 'react';
import axios from 'axios';
import { useSolicitudes } from './SolicitudesContext';
import NavAdministrador from '../components/Administrador/NavAdministrador.jsx';

const AceeptRequests = () => {
  const { state, actualizarSolicitudes } = useSolicitudes();

  const handleAccept = async (solicitudId) => {
    try {
      // Realiza la lógica para aceptar la solicitud en el backend
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/aceptar-solicitud/${solicitudId}`);

      // Actualiza el estado local después de aceptar la solicitud
      actualizarSolicitudes();
    } catch (error) {
      console.error('Error al aceptar la solicitud:', error);
    }
  };

  const handleReject = async (solicitudId) => {
    try {
      // Realiza la lógica para rechazar la solicitud en el backend
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rechazar-solicitud/${solicitudId}`);

      // Actualiza el estado local después de rechazar la solicitud
      actualizarSolicitudes();
    } catch (error) {
      console.error('Error al rechazar la solicitud:', error);
    }
  };

  return (
    <>
      <NavAdministrador />
      <div className="container mx-auto mt-5">
        <h2 className="text-center mb-4 text-4xl font-bold">Solicitudes Pendientes</h2>
        <div className="flex flex-wrap -mx-4">
          {state.solicitudes.map((solicitud) => (
            <div key={solicitud.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-4">
              <div className="bg-white p-4 rounded-md shadow-md">
                <img
                  src={solicitud.imagen}
                  alt="Imagen del vehículo"
                  className="w-full h-32 object-cover mb-4"
                />
                <div className="mb-2 text-xl font-semibold">{solicitud.marca}</div>
                <div className="text-gray-600">${solicitud.costoPorDia} por día</div>
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AceeptRequests;
