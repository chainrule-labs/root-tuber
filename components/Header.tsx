import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const Header = () => {
	return (
		<header className="items-center py-8 flex justify-between w-full">
			<div className="flex space-x-2 mr-2 items-center">
				<Image
					src="/iconRootTuber.svg"
					alt="Root Tuber Logo Icon"
					width={35}
					height={35}
					priority
				/>
				<h1 className="font-bold text-lg">Root Tuber</h1>
			</div>
			<ConnectButton />
		</header>
	);
};

export default Header;
