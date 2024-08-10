import React from "react";
import { Button } from "@mui/material";
import { useConnection } from "hooks/ConnectionContext";

const ConnectButton: React.FC = () => {
  const { isConnected, connect, disconnect } = useConnection();

  const handleConnect = async () => {
    !isConnected ? await connect() : await disconnect();
  };

  return (
    <Button
      variant="contained"
      sx={{ textTransform: "none" }}
      onClick={handleConnect}
    >
      {!isConnected ? `Connect Wallet` : `Disconnect`}
    </Button>
  );
};

export default ConnectButton;
