import axios from 'axios';
class Blockchain {
  constructor(restURL) {
    this.restURL = restURL;
  }

  async getBestBlockHash() {
    try {
      let response = await axios.get(`${this.restURL}blockchain/getBestBlockHash`)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getBlock(blockhash, verbose = true) {
    try {
      let response = await axios.get(`${this.restURL}blockchain/getBlock/${blockhash}?verbose=${verbose}`)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getBlockchainInfo() {
    try {
      let response = await axios.get(`${this.restURL}blockchain/getBlockchainInfo`)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getBlockCount() {
    try {
      let response = await axios.get(`${this.restURL}blockchain/getBlockCount`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async getBlockHash(height = 1) {
    if(typeof height !== 'string') {
      height = JSON.stringify(height);
    }
    try {
      let response = await axios.get(`${this.restURL}blockchain/getBlockHash/${height}`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async getBlockHeader(hash, verbose = true) {
    if(typeof hash !== 'string') {
      hash = JSON.stringify(hash);
    }
    try {
      let response = await axios.get(`${this.restURL}blockchain/getBlockHeader/${hash}?verbose=${verbose}`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async getChainTips() {
    try {
      let response = await axios.get(`${this.restURL}blockchain/getChainTips`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async getDifficulty() {
    try {
      let response = await axios.get(`${this.restURL}blockchain/getDifficulty`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async getMempoolAncestors(txid, verbose = false) {
    if(typeof txid !== 'string') {
      txid = JSON.stringify(txid);
    }
    try {
      let response = await axios.get(`${this.restURL}blockchain/getMempoolAncestors/${txid}?verbose=${verbose}`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async getMempoolDescendants(txid, verbose = false) {
    if(typeof txid !== 'string') {
      txid = JSON.stringify(txid);
    }

    try {
      let response = await axios.get(`${this.restURL}blockchain/getMempoolDescendants/${txid}?verbose=${verbose}`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async getMempoolEntry(txid) {
    if(typeof txid !== 'string') {
      txid = JSON.stringify(txid);
    }

    try {
      let response = await axios.get(`${this.restURL}blockchain/getMempoolEntry/${txid}`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async getMempoolInfo() {
    try {
      let response = await axios.get(`${this.restURL}blockchain/getMempoolInfo`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async getRawMempool(verbose = false) {
    try {
      let response = await axios.get(`${this.restURL}blockchain/getRawMempool?vebose=${verbose}`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async getTxOut(txid, n, include_mempool = true) {
    try {
      let response = await axios.get(`${this.restURL}blockchain/getTxOut/${txid}/n?include_mempool=${include_mempool}`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async getTxOutProof(txids, blockhash) {
    let path = `${this.restURL}blockchain/getTxOutProof/${txids}`;
    if(blockhash) {
      path = `${path}?blockhash=${blockhash}`
    }
    try {
      let response = await axios.get(path)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async preciousBlock(blockhash) {
    try {
      let response = await axios.get(`${this.restURL}blockchain/preciousBlock/${blockhash}`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async pruneBlockchain(height) {
    try {
      let response = await axios.post(`${this.restURL}blockchain/pruneBlockchain/${height}`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async verifyChain(checklevel = 3, nblocks = 6) {
    try {
      let response = await axios.get(`${this.restURL}blockchain/verifyChain?checklevel=${checklevel}&nblocks=${nblocks}`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async verifyTxOutProof(proof) {
    try {
      let response = await axios.get(`${this.restURL}blockchain/verifyTxOutProof/proof`)
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
}

export default Blockchain;
