import { useWeb3React } from "@web3-react/core";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { injected } from "../constants/wallet";

export const MetaMaskContext = createContext<any>(null);

export const MetaMaskProvider: React.FC = ({ children }) => {
  const { activate, account, library, connector, active, deactivate } =
    useWeb3React();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // first loading
  useEffect(() => {
    connect().then((val) => {
      setIsLoading(false);
    });
  }, []);

  const handleIsActive = useCallback(() => {
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  // Connect to MetaMask wallet
  const connect = async () => {
    console.log("Connecting to MetaMask Wallet");
    try {
      await activate(injected);
    } catch (error) {
      console.log("Error on connecting: ", error);
    }
  };

  // Disconnect from Metamask wallet
  const disconnect = async () => {
    console.log("Deactivating...");
    try {
      await deactivate();
    } catch (error) {
      console.log("Error on disconnecting: ", error);
    }
  };

  const values = useMemo(
    () => ({
      isActive,
      account,
      isLoading,
      connect,
      disconnect,
    }),
    [isActive, isLoading]
  );

  return (
    <MetaMaskContext.Provider value={values}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => {
  const context = useContext<any>(MetaMaskContext);

  if (context === undefined) {
    throw new Error("provide MetaMask context");
  }

  return context;
};
