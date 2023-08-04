"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { goerli, mainnet, polygonMumbai } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

import { AddressWrapper } from "@/components/core/account/address-wrapper";
import Web3AuthConnectorInstance from "./Web3AuthConnectorInstance";
import Navbar from "./nav-bar";

// Configure chains & providers with the Public provider.
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli, mainnet, polygonMumbai],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
    Web3AuthConnectorInstance(chains),
  ],
  publicClient,
  webSocketPublicClient,
});

let links = [
  {
    href: "/",
    name: "Home",
  },
  {
    href: "/attestions",
    name: "Attestions",
  },
];

export default function App({ children }: { children: any }) {
  return (
    <main>
      <WagmiConfig config={config}>
        <Navbar links={links} />

        <AddressWrapper>
          {children}
          <ToastContainer position="bottom-center" />
        </AddressWrapper>
      </WagmiConfig>
    </main>
  );
}
