import { Box, Container } from "@mui/material";
import { Navbar } from "./components/common";
import { ConnectionProvider } from "hooks/ConnectionContext";
import MainContent from "components/main-content/MainContent";
import checker from "assets/checker.png";

function App() {
  return (
    <div>
      <ConnectionProvider>
        <Navbar />
        <Box
          sx={{
            backgroundImage: `url(${checker})`,
            backgroundSize: "auto",
            backgroundPosition: "center",
          }}
        >
          <Container maxWidth="sm">
            <MainContent />
          </Container>
        </Box>
      </ConnectionProvider>
    </div>
  );
}

export default App;
