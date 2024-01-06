import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewVehiculo = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [duracionContrato, setDuracionContrato] = useState(3);
  const [successMessage, setSuccessMessage] = useState('');
  const [hideSuccessMessage, setHideSuccessMessage] = useState(true);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/aceptados`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.success) {
          setVehiculos(response.data.vehiculos_aceptados);

          if (response.data.vehiculos_aceptados.length === 0) {
            setMessage('Aun no contamos con vehículos disponibles para su disposición. Lo sentimos, vuelve pronto.');
          }
        } else {
          console.error('La respuesta de la API no tiene el formato esperado:', response.data);
          setError('Error al obtener la lista de vehículos. Formato inesperado. Por favor, inténtalo de nuevo más tarde.');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la lista de vehículos', error);
        setError(`Error al obtener la lista de vehículos. ${error.response ? error.response.data.message : error.message}`);
        setLoading(false);
      }
    };

    fetchVehiculos();
  }, []);

  const handleRentClick = (vehiculoId) => {
    const vehiculo = vehiculos.find((v) => v.id === vehiculoId);
    setSelectedVehiculo(vehiculo);
    setShowRentModal(true);
  };

  const handleConfirmRent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/contratos/${selectedVehiculo.id}/${duracionContrato}`,
        {
          vehiculoId: selectedVehiculo.id,
          duracion: duracionContrato,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Alquiler exitoso:', response.data);

      // Mostrar mensaje de éxito
      setSuccessMessage('¡Su contrato fue realizado exitosamente!');
      setHideSuccessMessage(false); // Mostrar el mensaje

      // Ocultar el mensaje después de 5 segundos
      setTimeout(() => {
        setHideSuccessMessage(true);
      }, 5000);

      // Cerrar la ventana emergente
      setShowRentModal(false);
    } catch (error) {
      console.error('Error durante el proceso de alquiler:', error);
    }
  };

  const handleShowMoreInfo = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setShowMoreInfoModal(true);
  };

  const handleCloseModal = () => {
    setShowMoreInfoModal(false);
    setShowRentModal(false);
  };

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-center mb-4 text-4xl font-bold">Vehículos Disponibles</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {message && <p>{message}</p>}
          <div className="flex flex-wrap -mx-4">
            {vehiculos.map((vehiculo) => (
              <div key={vehiculo.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-4">
                <div className="bg-white p-4 rounded-md shadow-md">
                  <img
                    src={vehiculo.image_url}
                    alt="Imagen del vehículo"
                    className="w-full h-32 object-cover mb-4"
                  />
                  <div className="mb-2 text-xl font-semibold">{vehiculo.modelo}</div>
                  <div className="text-gray-600">${vehiculo.costo_alquiler} por día</div>
                  <div>Tipo de vehículo: {vehiculo.tipo_vehiculo}</div>
                  <div>Placas: {vehiculo.placas}</div>
                  <div>Número de pasajeros: {vehiculo.numero_pasajero}</div>
                  <div style={{ backgroundColor: '#3889B7' }} className="mt-4 flex space-x-2">
                    <button className="button-green" onClick={() => handleShowMoreInfo(vehiculo)}>
                      Mostrar más información
                    </button>
                    <button className="button-blue" onClick={() => handleRentClick(vehiculo.id)}>
                      Contratar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showMoreInfoModal && selectedVehiculo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-close close-button" onClick={handleCloseModal}>
              &times;
            </div>
            <>
              <h2>{selectedVehiculo.modelo}</h2>
              <p className="modal-detail">Marca: {selectedVehiculo.marca}</p>
              <p className="modal-detail">Tipo de vehículo: {selectedVehiculo.tipo_vehiculo}</p>
              <p className="modal-detail">Costo por día: ${selectedVehiculo.costo_alquiler}</p>
              <p className="modal-detail">Número de pasajeros: {selectedVehiculo.numero_pasajero}</p>
              <p className="modal-detail">Placas: {selectedVehiculo.placas}</p>
              <p className="modal-detail">Descripción: {selectedVehiculo.descripcion}</p>
              <p className="modal-detail">Contacto: {selectedVehiculo.contacto}</p>
              <img src={selectedVehiculo.image_url} alt="Imagen del vehículo" className="modal-image" />
            </>
          </div>
        </div>
      )}

      {successMessage && !hideSuccessMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>
          </div>
        </div>
      )}

      {showRentModal && selectedVehiculo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <>
              <div className="modal-close close-button" onClick={handleCloseModal}>
                &times;
              </div>
              <h2>Contratar Vehículo</h2>
              <p>¿Por cuántos días quieres contratar este vehículo?</p>
              <input
                type="number"
                value={duracionContrato}
                onChange={(e) => setDuracionContrato(parseInt(e.target.value, 10))}
              />
              <button onClick={handleConfirmRent}>Aceptar</button>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewVehiculo;
