import { ethers } from "ethers";
import React, { createContext, useContext, useMemo } from "react";
import { bsc_RPC } from "../constants/provider";

export const EtherProviderContext = createContext<any>(null);

export const EtherProvider: React.FC = ({ children }) => {
  const provider = new ethers.providers.JsonRpcProvider(bsc_RPC);

  const values = useMemo(
    () => ({
      provider,
    }),
    [provider]
  );

  return (
    <EtherProviderContext.Provider value={values}>
      {children}
    </EtherProviderContext.Provider>
  );
};

export const useEtherProvider = () => {
  const context = useContext<any>(EtherProviderContext);

  if (context === undefined) {
    throw new Error("provide context");
  }

  return context;
};
