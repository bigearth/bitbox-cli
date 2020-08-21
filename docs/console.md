# Console

Launch a console w/ the entire Bitcoin Cash RPC available as well as dozens of helper methods via a built in `BITBOX` object. Pass in an `--environment` flag to connect to environments defined in a local `bitbox.js`. By default console will connect to your development environment.

```bash
$ bitbox console --environment production
> bitbox.
bitbox.Address               bitbox.BitcoinCash           bitbox.Block                 bitbox.Blockchain            bitbox.Control               bitbox.Crypto                bitbox.ECPair                bitbox.Generating            bitbox.restURL
bitbox.HDNode                bitbox.Mining                bitbox.Mnemonic              bitbox.Network               bitbox.Price                 bitbox.RawTransactions       bitbox.Script                bitbox.Socket
bitbox.Transaction           bitbox.TransactionBuilder    bitbox.Util
```

### <a name="test-ideas"></a> Quickly test your ideas

```javascript
bitbox console

> bitbox.BitcoinCash.toSatoshi(9)
// 900000000

> bitbox.Address.toLegacyAddress('bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
// 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN

// create mnemonic
> let mnemonic = bitbox.Mnemonic.generate(128);
// ancient slide suggest chaos vivid property trophy faith bamboo lunch save hint

// create seed buffer from mnemonic
> let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);

// create HDNode from seed buffer
> let hdNode = bitbox.HDNode.fromSeed(seedBuffer);

// derive hardened child HDNode
> let childNode = bitbox.HDNode.derivePath(hdNode, "m/44'/145'/0'");
> bitbox.HDNode.toXPriv(childNode)
// xprv9yHczLBaxwHo85o8mJVHSu1ghxEWM2QZcrvWFvHWXgkqfuqNz6EDNxv4wAPTBwX7nkrnBTPgdCZi7qyQAF72MF4KTq9UzzygDhvBajpwScs
```
