import axios from 'axios';
import React, { useState } from "react";
import Mensaje from '../Alertas/Mensaje';

const RegisterVehiculo = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hideSuccessMessage, setHideSuccessMessage] = useState(true);
  const [hideErrorMessage, setHideErrorMessage] = useState(true);
  const [vehiculoData, setVehiculoData] = useState({
    tipo_vehiculo: "",
    marca: "",
    placas: "",
    numero_pasajero: 0,
    image_url: null,
    costo_alquiler: 0, 
    contacto: "",
    descripcion: ""
  });
  const [mensaje, setMensaje] = useState({});
  const [descripcion, setDescripcion] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = typeof value === 'number' ? String(value) : value;
  
    switch (name) {
      case "tipo_vehiculo":
      case "marca":
      case "placas":
        setVehiculoData((prevData) => {
          return { ...prevData, [name]: newValue };
        });
        break;
  
      case "numero_pasajero":
        const parsedValue = parseInt(newValue, 10) || 0;
        if (parsedValue >= 1 && parsedValue <= 20) {
          setVehiculoData((prevData) => {
            return { ...prevData, [name]: parsedValue };
          });
        }
        break;
  
      case "image_url":
        // Realizar verificación específica para el campo image_url si es necesario
        break;
  
      case "costo_alquiler":
        const parsedCostoAlquiler = parseFloat(newValue) || 1;
        if (parsedCostoAlquiler >= 0) {
          setVehiculoData((prevData) => {
            return { ...prevData, [name]: parsedCostoAlquiler };
          });
        }
        break;
  
        case "contacto":
          // Usar una expresión regular para permitir solo números
          const numericValue = value.replace(/\D/g, '');
          const maxLengthContacto = 10;
          if (numericValue.length <= maxLengthContacto) {
            setVehiculoData((prevData) => {
              return { ...prevData, [name]: numericValue };
            });
          }
          break;
  
      case "descripcion":
        const maxLengthDescripcion = 500;
        if (newValue.length <= maxLengthDescripcion) {
          setVehiculoData((prevData) => {
            return { ...prevData, [name]: newValue };
          });
          setDescripcion(newValue.length);
        }
        break;
  
      default:
        break;
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2097152) {
      setVehiculoData((prevData) => ({ ...prevData, image_url: file }));

      
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    } else {
      console.error("El archivo es demasiado grande");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const autenticado = localStorage.getItem('token');

    try {
      const formData = new FormData();
      formData.append('tipo_vehiculo', vehiculoData.tipo_vehiculo);
      formData.append('marca', vehiculoData.marca);
      formData.append('placas', vehiculoData.placas);
      formData.append('numero_pasajero', vehiculoData.numero_pasajero);
      formData.append('image_url', vehiculoData.image_url);
      formData.append('costo_alquiler', vehiculoData.costo_alquiler);
      formData.append('contacto', vehiculoData.contacto);
      formData.append('descripcion', vehiculoData.descripcion);

      const url = `${import.meta.env.VITE_BACKEND_URL}/vehiculos`;
      const respuesta = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${autenticado}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setVehiculoData({
        tipo_vehiculo: '',
        marca: '',
        placas: '',
        numero_pasajero: 0,
        image_url: null,
        costo_alquiler: 0,
        contacto: '',
        descripcion: '',
      });

      console.log('Respuesta del servidor:', respuesta.data);

      if (respuesta.data.success) {
        // Si el servidor devuelve un mensaje de éxito, lo usamos
        setSuccessMessage('Vehículo registrado exitosamente');
        setHideSuccessMessage(false);

        setTimeout(() => {
          setHideSuccessMessage(true);
        }, 3000);
      } else {
        // Si el servidor devuelve un mensaje de error, lo mostramos
        setErrorMessage('Error al registrar un vehículo, verifica los campos');
        setHideErrorMessage(false);

        setTimeout(()=>{
          setHideErrorMessage(true);
        }, 3000);
        setMensaje({
          respuesta: respuesta.data.message || 'Error desconocido del servidor',
          tipo: false,
        });
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      if (error.response) {
        console.error('Respuesta del servidor con error:', error.response.data);
        setFalseMesaage('Error al registrar un vehículo');
        setMensaje({
          respuesta: error.response?.data.message || 'Respuesta erronea del servidor',
          tipo: false,
        });
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
        setFalseMesaage('Error al registrar un vehículo');
        setMensaje({
          respuesta: error.response?.data.message || 'No se recibió respuesta del servidor',
          tipo: false,
        });
      } else {
        console.error('Error durante la solicitud:', error.message);
        setFalseMesaage('Error al registrar un vehículo');
        setMensaje({
          respuesta: error.response?.data.message || 'Error durante la solicitud',
          tipo: false,
        });
      }
    }
  };
  
  
  return (
    <>
      <div className="container mx-auto mt-5">
        <h2 className="text-center mb-4 text-4xl font-bold">Nuevo vehículo</h2>
        {mensaje.tipo && (
          <div className="mensaje flex justify-center items-center h-screen">
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          </div>
        )}

        {successMessage && !hideSuccessMessage && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>
            </div>
          </div>
        )}

        {errorMessage && !hideErrorMessage && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="tipo_vehiculo" className="block text-sm font-medium text-gray-600">
              Tipo de vehículo
            </label>
            <select
              id="tipo_vehiculo"
              name="tipo_vehiculo"
              value={vehiculoData.tipo_vehiculo}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="">Selecciona el tipo de vehículo</option>
              <option value="Motocicleta">Motocicleta</option>
              <option value="Auto">Auto</option>
              <option value="Camioneta">Camioneta</option>
              <option value="Camión">Camión</option>
              <option value="Bus">Bus</option>
              <option value="Bicicleta">Bicicleta</option>
              <option value="Scooter">Scooter</option>
              <option value="Cuatrimoto">Cuatrimoto</option>
              <option value="Tractor">Tractor</option>
              <option value="Furgoneta">Furgoneta</option>
            </select>
          </div>
  
          <div className="mb-4">
            <label htmlFor="marca" className="block text-sm font-medium text-gray-600">
              Marca
            </label>
            <select
              id="marca"
              name="marca"
              value={vehiculoData.marca}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="">Selecciona la marca del vehículo</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Ford">Ford</option>
              <option value="Toyota">Toyota</option>
              <option value="Nissan">Nissan</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Kia">Kia</option>
              <option value="Mazda">Mazda</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Honda">Honda</option>
              <option value="Renault">Renault</option>
              <option value="Subaru">Subaru</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="Mitsubishi">Mitsubishi</option>
              <option value="Jeep">Jeep</option>
              <option value="Suzuki">Suzuki</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="placas" className="block text-sm font-medium text-gray-600">
              Placas del vehículo
            </label>
            <input
              type="text"
              id="placas"
              name="placas"
              value={vehiculoData.placas}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="numero_pasajero" className="block text-sm font-medium text-gray-600">
              Número máximo de pasajeros
            </label>
            <select
              id="numero_pasajero"
              name="numero_pasajero"
              value={vehiculoData.numero_pasajero}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              {[...Array(20).keys()].map((number) => (
                <option key={number + 1} value={number + 1}>
                  {number + 1}
                </option>
              ))}
            </select>
          </div>
  
          <div className="mb-4">
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-600">
              Imagen MAX (2MB)
            </label>
            <input
              type="file"
              id="image_url"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded-md"
              accept="image/*"
              maxfilesize={2048 * 1024 * 1024}  // 2 MB en bytes
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Vista previa de la imagen"
                className="mt-2 max-w-full h-auto"
              />
            )}
          </div>
  
          <div className="mb-4">
            <label htmlFor="costo_alquiler" className="block text-sm font-medium text-gray-600">
              Costo de alquiler
            </label>
            <input
              type="number" // Cambié el tipo de entrada a 'number'
              id="costo_alquiler"
              name="costo_alquiler"
              value={vehiculoData.costo_alquiler}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="contacto" className="block text-sm font-medium text-gray-600">
              Número de contacto ({vehiculoData.contacto.length}/10)
            </label>
            <input
              type="text"
              id="contacto"
              name="contacto"
              value={vehiculoData.contacto}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-600">
              Descripciones generales ({vehiculoData.descripcion.length}/500)
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows="3"
              value={vehiculoData.descripcion}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-black px-4 py-10 rounded-md hover:bg-blue-600"
          >
            Crear vehículo
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterVehiculo;
