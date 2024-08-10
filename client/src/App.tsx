import { Container } from "@mui/material";
import { Navbar } from "./components/common";
import { ConnectionProvider } from "hooks/ConnectionContext";
import MainContent from "components/main-content/MainContent";

function App() {
  return (
    <div>
      <ConnectionProvider>
        <Navbar />
        <Container maxWidth="sm">
          <MainContent />
        </Container>
      </ConnectionProvider>
    </div>
  );
}

export default App;
