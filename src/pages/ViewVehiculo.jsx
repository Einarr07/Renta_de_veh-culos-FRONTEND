import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavCliente from '../components/Cliente/NavCliente';

const ViewVehiculo = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        // Obtener la lista de vehículos disponibles desde el backend
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vehiculos/disponibles`);
        setVehiculos(response.data);

        // Mostrar un mensaje si no hay vehículos disponibles
        if (response.data.length === 0) {
          setMessage('Aun no contamos con vehículos disponibles para su disposición. Lo sentimos, vuelve pronto.');
        }
      } catch (error) {
        console.error('Error al obtener la lista de vehículos', error);
      }
    };

    // Llama a la función para obtener la lista de vehículos al montar el componente
    fetchVehiculos();
  }, []);

  const handleRentClick = async (vehiculoId) => {
    try {
      // Realizar lógica para enviar una solicitud de alquiler al backend
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/alquiler`, {
        vehiculoId,
        duracion: 5, // Aquí debes incluir la duración seleccionada por el cliente
      });

      // Mostrar un mensaje de éxito o redirigir a la página de confirmación
      console.log('Alquiler exitoso:', response.data);
    } catch (error) {
      console.error('Error durante el proceso de alquiler:', error);
    }
  };

  return (
    <div className="text-center">
      <h2>Lista de Vehículos Disponibles</h2>
      {message ? (
        <p>{message}</p>
      ) : (
        <ul>
          {vehiculos.map((vehiculo) => (
            <li key={vehiculo.id}>
              <h3>{vehiculo.modelo}</h3>
              <p>Tipo: {vehiculo.tipo}</p>
              <p>Costo por día: ${vehiculo.costoAlquiler}</p>
              <p>Descripción: {vehiculo.descripcionesGenerales}</p>
              <button onClick={() => handleRentClick(vehiculo.id)}>
                Contratar este vehículo
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewVehiculo;
