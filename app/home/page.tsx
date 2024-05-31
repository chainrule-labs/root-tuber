"use client";
import { useAccount } from "wagmi";
import Approval from "../../components/Approval";

const Home = () => {
	const { chainId } = useAccount();

	// const mainnetChainId = 30;
	const rifMainnetAddress = "0x2aCc95758f8b5F583470bA265Eb685a8f45fC9D5";
	const testnetChainId = 31;
	const rifTestnetAddress = "0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE";

	const rifName = chainId === testnetChainId ? "tRIF" : "RIF";
	const rifAddress =
		chainId === testnetChainId ? rifTestnetAddress : rifMainnetAddress;
	const rootTuberAgentAddress = "0xf46A02660F466dA0BfD558A02a53FD891Fb33A44";

	return (
		<div className="flex w-full pt-10 flex-1 flex-col">
			<Approval
				rifName={rifName}
				rifAddress={rifAddress}
				rootTuberAgentAddress={rootTuberAgentAddress}
			/>
		</div>
	);
};

export default Home;
