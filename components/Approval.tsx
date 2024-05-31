"use client";
import Image from "next/image";
import { useWriteContract } from "wagmi";
import { erc20Abi, maxInt256, checksumAddress } from "viem";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export interface IApproval {
	rifName: string;
	rifAddress: `0x${string}`;
	rootTuberAgentAddress: `0x${string}`;
	setIsApproved: (isApproved: boolean) => void;
}

const Approval = ({
	rifName,
	rifAddress,
	rootTuberAgentAddress,
	setIsApproved,
}: IApproval) => {
	const [isLoading, setIsLoading] = useState(false);
	const { writeContractAsync } = useWriteContract();

	const approve = async () => {
		setIsLoading(true);

		try {
			await writeContractAsync({
				abi: erc20Abi,
				address: checksumAddress(rifAddress),
				functionName: "approve",
				args: [rootTuberAgentAddress, maxInt256],
				// gasPrice: BigInt(75800000),
				// gas: BigInt(52993),
				// type: "legacy",
			});

			setIsApproved(true);
		} catch (error) {
			const acceptableErrorMessages = [
				"rejected",
				"request reset",
				"denied",
			];
			if (
				!acceptableErrorMessages.some((msg) =>
					(error as Error).message.includes(msg)
				)
			) {
				console.error(error);
			}
		}

		setIsLoading(false);
	};

	return (
		<div className="flex w-full flex-col items-center">
			<h1 className="text-lg max-w-sm w-full">
				Approve Root Tuber to save on your behalf every time you spend
				or receive RIF.
			</h1>
			<div className="flex mt-10 max-w-sm w-full items-center">
				<Image
					src="/iconRif.svg"
					alt="RIF Token Icon"
					width={30}
					height={30}
				/>
				<span className="text-lg ml-2 mr-6">{rifName}</span>
				<button
					className="bg-primary-100 hover:bg-primary-200 h-10 w-28 rounded-full flex items-center justify-center text-lg"
					onClick={() => approve()}
					disabled={isLoading}
				>
					{isLoading ? (
						<AiOutlineLoading3Quarters
							className="animate-spin"
							size={20}
						/>
					) : (
						"Approve"
					)}
				</button>
			</div>
		</div>
	);
};

export default Approval;
