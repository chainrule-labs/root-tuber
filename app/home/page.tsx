"use client";
import { useAccount } from "wagmi";
import Approval from "../../components/Approval";
import { isTestnet } from "../../utils/isTestnet";
import { getBlockExplorerUrl } from "../../utils/getBlockExplorerUrl";
import Portfolio from "../../components/Portfolio";
import { useState } from "react";
import { useEffect } from "react";
import { useReadContract } from "wagmi";
import { erc20Abi, zeroAddress } from "viem";

const Home = () => {
	const [isApproved, setIsApproved] = useState(false);
	const [allowance, setAllowance] = useState(BigInt(0));
	const { chainId, address } = useAccount();

	const rifName = isTestnet(chainId as number) ? "tRIF" : "RIF";
	const rifAddress = isTestnet(chainId as number)
		? "0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE" // tRIF
		: "0x2aCc95758f8b5F583470bA265Eb685a8f45fC9D5"; // RIF
	const rootTuberAgentAddress = "0xf46A02660F466dA0BfD558A02a53FD891Fb33A44";
	const blockExplorerUrl = getBlockExplorerUrl(chainId as number);

	// Dummy locker address
	const lockerAddress = "0xDe076D651613C7bde3260B8B69C860D67Bc16f49";

	const { data: allowanceResult } = useReadContract({
		abi: erc20Abi,
		address: rifAddress,
		functionName: "allowance",
		args: [address || zeroAddress, rootTuberAgentAddress],
	});

	useEffect(() => {
		if (address && allowanceResult) {
			const result = allowanceResult;
			console.log("allowance", result);
			setAllowance(result);

			if (result > BigInt(0)) {
				setIsApproved(true);
			}
		}
	}, [address, isApproved, rifAddress, allowanceResult]);

	return (
		<div className="flex w-full pt-10 flex-1 flex-col">
			{isApproved && allowance > BigInt(0) ? (
				<Portfolio
					lockerAddress={lockerAddress}
					blockExplorerUrl={blockExplorerUrl}
					rifName={rifName}
					rifAddress={rifAddress}
				/>
			) : (
				<Approval
					rifName={rifName}
					rifAddress={rifAddress}
					rootTuberAgentAddress={rootTuberAgentAddress}
					setIsApproved={setIsApproved}
				/>
			)}
		</div>
	);
};

export default Home;
