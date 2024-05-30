export type ICreateAutomationRequest = {
  ownerAddress: string;
  erc20Address: string;
  savingPercent: number;
};

export type IAutomation = {
  id?: string;
  owner_address: string;
  erc20_address: string;
  saving_percent: number;
  last_block_checked?: number;
};
