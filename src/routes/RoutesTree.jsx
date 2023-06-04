import { Route, Routes } from "react-router-dom";
import HomePageOut from "../pages/HomePageOut";
import Signup from "../pages/Signup";
import HighScorePage from "../pages/HighScorePage";

const RoutesTree = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageOut />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/highscores" element={<HighScorePage/>}/>
      {/* Add pages here */}
    </Routes>
  );
};

export default RoutesTree;
