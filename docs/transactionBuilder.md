# TransactionBuilder

### `constructor`

Create new Transaction Builder.
The Transaction Builder object represents a transaction internally and is used to build a transaction step-by-step. It can then be expressed as a hexadecimal `string` ready to be sent to the \$BCH network. The necessary steps to create a transaction are: [`addInput`](#addinput), [`addOutput`](#addoutput), [`setLockTime`](#setlocktime), [`sign`](#sign) and [`build`](#build).

#### Arguments

1.  network `string`: Defaults to "mainnet"

#### Result

TransactionBuilder `TransactionBuilder`

#### Examples

      // instance of transaction builder
      let transactionBuilder = new bitbox.TransactionBuilder('mainnet');

### `hashTypes`

BITBOX supports the `SIGHASH_ALL`, `SIGHASH_NONE` and `SIGHASH_SINGLE` hash types w/ the `SIGHASH_ANYONECANPAY` modifier.

#### Examples

      transactionBuilder.hashTypes
      // { SIGHASH_ALL: 1,
      //   SIGHASH_NONE: 2,
      //   SIGHASH_SINGLE: 3,
      //   SIGHASH_ANYONECANPAY: 128,
      //   SIGHASH_BITCOINCASH_BIP143: 64 }

      transactionBuilder.hashTypes.SIGHASH_ALL
      // 1

      // also has a DEFAULT_SEQUENCE of 0xffffffff
      transactionBuilder.DEFAULT_SEQUENCE
      // 4294967295

### `signatureAlgorithms`

BITBOX supports the `ECDSA` and `SCHNORR` signature algorithms.

#### Examples

      transactionBuilder.signatureAlgorithms
      // { ECDSA: 0,
      //   SCHNORR: 1 }

### `addInput`

Add input to transaction

#### Arguments

1.  txid `string`: txid of vout
2.  index `number`: index of vout
3.  sequence `number` **optional**: relative lock time. Default `0xffffffff`
4.  prevOutScript `string` **optional**: previous output script

#### Examples

      // txid of vout
      let txid = 'f7890915febe580920df2681d2bac0909ae89bd0cc1d3ed763e5eeba7f337f0e';
      // add input with txid and index of vout
      transactionBuilder.addInput(txid, 0);

### `addOutput`

Add output to transaction

#### Arguments

1.  scriptPubKey `string`: legacy/cashaddr address or script
2.  sendAmount `number`: amount to send in satoshis

#### Examples

      let originalAmount = 100000;
      let byteCount = bitbox.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
      // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
      let sendAmount = originalAmount - byteCount;
      // add output w/ address and amount to send
      transactionBuilder.addOutput('bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw', sendAmount);

### `setLockTime`

Set [locktime](https://developer.bitcoin.com/mastering-bitcoin-cash/4-transactions/#transaction-locktime)

#### Arguments

1.  locktime `number`

#### Examples

      let originalAmount = 100000;
      let byteCount = bitbox.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
      // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
      let sendAmount = originalAmount - byteCount;
      // add output w/ address and amount to send
      transactionBuilder.addOutput('bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw', sendAmount);
      transactionBuilder.setLockTime(50000)

### `sign`

Sign transaction. It creates the unlocking script needed to spend an input. Each input has its own script and thus 'sign' must be called for each input even if the keyPair is the same.

#### Arguments

1.  vin `number`: vin to sign
2.  keyPair `ECPair`: ECPair of HDNode
3.  redeemScript `Buffer`
4.  hashType `number`
5.  originalAmount `number`: satoshis in vin
6.  signatureAlgorithm **optional** `number`: Signature Algorithm (ECDSA/Schnorr)

#### Examples

      let originalAmount = 100000;
      // node of address which is going to spend utxo
      let hdnode = bitbox.HDNode.fromXPriv("xprvA3eaDg64MwDr72PVGJ7CkvshNAzCDRz7rn98sYrZVAtDSWCAmNGQhEQeCLDcnmcpSkfjhHevXmu4ZL8ZcT9D4vEbG8LpiToZETrHZttw9Yw");
      // keypair
      let keyPair = bitbox.HDNode.toKeyPair(hdnode);
      // empty redeemScript variable
      let redeemScript;
      // sign w/ keyPair
      transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount, transactionBuilder.signatureAlgorithms.SCHNORR);

### `build`

Build transaction

#### Result

Transaction `Object`: Transaction

#### Examples

      // build tx
      let tx = transactionBuilder.build();

### `toHex`

Return raw hex of transaction ready to be sent to the \$BCH network

#### Result

rawHex `string`: hex encoded raw transaction ready to be sent to the \$BCH network

#### Examples

      // output rawhex
      let hex = tx.toHex();
      // 02000000010e7f337fbaeee563d73e1dccd09be89a90c0bad28126df200958befe150989f7000000006b48304502210085b8eb33f3981315bbe39c6810d0311c6cb39504914300ecd952cab8353222e202200ec95797c06ba8c9b15d59ab80e63300cb2371f67b3969d0b502d0fed733fbed4121025c85a571619e60fed412de0356b4e28f4f3670ab0c2b899dfe60e69aaa6cd4c0ffffffff01a6370000000000001976a91479d3297d1823149f4ec61df31d19f2fad5390c0288ac00000000
      // sendRawTransaction to running BCH node
      bitbox.RawTransactions.sendRawTransaction(hex).then((result) => { console.log(result); }, (err) => { console.log(err); });
      // dfe54ec45c6fa2fa85b76d113de85b169d36902eaf6700f1cca21eed1392814b

### `OP_RETURN`

Write data to the blockchain w/ `OP_RETURN`

#### Result

rawHex `string`: hex encoded raw transaction ready to be sent to the \$BCH network

#### Examples

      // encode some text as a buffer
      let buf = new Buffer('#BCHForEveryone');
      // create array w/ OP_RETURN code and text buffer and encode
      let data = bitbox.Script.encode([
      bitbox.Script.opcodes.OP_RETURN,
      buf
      ])
      // add encoded data as output and send 0 satoshis
      transactionBuilder.addOutput(data, 0)

      // later when you decode the raw hex of the tx you'll see this scriptPubKey
      "OP_RETURN 23424348466f7245766572796f6e65"

      // you can use BITBOX to decode it to the original text
      let fromAsm = bitbox.Script.fromASM("OP_RETURN 23424348466f7245766572796f6e65")
      let decoded = bitbox.Script.decode(fromAsm)
      decoded[1].toString('ascii')
      // #BCHForEveryone

### `bip66.encode`

Strict DER signature encoding per [bip66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki)

#### Arguments

1.  r `Buffer`
2.  s `Buffer`

#### Result

encoded `Buffer`

#### Examples

      let transactionBuilder = new bitbox.TransactionBuilder();
      let r = Buffer.from('1ea1fdff81b3a271659df4aad19bc4ef83def389131a36358fe64b245632e777', 'hex');
      let s = Buffer.from('29e164658be9ce810921bf81d6b86694785a79ea1e52dbfa5105148d1f0bc1', 'hex');
      transactionBuilder.bip66.encode(r, s);
      //

### `bip66.decode`

Strict DER signature decoding per [bip66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki)

#### Arguments

1.  signature `Buffer`

#### Result

decoded `Object`

#### Examples

      let transactionBuilder = new bitbox.TransactionBuilder();
      let signature = new Buffer.from('304302201ea1fdff81b3a271659df4aad19bc4ef83def389131a36358fe64b245632e777021f29e164658be9ce810921bf81d6b86694785a79ea1e52dbfa5105148d1f0bc1', 'hex');
      transactionBuilder.bip66.decode(signature);
      // { r:
      //  ,
      // s:
      //   }

### `bip66.check`

Check format of [bip66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki) Strict DER Signature

#### Arguments

1.  DER `Buffer`

#### Result

value `boolean`

#### Examples

      let transactionBuilder = new bitbox.TransactionBuilder();
      let DER = '3044022029db2d5f4e1dcc04e19266cce3cb135865784c62ab653b307f0e0bb744f5c2aa022000a97f5826912cac8b44d9f577a26f169a2f8db781f2ddb7de2bc886e93b6844';
      let buffer = Buffer.from(DER, 'hex')
      transactionBuilder.bip66.check(buffer);
      // true

### `bip68.encode`

Encoded [bip68](https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki) relative time lock

#### Arguments

1.  config `Object`: Valid keys: `seconds` and `block`. `seconds` must be in multiples of 512.

#### Result

hex `string`: hex encoded relative timelock

#### Examples

      let transactionBuilder = new bitbox.TransactionBuilder();
      transactionBuilder.bip68.encode({ seconds: 2048 })
      // 4194308
      transactionBuilder.bip68.encode({ blocks: 52 })
      // 52

### `bip68.decode`

Decoded [bip68](https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki) relative time lock

#### Arguments

1.  hex `string`: hex encoded relative lock time

#### Result

details `Object`: details about the relative lock time

#### Examples

      let transactionBuilder = new bitbox.TransactionBuilder();
      transactionBuilder.bip68.decode(0x03ffffff)
      // { seconds: 33553920 }
      transactionBuilder.bip68.decode(0x0100fffe)
      // { blocks: 65534 }
