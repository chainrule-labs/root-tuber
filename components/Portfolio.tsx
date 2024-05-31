import { IoOpenOutline } from "react-icons/io5";
import { truncateAddress } from "../utils/truncateAddress";
import Image from "next/image";

export interface IPortfolio {
	lockerAddress: `0x${string}`;
	blockExplorerUrl: string;
	rifName: string;
	rifAddress: `0x${string}`;
}

const Portfolio = ({
	lockerAddress,
	blockExplorerUrl,
	rifName,
	rifAddress,
}: IPortfolio) => {
	return (
		<div className="flex w-full flex-col items-center">
			<span className="text-gray-600">Total savings value</span>
			<span className="text-4xl mt-2">$15.03</span>
			<div className="flex mt-10 items-center flex-col w-full">
				<span className="text-gray-600">Savings account contract</span>
				<a
					className="flex items-center space-x-2 hover:text-primary-100 hover:underline mt-2"
					href={`${blockExplorerUrl}/address/${lockerAddress}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<code>{truncateAddress(lockerAddress)}</code>
					<IoOpenOutline className="ml-3 shrink-0" size={14} />
				</a>
			</div>
			<div className="mt-10 flex w-full max-w-md flex-col overflow-x-auto rounded-md border border-gray-200 shadow-sm shadow-gray-600">
				<table className="min-w-full divide-y divide-gray-200 text-left text-sm">
					<thead>
						<tr className="text-gray-600">
							<th className="px-4 py-3">Token</th>
							<th className="px-4 py-3">Address</th>
							<th className="px-4 py-3">Balance</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="px-4 py-3 flex">
								<Image
									src="/iconRif.svg"
									alt="RIF Token Icon"
									width={20}
									height={20}
								/>
								<span className="text-lg ml-2 mr-6">
									{rifName}
								</span>
							</td>
							<td className="px-4 py-3">
								<a
									className="flex items-center space-x-2 hover:text-primary-100 hover:underline mt-2"
									href={`${blockExplorerUrl}/token/${rifAddress}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<code>{truncateAddress(rifAddress)}</code>
									<IoOpenOutline
										className="ml-3 shrink-0"
										size={14}
									/>
								</a>
							</td>
							<td className="px-4 py-3">6.7 {rifName}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Portfolio;
