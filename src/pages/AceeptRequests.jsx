import React from 'react';
import { useSolicitudes } from './SolicitudesContext';
import NavAdministrador from '../components/Administrador/NavAdministrador.jsx';
const AceeptRequests = () => {
  const { state } = useSolicitudes();

  return (
    <>
    <NavAdministrador/>
    <div className="container mx-auto mt-5">
      <h2 className="text-center mb-4 text-4xl font-bold">Solicitudes Pendientes</h2>
      <div className="flex flex-wrap -mx-4">
        {state.solicitudes.map((solicitud) => (
          <div key={solicitud.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-4">
            <div className="bg-white p-4 rounded-md shadow-md">
              <img src={solicitud.imagen} alt="Imagen del vehículo" className="w-full h-32 object-cover mb-4" />
              <div className="mb-2 text-xl font-semibold">{solicitud.marca}</div>
              <div className="text-gray-600">${solicitud.costoPorDia} por día</div>
              <div style={{ backgroundColor: '#3889B7' }} className="mt-4 flex space-x-2">
                <button className="button-green">
                  Más información
                </button>
                <button className="button-blue">
                  Aceptar
                </button>
                <button className="button-red">
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
