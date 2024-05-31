import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../database.types";
import {
  IAutomation,
  ICreateAutomationRequest,
} from "../../../../interfaces/automations";
import { fetchLastBalance } from "../../../../lib/covalent";

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

// curl -X POST http://localhost:3000/api/automations/create -H "Content-Type: application/json" -d '{"ownerAddress":"0x123","erc20Address":"0x456","savingPercent":10}'
export async function POST(request: Request) {
  const res = await request.json();
  console.log("api/automations/create", res);
  const {
    ownerAddress: owner_address,
    erc20Address: erc20_address,
    savingPercent: saving_percent,
    chainId: chain_id,
  } = res as ICreateAutomationRequest;

  // TODO get most recent transaction block and set as last_block_checked

  const createAutomation: IAutomation = {
    owner_address,
    erc20_address,
    saving_percent,
    chain_id,
  };

  const balance = await fetchLastBalance(createAutomation);
  createAutomation.last_balance = balance;

  const { data: automation, error } = await supabase
    .from("automations")
    .insert(createAutomation)
    .select();

  return Response.json({ automation, error });
}
