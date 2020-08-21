# Address

### `toLegacyAddress`

Converting cashaddr to legacy address format

#### Arguments

1.  address `string` cashaddr address to be converted

#### Result

legacyAddress `string` legacy base 58 check encoded address

#### Examples

      // mainnet w/ prefix
      bitbox.Address.toLegacyAddress('bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
      // 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN

      // mainnet w/ no prefix
      bitbox.Address.toLegacyAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
      // 1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN

      // testnet w/ prefix
      bitbox.Address.toLegacyAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // mqc1tmwY2368LLGktnePzEyPAsgADxbksi

      // testnet w/ no prefix
      bitbox.Address.toLegacyAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // mqc1tmwY2368LLGktnePzEyPAsgADxbksi

### `toCashAddress`

Converting legacy to cashAddress format

#### Arguments

1.  address `string` required: legacy address to be converted
2.  prefix `boolean` optional: include prefix
3.  regtest `boolean` optional: return regtest address

#### Result

cashAddress `string` cashAddr encoded address

#### Examples

      // mainnet
      bitbox.Address.toCashAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN')
      // bitcoincash:qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl

      // mainnet no prefix
      bitbox.Address.toCashAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN', false)
      // qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl

      // tesnet
      bitbox.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx')
      // bchtest:qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3

      // testnet no prefix
      bitbox.Address.toCashAddress('msDbtTj7kWXPpYaR7PQmMK84i66fJqQMLx', false)
      // qzq9je6pntpva3wf6scr7mlnycr54sjgeqxgrr9ku3

### `isLegacyAddress`

Detect if legacy base58check encoded address

#### Arguments

1.  address `string`: address to determine

#### Result

isLegacyAddress `boolean`: true/false if legacy address

#### Examples

      // cashaddr
      bitbox.Address.isLegacyAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // false

      // w/ no cashaddr prefix
      bitbox.Address.isLegacyAddress('qzm47qz5ue99y9yl4aca7jnz7dwgdenl85jkfx3znl')
      // false

      // legacy
      bitbox.Address.isLegacyAddress('1HiaTupadqQN66Tvgt7QSE5Wg13BUy25eN')
      // true

      // testnet w/ cashaddr prefix
      bitbox.Address.isLegacyAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // false

      // testnet w/ no cashaddr prefix
      bitbox.Address.isLegacyAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // false

      // legacy testnet
      bitbox.Address.isLegacyAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
      // true

### `isCashAddress`

Detect if cashAddr encoded address

#### Arguments

1.  address `string`: address to determine

#### Result

isCashAddress `boolean`: true/false if cashaddress

#### Examples

      // mainnet cashaddr
      bitbox.Address.isCashAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // true

      // mainnet w/ no cashaddr prefix
      bitbox.Address.isCashAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // true

      // mainnet legacy
      bitbox.Address.isCashAddress('18HEMuar5ZhXDFep1gEiY1eoPPcBLxfDxj')
      // false

      // testnet w/ cashaddr prefix
      bitbox.Address.isCashAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // true

      // testnet w/ no cashaddr prefix
      bitbox.Address.isCashAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // true

      // testnet legacy
      bitbox.Address.isCashAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
      // false

### `isMainnetAddress`

Detect if mainnet address

#### Arguments

1.  address `string`: address to determine

#### Result

isMainnetAddress `boolean`: true/false if mainnet address

#### Examples

      // mainnet cashaddr
      bitbox.Address.isMainnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // true

      // mainnet cashaddr w/ no prefix
      bitbox.Address.isMainnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // true

      // mainnet legacy
      bitbox.Address.isMainnetAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
      // true

      // testnet cashaddr
      bitbox.Address.isMainnetAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // false

      // testnet w/ no cashaddr prefix
      bitbox.Address.isMainnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // false

      // testnet legacy
      bitbox.Address.isMainnetAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
      // false

### `isTestnetAddress`

Detect if testnet address

#### Arguments

1.  addresss `string`: address to determine

#### Result

isTestnetAddresss `boolean`: true/false if is testnet address

#### Examples

      // cashaddr mainnet
      bitbox.Address.isTestnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      //false

      // w/ no cashaddr prefix
      bitbox.Address.isTestnetAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // false

      // legacy mainnet
      bitbox.Address.isTestnetAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
      // false

      // cashaddr testnet
      bitbox.Address.isTestnetAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // true

      // testnet w/ no cashaddr prefix
      bitbox.Address.isTestnetAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // true

      // testnet legacy
      bitbox.Address.isTestnetAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
      // true

### `isRegTestAddress`

Detect if regtest address

#### Arguments

1.  addresss `string`: address to determine

#### Result

isRegtestAddresss `boolean`: true/false if is regtest address

#### Examples

      // regtest
      bitbox.Address.isRegTestAddress('bchreg:qzq9je6pntpva3wf6scr7mlnycr54sjgequ54zx9lh')
      // true

      // regtest w/ no prefix
      bitbox.Address.isRegTestAddress('qzq9je6pntpva3wf6scr7mlnycr54sjgequ54zx9lh')
      // true

      // cashaddr mainnet
      bitbox.Address.isRegTestAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      //false

      // w/ no cashaddr prefix
      bitbox.Address.isRegTestAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // false

      // legacy mainnet
      bitbox.Address.isRegTestAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
      // false

      // cashaddr testnet
      bitbox.Address.isRegTestAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // false

      // testnet w/ no cashaddr prefix
      bitbox.Address.isRegTestAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // false

### `isP2PKHAddress`

Detect if p2pkh address

#### Arguments

1.  address `string` address to determine

#### Result

isP2PKHAddress `boolean` true/false if is p2pkh address

#### Examples

      // cashaddr
      bitbox.Address.isP2PKHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // true

      // w/ no cashaddr prefix
      bitbox.Address.isP2PKHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // true

      // legacy
      bitbox.Address.isP2PKHAddress('14krEkSaKoTkbFT9iUCfUYARo4EXA8co6M')
      // true

      // legacy testnet
      bitbox.Address.isP2PKHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
      // true

      // testnet w/ no cashaddr prefix
      bitbox.Address.isP2PKHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // true

      // legacy testnet
      bitbox.Address.isP2PKHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
      // true

### `isP2SHAddress`

Detect if p2sh address

#### arguments

1.  address `string` address to determine

#### Result

isP2SHAddress `boolean` true/false if is p2sh address

#### Examples

      // cashaddr
      bitbox.Address.isP2SHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // false

      // cashaddr w/ no prefix
      bitbox.Address.isP2SHAddress('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // false

      // legacy
      bitbox.Address.isP2SHAddress('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
      // false

      // cashaddr testnet
      bitbox.Address.isP2SHAddress('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // false

      // cashaddr testnet w/ no prefix
      bitbox.Address.isP2SHAddress('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // false

      // legacy testnet
      bitbox.Address.isP2SHAddress('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
      // false

### `detectAddressFormat`

Detect address format

#### arguments

1.  address `string` address to determine format

#### Result

addressFormat `string` address format

#### Examples

      // cashaddr
      bitbox.Address.detectAddressFormat('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // cashaddr

      // cashaddr w/ no prefix
      bitbox.Address.detectAddressFormat('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // cashaddr

      // legacy
      bitbox.Address.detectAddressFormat('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
      // legacy

      // cashaddr testnet
      bitbox.Address.detectAddressFormat('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // cashaddr

      // cashaddr testnet w/ no prefix
      bitbox.Address.detectAddressFormat('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // cashaddr

      // legacy testnet
      bitbox.Address.detectAddressFormat('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
      // legacy

### `detectAddressNetwork`

Detect address network

#### arguments

1.  address `string` address to determine network

#### Result

addressNetwork `string` address network

#### Examples

      // cashaddr
      bitbox.Address.detectAddressNetwork('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // mainnet

      // cashaddr w/ no prefix
      bitbox.Address.detectAddressNetwork('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
      // mainnet

      // legacy
      bitbox.Address.detectAddressNetwork('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74')
      // mainnet

      // cashaddr testnet
      bitbox.Address.detectAddressNetwork('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // testnet

      // cashaddr testnet w/ no prefix
      bitbox.Address.detectAddressNetwork('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy')
      // testnet

      // legacy testnet
      bitbox.Address.detectAddressNetwork('mqc1tmwY2368LLGktnePzEyPAsgADxbksi')
      // testnet

### `detectAddressType`

Detect address network

#### arguments

1.  address `string` address to determine network

#### Result

addressNetwork `string` address network

#### Examples

      // cashaddr
      bitbox.Address.detectAddressType('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');
      // p2pkh

      // cashaddr w/ no prefix
      bitbox.Address.detectAddressType('qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');
      // p2pkh

      // legacy
      bitbox.Address.detectAddressType('1NoYQso5UF6XqC4NbjKAp2EnjJ59yLNn74');
      // p2pkh

      // cashaddr testnet
      bitbox.Address.detectAddressType('bchtest:qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy');
      // p2pkh

      // cashaddr testnet w/ no prefix
      bitbox.Address.detectAddressType('qph2v4mkxjgdqgmlyjx6njmey0ftrxlnggt9t0a6zy');
      // p2pkh

      // legacy testnet
      bitbox.Address.detectAddressType('mqc1tmwY2368LLGktnePzEyPAsgADxbksi');
      // p2pkh

### `fromXPub`

Generates an address for an extended public key (xpub)

#### Arguments

1.  xpub `string`: extended public key to be used
2.  path `string` **optional**: derivation path of external change address. Default is `0/0`

#### Result

changeAddress `string`: cashaddr encoded change address

#### Examples

      // generate 5 mainnet external change addresses for xpub6DTNmB7gWa8RtQAfmy8wSDikM5mky4fhsnqQd9AqoCaLcekqNgRZW5JCSXwXkLDkABHTD1qx7kqrbGzT6xBGfAvCJSj2rwvKWP8eZBR2EVA
      let xpub = 'xpub6DTNmB7gWa8RtQAfmy8wSDikM5mky4fhsnqQd9AqoCaLcekqNgRZW5JCSXwXkLDkABHTD1qx7kqrbGzT6xBGfAvCJSj2rwvKWP8eZBR2EVA';
      for(let i = 0; i <= 4; i++) {
        console.log(bitbox.Address.fromXPub(xpub, "0/" + i))
      }
      // bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh
      // bitcoincash:qrr2suh9yjsrkl2qp3p967uhfg6u0r6xxsn9h5vuvr
      // bitcoincash:qpkfg4kck99wksyss6nvaqtafeahfnyrpsj0ed372t
      // bitcoincash:qppgmuuwy07g0x39sx2z0x2u8e34tvfdxvy0c2jvx7
      // bitcoincash:qryj8x4s7vfsc864jm0xaak9qfe8qgk245y9ska57l

      // generate 5 testnet external change addresses for tpubDCrnMSKwDMAbxg82yqDt97peMvftCXk3EfBb9WgZh27mPbHGkysU3TW7qX5AwydmnVQfaGeNhUR6okQ3dS5AJTP9gEP7jk2Wcj6Xntc6gNh
      let xpub = 'tpubDCrnMSKwDMAbxg82yqDt97peMvftCXk3EfBb9WgZh27mPbHGkysU3TW7qX5AwydmnVQfaGeNhUR6okQ3dS5AJTP9gEP7jk2Wcj6Xntc6gNh';
      for(let i = 0; i <= 4; i++) {
        console.log(bitbox.Address.fromXPub(xpub, "0/" + i))
      }
      // bchtest:qrth8470sc9scek9u0jj2d0349t62gxzdstw2jukl8
      // bchtest:qpm56zc5re0nhms96r7p985aajthp0vxvg6e4ux3kc
      // bchtest:qqtu3tf6yyd73ejhk3a2ylqynpl3mzzhwuzt299jfd
      // bchtest:qzd7dvlnfukggjqsf5ju0qqwwltakfumjsck33js6m
      // bchtest:qq322ataqeas4n0pdn4gz2sdereh5ae43ylk4qdvus

### `fromXPriv`

Generates an address for an extended private key (xpriv)

#### Arguments

1.  xpriv `string`: extended private key to be used
2.  path `string` **optional**: derivation path of change address. Default is `0'/0`

#### Result

changeAddress `string`: cashaddr encoded change address

#### Examples

      // generate 5 mainnet addresses for xprvA2WwD9mk1Qd3rMjQ4ZRHvCWCj47jbXjY9Nf7npNRBmGUJngpRAvJzNpNgt7h2dDQ5huG7yFwYfz4PFJDPzkqfvBNPHnaio4yAbbUuv3EBnL
      let xpriv = 'xprvA2WwD9mk1Qd3rMjQ4ZRHvCWCj47jbXjY9Nf7npNRBmGUJngpRAvJzNpNgt7h2dDQ5huG7yFwYfz4PFJDPzkqfvBNPHnaio4yAbbUuv3EBnL';
      for(let i = 0; i <= 4; i++) {
        console.log(bitbox.Address.fromXPriv(xpriv, "0'/" + i))
      }
      // bitcoincash:qpmcs78tpfvfphhedcczydaddu5wmcx0xvrwf3fjph
      // bitcoincash:qppfr7fu4dzxguen85rjwa6ress3sl839qyudganxj
      // bitcoincash:qpuaaaseccxyjj04d2l3qv4vd2wxj6gtwvnfe3ckh8
      // bitcoincash:qp46n7a53jvkarp9ps595fjv8czfd045v5zk4xhspm
      // bitcoincash:qprjdqx7cnrac4uemp2fza08k875wsgzfcapk76n9n

      // generate 5 testnet addresses for tprv8jBszV65QgT8TAxvj8Go5r8C3BXwq3mYUvaEfEnsfjkx6PRuQYG4W8Bpc4HM2zbiT9S384shi2Zrr6qxXD6nUySxuvztP9o25hLuMcDvMYD
      let xpriv = 'tprv8jBszV65QgT8TAxvj8Go5r8C3BXwq3mYUvaEfEnsfjkx6PRuQYG4W8Bpc4HM2zbiT9S384shi2Zrr6qxXD6nUySxuvztP9o25hLuMcDvMYD';
      for(let i = 0; i <= 4; i++) {
        console.log(bitbox.Address.fromXPub(xpriv, "0'/" + i))
      }
      // bchtest:qpmcs78tpfvfphhedcczydaddu5wmcx0xv8udkt9xt
      // bchtest:qppfr7fu4dzxguen85rjwa6ress3sl839qqwf0lypw
      // bchtest:qpuaaaseccxyjj04d2l3qv4vd2wxj6gtwvhmak6psm
      // bchtest:qp46n7a53jvkarp9ps595fjv8czfd045v5xy3p48x8
      // bchtest:qprjdqx7cnrac4uemp2fza08k875wsgzfcenjecyz0

### `fromOutputScript`

Detect an addess from an OutputScript.

#### Arguments

1.  scriptPubKey `Buffer`: scriptPubKey
2.  network `string` **optional**: defaults to "mainnet"

#### Result

changeAddress `string`: cashaddr encoded change address

#### Examples

      const script = bitbox.Script.encode([
        Buffer.from("BOX", "ascii"),
        bitbox.Script.opcodes.OP_CAT,
        Buffer.from("BITBOX", "ascii"),
        bitbox.Script.opcodes.OP_EQUAL
      ]);
      const p2sh_hash160 = bitbox.Crypto.hash160(script);
      const scriptPubKey = bitbox.Script.scriptHash.output.encode(p2sh_hash160);

      // mainnet address from output script
      bitbox.Address.fromOutputScript(scriptPubKey);
      // bitcoincash:pz0qcslrqn7hr44hsszwl4lw5r6udkg6zqncnufkrl

      // testnet address from output script
      bitbox.Address.fromOutputScript(scriptPubKey, 'testnet');
      // bchtest:pz0qcslrqn7hr44hsszwl4lw5r6udkg6zqh2hmtpyr

### `isHash160`

Detect if an addess is a hash160.

#### Arguments

1.  address `string`: address

#### Result

isHash160 `boolean`: true/false if address is hash160

#### Examples

      let hash160Address = '428df38e23fc879a25819427995c3e6355b12d33';
      bitbox.Address.isHash160(hash160Address);
      // true

      let notHash160Address = 'bitcoincash:pz8a837lttkvjksg0jjmmulqvfkgpqrcdgufy8ns5s';
      bitbox.Address.isHash160(notHash160Address);
      // false

### `legacyToHash160`

Convert legacy address to hash160.

#### Arguments

1.  address `string`: legacy address

#### Result

hash160 `string`: hash160

#### Examples

    // legacy mainnet p2pkh
    bitbox.Address.legacyToHash160("18xHZ8g2feo4ceejGpvzHkvXT79fi2ZdTG")
    // 573d93b475be4f1925f3b74ed951201b0147eac1

    // legacy mainnet p2sh
    bitbox.Address.legacyToHash160("3DA6RBcFgLwLTpnF6BRAee8w6a9H6JQLCm")
    // 7dc85da64d1d93ef01ef62e0221c02f512e3942f

    // legacy testnet p2pkh
    bitbox.Address.legacyToHash160("mhTg9sgNgvAGfmJs192oUzQWqAXHH5nqLE")
    // 155187a3283b08b30519db50bc23bbba9f4b6657

### `cashToHash160`

Convert cash address to hash160.

#### Arguments

1.  address `string`: cash address

#### Result

hash160 `string`: hash160

#### Examples

    // cash address mainnet p2pkh
    bitbox.Address.cashToHash160("bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh")
    // 573d93b475be4f1925f3b74ed951201b0147eac1

    // cash address mainnet p2sh
    bitbox.Address.cashToHash160("bitcoincash:pp7ushdxf5we8mcpaa3wqgsuqt639cu59ur5xu5fug")
    // 7dc85da64d1d93ef01ef62e0221c02f512e3942f

    // cash address testnet p2pkh
    bitbox.Address.cashToHash160("bchtest:qq24rpar9qas3vc9r8d4p0prhwaf7jmx2u22nzt946")
    // 155187a3283b08b30519db50bc23bbba9f4b6657

### `hash160ToLegacy`

Convert hash160 to legacy address.

#### Arguments

1.  hash160 `string`: hash160
2.  network `number` **optional**

#### Result

legacyAddress `string`: the address in legacy format

#### Examples

    // legacy mainnet p2pkh
    bitbox.Address.hash160ToLegacy("573d93b475be4f1925f3b74ed951201b0147eac1")
    // 18xHZ8g2feo4ceejGpvzHkvXT79fi2ZdTG

    // legacy mainnet p2sh
    bitbox.Address.hash160ToLegacy("7dc85da64d1d93ef01ef62e0221c02f512e3942f", 0x05)
    // 3DA6RBcFgLwLTpnF6BRAee8w6a9H6JQLCm

    // legacy testnet p2pkh
    bitbox.Address.hash160ToLegacy("155187a3283b08b30519db50bc23bbba9f4b6657", 0x6f)
    // mhTg9sgNgvAGfmJs192oUzQWqAXHH5nqLE

### `hash160ToCash`

Convert hash160 to cash address.

#### Arguments

1.  hash160 `string`: hash160
2.  network `number` **optional**

#### Result

cashAddress `string`: the address in cash format

#### Examples

    bitbox.Address.hash160ToCash("573d93b475be4f1925f3b74ed951201b0147eac1")
    'bitcoincash:qptnmya5wkly7xf97wm5ak23yqdsz3l2cyj7k9vyyh'
    bitbox.Address.hash160ToCash("7dc85da64d1d93ef01ef62e0221c02f512e3942f", 0x05)
    'bitcoincash:pp7ushdxf5we8mcpaa3wqgsuqt639cu59ur5xu5fug'
    bitbox.Address.hash160ToCash("155187a3283b08b30519db50bc23bbba9f4b6657", 0x6f)
    'bchtest:qq24rpar9qas3vc9r8d4p0prhwaf7jmx2u22nzt946'

### `details`

Return details about an address including balance.

#### Arguments

- addresses (required):
  - `string`: A single string containing a legacy or cash address.
  - `Array` of strings: Array with maximum of 20 legacy or cash addresses.

#### Result

- details:
  - `Promise<AddressDetailsResult>`: containing details about the single address.
  - `Promise<AddressDetailsResult[]>`: Array of Objects with details about addresses.

#### Examples

    (async () => {
      try {
        let details = await bitbox.Address.details('1BFHGm4HzqgXXyNX8n7DsQno5DAC4iLMRA');
        console.log(details)
      } catch(error) {
       console.error(error)
      }
    })()

    // {
    //   "addrStr": "1BFHGm4HzqgXXyNX8n7DsQno5DAC4iLMRA",
    //   "balance": 0.36781097,
    //   "balanceSat": 36781097,
    //   "totalReceived": 0.36781097,
    //   "totalReceivedSat": 36781097,
    //   "totalSent": 0,
    //   "totalSentSat": 0,
    //   "unconfirmedBalance": 0,
    //   "unconfirmedBalanceSat": 0,
    //   "unconfirmedTxAppearances": 0,
    //   "txAppearances": 7,
    //   "transactions": [
    //     "f737485aaee3c10b13013fa109bb6294b099246134ca9885f4cc332dbc6c9bb4",
    //     "decd5b9c0c959e4e543182093e8f7f8bc7a6ecd96a8a062daaeff3667f8feca7",
    //     "94e69a627a34ae27fca81d15fff4323a7ce1f7c275c7485762ce018221017632",
    //     "e67c70787af7f3506263c9eda007f3d2d24bd750ff95b5c50a120d9118dfd807",
    //     "8e5e00704a147d54028f94d52df7730e821b9c6cd4bd29494e5636f49c199d6a",
    //     "15102827c108566ea5daf725c09079c1a3f42ef99d1eb68ea8c584f7b16ab87a",
    //     "cc27be8846276612dfce5924b7be96556212f0f0e62bd17641732175edb9911e"
    //   ]
    // }

    (async () => {
      try {
        let details = await bitbox.Address.details(['1BFHGm4HzqgXXyNX8n7DsQno5DAC4iLMRA', "bitcoincash:qp7ekaepv3wf2nq035hevcma4x9sxmp3w56048g6ra"]);
        console.log(details)
      } catch(error) {
       console.error(error)
      }
    })()

    // [ { balance: 0.36781097,
    //   balanceSat: 36781097,
    //   totalReceived: 0.36781097,
    //   totalReceivedSat: 36781097,
    //   totalSent: 0,
    //   totalSentSat: 0,
    //   unconfirmedBalance: 0,
    //   unconfirmedBalanceSat: 0,
    //   unconfirmedTxAppearances: 0,
    //   txAppearances: 7,
    //   transactions:
    //    [ 'f737485aaee3c10b13013fa109bb6294b099246134ca9885f4cc332dbc6c9bb4',
    //      'decd5b9c0c959e4e543182093e8f7f8bc7a6ecd96a8a062daaeff3667f8feca7',
    //      '94e69a627a34ae27fca81d15fff4323a7ce1f7c275c7485762ce018221017632',
    //      'e67c70787af7f3506263c9eda007f3d2d24bd750ff95b5c50a120d9118dfd807',
    //      '8e5e00704a147d54028f94d52df7730e821b9c6cd4bd29494e5636f49c199d6a',
    //      '15102827c108566ea5daf725c09079c1a3f42ef99d1eb68ea8c584f7b16ab87a',
    //      'cc27be8846276612dfce5924b7be96556212f0f0e62bd17641732175edb9911e' ],
    //   legacyAddress: '1BFHGm4HzqgXXyNX8n7DsQno5DAC4iLMRA',
    //   cashAddress: 'bitcoincash:qpcxf2sv9hjw08nvpgffpamfus9nmksm3chv5zqtnz' },
    // { balance: 0,
    //   balanceSat: 0,
    //   totalReceived: 0,
    //   totalReceivedSat: 0,
    //   totalSent: 0,
    //   totalSentSat: 0,
    //   unconfirmedBalance: 0,
    //   unconfirmedBalanceSat: 0,
    //   unconfirmedTxAppearances: 0,
    //   txAppearances: 0,
    //   transactions: [],
    //   legacyAddress: '1CT9huFgxMFveRvzZ7zPPJNoaMm2Fo64VH',
    //   cashAddress: 'bitcoincash:qp7ekaepv3wf2nq035hevcma4x9sxmp3w56048g6ra' } ]

### `utxo`

Return list of uxto for address. This includes confirmed and unconfirmed utxos.

#### Arguments

- addresses (required) - 2 formats allowed:
  - `string`: A single string containing a legacy or cash address.
  - `Array` of strings: Array with maximum of 20 legacy or cash addresses.

#### Result

- utxo (2 formats based on the argument format):
  - utxo `Promise<AddressUtxoResult>`
  - utxos `Promise<AddressUtxoResult[]>`

#### Examples

    (async () => {
      try {
        let utxo = await bitbox.Address.utxo('1M1FYu4zuVaxRPWLZG5CnP8qQrZaqu6c2L');
        console.log(utxo);
      } catch(error) {
       console.error(error)
      }
    })()

    // {
    //   "utxos": [
    //     {
    //       "txid": "27ec8512c1a9ee9e9ae9b98eb60375f1d2bd60e2e76a1eff5a45afdbc517cf9c",
    //       "vout": 0,
    //       "amount": 0.001,
    //       "satoshis": 100000,
    //       "height": 560430,
    //       "confirmations": 5163
    //     },
    //     {
    //       "txid": "6e1ae1bf7db6de799ec1c05ab2816ac65549bd80141567af088e6f291385b07d",
    //       "vout": 0,
    //       "amount": 0.0013,
    //       "satoshis": 130000,
    //       "height": 560039,
    //       "confirmations": 5554
    //     }
    //   ],
    //   "legacyAddress": "1M1FYu4zuVaxRPWLZG5CnP8qQrZaqu6c2L",
    //   "cashAddress": "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
    //   "scriptPubKey": "76a914db6ea94fa26b7272dc5e1487c35f258391e0f38788ac"
    // }

    (async () => {
      try {
        let utxo = await bitbox.Address.utxo([
          "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
          "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
        ]);
        console.log(utxo);
      } catch(error) {
       console.error(error)
      }
    })()

    // [
    //   {
    //     "utxos": [
    //       {
    //         "txid": "27ec8512c1a9ee9e9ae9b98eb60375f1d2bd60e2e76a1eff5a45afdbc517cf9c",
    //         "vout": 0,
    //         "amount": 0.001,
    //         "satoshis": 100000,
    //         "height": 560430,
    //         "confirmations": 5163
    //       },
    //       {
    //         "txid": "6e1ae1bf7db6de799ec1c05ab2816ac65549bd80141567af088e6f291385b07d",
    //         "vout": 0,
    //         "amount": 0.0013,
    //         "satoshis": 130000,
    //         "height": 560039,
    //         "confirmations": 5554
    //       }
    //     ],
    //     "legacyAddress": "1M1FYu4zuVaxRPWLZG5CnP8qQrZaqu6c2L",
    //     "cashAddress": "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
    //     "scriptPubKey": "76a914db6ea94fa26b7272dc5e1487c35f258391e0f38788ac"
    //   },
    //   {
    //     "utxos": [],
    //     "legacyAddress": "19LXyLnux1tbTdHnMuYAgDZ81ZQDWEi12g",
    //     "cashAddress": "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
    //   }
    // ]

### `unconfirmed`

Return list of unconfirmed transactions for address

#### Arguments

- addresses (required):
  - `string`: A single string containing a legacy or cash address.
  - `Array` of strings: Array with maximum of 20 legacy or cash addresses.

#### Result

- unconfirmed:
  - utxo `Promise<AddressUnconfirmedResult>`: containing `utxo` array of utxos, plus `legacyAddress` and
    `cashAddress` properties.
  - utxos `Promise<AddressUnconfirmedResult[]>`: Array of utxo Objects.

#### Examples

    (async () => {
      try {
        let unconfirmed = await bitbox.Address.unconfirmed('1JCwsMQtiV85fGjps4zXceaCCgxpQ1u84R');
        console.log(unconfirmed);
      } catch(error) {
       console.error(error)
      }
    })()

    // {
    //   "utxos": [
    //     {
    //       "address": "1JCwsMQtiV85fGjps4zXceaCCgxpQ1u84R",
    //       "txid": "5ddf277cecefab4bb75fb5d6ba21170cec756ef28a045cb4ec45ccffda28cdaf",
    //       "vout": 0,
    //       "scriptPubKey": "76a914bcbc83f8fadb704a6aeccf38079e428da445b11e88ac",
    //       "amount": 0.0001,
    //       "satoshis": 10000,
    //       "confirmations": 0,
    //       "ts": 1547670883
    //     }
    //   ],
    //   "legacyAddress": "1JCwsMQtiV85fGjps4zXceaCCgxpQ1u84R",
    //   "cashAddress": "bitcoincash:qz7teqlcltdhqjn2an8nspu7g2x6g3d3rcq8nk4nzs"
    // }

    (async () => {
      try {
        let unconfirmed = await bitbox.Address.unconfirmed(['1JCwsMQtiV85fGjps4zXceaCCgxpQ1u84R', "bitcoincash:qqcp8fw06dmjd2gnfanpwytj7q93w408nv7usdqgsk"])
        console.log(unconfirmed);
      } catch(error) {
       console.error(error)
      }
    })()

    // [
    //   {
    //     "utxos": [
    //       {
    //         "address": "1JCwsMQtiV85fGjps4zXceaCCgxpQ1u84R",
    //         "txid": "5ddf277cecefab4bb75fb5d6ba21170cec756ef28a045cb4ec45ccffda28cdaf",
    //         "vout": 0,
    //         "scriptPubKey": "76a914bcbc83f8fadb704a6aeccf38079e428da445b11e88ac",
    //         "amount": 0.0001,
    //         "satoshis": 10000,
    //         "confirmations": 0,
    //         "ts": 1547670883
    //       }
    //     ],
    //     "legacyAddress": "1JCwsMQtiV85fGjps4zXceaCCgxpQ1u84R",
    //     "cashAddress": "bitcoincash:qz7teqlcltdhqjn2an8nspu7g2x6g3d3rcq8nk4nzs"
    //   },
    //   {
    //     "utxos": [
    //       {
    //         "address": "15PCyMYPK6EX4xGenwG55FwdNnuyoHzYAX",
    //         "txid": "f15ea5a836165bff9d711e9a1340e23554e28e03239aa3f4f9951c11ca1b6962",
    //         "vout": 0,
    //         "scriptPubKey": "76a9143013a5cfd37726a9134f66171172f00b1755e79b88ac",
    //         "amount": 0.0001,
    //         "satoshis": 10000,
    //         "confirmations": 0,
    //         "ts": 1547670908
    //       }
    //     ],
    //     "legacyAddress": "15PCyMYPK6EX4xGenwG55FwdNnuyoHzYAX",
    //     "cashAddress": "bitcoincash:qqcp8fw06dmjd2gnfanpwytj7q93w408nv7usdqgsk"
    //   }
    // ]

### `transactions`

Returns decoded transactions for an address

#### Arguments

- addresses (required):
  - `string`: A single string containing a legacy or cash address.
  - `Array` of strings: Array with maximum of 20 legacy or cash addresses.

#### Result

- transaction:
  - `Object`: containing `txs` array of decoded transactions, plus `legacyAddress` and
    `cashAddress` properties.
  - `Array`: Array of txs Objects.

#### Examples

    (async () => {
      try {
        let transaction = await bitbox.Address.transactions('bitcoincash:qz7teqlcltdhqjn2an8nspu7g2x6g3d3rcq8nk4nzs');
        console.log(transaction);
      } catch(error) {
       console.error(error)
      }
    })()

    // {
    //   "pagesTotal": 1,
    //   "txs": [
    //     {
    //       "txid": "5ddf277cecefab4bb75fb5d6ba21170cec756ef28a045cb4ec45ccffda28cdaf",
    //       "version": 2,
    //       "locktime": 0,
    //       "vin": [
    //         {
    //           "txid": "d0ff03c2429810991e8e23cfe2f253891eaae391bcbfd61706d340d9d649abea",
    //           "vout": 0,
    //           "sequence": 4294967295,
    //           "n": 0,
    //           "scriptSig": {
    //             "hex": "483045022100fc121a12774e7f212f42898ea123ecc03099dc610a48627649f58490f183027b0220113964a117dc5aaed7c76a569a287797ccffad192cc346114340e59a706a1cd841210242faa7cc02f9e6c3a0aec97a946b9d3793fa6ab76362e02dd239bc56393671cd",
    //             "asm": "3045022100fc121a12774e7f212f42898ea123ecc03099dc610a48627649f58490f183027b0220113964a117dc5aaed7c76a569a287797ccffad192cc346114340e59a706a1cd8[ALL|FORKID] 0242faa7cc02f9e6c3a0aec97a946b9d3793fa6ab76362e02dd239bc56393671cd"
    //           },
    //           "addr": "1GQTe9EdBaF4fCTC2esvPNXewkUZoytADL",
    //           "valueSat": 3466913,
    //           "value": 0.03466913,
    //           "doubleSpentTxID": null
    //         }
    //       ],
    //       "vout": [
    //         {
    //           "value": "0.00010000",
    //           "n": 0,
    //           "scriptPubKey": {
    //             "hex": "76a914bcbc83f8fadb704a6aeccf38079e428da445b11e88ac",
    //             "asm": "OP_DUP OP_HASH160 bcbc83f8fadb704a6aeccf38079e428da445b11e OP_EQUALVERIFY OP_CHECKSIG",
    //             "addresses": [
    //               "1JCwsMQtiV85fGjps4zXceaCCgxpQ1u84R"
    //             ],
    //             "type": "pubkeyhash"
    //           },
    //           "spentTxId": null,
    //           "spentIndex": null,
    //           "spentHeight": null
    //         },
    //         {
    //           "value": "0.03456687",
    //           "n": 1,
    //           "scriptPubKey": {
    //             "hex": "76a914a8f9b1307fa412da6a909f08930e5a502d27a74a88ac",
    //             "asm": "OP_DUP OP_HASH160 a8f9b1307fa412da6a909f08930e5a502d27a74a OP_EQUALVERIFY OP_CHECKSIG",
    //             "addresses": [
    //               "1GQTe9EdBaF4fCTC2esvPNXewkUZoytADL"
    //             ],
    //             "type": "pubkeyhash"
    //           },
    //           "spentTxId": null,
    //           "spentIndex": null,
    //           "spentHeight": null
    //         }
    //       ],
    //       "blockheight": -1,
    //       "confirmations": 0,
    //       "time": 1547674527,
    //       "valueOut": 0.03466687,
    //       "size": 226,
    //       "valueIn": 0.03466913,
    //       "fees": 0.00000226
    //     }
    //   ],
    //   "legacyAddress": "1JCwsMQtiV85fGjps4zXceaCCgxpQ1u84R",
    //   "cashAddress": "bitcoincash:qz7teqlcltdhqjn2an8nspu7g2x6g3d3rcq8nk4nzs",
    //   "currentPage": 0
    // }

    (async () => {
      try {
        let transaction = await bitbox.Address.transactions([
          "bitcoincash:qz7teqlcltdhqjn2an8nspu7g2x6g3d3rcq8nk4nzs",
          "bitcoincash:qqcp8fw06dmjd2gnfanpwytj7q93w408nv7usdqgsk"
        ]);
        console.log(transaction);
      } catch(error) {
       console.error(error)
      }
    })()

    // [
    //   {
    //     "pagesTotal": 1,
    //     "txs": [
    //       {
    //         "txid": "5ddf277cecefab4bb75fb5d6ba21170cec756ef28a045cb4ec45ccffda28cdaf",
    //         "version": 2,
    //         "locktime": 0,
    //         "vin": [
    //           {
    //             "txid": "d0ff03c2429810991e8e23cfe2f253891eaae391bcbfd61706d340d9d649abea",
    //             "vout": 0,
    //             "sequence": 4294967295,
    //             "n": 0,
    //             "scriptSig": {
    //               "hex": "483045022100fc121a12774e7f212f42898ea123ecc03099dc610a48627649f58490f183027b0220113964a117dc5aaed7c76a569a287797ccffad192cc346114340e59a706a1cd841210242faa7cc02f9e6c3a0aec97a946b9d3793fa6ab76362e02dd239bc56393671cd",
    //               "asm": "3045022100fc121a12774e7f212f42898ea123ecc03099dc610a48627649f58490f183027b0220113964a117dc5aaed7c76a569a287797ccffad192cc346114340e59a706a1cd8[ALL|FORKID] 0242faa7cc02f9e6c3a0aec97a946b9d3793fa6ab76362e02dd239bc56393671cd"
    //             },
    //             "addr": "1GQTe9EdBaF4fCTC2esvPNXewkUZoytADL",
    //             "valueSat": 3466913,
    //             "value": 0.03466913,
    //             "doubleSpentTxID": null
    //           }
    //         ],
    //         "vout": [
    //           {
    //             "value": "0.00010000",
    //             "n": 0,
    //             "scriptPubKey": {
    //               "hex": "76a914bcbc83f8fadb704a6aeccf38079e428da445b11e88ac",
    //               "asm": "OP_DUP OP_HASH160 bcbc83f8fadb704a6aeccf38079e428da445b11e OP_EQUALVERIFY OP_CHECKSIG",
    //               "addresses": [
    //                 "1JCwsMQtiV85fGjps4zXceaCCgxpQ1u84R"
    //               ],
    //               "type": "pubkeyhash"
    //             },
    //             "spentTxId": null,
    //             "spentIndex": null,
    //             "spentHeight": null
    //           },
    //           {
    //             "value": "0.03456687",
    //             "n": 1,
    //             "scriptPubKey": {
    //               "hex": "76a914a8f9b1307fa412da6a909f08930e5a502d27a74a88ac",
    //               "asm": "OP_DUP OP_HASH160 a8f9b1307fa412da6a909f08930e5a502d27a74a OP_EQUALVERIFY OP_CHECKSIG",
    //               "addresses": [
    //                 "1GQTe9EdBaF4fCTC2esvPNXewkUZoytADL"
    //               ],
    //               "type": "pubkeyhash"
    //             },
    //             "spentTxId": null,
    //             "spentIndex": null,
    //             "spentHeight": null
    //           }
    //         ],
    //         "blockheight": -1,
    //         "confirmations": 0,
    //         "time": 1547674527,
    //         "valueOut": 0.03466687,
    //         "size": 226,
    //         "valueIn": 0.03466913,
    //         "fees": 0.00000226
    //       }
    //     ],
    //     "legacyAddress": "1JCwsMQtiV85fGjps4zXceaCCgxpQ1u84R",
    //     "cashAddress": "bitcoincash:qz7teqlcltdhqjn2an8nspu7g2x6g3d3rcq8nk4nzs",
    //     "currentPage": 0
    //   },
    //   {
    //     "pagesTotal": 1,
    //     "txs": [
    //       {
    //         "txid": "f15ea5a836165bff9d711e9a1340e23554e28e03239aa3f4f9951c11ca1b6962",
    //         "version": 2,
    //         "locktime": 0,
    //         "vin": [
    //           {
    //             "txid": "5ddf277cecefab4bb75fb5d6ba21170cec756ef28a045cb4ec45ccffda28cdaf",
    //             "vout": 1,
    //             "sequence": 4294967295,
    //             "n": 0,
    //             "scriptSig": {
    //               "hex": "47304402206124fca6aecc35e48b5d1293bd97cadb39f830308c75331b3e5fd2e6806efe9b0220014cf3ecf0be1cb1bee7e362257b33e0905451d44f0902b13ada2765d53332d741210242faa7cc02f9e6c3a0aec97a946b9d3793fa6ab76362e02dd239bc56393671cd",
    //               "asm": "304402206124fca6aecc35e48b5d1293bd97cadb39f830308c75331b3e5fd2e6806efe9b0220014cf3ecf0be1cb1bee7e362257b33e0905451d44f0902b13ada2765d53332d7[ALL|FORKID] 0242faa7cc02f9e6c3a0aec97a946b9d3793fa6ab76362e02dd239bc56393671cd"
    //             },
    //             "addr": "1GQTe9EdBaF4fCTC2esvPNXewkUZoytADL",
    //             "valueSat": 3456687,
    //             "value": 0.03456687,
    //             "doubleSpentTxID": null
    //           }
    //         ],
    //         "vout": [
    //           {
    //             "value": "0.00010000",
    //             "n": 0,
    //             "scriptPubKey": {
    //               "hex": "76a9143013a5cfd37726a9134f66171172f00b1755e79b88ac",
    //               "asm": "OP_DUP OP_HASH160 3013a5cfd37726a9134f66171172f00b1755e79b OP_EQUALVERIFY OP_CHECKSIG",
    //               "addresses": [
    //                 "15PCyMYPK6EX4xGenwG55FwdNnuyoHzYAX"
    //               ],
    //               "type": "pubkeyhash"
    //             },
    //             "spentTxId": null,
    //             "spentIndex": null,
    //             "spentHeight": null
    //           },
    //           {
    //             "value": "0.03446461",
    //             "n": 1,
    //             "scriptPubKey": {
    //               "hex": "76a914a8f9b1307fa412da6a909f08930e5a502d27a74a88ac",
    //               "asm": "OP_DUP OP_HASH160 a8f9b1307fa412da6a909f08930e5a502d27a74a OP_EQUALVERIFY OP_CHECKSIG",
    //               "addresses": [
    //                 "1GQTe9EdBaF4fCTC2esvPNXewkUZoytADL"
    //               ],
    //               "type": "pubkeyhash"
    //             },
    //             "spentTxId": null,
    //             "spentIndex": null,
    //             "spentHeight": null
    //           }
    //         ],
    //         "blockheight": -1,
    //         "confirmations": 0,
    //         "time": 1547674527,
    //         "valueOut": 0.03456461,
    //         "size": 225,
    //         "valueIn": 0.03456687,
    //         "fees": 0.00000226
    //       }
    //     ],
    //     "legacyAddress": "15PCyMYPK6EX4xGenwG55FwdNnuyoHzYAX",
    //     "cashAddress": "bitcoincash:qqcp8fw06dmjd2gnfanpwytj7q93w408nv7usdqgsk",
    //     "currentPage": 0
    //   }
    // ]

## Interfaces

### AddressDetailsResult

    {
      balance: number
      balanceSat: number
      totalReceived: number
      totalReceivedSat: number
      totalSent: number
      totalSentSat: number
      unconfirmedBalance: number
      unconfirmedBalanceSat: number
      unconfirmedTxApperances: number
      txApperances: number
      transactions: string[]
      legacyAddress: string
      cashAddress: string
    }

### AddressUtxoResult

    {
      legacyAddress: string
      cashAddress: string
      scriptPubKey: string
      utxos: [
        {
          txid: string
          vout: number
          amount: number
          satoshis: number
          height: number
          confirmations: number
        }
      ]
    }

### AddressUnconfirmedResult

    {
      txid: string
      vout: number
      scriptPubKey: string
      amount: number
      satoshis: number
      confirmations: number
      ts: number
      legacyAddress: string
      cashAddress: string
    }
