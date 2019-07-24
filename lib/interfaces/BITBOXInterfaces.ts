export interface IConfig {
  restURL?: string
  wsURL?: string
}

export interface SocketConfig {
  restURL?: string
  wsURL?: string
  callback?: Function
}
