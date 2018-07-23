declare interface ISocket {
    new(restURL: string): ISocket
    listen(endpoint: string, cb: any): void;
}

export default ISocket;