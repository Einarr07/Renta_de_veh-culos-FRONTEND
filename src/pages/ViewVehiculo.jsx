import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewVehiculo = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

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

        if (response.data && response.data.vehiculos) {
          setVehiculos(response.data.vehiculos);

          if (response.data.vehiculos.length === 0) {
            setMessage('Aun no contamos con vehículos disponibles para su disposición. Lo sentimos, vuelve pronto.');
          }
        } else {
          console.error('La respuesta de la API no tiene el formato esperado:', response.data);
          setError('Error al obtener la lista de vehículos. Formato inesperado. Por favor, inténtalo de nuevo más tarde.');
        }
      } catch (error) {
        console.error('Error al obtener la lista de vehículos', error);
        setError(`Error al obtener la lista de vehículos. ${error.response ? error.response.data.message : error.message}`);
      }
    };

    fetchVehiculos();
  }, []);

  const handleRentClick = async (vehiculoId) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
  
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contratos/${vehiculoId}/5`, {
        vehiculoId,
        duracion: 5,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Alquiler exitoso:', response.data);
    } catch (error) {
      console.error('Error durante el proceso de alquiler:', error);
    }
  };
  
  return (
    <div className="text-center">
      <h2>Lista de Vehículos Disponibles</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {message ? (
            <p>{message}</p>
          ) : (
            vehiculos.map((vehiculo) => (
              <li key={vehiculo.id}>
                <h3>{vehiculo.modelo}</h3>
                <p>Tipo: {vehiculo.tipo}</p>
                <p>Costo por día: ${vehiculo.costoAlquiler}</p>
                <p>Descripción: {vehiculo.descripcionesGenerales}</p>
                <button onClick={() => handleRentClick(vehiculo.id)}>
                  Contratar este vehículo
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default ViewVehiculo;
