import { IAutomation } from "../../../../interfaces/automations";
import { fetchLastBalance } from "../../../../lib/covalent";
import { supabase } from "../../../../lib/supabase";
import Big from "big.js";
import { sendErc20Transfer } from "../../../../lib/viem";

const executeAutomation = async (automation: IAutomation): Promise<boolean> => {
  // fetch balance
  const newBalance = await fetchLastBalance(automation);
  console.log("Current balance", newBalance);
  console.log("Last balance", automation.last_balance);

  // calculate difference between balance
  const rawDiff = Big(newBalance).minus(automation.last_balance!).round(0);

  if (rawDiff.lt(0)) {
    console.log("Balance decreased", automation.owner_address, automation.id);
  } else {
    console.log("Balance increased", automation.owner_address, automation.id);
  }
  const diff = rawDiff.abs();

  // if difference is 0, return false
  if (diff.eq(0)) {
    console.log(
      "No difference in balance",
      automation.owner_address,
      automation.id
    );
    return false;
  }

  // multiply by percent savings
  const amountToSave = diff.times(automation.saving_percent).div(100);

  // create erc20 transfer with that amount
  await sendErc20Transfer({
    automation,
    amount: amountToSave.toString(),
  });

  // update last balance
  const balanceAfterTransfer = Big(newBalance).minus(amountToSave).toFixed(0);
  console.log("balanceAfterAUtomation", balanceAfterTransfer);
  await supabase
    .from("automations")
    .update({ last_balance: balanceAfterTransfer })
    .eq("id", automation.id!);

  return true;
};

// curl -X POST http://localhost:3000/api/automations/execute
export async function POST() {
  // fetch all automations
  // send percentage to savings
  const automations = await supabase.from("automations").select("*");
  const executions = automations.data?.map(executeAutomation) || [];
  await Promise.all(executions);

  const numAutomations = executions?.filter(Boolean).length;
  return Response.json({ numAutomations });
}
