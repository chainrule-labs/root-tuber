export type ICreateAutomationRequest = {
  ownerAddress: string;
  erc20Address: string;
  savingPercent: number;
  chainId: number;
};

export type IAutomation = {
  id?: string;
  owner_address: string;
  erc20_address: string;
  // 5 = 5%
  saving_percent: number;
  last_balance?: string;
  chain_id: number;
};
