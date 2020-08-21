# HDNode

HDNode stands for Hierarchically Deterministic node which can be used to create a [HD wallet](https://developer.bitcoin.com/mastering-bitcoin-cash/3-keys-addresses-wallets/#hierarchical-deterministic-wallets-bip0032bip0044).

### `fromSeed`

Create HDNode from Seed Buffer.

#### Arguments

1.  rootSeed `Buffer`: root seed buffer
2.  network `string` **optional**: network. default: 'mainnet'

#### Result

HDNode `HDNode`

#### Examples

      // create mnemonic
      let mnemonic = bitbox.Mnemonic.generate(128);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      bitbox.HDNode.fromSeed(seedBuffer);

      // generate entropy
      let entropy = bitbox.Crypto.randomBytes(32);
      // create mnemonic from entropy
      let mnemonic = bitbox.Mnemonic.fromEntropy(entropy);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      bitbox.HDNode.fromSeed(seedBuffer);

### `derive`

Derive [non hardened](https://developer.bitcoin.com/mastering-bitcoin-cash/3-keys-addresses-wallets/#hardened-child-key-derivation) child HDNode

#### Arguments

1.  hdnode `HDNode`
2.  num `number`: number of child node. Ex: 0

#### Result

HDNode `HDNode`

#### Examples

      // create mnemonic
      let mnemonic = bitbox.Mnemonic.generate(128);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // derive unhardened child HDNode
      bitbox.HDNode.derive(hdNode, 0);

### `deriveHardened`

Derive [hardened](https://developer.bitcoin.com/mastering-bitcoin-cash/3-keys-addresses-wallets/#hardened-child-key-derivation) child HDNode

#### Arguments

1.  hdnode `HDNode`
2.  num `number`: number of child node. Ex: 0

#### Result

HDNode `HDNode`

#### Examples

      // create mnemonic
      let mnemonic = bitbox.Mnemonic.generate(128);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // derive hardened child HDNode
      bitbox.HDNode.deriveHardened(hdNode, 0);

### `derivePath`

Derive child HDNode from path

#### Arguments

1.  hdnode `HDNode`
2.  path `string`: path of child hd node. Ex: "m/44'/145'/0'"

#### Result

HDNode `HDNode`

#### Examples

      // create mnemonic
      let mnemonic = bitbox.Mnemonic.generate(128);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // derive hardened child HDNode
      bitbox.HDNode.derivePath(hdNode, "m/44'/145'/0'");

### `toLegacyAddress`

Get legacy address of HDNode

#### Arguments

1.  hdnode `HDNode`

#### Result

legacyAddress `string`: legacy base58check encoded address of HDNode

#### Examples

      // create mnemonic
      let mnemonic = bitbox.Mnemonic.generate(128);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // to legacy address
      bitbox.HDNode.toLegacyAddress(hdNode);
      // 14apxtw2LDQmXWsS5k4JEhG93Jzjswhvma

      // generate entropy
      let entropy = bitbox.Crypto.randomBytes(32);
      // create mnemonic from entropy
      let mnemonic = bitbox.Mnemonic.fromEntropy(entropy);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // to cash address
      bitbox.HDNode.toLegacyAddress(hdNode);
      // 14mVsq3H5Ep2Jb6AqoKsmY1BFHKCBGPDLi

### `toCashAddress`

Get cash address of HDNode

#### Arguments

1.  hdnode `HDNode`
2.  regtest `boolean` **optional**: return regtest address

#### Result

cashAddress `string`: cashaddr encoded address of HDNode

#### Examples

      // create mnemonic
      let mnemonic = bitbox.Mnemonic.generate(128);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // to cash address
      bitbox.HDNode.toCashAddress(hdNode);
      // bitcoincash:qqrz6kqw6nvhwgwrt4g7fggepvewtkr7nukkeqf4rw

      // generate entropy
      let entropy = bitbox.Crypto.randomBytes(32);
      // create mnemonic from entropy
      let mnemonic = bitbox.Mnemonic.fromEntropy(entropy);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // to cash address
      bitbox.HDNode.toCashAddress(hdNode);
      // bitcoincash:qq549jxsjv66kw0smdju4es2axnk7hhe9cquhjg4gt

### `toWIF`

Get private key in wallet import format (WIF) of HDNode

#### Arguments

1.  hdnode `HDNode`

#### Result

privateKeyWIF `string`: private key in wallet import format (WIF) of HDNode

#### Examples

      // create mnemonic
      let mnemonic = bitbox.Mnemonic.generate(128);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // to WIF
      bitbox.HDNode.toWIF(hdNode);
      // L5E8QjFnLukp8BuF4uu9gmvvSrbafioURGdBve5tA3Eq5ptzbMCJ

      // generate entropy
      let entropy = bitbox.Crypto.randomBytes(32);
      // create mnemonic from entropy
      let mnemonic = bitbox.Mnemonic.fromEntropy(entropy);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // to WIF
      bitbox.HDNode.toWIF(hdNode);
      // KwobPFhv3AuXc3ps6YtWfMVRpLBDBA7jnJddurfELTyTNcFhZYpJ

### `toXPub`

Get [extended](https://developer.bitcoin.com/mastering-bitcoin-cash/3-keys-addresses-wallets/#extended-keys) [public key](https://developer.bitcoin.com/mastering-bitcoin-cash/3-keys-addresses-wallets/#public-key-cryptography-and-cryptocurrency) of HDNode

#### Arguments

1.  hdnode `HDNode`

#### Result

xpub `string`: extended public key of HDNode

#### Examples

      // create mnemonic
      let mnemonic = bitbox.Mnemonic.generate(128);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // to extended public key
      bitbox.HDNode.toXPub(hdNode);
      // xpub661MyMwAqRbcG4CnhNYoK1r1TKLwQQ1UdC3LHoWFK61rsnzh7Hx35qQ9Z53ucYcE5WvA7GEDXhqqKjSY2e6Y8n7WNVLYHpXCuuX945VPuYn

      // generate entropy
      let entropy = bitbox.Crypto.randomBytes(32);
      // create mnemonic from entropy
      let mnemonic = bitbox.Mnemonic.fromEntropy(entropy);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // to extended public key
      bitbox.HDNode.toXPub(hdNode);
      // xpub661MyMwAqRbcFuMLeHkSbTNwNHG9MQyrAZqV1Q4MEAsmj9MYa5sxg8WC2LKqW6EHviHVucBjWi1n38juZpDDeX3U6YrsMeACdcNSTHkM8BQ

### `toXPriv`

Get [extended](https://developer.bitcoin.com/mastering-bitcoin-cash/3-keys-addresses-wallets/#extended-keys) [private key](https://developer.bitcoin.com/mastering-bitcoin-cash/3-keys-addresses-wallets/#private-keys) of HDNode

#### Arguments

1.  hdnode `HDNode`

#### Result

xpriv `string`: extended private key of HDNode

#### Examples

      // create mnemonic
      let mnemonic = bitbox.Mnemonic.generate(128);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // to extended private key
      bitbox.HDNode.toXPriv(hdNode);
      // xprv9s21ZrQH143K2eMCcbT4qwwRhw6qZaPaEDWB792bnrxQZPoP2JUk4kfEx9eeV1uGTAWAfCqYr4wDWo52qALiukizKwQzvEyNR1fWZJi97Kv

      // generate entropy
      let entropy = bitbox.Crypto.randomBytes(32);
      // create mnemonic from entropy
      let mnemonic = bitbox.Mnemonic.fromEntropy(entropy);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // to extended private key
      bitbox.HDNode.toXPriv(hdNode);
      // xprv9s21ZrQH143K2b5GPP6zHz22E6LeCgQXJtwNbC3MA3Kz7Se7tveKo96EhqwFtSkYWkyenVcMqM7uq35PcUNG8cUdpsJEgwKG3dvfP7TmL3v

### `toKeyPair`

Get the ECPair of an HDNode

#### Arguments

1.  hdnode `HDNode`

#### Result

keyPair `ECPair`: ECPair of an HDNode

#### Examples

      // create mnemonic
      let mnemonic = bitbox.Mnemonic.generate(128);
      // create root seed buffer from mnemonic
      let rootSeed= bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from root seed
      let hdNode = bitbox.HDNode.fromSeed(rootSeed);
      // create public key buffer from HDNode
      bitbox.HDNode.toKeyPair(hdNode);

      // generate entropy
      let entropy = bitbox.Crypto.randomBytes(32);
      // create mnemonic from entropy
      let mnemonic = bitbox.Mnemonic.fromEntropy(entropy);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // create public key buffer from HDNode
      bitbox.HDNode.toKeyPair(hdNode);

### `toPublicKey`

Get the public key of an HDNode as a buffer

#### Arguments

1.  hdnode `HDNode`

#### Result

publicKeyBuffer `Buffer`: public key of HDNode as a buffer

#### Examples

      // create mnemonic
      let mnemonic = bitbox.Mnemonic.generate(128);
      // create root seed buffer from mnemonic
      let rootSeed= bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from root seed
      let hdNode = bitbox.HDNode.fromSeed(rootSeed);
      // create public key buffer from HDNode
      bitbox.HDNode.toPublicKey(hdNode);
      // <Buffer 03 86 d6 d3 db ec 1a 93 8c 2c a2 63 c9 79 8f eb e9 16 09 c5 a2 9b 07 65 c4 79 1f d9 0f fa 4d 27 20>

      // generate entropy
      let entropy = bitbox.Crypto.randomBytes(32);
      // create mnemonic from entropy
      let mnemonic = bitbox.Mnemonic.fromEntropy(entropy);
      // create seed buffer from mnemonic
      let seedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create HDNode from seed buffer
      let hdNode = bitbox.HDNode.fromSeed(seedBuffer);
      // create public key buffer from HDNode
      bitbox.HDNode.toPublicKey(hdNode);
      // <Buffer 02 d2 26 74 6e 78 03 ac 11 e0 96 c6 24 de e8 dd 62 52 e7 8e 51 56 8a c1 18 62 aa 2a 72 50 1d ea 7d>

### `toIdentifier`

hash160 of Node’s public key. The same value you would see in a scriptPubKey.

#### Arguments

1.  hdnode `HDNode`

#### Result

identifier `Buffer`

#### Examples

      // mainnet
      let xpub = 'xpub6DWfGUo4cjC8oWmgZdpyFMH6v3oeyADfdUPhsehzn5jX44zpazivha3JxUtkcCvBEB1c6DGaiUmpyz2m1DRfGDEVZ5VxLLW2UNEbZ5iTRvi';
      let node = bitbox.HDNode.fromXPub(xpub);
      bitbox.HDNode.toIdentifier(node);
      // <Buffer cd d4 84 1d 2e 96 bf bf f7 9c d1 f4 a6 75 22 1c 7f 67 88 9c>
      // the same as if we hash160ed it's publicKey
      let publicKeyBuffer = bitbox.HDNode.toPublicKey(node);
      bitbox.Crypto.hash160(publicKeyBuffer);
      // <Buffer cd d4 84 1d 2e 96 bf bf f7 9c d1 f4 a6 75 22 1c 7f 67 88 9c>

      // testnet
      let xpub = 'tpubDCxmZ3qLVVphg6NpsnAjQFqDPwr9HYqSgoAcUYAfqSgo32dL6NA8QXqWsS6XTjoGggohZKvujsAv2F2ugej9qfUYau2jSUB4JaYnfMsx3MJ';
      let node = bitbox.HDNode.fromXPub(xpub);
      bitbox.HDNode.toIdentifier(node);
      // <Buffer e1 8e 20 e3 f8 f1 c0 53 e6 1f 9e 3a 58 8e 71 f5 0b 8d 2d c4>
      // the same as if we hash160ed it's publicKey
      let publicKeyBuffer = bitbox.HDNode.toPublicKey(node);
      bitbox.Crypto.hash160(publicKeyBuffer);
      // <Buffer e1 8e 20 e3 f8 f1 c0 53 e6 1f 9e 3a 58 8e 71 f5 0b 8d 2d c4>

### `fromXPriv`

Generate HDNode from extended private key

#### Arguments

1.  xpriv `string`: extended private key

#### Result

hdNode `HDNode`

#### Examples

      // mainnet xpriv
      bitbox.HDNode.fromXPriv('xprv9s21ZrQH143K2b5GPP6zHz22E6LeCgQXJtwNbC3MA3Kz7Se7tveKo96EhqwFtSkYWkyenVcMqM7uq35PcUNG8cUdpsJEgwKG3dvfP7TmL3v');

      // testnet xpriv
      bitbox.HDNode.fromXPriv('tprv8gQ3zr1F5pRHMebqqhorrorYNvUG3XkcZjSWVs2cEtRwwJy1TRhgRx4XcF8dYHM2eyTbTCcdKYNhqgyBQphxwRoVyVKr9zuyoA8WxNDRvom');

### `fromXPub`

Generate HDNode from extended public key

#### Arguments

1.  xpub `string`: extended public key

#### Result

hdNode `HDNode`

#### Examples

      // mainnet xpub
      bitbox.HDNode.fromXPub('xpub661MyMwAqRbcFuMLeHkSbTNwNHG9MQyrAZqV1Q4MEAsmj9MYa5sxg8WC2LKqW6EHviHVucBjWi1n38juZpDDeX3U6YrsMeACdcNSTHkM8BQ');

      // testnet xpub
      bitbox.HDNode.fromXPub('tpubDD669G3VEC6xF7ddjMUTGDWewwzCCrwX933HnP4ufAELmoDn5pXGcSgPnLodjFvWQwRXkG94f77BatEDA8dfQ99yy97kRYynUpNLENEqTBo');

### `isPublic`

Check if an HDNode can only derive public keys and children

#### Arguments

1.  hdnode `HDNode`

#### Result

isPublic `boolean`

#### Examples

      // mainnet xpub
      let xpub = 'xpub6DWfGUo4cjC8oWmgZdpyFMH6v3oeyADfdUPhsehzn5jX44zpazivha3JxUtkcCvBEB1c6DGaiUmpyz2m1DRfGDEVZ5VxLLW2UNEbZ5iTRvi';
      let node = bitbox.HDNode.fromXPub(xpub);
      bitbox.HDNode.isPublic(node);
      // true

      // mainnet xpriv
      let xpriv = 'xprv9ys4cvcoU8RoxqkZ7Fgt33te4LPHgcsKwyoZYVorkzp9uonWxWgP9wiSQhPeBUqVHbdAyov4Yi55RywBkDfZKdJFRqA51Anz6v72zGaMGZp';
      let node = bitbox.HDNode.fromXPriv(xpriv);
      bitbox.HDNode.isPublic(node);
      // false

      // testnet xpub
      let xpub = 'tpubDCxmZ3qLVVphg6NpsnAjQFqDPwr9HYqSgoAcUYAfqSgo32dL6NA8QXqWsS6XTjoGggohZKvujsAv2F2ugej9qfUYau2jSUB4JaYnfMsx3MJ';
      let node = bitbox.HDNode.fromXPub(xpub);
      bitbox.HDNode.isPublic(node);
      // true

      // testnet xpriv
      let xpriv = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
      let node = bitbox.HDNode.fromXPriv(xpriv);
      bitbox.HDNode.isPublic(node);
      // false

### `isPrivate`

Check if an HDNode can derive both public and private keys and children

#### Arguments

1.  hdnode `HDNode`

#### Result

isPrivate `boolean`

#### Examples

      // mainnet xpub
      let xpub = 'xpub6DWfGUo4cjC8oWmgZdpyFMH6v3oeyADfdUPhsehzn5jX44zpazivha3JxUtkcCvBEB1c6DGaiUmpyz2m1DRfGDEVZ5VxLLW2UNEbZ5iTRvi';
      let node = bitbox.HDNode.fromXPub(xpub);
      bitbox.HDNode.isPrivate(node);
      // false

      // mainnet xpriv
      let xpriv = 'xprv9ys4cvcoU8RoxqkZ7Fgt33te4LPHgcsKwyoZYVorkzp9uonWxWgP9wiSQhPeBUqVHbdAyov4Yi55RywBkDfZKdJFRqA51Anz6v72zGaMGZp';
      let node = bitbox.HDNode.fromXPriv(xpriv);
      bitbox.HDNode.isPrivate(node);
      // true

      // testnet xpub
      let xpub = 'tpubDCxmZ3qLVVphg6NpsnAjQFqDPwr9HYqSgoAcUYAfqSgo32dL6NA8QXqWsS6XTjoGggohZKvujsAv2F2ugej9qfUYau2jSUB4JaYnfMsx3MJ';
      let node = bitbox.HDNode.fromXPub(xpub);
      bitbox.HDNode.isPrivate(node);
      // false

      // testnet xpriv
      let xpriv = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
      let node = bitbox.HDNode.fromXPriv(xpriv);
      bitbox.HDNode.isPrivate(node);
      // true

### `sign`

Sign 32 byte hash encoded as a buffer

#### Arguments

1.  hdnode `HDNode`
2.  buffer `Buffer`

#### Result

signature `ECSignature`

#### Examples

      // mainnet xpriv
      let xpriv = 'xprv9z2uWrGjbYPxc728rvtMi4jt4SudRiSfYn6Tdif5XN17pJ1NTbHoHK6JePkPLY1NHXLaQcA6sWudpZDm7DwKhbsGQieAp9wx46Wbio4iXg9';
      // hdnode from xpriv
      let hdnode = bitbox.HDNode.fromXPriv(xpriv);
      // 32 byte buffer
      let buf = Buffer.from(bitbox.Crypto.sha256('EARTH'), 'hex');
      // sign
      bitbox.HDNode.sign(hdnode, buf);

      // testnet xpriv
      let xpriv = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
      // hdnode from xpriv
      let hdnode = bitbox.HDNode.fromXPriv(xpriv);
      // 32 byte buffer
      let buf = Buffer.from(bitbox.Crypto.sha256('EARTH'), 'hex');
      // sign
      bitbox.HDNode.sign(hdnode, buf);

### `verify`

Verify signed 32 byte hash encoded as a buffer

#### Arguments

1.  hdnode `HDNode`
2.  buffer `Buffer`
3.  signature `ECSignature`

#### Result

verified `boolean`

#### Examples

      // mainnet xprivs
      let xpriv1 = 'xprv9ys4cvcoU8RoqvzxGj886r4Ey3w1WfVNYH8sMnVPVzyQtaPPM6Q8pHm3D9WPWvEupGEgcJ1xLaGaZDcvKfoAurE2AzHRRRup5FuHzDr8n15';
      let xpriv2 = 'xprv9ys4cvcoU8RoxqkZ7Fgt33te4LPHgcsKwyoZYVorkzp9uonWxWgP9wiSQhPeBUqVHbdAyov4Yi55RywBkDfZKdJFRqA51Anz6v72zGaMGZp';
      // hdnodes from xprivs
      let hdnode1 = bitbox.HDNode.fromXPriv(xpriv1);
      let hdnode2 = bitbox.HDNode.fromXPriv(xpriv2);
      // 32 byte buffer
      let buf = Buffer.from(bitbox.Crypto.sha256('EARTH'), 'hex');
      // sign
      let signature = bitbox.HDNode.sign(hdnode1, buf);
      // verify
      bitbox.HDNode.verify(hdnode1, buf, signature);
      // true
      bitbox.HDNode.verify(hdnode2, buf, signature);
      // false

      // testnet xprivs
      let xpriv1 = 'tprv8ggxJ8SG5EdqakzVUeLa9Gr7sqCdEcJPUNDmtdJscNxfmxoXvU36ZguiUWukJVEWEixAUr8pJabJkCt33wzxFQA587gqN51Lxdxx97zAzuG';
      let xpriv2 = 'tprv8ggxJ8SG5EdqiM6Dn63QwHScQ7HS5hXqUMxSD1NEbDyPw6VtoUMFZBAohpTMsPz9cYbpHELmA4Zm79NKRvEvFdhWRX2bSmu7V7PiNb364nv';
      // hdnodes from xprivs
      let hdnode1 = bitbox.HDNode.fromXPriv(xpriv1);
      let hdnode2 = bitbox.HDNode.fromXPriv(xpriv2);
      // 32 byte buffer
      let buf = Buffer.from(bitbox.Crypto.sha256('EARTH'), 'hex');
      // sign
      let signature = bitbox.ECPair.sign(hdnode1, buf);
      // verify
      bitbox.HDNode.verify(hdnode1, buf, signature);
      // true
      bitbox.HDNode.verify(hdnode2, buf, signature);
      // false

### `createAccount`

Create [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#the-default-wallet-layout) account. Has `getChainAddress` and `nextChainAddress` helper methods.

#### Arguments

1.  hdNodes `HDNode[]`

#### Result

account: `Object`

#### Examples

      // create mnemonic
      let mnemonic = bitbox.Mnemonic.generate(128);
      // create root seed buffer
      let rootSeedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create master hd node
      let masterHDNode = bitbox.HDNode.fromSeed(rootSeedBuffer);
      // derive child node
      let childNode = masterHDNode.derivePath("m/44'/145'/0'/0");
      // create account
      let account = bitbox.HDNode.createAccount([childNode]);

### `getChainAddress`

Returns the latest address from account

#### Arguments

1.  account: `number`

#### Result

address: `string`

#### Examples

      // create mnemonic
      let mnemonic = bitbox.Mnemonic.generate(128);
      // create root seed buffer
      let rootSeedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create master hd node
      let masterHDNode = bitbox.HDNode.fromSeed(rootSeedBuffer);
      // derive child node
      let childNode = masterHDNode.derivePath("m/44'/145'/0'/0");
      // create account
      let account = bitbox.HDNode.createAccount([childNode]);
      account.getChainAddress(0)
      // 1EsibxXqzxzcor7eS34dSGrZp1kb3nQFFr

### `nextChainAddress`

Moves the most recent address forward for account

#### Arguments

1.  account: `number`

#### Result

address: `string`

#### Examples

      // create mnemonic
      let mnemonic = bitbox.Mnemonic.generate(128);
      // create root seed buffer
      let rootSeedBuffer = bitbox.Mnemonic.toSeed(mnemonic);
      // create master hd node
      let masterHDNode = bitbox.HDNode.fromSeed(rootSeedBuffer);
      // derive child node
      let childNode = masterHDNode.derivePath("m/44'/145'/0'/0");
      // create account
      let account = bitbox.HDNode.createAccount([childNode]);
      account.getChainAddress(0)
      // 1EsibxXqzxzcor7eS34dSGrZp1kb3nQFFr
      account.nextChainAddress(0)
      account.getChainAddress(0)
      // 1JBApcAMD3riimPxABg2pNvwLumP9DEpxD
