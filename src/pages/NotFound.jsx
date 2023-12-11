import {Link} from 'react-router-dom'
import paginaNotFound from '../assets/images/paginaNotFound.webp'

export const NotFound = () => {
    return (
        
        <div className="flex flex-col items-center justify-center">

            <img className="h-500 w-300 rounded-full border-4 border-solid border-slate-600 mx-auto my-4 object-cover" src={paginaNotFound} alt="vehículo siendo asaltado"/>

            <div className="flex flex-col items-center justify-center">
                
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">Página no encontrada</p>
                
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Lo sentimos, no se pudo encontrar la página que estás buscando.</p>
                
                <Link to="/login" className="p-3 m-5 w-full text-center  bg-gray-600 text-slate-300  border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Iniciar sesión</Link>

            </div>
        </div>
    )
}