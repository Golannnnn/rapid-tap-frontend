import RoutesTree from "./routes/RoutesTree";
import { UserContextProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="body">
      <UserContextProvider>
        <Navbar />
        <RoutesTree />
      </UserContextProvider>
    </div>
  );
}

export default App;
