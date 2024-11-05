// PrivateRoute.js
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { userDetails } = useSelector((state) => state.allCart);

  if (!userDetails || userDetails.userrole !== 'ADMIN') {
    // If user is not logged in or not an admin, redirect to login page
    return <Navigate to="/Loginpage" />;
  }

  // If user is an admin, render the children (Admin page)
  return children;
};

export default PrivateRoute;
