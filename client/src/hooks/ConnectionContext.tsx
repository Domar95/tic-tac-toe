import { useSDK } from "@metamask/sdk-react";
import { createContext, ReactNode, useContext, useState } from "react";

interface ConnectionContextType {
  account: string | undefined;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

interface ConnectionProviderProps {
  children: ReactNode;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(
  undefined
);

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};

export const ConnectionProvider: React.FC<ConnectionProviderProps> = ({
  children,
}) => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected } = useSDK();

  const connect = async () => {
    try {
      const accounts: unknown = await sdk?.connect();
      setAccount((accounts as Array<string>)?.[0]);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const disconnect = async () => {
    try {
      await sdk?.terminate();
      setAccount(undefined);
    } catch (err) {
      console.warn(`failed to disconnect..`, err);
    }
  };

  const value = {
    account,
    isConnected: connected && !!account,
    connect,
    disconnect,
  };

  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  );
};
