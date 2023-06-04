import { Route, Routes } from "react-router-dom";
import HomePageOut from "../pages/HomePageOut";
import Signup from "../pages/Signup";

const RoutesTree = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageOut />} />
      <Route path="/signup" element={<Signup />} />
      {/* Add pages here */}
    </Routes>
  );
};

export default RoutesTree;
