import { Route, Routes } from "react-router-dom";
import HomePageOut from "../pages/HomePageOut";
import Signup from "../pages/Signup";
import TapMode from "../test/TapMode";

const RoutesTree = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageOut />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/tapmode" element={<TapMode />} />
      {/* Add pages here */}
    </Routes>
  );
};

export default RoutesTree;
