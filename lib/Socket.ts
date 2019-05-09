const io = require("socket.io-client")

export interface Socket {
  socket: any
  listen(endpoint: any, cb: any): void
}

export class Socket implements Socket {
  socket: any
  constructor(config: any = {}) {
    if (typeof config === "string") {
      // TODO remove this check in v2.0
      this.socket = io(`${config}`)
    } else {
      if (config.restURL) {
        this.socket = io(`${config.restURL}`)
      } else {
        const restURL = "https://rest.bitcoin.com"
        this.socket = io(`${restURL}`)
      }

      if (config.callback) config.callback()
    }
  }

  listen(endpoint: string, cb: any): void {
    this.socket.emit(endpoint)

    if (endpoint === "blocks") this.socket.on("blocks", (msg: any) => cb(msg))
    else if (endpoint === "transactions")
      this.socket.on("transactions", (msg: any) => cb(msg))
  }
}
