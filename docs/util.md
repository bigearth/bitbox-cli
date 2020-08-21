# Util

### `validateAddress`

Return information about the given bitcoin address.

#### Arguments

- address `string | string[]`

#### Result

- addressDetails `Promise<AddressDetails | AddressDetails[]>`

#### Examples

    (async () => {
      try {
        let validateAddress = await bitbox.Util.validateAddress("bitcoincash:qzc86hrdufhcwlyzk7k82x77kfs2myekn57nv9cw5f");
        console.log(validateAddress);
      } catch(error) {
       console.error(error)
      }
    })()

    // { isvalid: true,
    // address: '17fshh33qUze2yifiJ2sXgijSMzJ2KNEwu',
    // scriptPubKey: '76a914492ae280d70af33acf0ae7cd329b961e65e9cbd888ac',
    // ismine: true,
    // iswatchonly: false,
    // isscript: false,
    // pubkey: '0312eeb9ae5f14c3cf43cece11134af860c2ef7d775060e3a578ceec888acada31',
    // iscompressed: true,
    // account: 'Test' }

    (async () => {
      try {
        let validateAddress = await bitbox.Util.validateAddress(["bitcoincash:qzc86hrdufhcwlyzk7k82x77kfs2myekn57nv9cw5f"]);
        console.log(validateAddress);
      } catch(error) {
       console.error(error)
      }
    })()

    // [{ isvalid: true,
    // address: '17fshh33qUze2yifiJ2sXgijSMzJ2KNEwu',
    // scriptPubKey: '76a914492ae280d70af33acf0ae7cd329b961e65e9cbd888ac',
    // ismine: true,
    // iswatchonly: false,
    // isscript: false,
    // pubkey: '0312eeb9ae5f14c3cf43cece11134af860c2ef7d775060e3a578ceec888acada31',
    // iscompressed: true,
    // account: 'Test' }]

### `sweep`

Sweep utxo for `wif` to cashAddress

#### Arguments

- wif `string`
- toAddr `string`
- balanceOnly `boolean` **optional**. Defaults to `false`

#### Result

- result `string | number`

#### Examples

    // balance only
    (async () => {
      try {
        const wif = "cP8LcsoMneSyjdtyFTmnASsmAuyd2SfZjG4drp5twAJoSpRa2RCx"
        const toAddr = "bchtest:qqmd9unmhkpx4pkmr6fkrr8rm6y77vckjvqe8aey35"
        const result = await bitbox.Util.sweep(
          wif,
          toAddr,
          true
        )
        console.log(result);
      } catch(error) {
       console.error(error)
      }
    })()
    // 0.1

    // sweep utxo
    (async () => {
      try {
        const wif = "cP8LcsoMneSyjdtyFTmnASsmAuyd2SfZjG4drp5twAJoSpRa2RCx"
        const toAddr = "bchtest:qqmd9unmhkpx4pkmr6fkrr8rm6y77vckjvqe8aey35"
        const result = await bitbox.Util.sweep(
          wif,
          toAddr
        )
        console.log(result);
      } catch(error) {
       console.error(error)
      }
    })()
    // 6b647ddfbb6b0edfaf61d2952b9f8e195d2dfede0e63fe12e1beab16e5bcfe5c

## Interfaces

### AddressDetails

    {
      isvalid: boolean
      address: string
      scriptPubKey: string
      ismine: boolean
      iswatchonly: boolean
      isscript: boolean
      pubkey: string
      iscompressed: boolean
      account: string
    }
