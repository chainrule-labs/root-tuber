import { CovalentClient } from "@covalenthq/client-sdk";
import { IAutomation } from "../interfaces/automations";
import { type ChainID } from "@covalenthq/client-sdk";

export const fetchLastBalance = async (
  automation: IAutomation
): Promise<string> => {
  const {
    chain_id,
    owner_address: address,
    erc20_address: erc20Address,
  } = automation;
  const chainId = chain_id as ChainID;
  console.log("getting recent txs for", address, chainId, erc20Address);
  const client = new CovalentClient(process.env.COVALENT_API_KEY!);
  const resp = await client.BalanceService.getTokenBalancesForWalletAddress(
    chainId,
    address
  );

  const { items: balances } = resp.data;
  const balance = balances.find(
    (b) => b.contract_address === erc20Address.toLowerCase()
  );

  if (!balance) return "0";
  return balance.balance!.toString();
};
