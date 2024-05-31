export const getBlockExplorerUrl = (chainId: number) => {
	const explorer =
		chainId === 31
			? "https://rootstock-testnet.blockscout.com"
			: "https://rootstock.blockscout.com";
	return explorer;
};
