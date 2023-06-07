import RoutesTree from "./routes/RoutesTree";
import { UserContextProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import { ColorContextProvider } from "./context/ColorContext";

function App() {
  return (
    <div className="body">
      <UserContextProvider>
        <ColorContextProvider>
          <Navbar />
          <RoutesTree />
        </ColorContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
