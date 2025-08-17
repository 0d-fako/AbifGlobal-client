/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const isAuthenticated = () => {
  const token = Cookies.get('authToken');
  return !!token;  
};

const Protectedroute = ({ children }) => {
    const location = useLocation();
    return isAuthenticated() ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default Protectedroute;
