import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/login" />;
};

export default UserRoute;
