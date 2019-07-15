import { WS_URL } from './BITBOX';

const io = require('socket.io-client')
export class Socket {
  socket: any
  constructor(config: any = {}) {
    if (typeof config === "string") {
      // TODO remove this check in v2.0
      this.socket = io(`${config}`)
    } else {
      const wsURL = config.wsURL ? config.wsURL : WS_URL
      this.socket = io(wsURL, { transports: ['websocket'] });

      if (config.callback) config.callback()
    }
  }

  public listen(endpoint: string, cb: Function): void {
    this.socket.emit(endpoint)

    if (endpoint === "blocks") this.socket.on("blocks", (msg: any) => cb(msg))
    else if (endpoint === "transactions")
      this.socket.on("transactions", (msg: any) => cb(msg))
  }

  public close(cb?: Function): void {
    this.socket.close()
    if(cb) {
      cb();
    }
  }
}
