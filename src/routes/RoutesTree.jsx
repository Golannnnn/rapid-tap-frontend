import { Route, Routes } from "react-router-dom";
import HomePageOut from "../pages/HomePageOut";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const RoutesTree = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageOut />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RoutesTree;
