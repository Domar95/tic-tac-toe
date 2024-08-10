import { Container } from "@mui/material";
import { Navbar } from "./components/common";
import Game from "./components/tic-tac-toe-game/Game";
import { ConnectionProvider } from "hooks/ConnectionContext";

function App() {
  return (
    <div>
      <ConnectionProvider>
        <Navbar />
        <Container maxWidth="sm">
          <Game />
        </Container>
      </ConnectionProvider>
    </div>
  );
}

export default App;
