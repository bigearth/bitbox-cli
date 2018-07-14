export declare interface Block {
	//constructor(restURL: string);
	details(id: number): Promise<BlockDetails>;
}

export declare interface BlockDetails {
	hash: string;
	size: number;
	height: number;
	version: number;
	merkleroot: string;
	tx: string[];
	time: number;
	mediantime?: number;
	nonce: number;
	bits: string;
	difficulty: number;
	chainwork: string;
	confirmations: number;
	previousblockhash: string;
	nextblockhash: string;
	reward: number;
	isMainChain: boolean;
	poolInfo: object;
}

