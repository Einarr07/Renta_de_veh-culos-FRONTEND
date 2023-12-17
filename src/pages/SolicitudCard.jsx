import React from 'react';

const SolicitudCard = ({ solicitud }) => {
  return (
    <div className="solicitud-card">
      <img src={solicitud.imagen} alt="Imagen de solicitud" />
      <p>Propietario: {solicitud.nombrePropietario}</p>
      <p>Marca: {solicitud.marca}</p>
      <p>Costo por día: {solicitud.costoAlquiler}</p>
      {/* Otras propiedades de solicitud */}
      <div>
        <button>Más información</button>
        <button>Aceptar</button>
        <button>Rechazar</button>
      </div>
    </div>
  );
};

export default SolicitudCard;
