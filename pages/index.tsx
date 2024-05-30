import { parseEther } from "viem";
import { useWalletClient } from "wagmi";
import { usePermit, signPermit } from "wagmi-permit";

function Home() {
  const { data: walletClient } = useWalletClient();
  /* No need to specify name, nonce and permit version, the hook takes care of all that automatically */
  const { signPermit, signature } = usePermit({
    walletClient,
    ownerAddress: walletClient?.account.address,
    chainId: 111155111,
    spenderAddress: "0xf46A02660F466dA0BfD558A02a53FD891Fb33A44",
    // usdc on sepolia
    contractAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    deadline: BigInt(Math.floor(Date.now() / 1000) + 100_000),
  });

  return (
    <>
      <pre>{JSON.stringify(signature, null, 2)}</pre>
      <button
        onClick={async () => {
          /* Permit signature is returned both from the action and from the hook */
          const permitSignature = await signPermit?.({
            value: parseEther("10"),
            deadline: BigInt(Math.floor(Date.now() / 1000) + 100_000),
        });
          console.log(permitSignature);
        }}
      >
        Sign Permit
      </button>
    </>
  );
}

export default Home