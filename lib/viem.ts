import {
  createPublicClient,
  http,
  createWalletClient,
  encodeFunctionData,
  parseUnits,
} from "viem";
import { rootstockTestnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
// import { erc20Abi } from "./abis";
import { sendTransaction } from "viem/actions";
import { IAutomation } from "../interfaces/automations";
import { erc20Abi } from "./abis";

export type ISendTransferArgs = {
  automation: IAutomation;
  amount: string;
};

export async function sendErc20Transfer({
  automation,
  amount,
}: ISendTransferArgs) {
  console.log("sendErc20Transfer", automation, amount);
  const { erc20_address: tokenAddress, owner_address: recipientAddress } =
    automation;

  const walletClient = createWalletClient({
    account: privateKeyToAccount(
      process.env.AGENT_PRIVATE_KEY! as `0x${string}`
    ),
    chain: rootstockTestnet,
    transport: http(process.env.NEXT_PUBLIC_RSK_TESTNET_RPC_URL!, {
      timeout: 120_000,
    }),
  });

  const data = encodeFunctionData({
    abi: erc20Abi,
    functionName: "transfer",
    args: [
      process.env
        .SAVINGS_ADDRESS!.replace(/(\r\n|\n|\r)/gm, "")
        .toLowerCase() as `0x${string}`,
      BigInt(amount),
    ],
  });

  try {
    const transaction = await sendTransaction(walletClient, {
      to: tokenAddress
        .replace(/(\r\n|\n|\r)/gm, "")
        .toLowerCase() as `0x${string}`,
      data,
      gasPrice: BigInt(75800000),
      gas: BigInt(52993),
    });

    console.log("Transaction sent:", transaction);
    return true;
  } catch (error) {
    console.error("Error sending transaction:", error);
  }

  return false;
}
