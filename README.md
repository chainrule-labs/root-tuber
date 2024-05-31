# Root Tuber

## API

### /api/automations/create

```
curl -X POST http://localhost:3000/api/automations/create -H "Content-Type: application/json" -d '{"ownerAddress":"0xAF115955b028c145cE3A7367B25A274723C5104B","erc20Address":"0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE","savingPercent":10,"chainId":31}'
{"automation":[{"id":"c40202e5-5aa4-43c5-a1f5-b83dc0454388","created_at":"2024-05-31T04:29:46.401413+00:00","owner_address":"0xAF115955b028c145cE3A7367B25A274723C5104B","erc20_address":"0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE","saving_percent":10,"last_balance":"99989880000000000000","chain_id":31}],"error":null}
```
