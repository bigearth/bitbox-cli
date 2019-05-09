/*
  TODO
  - Add blockhash functionality back into getTxOutProof
*/

import axios from "axios"

export interface Blockchain {
  restURL: string
  getBestBlockHash(): Promise<any>
  getBlock(blockhash: string, verbose: boolean): Promise<any>
  getBlockchainInfo(): Promise<any>
  getBlockCount(): Promise<any>
  getBlockHash(height: any): Promise<any>
  getBlockHeader(hash: string | string[], verbose: boolean): Promise<any>
  getChainTips(): Promise<any>
  getDifficulty(): Promise<any>
  getMempoolAncestors(txid: string, verbose: boolean): Promise<any>
  getMempoolDescendants(txid: string, verbose: boolean): Promise<any>
  getMempoolEntry(txid: string): Promise<any>
  getMempoolInfo(): Promise<any>
  getRawMempool(verbose: boolean): Promise<any>
  getTxOut(txid: string, n: any, include_mempool: boolean): Promise<any>
  getTxOutProof(txids: string | string[]): Promise<any>
  preciousBlock(blockhash: string): Promise<any>
  pruneBlockchain(height: number): Promise<any>
  verifyChain(checklevel: number, nblocks: number): Promise<any>
  verifyTxOutProof(proof: any | any[]): Promise<any>
}

export class Blockchain implements Blockchain {
  restURL: string
  constructor(restURL: string) {
    this.restURL = restURL
  }

  async getBestBlockHash(): Promise<any> {
    try {
      const response: any = await axios.get(
        `${this.restURL}blockchain/getBestBlockHash`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getBlock(blockhash: string, verbose: boolean = true): Promise<any> {
    try {
      const response: any = await axios.get(
        `${this.restURL}blockchain/getBlock/${blockhash}?verbose=${verbose}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getBlockchainInfo(): Promise<any> {
    try {
      const response: any = await axios.get(
        `${this.restURL}blockchain/getBlockchainInfo`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getBlockCount(): Promise<any> {
    try {
      const response: any = await axios.get(
        `${this.restURL}blockchain/getBlockCount`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getBlockHash(height: any = 1): Promise<any> {
    if (typeof height !== "string") height = JSON.stringify(height)

    try {
      const response: any = await axios.get(
        `${this.restURL}blockchain/getBlockHash/${height}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getBlockHeader(
    hash: string | string[],
    verbose: boolean = true
  ): Promise<any> {
    try {
      // Handle single hash.
      if (typeof hash === "string") {
        const response: any = await axios.get(
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
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input hash must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getChainTips(): Promise<any> {
    try {
      const response: any = await axios.get(
        `${this.restURL}blockchain/getChainTips`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getDifficulty(): Promise<any> {
    try {
      const response: any = await axios.get(
        `${this.restURL}blockchain/getDifficulty`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getMempoolAncestors(
    txid: string,
    verbose: boolean = false
  ): Promise<any> {
    if (typeof txid !== "string") txid = JSON.stringify(txid)

    try {
      const response: any = await axios.get(
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

  async getMempoolDescendants(
    txid: string,
    verbose: boolean = false
  ): Promise<any> {
    if (typeof txid !== "string") txid = JSON.stringify(txid)

    try {
      const response: any = await axios.get(
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

  async getMempoolEntry(txid: string): Promise<any> {
    //if (typeof txid !== "string") txid = JSON.stringify(txid)

    try {
      if (typeof txid === "string") {
        const response: any = await axios.get(
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
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getMempoolInfo(): Promise<any> {
    try {
      const response: any = await axios.get(
        `${this.restURL}blockchain/getMempoolInfo`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getRawMempool(verbose: boolean = false): Promise<any> {
    try {
      const response: any = await axios.get(
        `${this.restURL}blockchain/getRawMempool?vebose=${verbose}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getTxOut(
    txid: string,
    n: any,
    include_mempool: boolean = true
  ): Promise<any> {
    try {
      const response: any = await axios.get(
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

  async getTxOutProof(txids: string | string[]): Promise<any> {
    try {
      // Single txid.
      if (typeof txids === "string") {
        const path = `${this.restURL}blockchain/getTxOutProof/${txids}`
        //if (blockhash) path = `${path}?blockhash=${blockhash}`

        const response: any = await axios.get(path)
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
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async preciousBlock(blockhash: string): Promise<any> {
    try {
      const response: any = await axios.get(
        `${this.restURL}blockchain/preciousBlock/${blockhash}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async pruneBlockchain(height: number): Promise<any> {
    try {
      const response = await axios.post(
        `${this.restURL}blockchain/pruneBlockchain/${height}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async verifyChain(checklevel: number = 3, nblocks: number = 6): Promise<any> {
    try {
      const response: any = await axios.get(
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

  async verifyTxOutProof(proof: any | any[]): Promise<any> {
    try {
      // Single block
      if (typeof proof === "string") {
        const response: any = await axios.get(
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
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
