export const isTestnet = (chainId: number) => {
	if (chainId === 31) {
		return true;
	}
	return false;
};
