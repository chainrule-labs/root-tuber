"use client";

import { useRouter } from "next/navigation";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Landing() {
	const router = useRouter();
	const { isConnected } = useAccount();
	const { openConnectModal } = useConnectModal();

	const handleGetStarted = () => {
		if (isConnected) {
			router.push("/home");
		} else {
			openConnectModal && openConnectModal();
		}
	};

	return (
		<div className="flex w-full pt-10 flex-1 max-w-sm flex-col">
			<h1 className="text-2xl w-full">
				Automatically save every time you transact on Rootstock.
			</h1>
			<button
				className="bg-primary-100 mt-10 hover:bg-primary-200 h-14 w-40 rounded-full text-lg"
				onClick={() => handleGetStarted()}
			>
				{isConnected ? "Get Started" : "Connect Wallet"}
			</button>
		</div>
	);
}
