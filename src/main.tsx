import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MulticallUpdater from "./state/multicall/updater.tsx";
import "./index.css";

import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { usePollBlockNumber } from "./state/block/hooks.ts";
import { zkSync, polygon } from "wagmi/chains";

import { Provider } from 'react-redux'
import store from './state'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [zkSync, polygon],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
  ],
});

function Updaters() {
  usePollBlockNumber()
  return (
    <>
      <MulticallUpdater />
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <Provider store={store}>
        <Updaters />
        <App />
      </Provider>
    </WagmiConfig>
  </React.StrictMode>
);
