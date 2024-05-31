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
  // const resp = client.BalanceService.getErc20TransfersForWalletAddress(
  //   "rsk-testnet",
  //   address.toLowerCase(),
  //   { contractAddress: erc20Address }
  // );
  // console.log(
  //   JSON.stringify(
  //     resp,
  //     (key, value) => (typeof value === "bigint" ? value.toString() : value),
  //     2 // return everything else unchanged
  //   )
  // );

  //   const resp = await client.TransactionService.getTransactionSummary(
  //     chainId,
  //     address
  //   );

  //   const { items } = resp.data;
  //   const {
  //     latest_transaction: { tx_hash },
  //   } = items[0];
  //   console.log(JSON.stringify(resp, null, 2));

  //   const txResp = await client.TransactionService.getTransaction(
  //     chainId as ChainID,
  //     tx_hash
  //   );
  //   console.log(txResp.data);
};
