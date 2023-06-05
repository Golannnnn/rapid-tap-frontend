import { Route, Routes } from "react-router-dom";
import HomePageOut from "../pages/HomePageOut";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import TapMode from "../test/TapMode";
import HighScorePage from "../pages/HighScorePage";
import UserRoute from "./UserRoute";
import GuestRoute from "./GuestRoute";

// Routes that are for users need to be wrapped in UserRoute

const RoutesTree = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageOut />} />
      <Route
        path="/tapmode"
        element={
          <UserRoute>
            <TapMode />
          </UserRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestRoute>
            <Signup />
          </GuestRoute>
        }
      />
      <Route
        path="/highscores"
        element={
          <UserRoute>
            <HighScorePage />
          </UserRoute>
        }
      />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
    </Routes>
  );
};

export default RoutesTree;
