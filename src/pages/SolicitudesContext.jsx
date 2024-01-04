// SolicitudesContext.js

import React, { createContext, useContext, useReducer, useState } from 'react';

const SolicitudesContext = createContext();

const initialState = {
  solicitudes: [],
  // ... otros estados relacionados con las solicitudes
};

const solicitudesReducer = (state, action) => {
  switch (action.type) {
    case 'ACTUALIZAR_SOLICITUDES':
      return { ...state, solicitudes: action.payload };
    case 'GUARDAR_RESPUESTA_BACKEND':
      return { ...state, respuestaBackend: action.payload };
    // ... otros casos de acciones
    default:
      return state;
  }
};

// Componente proveedor
const SolicitudesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(solicitudesReducer, initialState);

  const actualizarSolicitudes = (solicitudes) => {
    dispatch({ type: 'ACTUALIZAR_SOLICITUDES', payload: solicitudes });
  };

  const guardarRespuestaBackend = (respuesta) => {
    dispatch({ type: 'GUARDAR_RESPUESTA_BACKEND', payload: respuesta });
  };

  return (
    <SolicitudesContext.Provider value={{ state, actualizarSolicitudes, guardarRespuestaBackend }}>
      {children}
    </SolicitudesContext.Provider>
  );
};

// Hook personalizado para utilizar el contexto
const useSolicitudes = () => {
  const context = useContext(SolicitudesContext);
  if (!context) {
    throw new Error('useSolicitudes debe usarse dentro de un SolicitudesProvider');
  }
  return context;
};

export { SolicitudesProvider, useSolicitudes };
