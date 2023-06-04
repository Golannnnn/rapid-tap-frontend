import RoutesTree from "./routes/RoutesTree";
import { UserContextProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <RoutesTree />
      </UserContextProvider>
    </>
  );
}

export default App;
