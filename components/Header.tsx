"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

const Header = () => {
	const { isConnected } = useAccount();

	return (
		<header className="items-center py-8 flex justify-between w-full">
			<Link className="flex space-x-2 mr-2 items-center" href="/">
				<Image
					src="/iconRootTuber.svg"
					alt="Root Tuber Logo Icon"
					width={35}
					height={35}
					priority
				/>
				<h1 className="font-bold text-lg">Root Tuber</h1>
			</Link>
			{isConnected && (
				<ConnectButton
					accountStatus={{
						smallScreen: "avatar",
						largeScreen: "full",
					}}
				/>
			)}
		</header>
	);
};

export default Header;
