/*
  TODO
  - Add blockhash functionality back into getTxOutProof
*/

import axios, { AxiosResponse } from "axios"
import { BlockDetailsResult, BlockchainInfoResult, BlockHeaderResult, ChainTipResult, MempoolInfoResult, TxOutResult, MempoolEntryResult } from "bitcoin-com-rest";
import { resturl } from "./BITBOX"

export class Blockchain {
  public restURL: string
  constructor(restURL: string = resturl) {
    this.restURL = restURL
  }

  public async getBestBlockHash(): Promise<string> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.restURL}blockchain/getBestBlockHash`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getBlock(
    blockhash: string,
    verbose: boolean = true
  ): Promise<BlockDetailsResult> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.restURL}blockchain/getBlock/${blockhash}?verbose=${verbose}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getBlockchainInfo(): Promise<BlockchainInfoResult> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.restURL}blockchain/getBlockchainInfo`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getBlockCount(): Promise<number> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.restURL}blockchain/getBlockCount`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getBlockHash(height: number = 1): Promise<string> {
    // if (typeof height !== "string") height = JSON.stringify(height)

    try {
      const response: AxiosResponse = await axios.get(
        `${this.restURL}blockchain/getBlockHash/${height}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getBlockHeader(
    hash: string | string[],
    verbose: boolean = true
  ): Promise<BlockHeaderResult | BlockHeaderResult[]> {
    try {
      // Handle single hash.
      if (typeof hash === "string") {
        const response: AxiosResponse = await axios.get(
          `${this.restURL}blockchain/getBlockHeader/${hash}?verbose=${verbose}`
        )

        return response.data

        // Handle array of hashes.
      } else if (Array.isArray(hash)) {
        const options = {
          method: "POST",
          url: `${this.restURL}blockchain/getBlockHeader`,
          data: {
            hashes: hash,
            verbose: verbose
          }
        }
        const response: AxiosResponse = await axios(options)

        return response.data
      }

      throw new Error(`Input hash must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getChainTips(): Promise<ChainTipResult[]> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.restURL}blockchain/getChainTips`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getDifficulty(): Promise<number> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.restURL}blockchain/getDifficulty`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  // TODO: add back to REST
  public async getMempoolAncestors(
    txid: string,
    verbose: boolean = false
  ): Promise<string[] | MempoolEntryResult[]> {
    if (typeof txid !== "string") txid = JSON.stringify(txid)

    try {
      const response: AxiosResponse = await axios.get(
        `${
        this.restURL
        }blockchain/getMempoolAncestors/${txid}?verbose=${verbose}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  // TODO: add back to REST
  public async getMempoolDescendants(
    txid: string,
    verbose: boolean = false
  ): Promise<string[] | MempoolEntryResult[]> {
    if (typeof txid !== "string") txid = JSON.stringify(txid)

    try {
      const response: AxiosResponse = await axios.get(
        `${
        this.restURL
        }blockchain/getMempoolDescendants/${txid}?verbose=${verbose}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getMempoolEntry(txid: string | string[]): Promise<MempoolEntryResult> {
    //if (typeof txid !== "string") txid = JSON.stringify(txid)

    try {
      if (typeof txid === "string") {
        const response: AxiosResponse = await axios.get(
          `${this.restURL}blockchain/getMempoolEntry/${txid}`
        )

        return response.data
      } else if (Array.isArray(txid)) {
        const options = {
          method: "POST",
          url: `${this.restURL}blockchain/getMempoolEntry`,
          data: {
            txids: txid
          }
        }
        const response: AxiosResponse = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getMempoolInfo(): Promise<MempoolInfoResult> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.restURL}blockchain/getMempoolInfo`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getRawMempool(verbose: boolean = false): Promise<string[]> {
    // TODO fix verbose
    try {
      const response: AxiosResponse = await axios.get(
        `${this.restURL}blockchain/getRawMempool?vebose=${verbose}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getTxOut(
    txid: string,
    n: any,
    include_mempool: boolean = true
  ): Promise<TxOutResult | null> {
    // TODO confirm this works
    try {
      const response: AxiosResponse = await axios.get(
        `${
        this.restURL
        }blockchain/getTxOut/${txid}/n?include_mempool=${include_mempool}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getTxOutProof(txids: string | string[]): Promise<string | string[]> {
    try {
      // Single txid.
      if (typeof txids === "string") {
        const path = `${this.restURL}blockchain/getTxOutProof/${txids}`
        //if (blockhash) path = `${path}?blockhash=${blockhash}`

        const response: AxiosResponse = await axios.get(path)
        return response.data

        // Array of txids.
      } else if (Array.isArray(txids)) {
        const options = {
          method: "POST",
          url: `${this.restURL}blockchain/getTxOutProof`,
          data: {
            txids: txids
          }
        }
        const response: AxiosResponse = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async preciousBlock(blockhash: string): Promise<any> {
    // TODO bring this back to REST
    try {
      const response: AxiosResponse = await axios.get(
        `${this.restURL}blockchain/preciousBlock/${blockhash}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async pruneBlockchain(height: number): Promise<number> {
    // TODO bring this back to REST
    try {
      const response: AxiosResponse = await axios.post(
        `${this.restURL}blockchain/pruneBlockchain/${height}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async verifyChain(
    checklevel: number = 3,
    nblocks: number = 6
  ): Promise<boolean> {
    try {
      const response: AxiosResponse = await axios.get(
        `${
        this.restURL
        }blockchain/verifyChain?checklevel=${checklevel}&nblocks=${nblocks}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async verifyTxOutProof(proof: string | string[]): Promise<string[]> {
    try {
      // Single block
      if (typeof proof === "string") {
        const response: AxiosResponse = await axios.get(
          `${this.restURL}blockchain/verifyTxOutProof/${proof}`
        )
        return response.data

        // Array of hashes.
      } else if (Array.isArray(proof)) {
        const options = {
          method: "POST",
          url: `${this.restURL}blockchain/verifyTxOutProof`,
          data: {
            proofs: proof
          }
        }
        const response: AxiosResponse = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
