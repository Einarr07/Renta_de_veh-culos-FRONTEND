import { Navigate, Outlet } from 'react-router-dom';

const Auth = ({ allowedRoles, children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/unauthorized" />;
  }

  const userRole = localStorage.getItem('role'); // Asegúrate de tener el nombre correcto del campo donde almacenas el rol

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default Auth;
