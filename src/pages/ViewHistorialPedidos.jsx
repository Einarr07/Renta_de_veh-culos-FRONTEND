import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewHistorialPedidos = () => {
  const [historialPedidos, setHistorialPedidos] = useState([]);
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);

  useEffect(() => {
    const fetchHistorialPedidos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token de autenticación no encontrado');
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/contratados`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Verificar si la respuesta contiene un array antes de actualizar el estado
        if (response.data.success && Array.isArray(response.data.contratos_detallados)) {
          setHistorialPedidos(response.data.contratos_detallados);
        } else {
          console.error('La respuesta del servidor no es válida', response.data);
        }
      } catch (error) {
        console.error('Error al obtener el historial de pedidos', error);
      }
    };

    fetchHistorialPedidos();
  }, []);

  const handleShowMoreInfo = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setShowMoreInfoModal(true);
  };

  const handleCloseModal = () => {
    setSelectedVehiculo(null);
    setShowMoreInfoModal(false);
  };

  return (
    <div className="text-center">
      <h2>Historial de Pedidos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {historialPedidos.map((detalle, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-md">
            <img
              src={detalle.vehiculo.image_url}
              alt="Imagen del vehículo"
              className="w-full h-32 object-cover mb-4"
            />
            <p>Vehículo: {detalle.vehiculo.marca} - {detalle.vehiculo.tipo_vehiculo}</p>
            <p>Placas: {detalle.vehiculo.placas}</p>
            <p>Duración: {detalle.contrato.dias} días</p>
            <div className="mt-4 flex space-x-2">
              <button className="button-green" onClick={() => handleShowMoreInfo(detalle)}>
                Ver más detalles
              </button>
            </div>
          </div>
        ))}
      </div>
      {showMoreInfoModal && selectedVehiculo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-close close-button" onClick={handleCloseModal}>
              &times;
            </div>
            <>
              <h2>{selectedVehiculo.vehiculo.modelo}</h2>
              <p className="modal-detail">Marca: {selectedVehiculo.vehiculo.marca}</p>
              <p className="modal-detail">Tipo de vehículo: {selectedVehiculo.vehiculo.tipo_vehiculo}</p>
              <p className="modal-detail">Costo por día: ${selectedVehiculo.vehiculo.costo_alquiler}</p>
              <p className="modal-detail">Número de pasajeros: {selectedVehiculo.vehiculo.numero_pasajero}</p>
              <p className="modal-detail">Placas: {selectedVehiculo.vehiculo.placas}</p>
              <p className="modal-detail">Descripción: {selectedVehiculo.vehiculo.descripcion}</p>
              <p className="modal-detail">Contacto: {selectedVehiculo.vehiculo.contacto}</p>
              <img src={selectedVehiculo.vehiculo.image_url} alt="Imagen del vehículo" className="modal-image" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewHistorialPedidos;
