const io = require("socket.io-client")

export class Socket {
  socket: any
  constructor(config: any = {}) {
    if (typeof config === "string") {
      // TODO remove this check in v2.0
      this.socket = io(`${config}`)
    } else {
      const restURL = config.restURL ? config.restURL : 'wss://rest.bitcoin.com'
      this.socket = io(restURL, { transports: ['websocket'] });

      if (config.callback) config.callback()
    }
  }

  public listen(endpoint: string, cb: any): void {
    this.socket.emit(endpoint)

    if (endpoint === "blocks") this.socket.on("blocks", (msg: any) => cb(msg))
    else if (endpoint === "transactions")
      this.socket.on("transactions", (msg: any) => cb(msg))
  }
}
