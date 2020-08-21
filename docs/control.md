# Control

### `getInfo`

Returns an object containing various state info.

#### Result

info `Promise<NodeInfo>`

#### Examples

    (async () => {
      try {
        let getInfo = await bitbox.Control.getInfo();
        console.log(getInfo);
      } catch(error) {
       console.error(error)
      }
    })()

    // { version: 170000,
    // protocolversion: 70015,
    // blocks: 529235,
    // timeoffset: 0,
    // connections: 35,
    // proxy: '',
    // difficulty: 702784497476.8376,
    // testnet: false,
    // paytxfee: 0,
    // relayfee: 0.00001,
    // errors: '' }

### `getNetworkInfo`

Returns an object containing various network info.

#### Result

networkInfo `Promise<NetworkInfo>`

#### Examples

    (async () => {
      try {
        let getInfo = await bitbox.Control.getNetworkInfo();
        console.log(getInfo);
      } catch(error) {
       console.error(error)
      }
    })()

    // returns
    { version: 190500,
      subversion: '/Bitcoin ABC:0.19.5(EB32.0)/',
      protocolversion: 70015,
      localservices: '0000000000000425',
      localrelay: true,
      timeoffset: 0,
      networkactive: true,
      connections: 17,
      networks:
      [ { name: 'ipv4',
          limited: false,
          reachable: true,
          proxy: '',
          proxy_randomize_credentials: false },
        { name: 'ipv6',
          limited: false,
          reachable: true,
          proxy: '',
          proxy_randomize_credentials: false },
        { name: 'onion',
          limited: true,
          reachable: false,
          proxy: '',
          proxy_randomize_credentials: false } ],
      relayfee: 0.00001,
      excessutxocharge: 0,
      warnings:
      'Warning: Unknown block versions being mined! It\'s possible unknown rules are in effect' }}

## Interfaces

### NodeInfo

    {
      version: number
      protocolversion: number
      blocks: number
      timeoffset: number
      connections: number
      proxy: string
      difficulty: number
      testnet: boolean
      paytxfee: number
      relayfee: number
      errors: string
    }

### NetworkInfo

    {
      version: number
      subversion: string
      protocolversion: number
      localservices: string,
      localrelay: boolean,
      timeoffset: number,
      networkactive: boolean,
      connections: number,
      networks:
      [ { name: string,
          limited: boolean,
          reachable: boolean,
          proxy: string,
          proxy_randomize_credentials: boolean }
      ],
      relayfee: number,
      excessutxocharge: number,
      warnings: string
    }

<!-- ### NodeMemoryInfo

    {
      locked: {
        used: number
        free: number
        total: number
        locked: number
        chunks_used: number
        chunks_free: number
      }
    } -->
