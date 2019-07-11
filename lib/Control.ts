import axios, { AxiosResponse } from "axios"
import { NodeInfoResult } from "bitcoin-com-rest"
import { resturl } from "./BITBOX"

export class Control {
  public restURL: string
  constructor(restURL: string = resturl) {
    this.restURL = restURL
  }

  public async getInfo(): Promise<NodeInfoResult> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.restURL}control/getInfo`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getNetworkInfo(): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.restURL}control/getNetworkInfo`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  // async getMemoryInfo(): Promise<NodeMemoryInfo> {
  //   // TODO add back to REST
  //   try {
  //     const response: any = await axios.get(
  //       `${this.restURL}control/getMemoryInfo`
  //     )
  //     return response.data
  //   } catch (error) {
  //     if (error.response && error.response.data) throw error.response.data
  //     else throw error
  //   }
  // }
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
