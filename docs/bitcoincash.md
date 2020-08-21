# BitcoinCash

### `toSatoshi`

Converting Bitcoin Cash units to satoshi units

#### Arguments

1.  bitcoinCash `number`: unit to be converted

#### Result

satoshi `number`: bitcoinCash unit converted to satoshis

#### Examples

```javascript
// convert 9 $BCH to satoshis
bitbox.BitcoinCash.toSatoshi(9)
// 900000000

// convert 1 $BCH to satoshis
bitbox.BitcoinCash.toSatoshi(1)
// 100000000

// convert 100 $BCH to satoshis
bitbox.BitcoinCash.toSatoshi(100)
// 10000000000

// convert 42 $BCH to satoshis
bitbox.BitcoinCash.toSatoshi(42)
// 4200000000

// convert 507 $BCH to satoshis
bitbox.BitcoinCash.toSatoshi(507)
// 50700000000
```

### `toBitcoinCash`

Converting satoshi units to Bitcoin Cash units

#### Arguments

1.  satoshi `number`: unit to be converted

#### Result

bitcoinCash `number`: satoshi unit converted to Bitcoin Cash

#### Examples

```javascript
// convert 900000000 satoshis to $BCH
bitbox.BitcoinCash.toBitcoinCash(900000000)
// 9

// convert 100000000 satoshis to $BCH
bitbox.BitcoinCash.toBitcoinCash(100000000)
// 1

// convert 10000000000 satoshis to $BCH
bitbox.BitcoinCash.toBitcoinCash(10000000000)
// 100

// convert 4200000000 satoshis to $BCH
bitbox.BitcoinCash.toBitcoinCash(4200000000)
// 42

// convert 50700000000 satoshis to $BCH
bitbox.BitcoinCash.toBitcoinCash(50700000000)
// 507
```

### `toBits`

Converting satoshi units to Bits denomination

#### Arguments

1.  satoshi `Number`: unit to be converted

#### Result

bits `Number`: satoshi unit converted to Bits

#### Examples

```javascript
// convert 4242323400 satoshis to 42423.234 bits
BITBOX.BitcoinCash.toBits(4242323400)
// 42423.234
// convert 100000000 satoshis to 1000 bits
BITBOX.BitcoinCash.toBits(100000000)
// 1000
// convert 314000000 satoshis to 3140 bits
BITBOX.BitcoinCash.toBits(314000000)
// 3140
// convert 987600000000 satoshis to 9876000 bits
BITBOX.BitcoinCash.toBits(987600000000)
// 9876000
// convert 12300 satoshis to 0.123 bits
BITBOX.BitcoinCash.toBits(12300)
// 0.123
```

### `fromBits`

Converting bits units to satoshi denomination

#### Arguments

1.  bits `Number`: unit to be converted

#### Result

satoshi `Number`: bits unit converted to satoshi

#### Examples

```javascript
// convert 42423.234 bits to 4242323400 satoshis
BITBOX.BitcoinCash.fromBits(42423.234)
// 4242323400
// convert 1000 bits to 100000000 satoshis
BITBOX.BitcoinCash.fromBits(1000)
// 100000000
// convert 3140 bits to 314000000 satoshis
BITBOX.BitcoinCash.fromBits(3140)
// 314000000
// convert 9876000 bits to 987600000000 satoshis
BITBOX.BitcoinCash.fromBits(9876000)
// 987600000000
// convert 0.123 bits to 12300 satoshis
BITBOX.BitcoinCash.fromBits(0.123)
// 12300
```

### `signMessageWithPrivKey`

Sign message with private key

#### Arguments

1.  privateKeyWIF `string`: private key in wallet import format
2.  message `string`: message to sign

#### Result

signature `string`: cryptographic signature

#### Examples

```javascript
bitbox.BitcoinCash.signMessageWithPrivKey(
  "KxtpRDUJDiutLaTV8Vuavhb6h7zq9YV9ZKA3dU79PCgYmNVmkkvS",
  "EARTH"
)
// IIYVhlo2Z6TWFjYX1+YM+7vQKz0m+zYdSe4eYpFLuAQDEZXqll7lZC8Au22VI2LLP5x+IerZckVk3QQPsA3e8/8=
```

### `verifyMessage`

Verify message

#### Arguments

1. address `string`: public cashaddr or legacy address which signed the message
2. signature `string`: cryptographic signature
3. message `string`: to verify

#### Result

isVerified `boolean`: if message is verified or not

#### Examples

```javascript
bitbox.BitcoinCash.verifyMessage(
  "bitcoincash:qp2zvw3zpk5xx43w4tve7mtekd9kaxwj4uenq9eupv",
  "IIYVhlo2Z6TWFjYX1+YM+7vQKz0m+zYdSe4eYpFLuAQDEZXqll7lZC8Au22VI2LLP5x+IerZckVk3QQPsA3e8/8=",
  "EARTH"
)
// true
```

### `encodeBase58Check`

Encodes hex string as base58Check

#### Arguments

1.  hex `string`: hex encoded bytes to encode as base58check

#### Result

base58check `string`: base58check encoded string

#### Examples

```javascript
// encode 0079bd35d306f648350818470c9f18903df6e06902a026f2a7 as base58check
let hex = "0079bd35d306f648350818470c9f18903df6e06902a026f2a7"
bitbox.BitcoinCash.encodeBase58Check(hex)
// 1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar

// encode 006da742680accf2282df5fade8e9b7a01a517e779289b52cc as base58check
let hex = "006da742680accf2282df5fade8e9b7a01a517e779289b52cc"
bitbox.BitcoinCash.encodeBase58Check(hex)
// 1Azo2JBz2JswboeY9xSMcp14BAfhjnD9SK

// encode 00c68a6a07ccdaf1669cfd8d244d80ff36b713551c6208f672 as base58check
let hex = "00c68a6a07ccdaf1669cfd8d244d80ff36b713551c6208f672"
bitbox.BitcoinCash.encodeBase58Check(hex)
// 1K6ncAmMEyQrKUYosZRD9swyZNXECu2aKs

// encode 00d0a6b5e3dd43d0fb895b3b3df565bb8266c5ab00a25dbeb5 as base58check
let hex = "00d0a6b5e3dd43d0fb895b3b3df565bb8266c5ab00a25dbeb5"
bitbox.BitcoinCash.encodeBase58Check(hex)
// 1L2FG9hH3bwchhxHaCs5cg1QNbhmbaeAs6

// encode 00db04c2e6f104997cb04c956bf25da6078e559d303127f08b as base58check
let hex = "00db04c2e6f104997cb04c956bf25da6078e559d303127f08b"
bitbox.BitcoinCash.encodeBase58Check(hex)
// 1Ly4gqPddveYHMNkfjoXHanVszXpD3duKg
```

### `decodeBase58Check`

Decodes base58Check encoded string to hex

#### Arguments

1.  base58check `string`: base58check encoded string to decode to hex

#### Result

hex `string`: hex encoded string

#### Examples

```javascript
// decode 1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar to hex
let base58check = "1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar"
bitbox.BitcoinCash.decodeBase58Check(base58check)
// 0079bd35d306f648350818470c9f18903df6e06902a026f2a7

// decode 1Azo2JBz2JswboeY9xSMcp14BAfhjnD9SK to hex
let base58check = "1Azo2JBz2JswboeY9xSMcp14BAfhjnD9SK"
bitbox.BitcoinCash.decodeBase58Check(base58check)
// 006da742680accf2282df5fade8e9b7a01a517e779289b52cc

// decode 1K6ncAmMEyQrKUYosZRD9swyZNXECu2aKs to hex
let base58check = "1K6ncAmMEyQrKUYosZRD9swyZNXECu2aKs"
bitbox.BitcoinCash.decodeBase58Check(base58check)
// 00c68a6a07ccdaf1669cfd8d244d80ff36b713551c6208f672

// decode 1L2FG9hH3bwchhxHaCs5cg1QNbhmbaeAs6 to hex
let base58check = "1L2FG9hH3bwchhxHaCs5cg1QNbhmbaeAs6"
bitbox.BitcoinCash.decodeBase58Check(base58check)
// 00d0a6b5e3dd43d0fb895b3b3df565bb8266c5ab00a25dbeb5

// decode 1Ly4gqPddveYHMNkfjoXHanVszXpD3duKg to hex
let base58check = "1Ly4gqPddveYHMNkfjoXHanVszXpD3duKg"
bitbox.BitcoinCash.decodeBase58Check(base58check)
// 00db04c2e6f104997cb04c956bf25da6078e559d303127f08b
```

### `encodeBIP21`

Encodes address and options as BIP21 uri

#### Arguments

1.  address `string`: cashaddr (w/ or w/out prefix) or legacy base58check encoded address
2.  options `EncodeBIP21Options`: options such as amount, label, message etc
3.  regtest `boolean` **optional**

#### Result

bip21 `string`: bip21 encoded uri

#### Examples

```javascript
let address = "bitcoincash:qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s"
let options = {
  amount: 1,
  label: "#BCHForEveryone",
}
bitbox.BitcoinCash.encodeBIP21(address, options)
// bitcoincash:qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s?amount=1&label=%23BCHForEveryone

let address = "1C6hRmfzvWst5WA7bFRCVAqHt5gE2g7Qar"
let options = {
  amount: 12.5,
  label: "coinbase donation",
  message: "and ya don't stop",
}
bitbox.BitcoinCash.encodeBIP21(address, options)
// bitcoincash:qpum6dwnqmmysdggrprse8ccjq7ldcrfqgmmtgcmny?amount=12.5&label=coinbase%20donation&message=and%20ya%20don%27t%20stop

let address = "qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03"
let options = {
  amount: 42,
  label: "no prefix",
}
bitbox.BitcoinCash.encodeBIP21(address, options)
// bitcoincash:qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03?amount=42&label=no%20prefix
```

### `decodeBIP21`

Decodes BIP21 uri

#### Arguments

1.  bip21 `string`: bip21 encoded uri

#### Result

results `BIP21Object`: decoded bip21 uri

#### Examples

```javascript
let bip21 =
  "bitcoincash:qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s?amount=1&label=%23BCHForEveryone"
bitbox.BitcoinCash.decodeBIP21(bip21)
// { address: 'qrdsfshx7yzfjl9sfj2khuja5crcu4vaxqrt2qkz5s', options: { amount: 1, label: '#BCHForEveryone' } }

let bip21 =
  "bitcoincash:qpum6dwnqmmysdggrprse8ccjq7ldcrfqgmmtgcmny?amount=12.5&label=coinbase%20donation&message=and%20ya%20don%27t%20stop"
bitbox.BitcoinCash.decodeBIP21(bip21)
// { address: 'qpum6dwnqmmysdggrprse8ccjq7ldcrfqgmmtgcmny',
//   options:
//    { amount: 12.5,
//      label: 'coinbase donation',
//      message: 'and ya don\'t stop'
//    }
// }

let bip21 =
  "bitcoincash:qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03?amount=42&label=no%20prefix"
bitbox.BitcoinCash.decodeBIP21(bip21)
// { address: 'qzw6tfrh8p0jh834uf9rhg77pjg5rgnt3qw0e54u03', options: { amount: 42, label: 'no prefix' } }
```

### `getByteCount`

Get byte count of transaction

#### Arguments

1.  inputs `ByteCountInput`: object w/ keys describing input types and counts. 'MULTISIG\-P2SH' and 'P2PKH'. "MULTISIG\-P2SH" also should include the required and total number of signatures. EX: "MULTISIG\-P2SH:2\-4"
2.  outputs `ByteCountOutput`: object w/ keys describing output types and counts. 'P2SH' and 'P2PKH'

#### Result

byteCount `number`: number of bytes

#### Examples

```javascript
// 1 P2PKH input
let inputs = {
  P2PKH: 1,
}
// 1 P2SH output
let outputs = {
  P2SH: 1,
}
bitbox.BitcoinCash.getByteCount(inputs, outputs)
// 190

// 4 MULTISIG-P2SH 2-of-4 and 10 P2PKH inputs
let inputs = {
  "MULTISIG-P2SH:2-4": 4,
  P2PKH: 10,
}
// 23 P2PKH outputs
let outputs = {
  P2PKH: 23,
}
bitbox.BitcoinCash.getByteCount(inputs, outputs)
// 2750

// 2 MULTISIG-P2SH 3-of-5 inputs
let inputs = {
  "MULTISIG-P2SH:3-5": 2,
}
// 2 P2PKH outputs
let outputs = {
  P2PKH: 2,
}
bitbox.BitcoinCash.getByteCount(inputs, outputs)
// 565

// 111 P2PKH inputs
let inputs = {
  P2PKH: 111,
}
// 2 P2PKH outputs
let outputs = {
  P2PKH: 2,
}
bitbox.BitcoinCash.getByteCount(inputs, outputs)
// 16506

// 10 P2PKH and 1 MULTISIG-P2SH 1-of-2 input
let inputs = {
  P2PKH: 10,
  "MULTISIG-P2SH:1-2": 1,
}
// 2 P2PKH and 1 P2SH outputs
let outputs = {
  P2PKH: 2,
  P2SH: 1,
}
bitbox.BitcoinCash.getByteCount(inputs, outputs)
// 1780
```

### `encryptBIP38`

[BIP38](https://github.com/bitcoin/bips/blob/master/bip-0038.mediawiki) encrypt privkey WIFs

#### Arguments

1.  wif `string`: privkey WIF on mainnet or testnet
2.  password `string`: password to encrypt wif with

#### Result

encryptedKey `string`: privkey WIF encrypted w/ password

#### Examples

```javascript
// mainnet
bitbox.BitcoinCash.encryptBIP38(
  "L1phBREbhL4vb1uHHHCAse8bdGE5c7ic2PFjRxMawLzQCsiFVbvu",
  "9GKVkabAHBMyAf"
)
// 6PYU2fDHRVF2194gKDGkbFbeu4mFgkWtVvg2RPd2Sp6KmZx3RCHFpgBB2G

// testnet
bitbox.BitcoinCash.encryptBIP38(
  "cSx7KzdH9EcvDEireu2WYpGnXdFYpta7sJUNt5kVCJgA7kcAU8Gm",
  "1EBPIyj55eR8bVUov9"
)
// 6PYUAPLwLSEjWSAfoe9NTSPkMZXnJA8j8EFJtKaeSnP18RCouutBrS2735
```

### `decryptBIP38`

[BIP38](https://github.com/bitcoin/bips/blob/master/bip-0038.mediawiki) decrypt privkey WIFs

#### Arguments

1.  encryptedKey `string`: encrypted privkey WIF
2.  password `string`: password to decrypt wif with
3.  network `string`: mainnet or testnet. Default: mainnet

#### Result

wif `string`: decrypted privkey WIF on mainnet or testnet

#### Examples

```javascript
// mainnet
bitbox.BitcoinCash.decryptBIP38(
  "6PYU2fDHRVF2194gKDGkbFbeu4mFgkWtVvg2RPd2Sp6KmZx3RCHFpgBB2G",
  "9GKVkabAHBMyAf",
  "mainnet"
)
// L1phBREbhL4vb1uHHHCAse8bdGE5c7ic2PFjRxMawLzQCsiFVbvu

// testnet
bitbox.BitcoinCash.decryptBIP38(
  "6PYUAPLwLSEjWSAfoe9NTSPkMZXnJA8j8EFJtKaeSnP18RCouutBrS2735",
  "1EBPIyj55eR8bVUov9",
  "testnet"
)
// cSx7KzdH9EcvDEireu2WYpGnXdFYpta7sJUNt5kVCJgA7kcAU8Gm
```

## Interfaces

### EncodeBIP21Options

    {
      amount?: number
      label?: string
      message?: string
    }

### BIP21Object

    {
      address: string
      options?: EncodeBIP21Options
    }

### ByteCountInput

    {
      P2PKH?: number
    }

### ByteCountOutput

    {
      P2PKH?: number
      P2SH?: number
    }
