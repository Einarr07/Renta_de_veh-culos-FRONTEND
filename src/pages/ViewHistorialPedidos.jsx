import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewHistorialPedidos = () => {
  const [historialPedidos, setHistorialPedidos] = useState([]);
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noVehiclesMessage, setNoVehiclesMessage] = useState('');

  useEffect(() => {
    const fetchHistorialPedidos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token de autenticación no encontrado');
          setLoading(false);
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
          setNoVehiclesMessage('Error al obtener el historial de pedidos');
        }
      } catch (error) {
        console.error('Error al obtener el historial de pedidos', error);
        setNoVehiclesMessage('Error al obtener el historial de pedidos');
      } finally {
        setLoading(false);
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
      {loading ? (
        <p>Cargando...</p>
      ) : historialPedidos.length === 0 ? (
        <p>{noVehiclesMessage || 'Aun no has rentado ningun vehículo'}</p>
      ) : (
        <div className="row">
          {historialPedidos.map((detalle, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <img
                src={detalle.vehiculo.image_url}
                alt="Imagen del vehículo"
                className="w-full h-32 object-cover mb-4"
              />
              <p>Vehículo: {detalle.vehiculo.marca} - {detalle.vehiculo.tipo_vehiculo}</p>
              <p>Placas: {detalle.vehiculo.placas}</p>
              <p>Duración: {detalle.contrato.dias} días</p>
                <div className="d-flex flex-column">
                  <button className="button-green" onClick={() => handleShowMoreInfo(detalle)}>
                    Ver más detalles
                  </button>
                </div>
            </div>
          ))}
        </div>
      )}
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
