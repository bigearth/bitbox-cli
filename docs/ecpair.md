# ECPair

### `fromWIF`

Generates an ECPair from a private key in wallet import format ([WIF](https://github.com/Bitcoin-com/mastering-bitcoin-cash/blob/master/3-keys-addresses-wallets.md#private-key-formats)). Follow these [steps to go from a private key to a WIF](https://en.bitcoin.it/wiki/Wallet_import_format). This method only works with a [compressed private key](https://github.com/Bitcoin-com/mastering-bitcoin-cash/blob/master/3-keys-addresses-wallets.md#compressed-public-keys).

#### Arguments

1.  wif `string`: private key in wallet import format ([WIF](https://github.com/Bitcoin-com/mastering-bitcoin-cash/blob/master/3-keys-addresses-wallets.md#compressed-public-keys))

#### Result

ecpair `ECPair`

#### Examples

      // mainnet WIF
      let wif = 'L4vmKsStbQaCvaKPnCzdRArZgdAxTqVx8vjMGLW5nHtWdRguiRi1';
      bitbox.ECPair.fromWIF(wif);

      // testnet WIF
      let wif = 'cSNLj6xeg3Yg2rfcgKoWNx4MiAgn9ugCUUro37UDEhn6CzeYqjWW'
      bitbox.ECPair.fromWIF(wif)

### `toWIF`

Gets a private key in wallet import format from an ECPair.

#### Arguments

1.  ecpair `ECPair`

#### Result

wif `string`: private key in wallet import format

#### Examples

      // mainnet wif
      let wif = 'L4vmKsStbQaCvaKPnCzdRArZgdAxTqVx8vjMGLW5nHtWdRguiRi1';
      // ecpair from wif
      let ecpair = bitbox.ECPair.fromWIF(wif);
      // wif from ecpair
      bitbox.ECPair.toWIF(ecpair);
      // L4vmKsStbQaCvaKPnCzdRArZgdAxTqVx8vjMGLW5nHtWdRguiRi1

      // testnet wif
      let wif = 'cT3tJP7BnjFJSAHbooMXrY8E9t2AFj37amSBAYFMeHfqPqPgD4ZA';
      // ecpair from wif
      let ecpair = bitbox.ECPair.fromWIF(wif);
      // wif from ecpair
      bitbox.ECPair.toWIF(ecpair);
      // cT3tJP7BnjFJSAHbooMXrY8E9t2AFj37amSBAYFMeHfqPqPgD4ZA

### `fromPublicKey`

Generates an ECPair from a public key buffer.

#### Arguments

1.  buffer `Buffer`: public key buffer

#### Result

ecpair `ECPair`

#### Examples

      // create ECPair from mainnet pubkeyBuffer
      let pubkeyBuffer = Buffer.from("02fb721b92025e775b1b84774e65d568d24645cb633275f5c26f5c3101b214a8fb", 'hex');
      bitbox.ECPair.fromPublicKey(pubkeyBuffer);

      // create ECPair from testnet pubkeyBuffer
      let pubkeyBuffer = Buffer.from("024a6d0737a23c472d078d78c1cbc3c2bbf8767b48e72684ff03a911b463da7fa6", 'hex');
      bitbox.ECPair.fromPublicKey(pubkeyBuffer);

### `toPublicKey`

Get the public key of an ECPair as a buffer.

#### Arguments

1.  ecpair `ECPair`

#### Result

buffer `Buffer`: public key of an ECPair as a buffer

#### Examples

      // create ecpair from mainnet public key buffer
      let ecpair = bitbox.ECPair.fromPublicKey(Buffer.from('02d305772e0873fba6c1c7ff353ce374233316eb5820acd7ff3d7d9b82d514126b', 'hex'));
      // create public key buffer
      bitbox.ECPair.toPublicKey(ecpair);
      //

      // create ecpair from testnet public key buffer
      let ecpair = bitbox.ECPair.fromPublicKey(Buffer.from('024a6d0737a23c472d078d78c1cbc3c2bbf8767b48e72684ff03a911b463da7fa6', 'hex'));
      // create public key buffer
      bitbox.ECPair.toPublicKey(ecpair);
      //

### `toLegacyAddress`

Get legacy address of ECPair

#### Arguments

1.  ecpair `ECPair`

#### Result

legacyAddress `string`: legacy base58check encoded address of an ECPair

#### Examples

      // mainnet wif
      let wif = 'L5GPEGxCmojgzFoBLUUqT2GegLGqobiYhTZzfLtpkLTfTb9E9NRn';
      // ecpair from wif
      let ecpair = bitbox.ECPair.fromWIF(wif);
      // to legacy address
      bitbox.ECPair.toLegacyAddress(ecpair);
      // 1DgxdA5bbMcCNWg3yB2MgKqFazV92BXgxK

      // testnet wif
      let wif = 'cSNLj6xeg3Yg2rfcgKoWNx4MiAgn9ugCUUro37UDEhn6CzeYqjWW';
      // ecpair from wif
      let ecpair = bitbox.ECPair.fromWIF(wif);
      // to legacy address
      bitbox.ECPair.toLegacyAddress(ecpair);
      // mg4PygFcXoyNJGJkM2Dcpe25av9wXzz1My

### `toCashAddress`

Get cash address of ECPair

#### Arguments

1.  ecpair `ECPair`
2.  regtest `boolean` **optional**: return regtest address

#### Result

cashAddress `string`: cashaddr encoded address of an ECPair

#### Examples

      // mainnet wif
      let wif = 'L5GPEGxCmojgzFoBLUUqT2GegLGqobiYhTZzfLtpkLTfTb9E9NRn';
      // ecpair from wif
      let ecpair = bitbox.ECPair.fromWIF(wif);
      // to legacy address
      bitbox.ECPair.toCashAddress(ecpair);
      // bitcoincash:qz9nq206kteyv2t7trhdr4vzzkej60kqtytn7sxkxm

      // testnet wif
      let wif = 'cSNLj6xeg3Yg2rfcgKoWNx4MiAgn9ugCUUro37UDEhn6CzeYqjWW';
      // ecpair from wif
      let ecpair = bitbox.ECPair.fromWIF(wif);
      // to legacy address
      bitbox.ECPair.toCashAddress(ecpair);
      // bchtest:qqzly4vrcxcjw62u4yq4nv86ltk2mc9v0yvq8mvj6m

### `sign`

Sign 32 byte hash encoded as a buffer

#### Arguments

1.  ecpair `ECPair`
2.  buffer `Buffer`: 32 byte Buffer
3.  signatureAlgorithm: `number` **optional**. `0x00` for ECDSA and `0x01` for Schnorr. Defaults to `0x00`

#### Result

signature `Object`

#### Examples

      // mainnet wif
      let wif = 'Kxq2EzVbDwjquUt5zyCFED5FRt99RZKEKVDJWTQcpSDoLAWMqLer';
      // ecpair from wif
      let ecpair = bitbox.ECPair.fromWIF(wif);
      // 32 byte buffer
      let buf = Buffer.from(bitbox.Crypto.sha256('EARTH'), 'hex');
      // sign
      bitbox.ECPair.sign(ecpair, buf);

      // testnet wif
      let wif = 'cT3tJP7BnjFJSAHbooMXrY8E9t2AFj37amSBAYFMeHfqPqPgD4ZA';
      // ecpair from wif
      let ecpair = bitbox.ECPair.fromWIF(wif);
      // 32 byte buffer
      let buf = Buffer.from(bitbox.Crypto.sha256('EARTH'), 'hex');
      // sign
      bitbox.ECPair.sign(ecpair, buf);

### `verify`

Verify signed 32 byte hash encoded as a buffer

#### Arguments

1.  ecpair `ECPair`
2.  buffer `Buffer`: 32 byte Buffer
3.  signature `ECSignature`

#### Result

verified `boolean`

#### Examples

      // mainnet wifs
      let wif1 = 'Kxq2EzVbDwjquUt5zyCFED5FRt99RZKEKVDJWTQcpSDoLAWMqLer';
      let wif2 = 'L4BwXDmjzEyzKHbAfGruhieUDPs8KTx7DMgqPk4aF9GefzgqPENV';
      // ecpairs from wifs
      let ecpair1 = bitbox.ECPair.fromWIF(wif1);
      let ecpair2 = bitbox.ECPair.fromWIF(wif2);
      // 32 byte buffer
      let buf = Buffer.from(bitbox.Crypto.sha256('EARTH'), 'hex');
      // sign
      let signature = bitbox.ECPair.sign(ecpair1, buf);
      // verify
      bitbox.ECPair.verify(ecpair1, buf, signature);
      // true
      bitbox.ECPair.verify(ecpair2, buf, signature);
      // false

      // testnet wifs
      let wif1 = 'cT3tJP7BnjFJSAHbooMXrY8E9t2AFj37amSBAYFMeHfqPqPgD4ZA';
      let wif2 = 'cRaFawZ49jEV2X3byAV4iGBYCRBVU8PoBzUMVToeEbFeVzbH4Gi7';
      // ecpairs from wifs
      let ecpair1 = bitbox.ECPair.fromWIF(wif1);
      let ecpair2 = bitbox.ECPair.fromWIF(wif2);
      // 32 byte buffer
      let buf = Buffer.from(bitbox.Crypto.sha256('EARTH'), 'hex');
      // sign
      let signature = bitbox.ECPair.sign(ecpair1, buf);
      // verify
      bitbox.ECPair.verify(ecpair1, buf, signature);
      // true
      bitbox.ECPair.verify(ecpair2, buf, signature);
