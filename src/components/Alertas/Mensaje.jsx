const Mensaje = ({ children, tipo, className }) => {
    const backgroundColor = tipo === 'error' ? 'bg-red-50' : 'bg-green-50';
    const borderColor = tipo === 'error' ? 'border-red-500' : 'border-green-500';
    const textColor = tipo === 'error' ? 'text-red-500' : 'text-green-500';

    return (
        <div className={`p-6 border-l-4 ${borderColor} rounded-r-xl ${backgroundColor} flex mt-2 ${textColor} ${className}`}>
            <div>
                <svg className={`w-5 h-5 ${textColor}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
            </div>
            <div className="ml-3">
                <div className={`text-sm ${textColor}`}>
                    <p>{children}</p>
                </div>
            </div>
        </div>
    )
}

export default Mensaje;