// local deps
import { BitcoinCash } from './BitcoinCash';
import { Crypto } from './Crypto';
import { Util } from './Util';
import { Block } from './Block';
import { Blockchain } from './Blockchain';
import { Control } from './Control';
import { Generating } from './Generating';
import { Mining } from './Mining';
import { Network } from './Network';
import { RawTransactions } from './RawTransactions';
import { Mnemonic } from './Mnemonic';
import { Address } from './Address';
import { HDNode } from './HDNode';
import { Transaction } from './Transaction';
import { TransactionBuilder } from './TransactionBuilder';
import { ECPair } from './ECPair';
import { Script } from './Script';
import Price from './Price';
import Socket from './Socket';


declare class BITBOXCli {

	constructor(config?: any);

	restURL: string;
	Address: Address;
	BitcoinCash: BitcoinCash;
	Block: Block;
	Blockchain: Blockchain;
	Control: Control;
	Generating: Generating;
	Mining: Mining;
	Crypto: Crypto;
	ECPair: ECPair;
	HDNode: HDNode;
	Mnemonic: Mnemonic;
	Network: Network;
	Price: Price;
	RawTransactions: RawTransactions;
	Script: Script;
	Transaction: Transaction;
	TransactionBuilder: TransactionBuilder;
	Util: Util;
	Socket: Socket;
}

export default BITBOXCli;
