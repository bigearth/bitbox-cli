import { WS_URL } from "./BITBOX"
import { SocketConfig } from "./interfaces/BITBOXInterfaces"

const io: any = require("socket.io-client")
export class Socket {
  socket: any
  constructor(config: SocketConfig = {}) {
    let websocketURL: string = ""
    if (config.wsURL) {
      // default to passed in wsURL
      websocketURL = config.wsURL
    } else if (config.restURL) {
      // 2nd option deprecated restURL
      websocketURL = config.restURL
    } else {
      // fallback to WS_URL
      websocketURL = WS_URL
    }
    this.socket = io(websocketURL, { transports: ["websocket"] })

    if (config.callback) config.callback()
  }

  public listen(endpoint: string, cb: Function): void {
    this.socket.emit(endpoint)

    if (endpoint === "blocks") this.socket.on("blocks", (msg: any) => cb(msg))
    else if (endpoint === "transactions")
      this.socket.on("transactions", (msg: any) => cb(msg))
  }

  public close(cb?: Function): void {
    this.socket.close()
    if (cb) {
      cb()
    }
  }
}
