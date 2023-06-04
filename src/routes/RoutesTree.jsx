import { Route, Routes } from "react-router-dom";
import HomePageOut from "../pages/HomePageOut";
import Signup from "../pages/Signup";
import HighScorePage from "../pages/HighScorePage";
import Login from "../pages/Login";
import TapMode from "../test/TapMode";

const RoutesTree = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageOut />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/tapmode" element={<TapMode />} />
      <Route path="/highscores" element={<HighScorePage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RoutesTree;
