declare interface Socket {
    new(restURL?: string): Socket
    listen(endpoint: string, cb: any): void;
}

export default Socket;