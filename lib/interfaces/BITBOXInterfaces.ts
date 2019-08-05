export interface IConfig {
  restURL?: string
  wsURL?: string
  bitdbURL?: string
}

export interface SocketConfig {
  restURL?: string
  wsURL?: string
  bitsocketURL?: string
  callback?: Function
}

export interface QueryInterface {
  amount?: number
  label?: string
  message?: string
}

export interface BitDBResponse {
  message: string
}
