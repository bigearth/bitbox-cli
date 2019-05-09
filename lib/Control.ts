import axios from "axios"

export interface Control {
  restURL: string
  getInfo(): Promise<any>
  getMemoryInfo(): Promise<any>
}

export class Control implements Control {
  restURL: string
  constructor(restURL: string) {
    this.restURL = restURL
  }

  async getInfo(): Promise<any> {
    try {
      const response: any = await axios.get(`${this.restURL}control/getInfo`)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getMemoryInfo(): Promise<any> {
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
