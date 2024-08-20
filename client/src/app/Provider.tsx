import { ConnectionProvider } from "hooks/ConnectionContext";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "styles/theme";
import { MetaMaskProvider } from "@metamask/sdk-react";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <MetaMaskProvider
          debug={false}
          sdkOptions={{
            dappMetadata: {
              name: "Tic Tac Toe",
              url: window.location.href,
            },
            infuraAPIKey: process.env.REACT_APP_INFURA_API_KEY,
          }}
        >
          <ConnectionProvider>{children}</ConnectionProvider>
        </MetaMaskProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
