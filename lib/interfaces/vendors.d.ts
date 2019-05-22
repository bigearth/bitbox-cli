/// <reference types="node" />
declare module "bitcoincashjs-lib" {
  export interface HDNode {
    keyPair: any
    getAddress(): any
    isNeutered(): any
    getIdentifier(): any
    verify(buffer: any, signature: any): any
    deriveHardened(path: any): any
    sign(buffer: any): any
    toBase58(): any
    neutered(): any
    getPublicKeyBuffer(): any
    derivePath(path: any): any
    derive(path: any): any
  }

  export interface ECPair {
    toWIF(): string
    sign(buffer: Buffer): Boolean | ECSignature
    verify(buffer: Buffer, signature: ECSignature): boolean
    getPublicKeyBuffer(): Buffer
    getAddress(): string
  }

  export type ECSignature = any
}

declare module "bitcoin-com-rest" {
  export interface BlockDetailsResult {
    hash: string
    size: number
    height: number
    version: number
    merkleroot: string
    tx: string[]
    time: number
    mediantime?: number
    nonce: number
    bits: string
    difficulty: number
    chainwork: string
    confirmations: number
    previousblockhash: string
    nextblockhash: string
    reward: number
    isMainChain: boolean
    poolInfo: object
  }

  export interface MempoolInfoResult {
    size: number
    bytes: number
    usage: number
    maxmempool: number
    mempoolminfee: number
  }

  export interface BlockchainInfoResult {
    chain: string
    blocks: number
    headers: number
    bestblockhash: string
    difficulty: number
    mediantime: number
    verificationprogress: number
    chainwork: string
    pruned: boolean
    softforks: object[]
    bip9_softforks: object
  }

  export interface BlockHeaderResult {
    hash: string
    confirmations: number
    height: number
    version: number
    versionHex: string
    merkleroot: string
    time: number
    mediantime: number
    nonce: number
    bits: string
    difficulty: number
    chainwork: string
    previousblockhash: string
    nextblockhash: string
  }

  export interface ChainTipResult {
    height: number
    hash: string
    branchlen: number
    status: string
  }

  export interface TxOutResult {
    bestblock: string
    confirmations: number
    value: number
    scriptPubKey: {
      asm: string
      hex: string
      reqSigs: number
      type: string
      addresses: string[]
    }
    version: number
    coinbase: boolean
  }

  export interface MempoolEntryResult {
    size: number
    fee: number
    modifiedfee: number
    time: number
    height: number
    startingpriority: number
    currentpriority: number
    descendantcount: number
    descendantsize: number
    descendantfees: number
    ancestorcount: number
    ancestorsize: number
    ancestorfees: number
    depends: string[]
    spentby: string[]
  }

  export interface NodeInfoResult {
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

  export interface NodeMemoryInfoResult {
    locked: {
      used: number
      free: number
      total: number
      locked: number
      chunks_used: number
      chunks_free: number
    }
  }

  export interface DecodeRawTransactionResult {
    txid: string
    hash: string
    size: number
    version: number
    locktime: number
    vin: [
      {
        txid: string
        vout: number
        scriptSig: {
          asm: string
          hex: string
        }
        sequence: number
      }
    ]
    vout: [
      {
        value: number
        n: number
        scriptPubKey: {
          asm: string
          hex: string
          reqSigs: number
          type: string
          addresses: string[]
        }
      }
    ]
  }

  export interface DecodeScriptResult {
    asm: string
    type: string
    p2sh: string
  }

  export interface VerboseRawTransactionResult {
    hex: string
    txid: string
    size: number
    version: number
    locktime: number
    vin: [{ coinbase: string; sequence: number }]
    vout: [
      {
        value: number
        n: number
        scriptPubKey: {
          asm: string
          hex: string
          reqSigs: number
          type: string
          addresses: string[]
        }
      }
    ]
    blockhash: string
    confirmations: number
    time: number
    blocktime: number
  }

  export interface TxnDetailsResult {
    txid: string
    version: number
    locktime: number
    vin: object[]
    vout: object[]
    blockhash: string
    blockheight: number
    confirmations: number
    time: number
    blocktime: number
    isCoinBase: boolean
    valueOut: number
    size: number
  }

  export interface AddressDetailsResult {
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

  export interface AddressUtxoResult {
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

  export interface AddressUnconfirmedResult {
    legacyAddress: string
    cashAddress: string
    scriptPubKey: string
    utxos: [
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
    ]
  }

  export interface AddressValidateResult {
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
}
