declare module "bitcoincashjs-lib" {
    export interface HDNode {
        keyPair: any
        getAddress(): any
        isNeutered(): any
        getIdentifier(): any
        verify(buffer: any, signature: any): any
        deriveHardened(path: any): any
        sign(buffer: any): any
        toBase58(): any
        neutered(): any
        getPublicKeyBuffer(): any
        derivePath(path: any): any
        derive(path: any): any
    }
    
    // TODO : Fill in other bitcoincashjs object definitions here
}