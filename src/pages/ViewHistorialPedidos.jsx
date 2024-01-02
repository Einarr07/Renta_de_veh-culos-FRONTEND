// ViewHistorialPedidos.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavCliente from '../components/Cliente/NavCliente';

const ViewHistorialPedidos = () => {
  const [historialPedidos, setHistorialPedidos] = useState([]);

  useEffect(() => {
    const fetchHistorialPedidos = async () => {
      try {
        // Obtener el historial de pedidos desde el backend
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/historial-pedidos`);
        setHistorialPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener el historial de pedidos', error);
      }
    };

    // Llama a la función para obtener el historial de pedidos al montar el componente
    fetchHistorialPedidos();
  }, []);

  return (
    <div className="text-center">
      <h2>Historial de Pedidos</h2>
      <ul>
        {historialPedidos.map((pedido) => (
          <li key={pedido.id}>
            {/* Muestra la información del pedido, por ejemplo: fecha, vehículo, duración, etc. */}
            <p>Fecha: {pedido.fecha}</p>
            <p>Vehículo: {pedido.vehiculo.modelo}</p>
            <p>Duración: {pedido.duracion} días</p>
            {/* Agrega más detalles según sea necesario */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewHistorialPedidos;
