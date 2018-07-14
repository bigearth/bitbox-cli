export declare interface BitcoinCash {
	toSatoshi(coins: number): number;
	toBitcoinCash(satoshis: number): number;
	toBits(satoshis: number): number;
	satsToBits(satoshis: number): number;
	signMessageWithPrivKey(privateKeyWIF: string, message: string): string;
	verifyMessage(address : string, signature: string, message: string): Boolean;
	encodeBase58Check(hex: string): string;
	decodeBase58Check(address: string): string;
	encodeBIP21(address: string, options: EncodeBIP21Options): string;
	decodeBIP21(url: string): BIP21Object;
	getByteCount(inputs: ByteCountInput|object, outputs: ByteCountOutput): number;
	encryptBIP38(privKeyWIF: string, passphrase: string): string; 
	decryptBIP38(encryptedKey: string, passphrase: string, network?: string): string;
}

declare interface EncodeBIP21Options {
	amount?: number;
	label?: string;
	message?: string;
}

declare interface BIP21Object {
	address: string;
	options?: EncodeBIP21Options
}

declare interface ByteCountInput {
	P2PKH?: number;
}

declare interface ByteCountOutput {
	P2PKH?: number;
	P2SH?: number;
}