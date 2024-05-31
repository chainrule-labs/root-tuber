"use client";
import Image from "next/image";
import { erc20Abi } from "viem";
import { useWriteContract } from "wagmi";
import { maxInt256 } from "viem";

export interface IApproval {
	rifName: string;
	rifAddress: `0x${string}`;
	rootTuberAgentAddress: `0x${string}`;
}

const Approval = ({
	rifName,
	rifAddress,
	rootTuberAgentAddress,
}: IApproval) => {
	const { writeContract } = useWriteContract();

	return (
		<div className="flex w-full flex-col">
			<h1 className="text-lg max-w-sm w-full">
				Approve Root Tuber to save on your behalf every time you spend
				or receive RIF.
			</h1>
			<div className="flex mt-10 items-center">
				<Image
					src="/iconRif.svg"
					alt="RIF Token Icon"
					width={30}
					height={30}
				/>
				<span className="text-lg ml-2 mr-6">{rifName}</span>
				<button
					className="bg-primary-100 hover:bg-primary-200 h-10 w-28 rounded-full text-lg"
					onClick={() =>
						writeContract({
							abi: erc20Abi,
							address: rifAddress,
							functionName: "approve",
							args: [rootTuberAgentAddress, maxInt256],
							gasPrice: BigInt(75800000),
							gas: BigInt(52993),
						})
					}
				>
					Approve
				</button>
			</div>
		</div>
	);
};

export default Approval;
