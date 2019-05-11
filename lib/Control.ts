import axios from "axios"
import { NodeInfo, NodeMemoryInfo } from "bitcoin-com-rest";

export class Control {
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
    // TODO add back to REST
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
