import axios from "axios"

export interface Control {
  restURL: string
  getInfo(): Promise<NodeInfo>
  getMemoryInfo(): Promise<NodeMemoryInfo>
}

export interface NodeInfo {
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

export interface NodeMemoryInfo {
  locked: {
    used: number
    free: number
    total: number
    locked: number
    chunks_used: number
    chunks_free: number
  }
}

export class Control implements Control {
  restURL: string
  constructor(restURL: string) {
    this.restURL = restURL
  }

  async getInfo(): Promise<NodeInfo> {
    try {
      const response: any = await axios.get(`${this.restURL}control/getInfo`)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getMemoryInfo(): Promise<NodeMemoryInfo> {
    try {
      const response: any = await axios.get(
        `${this.restURL}control/getMemoryInfo`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
  //
  // stop() {
  //   // Stop Bitcoin Cash server.
  //   return axios.post(`${this.restURL}control/stop`)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return JSON.stringify(error.response.data.error.message);
  //   });
  // }
}
