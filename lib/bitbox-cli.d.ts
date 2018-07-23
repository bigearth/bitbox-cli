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
import { ITransactionBuilder } from './TransactionBuilder';
import { ECPair } from './ECPair';
import { Script } from './Script';
import Price from './Price';
import ISocket from './Socket';


declare interface IBITBOXCli {

	new(config?: any): IBITBOXCli

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
	TransactionBuilder: ITransactionBuilder;
	Util: Util;
	Socket: ISocket;
}

export default IBITBOXCli;
