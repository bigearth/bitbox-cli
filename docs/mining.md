# Mining

### `getMiningInfo`

Returns a json object containing mining-related information.

#### Result

miningInfo: `Promise<any>`

#### Examples

    (async () => {
      try {
        let getMiningInfo = await bitbox.Mining.getMiningInfo();
        console.log(getMiningInfo);
      } catch(error) {
       console.error(error)
      }
    })()

### `getNetworkHashps`

Returns the estimated network hashes per second based on the last n blocks. Pass in \[blocks\] to override # of blocks, -1 specifies since last difficulty change. Pass in \[height\] to estimate the network speed at the time when a certain block was found.

#### Arguments

1.  nblocks `number` **optional**: The number of blocks, or -1 for blocks since last difficulty change.
2.  height `number`, **optional**: To estimate at the time of the given height.

#### Result

x `Promise<number>`: Hashes per second estimated

#### Examples

    (async () => {
      try {
        let getNetworkHashps = await bitbox.Mining.getNetworkHashps();
        console.log(getNetworkHashps);
      } catch(error) {
       console.error(error)
      }
    })()
