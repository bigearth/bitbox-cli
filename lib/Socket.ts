import { BITSOCKET_URL, WS_URL } from "./BITBOX"
import { SocketConfig } from "./interfaces/BITBOXInterfaces"

const io: any = require("socket.io-client")
export class Socket {
  socket: any
  bitsocketURL: string
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

    if (config.bitsocketURL) {
      this.bitsocketURL = config.bitsocketURL
    } else {
      this.bitsocketURL = BITSOCKET_URL
    }

    if (config.callback) config.callback()
  }

  public listen(query: string, cb: Function): void {
    if (query === "blocks" || query === "transactions") {
      this.socket.emit(query)

      if (query === "blocks") this.socket.on("blocks", (msg: any) => cb(msg))
      else if (query === "transactions")
        this.socket.on("transactions", (msg: any) => cb(msg))
    } else {
      let EventSource = require("eventsource")
      let b64 = Buffer.from(JSON.stringify(query)).toString("base64")
      let socket = new EventSource(`${this.bitsocketURL}/s/${b64}`)

      socket.onmessage = (msg: any) => {
        cb(msg.data)
      }
    }
  }

  public close(cb?: Function): void {
    this.socket.close()
    if (cb) {
      cb()
    }
  }
}
