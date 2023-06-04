import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return !user ? children : <Navigate to="/" />;
};

export default GuestRoute;
