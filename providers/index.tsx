"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { rootstock, rootstockTestnet } from "wagmi/chains";
import { ReactNode } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const config = getDefaultConfig({
	appName: "Root Tuber",
	projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
	chains: [
		rootstock,
		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
			? [rootstockTestnet]
			: []),
	],
	ssr: true,
});

const client = new QueryClient();

function Providers({ children }: { children: ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={client}>
				<RainbowKitProvider>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

export default Providers;
