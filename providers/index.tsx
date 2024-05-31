"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { rootstock, rootstockTestnet } from "wagmi/chains";
import { ReactNode } from "react";
import {
	getDefaultConfig,
	lightTheme,
	RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { http } from "wagmi";

const config = getDefaultConfig({
	appName: "Root Tuber",
	projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
	chains: [rootstock, rootstockTestnet],
	ssr: true,
	transports: {
		[rootstock.id]: http(process.env.NEXT_PUBLIC_ROOTSTOCK_RPC_URL),
		[rootstockTestnet.id]: http(
			process.env.NEXT_PUBLIC_ROOTSTOCK_TESTNET_RPC_URL
		),
	},
});

const client = new QueryClient();

function Providers({ children }: { children: ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={client}>
				<RainbowKitProvider
					theme={lightTheme({
						accentColor: "#F09637",
						accentColorForeground: "black",
						borderRadius: "large",
					})}
				>
					{children}
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

export default Providers;
