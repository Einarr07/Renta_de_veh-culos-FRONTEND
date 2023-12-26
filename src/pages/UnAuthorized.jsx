import React from 'react';

const UnAuthorized = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">Acceso No Autorizado</h1>
        <p className="mt-4 text-gray-600">Lo siento, no tienes permiso para acceder a esta página.</p>
      </div>
    </div>
  );
};

export default UnAuthorized;
