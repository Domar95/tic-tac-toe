import React, { useState } from "react";
import { Button } from "@mui/material";
import { useSDK } from "@metamask/sdk-react";

const ConnectButton: React.FC = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected } = useSDK();

  const handleConnect = async () => {
    !isConnected() ? await connect() : await disconnect();
  };

  async function connect() {
    try {
      const accounts: unknown = await sdk?.connect();
      setAccount((accounts as Array<string>)?.[0]);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  }

  async function disconnect() {
    try {
      await sdk?.terminate();
      setAccount(undefined);
    } catch (err) {
      console.warn(`failed to disconnect..`, err);
    }
  }

  function isConnected() {
    return connected && account;
  }

  return (
    <Button
      variant="contained"
      sx={{ textTransform: "none" }}
      onClick={handleConnect}
    >
      {!isConnected() ? `Connect Wallet` : `Disconnect`}
    </Button>
  );
};

export default ConnectButton;
