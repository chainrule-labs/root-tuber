// src/App.js
import React, { useState } from 'react';
import { useAccount, useSignTypedData } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { mainnet } from 'viem/chains';
import { createPublicClient, http } from 'viem';

const domain = {
  name: 'YourToken',
  version: '1',
  chainId: 1, // Replace with your chain ID
  verifyingContract: '0xYourTokenAddress' // Replace with your token contract address
};

const types = {
  Permit: [
    { name: 'owner', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' }
  ]
};

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

function App() {
  const { address } = useAccount();
  const { data: signTypedData } = useSignTypedData();
  const [permit, setPermit] = useState(null);

  const createPermit = async () => {
    if (!address) return;

    const nonce = await client.readContract({
      address: domain.verifyingContract as `0x${string}`,
      abi: [
        {
          name: 'nonces',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ name: 'owner', type: 'address' }],
          outputs: [{ name: '', type: 'uint256' }]
        }
      ],
      functionName: 'nonces',
      args: [address]
    });

    const deadline = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'; // Maximum uint256 value

    const message = {
      owner: address,
      spender: '0xSpenderAddress', // Replace with the spender's address
      value: BigInt('1000000000000000000'), // Replace with the value to permit (1.0 token with 18 decimals)
      nonce: nonce.toString(),
      deadline: deadline
    };

    if (!signTypedData) return <p>Loading...</p>
    const signature = await signTypedData({
      domain,
      types,
      value: message
    });

    const { v, r, s } = client.splitSignature(signature);

    setPermit({
      owner: message.owner,
      spender: message.spender,
      value: message.value.toString(),
      nonce: message.nonce,
      deadline: message.deadline,
      v,
      r,
      s
    });
  };

  return (
    <div>
      <ConnectButton />
      {address && <button onClick={createPermit}>Create Permit</button>}
      {permit && (
        <div>
          <p>Owner: {permit.owner}</p>
          <p>Spender: {permit.spender}</p>
          <p>Value: {permit.value}</p>
          <p>Nonce: {permit.nonce}</p>
          <p>Deadline: {permit.deadline}</p>
          <p>v: {permit.v}</p>
          <p>r: {permit.r}</p>
          <p>s: {permit.s}</p>
        </div>
      )}
    </div>
  );
}

export default App;
