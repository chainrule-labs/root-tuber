# Root Tuber

Root Tubers are how plants save energy. On Rootstock, Root Tuber is a dApp that works like acorns.com (but for crypto)
that moves a little bit into savings ever time a user

1. Be built using one of the sponsor’s technologies above
2. Be open source (and remain available as open source)
3. Include a short summary (<150 chars)
4. Include a full description (the problems it solves, how the technology was used to achieve it)
5. Include a technical description (what SDKs were used, and what features of the sponsor’s tech made this uniquely possible)
6. Include a link to the Canva slides used in the presentation (make sure you include a slide on your team, problem, solution etc). You must use Canva for your presentation.

## API

### /api/automations/create

```
curl -X POST http://localhost:3000/api/automations/create -H "Content-Type: application/json" -d '{"ownerAddress":"0xAF115955b028c145cE3A7367B25A274723C5104B","erc20Address":"0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE","savingPercent":10,"chainId":31}'
```

## Deployment details

Deployer: 0xAF115955b028c145cE3A7367B25A274723C5104B
Deployed to: 0x2EE730a66ff7143794be6c23f44eD4c03F5296c3
Transaction hash: 0xc15451fdc24a375f43834efe06173bf5746d60bdc7f898f74ffb15b17d577626

### How to Deployed

forge create --rpc-url https://31.rpc.thirdweb.com --private-key 0x src/Savings.sol:Savings --constructor-args OWNER_ADDRESS 100 --legacy --gas-price 75800000 --gas-limit 500000
