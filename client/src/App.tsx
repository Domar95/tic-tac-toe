import { Navbar } from "./components/common";
import { ConnectionProvider } from "hooks/ConnectionContext";
import MainContent from "components/main-content/MainContent";

function App() {
  return (
    <div>
      <ConnectionProvider>
        <Navbar />
        <MainContent />
      </ConnectionProvider>
    </div>
  );
}

export default App;
