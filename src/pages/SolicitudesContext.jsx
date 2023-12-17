import React, { createContext, useContext, useReducer } from 'react';

const SolicitudesContext = createContext();

const initialState = {
  solicitudes: [
    {
      id: 1,
      propietario: 'Propietario 1',
      marca: 'Toyota',
      costoPorDia: 50,
      // ... otras propiedades
    },
    {
      id: 2,
      propietario: 'Propietario 2',
      marca: 'Honda',
      costoPorDia: 40,
      // ... otras propiedades
    },
    {
      id: 3,
      propietario: 'Propietario 3',
      marca: 'Lambo',
      costoPorDia: 50,
      // ... otras propiedades
    },
    {
      id: 4,
      propietario: 'Propietario 4',
      marca: 'Todo terreno',
      costoPorDia: 40,
      // ... otras propiedades
    },
    {
      id: 5,
      propietario: 'Propietario 5',
      marca: 'Chevrolet',
      costoPorDia: 40,
      // ... otras propiedades
    },
  ],
  // ... otros estados relacionados con las solicitudes
};

const solicitudesReducer = (state, action) => {
  // Lógica del reducer para manejar acciones (aceptar, rechazar, etc.)
  switch (action.type) {
    // ... casos de acciones
    default:
      return state;
  }
};

// Componente proveedor
const SolicitudesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(solicitudesReducer, initialState);

  return (
    <SolicitudesContext.Provider value={{ state, dispatch }}>
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
