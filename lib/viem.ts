import { ChainID } from "@covalenthq/client-sdk";
import {
  createPublicClient,
  decodeEventLog,
  erc20Abi,
  http,
  stringify,
} from "viem";
import { rootstockTestnet } from "viem/chains";
import { IAutomation } from "../interfaces/automations";

export const fetchLastTx = async (automation: IAutomation) => {
  const { chain_id, owner_address, erc20_address } = automation;
  const chainId = chain_id as ChainID;
  const erc20Address = erc20_address as `0x${string}`;
  const address = owner_address as `0x${string}`;
  console.log("getting recent txs for", address, chainId, erc20Address);

  const client = createPublicClient({
    chain: rootstockTestnet,
    transport: http(
      "https://rpc.testnet.rootstock.io/ARoMCQKvc7JeEuDVWuqaB9qCxPT9AD-T"
    ),
  });

  const logs = await client.getContractEvents({
    address: erc20Address,
    abi: erc20Abi,
    eventName: "Transfer",
    // args: {
    //   from: address,
    // },
    // fromBlock: 16330000n,
    // toBlock: 16330050n
  });

  console.log(JSON.stringify(logs, null, 2));
};
