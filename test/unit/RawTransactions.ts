// imports
import {
  DecodeRawTransactionResult,
  VerboseRawTransactionResult
} from "bitcoin-com-rest";
import * as chai from "chai";
import * as util from "util";
import { BITBOX, resturl } from "../../lib/BITBOX";
import { RawTransactions } from "../../lib/RawTransactions";

// consts
const bitbox: BITBOX = new BITBOX();
const assert: Chai.AssertStatic = chai.assert;

// Used for debugging
util.inspect.defaultOptions = { depth: 1 };

describe("#RawTransactions", (): void => {
  describe("#RawTransactionsConstructor", (): void => {
    it("should create instance of RawTransactions", (): void => {
      const rawtransactions: RawTransactions = new RawTransactions();
      assert.equal(rawtransactions instanceof RawTransactions, true);
    });

    it("should have a restURL property", (): void => {
      const rawtransactions: RawTransactions = new RawTransactions();
      assert.equal(rawtransactions.restURL, resturl);
    });
  });

  describe("#decodeRawTransaction", (): void => {
    it("should decode tx for a single hex", async (): Promise<any> => {
      const hex: string =
        "0200000001b9b598d7d6d72fc486b2b3a3c03c79b5bade6ec9a77ced850515ab5e64edcc21010000006b483045022100a7b1b08956abb8d6f322aa709d8583c8ea492ba0585f1a6f4f9983520af74a5a0220411aee4a9a54effab617b0508c504c31681b15f9b187179b4874257badd4139041210360cfc66fdacb650bc4c83b4e351805181ee696b7d5ab4667c57b2786f51c413dffffffff0210270000000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac786e9800000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac00000000";

      const result:
        | DecodeRawTransactionResult
        | DecodeRawTransactionResult[] = await bitbox.RawTransactions.decodeRawTransaction(
        hex
      );

      assert.hasAnyKeys(result, [
        "txid",
        "hash",
        "size",
        "version",
        "locktime",
        "vin",
        "vout"
      ]);
      if (!Array.isArray(result)) {
        assert.isArray(result.vin);
        assert.isArray(result.vout);
      }
    });

    it("should decode an array of tx hexes", async (): Promise<any> => {
      const hexes: string[] = [
        "0200000001b9b598d7d6d72fc486b2b3a3c03c79b5bade6ec9a77ced850515ab5e64edcc21010000006b483045022100a7b1b08956abb8d6f322aa709d8583c8ea492ba0585f1a6f4f9983520af74a5a0220411aee4a9a54effab617b0508c504c31681b15f9b187179b4874257badd4139041210360cfc66fdacb650bc4c83b4e351805181ee696b7d5ab4667c57b2786f51c413dffffffff0210270000000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac786e9800000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac00000000",
        "0200000001b9b598d7d6d72fc486b2b3a3c03c79b5bade6ec9a77ced850515ab5e64edcc21010000006b483045022100a7b1b08956abb8d6f322aa709d8583c8ea492ba0585f1a6f4f9983520af74a5a0220411aee4a9a54effab617b0508c504c31681b15f9b187179b4874257badd4139041210360cfc66fdacb650bc4c83b4e351805181ee696b7d5ab4667c57b2786f51c413dffffffff0210270000000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac786e9800000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac00000000"
      ];

      const result:
        | DecodeRawTransactionResult
        | DecodeRawTransactionResult[] = await bitbox.RawTransactions.decodeRawTransaction(
        hexes
      );

      assert.isArray(result);
      if (Array.isArray(result)) {
        assert.hasAnyKeys(result[0], [
          "txid",
          "hash",
          "size",
          "version",
          "locktime",
          "vin",
          "vout"
        ]);
        assert.isArray(result[0].vin);
        assert.isArray(result[0].vout);
      }
    });

    it(`should throw an error for improper single input`, async (): Promise<
      any
    > => {
      try {
        const addr: any = 12345;

        await bitbox.RawTransactions.decodeRawTransaction(addr);
        assert.equal(true, false, "Unexpected result!");
      } catch (err) {
        assert.include(
          err.message,
          `Input must be a string or array of strings.`
        );
      }
    });

    it(`should throw error on array size rate limit`, async (): Promise<
      any
    > => {
      try {
        const data: string[] = [];
        for (let i: number = 0; i < 25; i++) {
          data.push(
            "0200000001b9b598d7d6d72fc486b2b3a3c03c79b5bade6ec9a77ced850515ab5e64edcc21010000006b483045022100a7b1b08956abb8d6f322aa709d8583c8ea492ba0585f1a6f4f9983520af74a5a0220411aee4a9a54effab617b0508c504c31681b15f9b187179b4874257badd4139041210360cfc66fdacb650bc4c83b4e351805181ee696b7d5ab4667c57b2786f51c413dffffffff0210270000000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac786e9800000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac00000000"
          );
        }

        const result:
          | DecodeRawTransactionResult
          | DecodeRawTransactionResult[] = await bitbox.RawTransactions.decodeRawTransaction(
          data
        );
        assert.equal(true, false, "Unexpected result!");
      } catch (err) {
        assert.hasAnyKeys(err, ["error"]);
        assert.include(err.error, "Array too large");
      }
    });
  });

  describe("#getRawTransaction", (): void => {
    it("should decode a single txid, with concise output", async (): Promise<
      any
    > => {
      const txid: string =
        "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1";
      const verbose: boolean = false;

      const result:
        | VerboseRawTransactionResult
        | VerboseRawTransactionResult[]
        | string
        | string[] = await bitbox.RawTransactions.getRawTransaction(
        txid,
        verbose
      );

      assert.isString(result);
    });

    it("should decode a single txid, with verbose output", async (): Promise<
      any
    > => {
      const txid: string =
        "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1";
      const verbose: boolean = true;

      const result:
        | VerboseRawTransactionResult
        | VerboseRawTransactionResult[]
        | string
        | string[] = await bitbox.RawTransactions.getRawTransaction(
        txid,
        verbose
      );

      assert.hasAnyKeys(result, [
        "hex",
        "txid",
        "hash",
        "size",
        "version",
        "locktime",
        "vin",
        "vout",
        "blockhash",
        "confirmations",
        "time",
        "blocktime"
      ]);
      if (!Array.isArray(result) && result instanceof Object) {
        assert.isArray(result.vin);
        assert.isArray(result.vout);
      }
    });

    it("should decode an array of txids, with a concise output", async (): Promise<
      any
    > => {
      const txid: string[] = [
        "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1",
        "b25d24fbb42d84812ed2cb55797f10fdec41afc7906ab563d1ec8c8676a2037f"
      ];
      const verbose: boolean = false;

      const result:
        | VerboseRawTransactionResult
        | VerboseRawTransactionResult[]
        | string
        | string[] = await bitbox.RawTransactions.getRawTransaction(
        txid,
        verbose
      );

      assert.isArray(result);
      if (Array.isArray(result)) {
        assert.isString(result[0]);
      }
    });

    it("should decode an array of txids, with a verbose output", async (): Promise<
      any
    > => {
      const txid: string[] = [
        "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1",
        "b25d24fbb42d84812ed2cb55797f10fdec41afc7906ab563d1ec8c8676a2037f"
      ];
      const verbose: boolean = true;

      const result:
        | VerboseRawTransactionResult
        | VerboseRawTransactionResult[]
        | string
        | string[] = await bitbox.RawTransactions.getRawTransaction(
        txid,
        verbose
      );

      assert.isArray(result);
      if (Array.isArray(result)) {
        assert.hasAnyKeys(result[0], [
          "hex",
          "txid",
          "hash",
          "size",
          "version",
          "locktime",
          "vin",
          "vout",
          "blockhash",
          "confirmations",
          "time",
          "blocktime"
        ]);
        // TODO uncomment this test and fix ts error
        // assert.isArray(result[0].vin);
        // assert.isArray(result[0].vout);
      }
    });

    it(`should throw error on array size rate limit`, async (): Promise<
      any
    > => {
      try {
        const dataMock: string =
          "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1";
        const data: string[] = [];
        for (let i: number = 0; i < 25; i++) data.push(dataMock);

        const result:
          | VerboseRawTransactionResult
          | VerboseRawTransactionResult[]
          | string
          | string[] = await bitbox.RawTransactions.getRawTransaction(data);

        console.log(`result: ${util.inspect(result)}`);
        assert.equal(true, false, "Unexpected result!");
      } catch (err) {
        assert.hasAnyKeys(err, ["error"]);
        assert.include(err.error, "Array too large");
      }
    });
  });

  describe("#decodeScript", () => {
    it("should decode script for a single hex", async (): Promise<any> => {
      const hex: string =
        "4830450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed592012102e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16";

      const result = await bitbox.RawTransactions.decodeScript(hex);

      assert.hasAllKeys(result, ["asm", "type", "p2sh"]);
    });

    // CT 2/20/19 - Waiting for this PR to be merged complete the test:
    // https://github.com/Bitcoin-com/rest.bitcoin.com/pull/312
    /*
    it("should decode an array of tx hexes", async () => {
      const hexes = [
        "4830450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed592012102e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16",
        "4830450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed592012102e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16"
      ]

      const result = await bitbox.RawTransactions.decodeScript(hexes)
      console.log(`result ${JSON.stringify(result, null, 2)}`)
    })
*/
    /*
    it(`should throw an error for improper single input`, async () => {
      try {
        const addr = 12345

        await bitbox.RawTransactions.decodeRawTransaction(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input must be a string or array of strings.`
        )
      }
    })
*/
  });

  /*
    Testing sentRawTransaction isn't really possible with an integration test,
    as the endpoint really needs an e2e test to be properly tested. The tests
    below expect error messages returned from the server, but at least test
    that the server is responding on those endpoints, and responds consistently.
  */
  describe("sendRawTransaction", () => {
    it("should send a single transaction hex", async (): Promise<any> => {
      try {
        const hex: string =
          "01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000";

        await bitbox.RawTransactions.sendRawTransaction(hex);

        assert.equal(true, false, "Unexpected result!");
      } catch (err) {
        assert.hasAllKeys(err, ["error"]);
        assert.include(err.error, "Missing inputs");
      }
    });

    it("should send an array of tx hexes", async (): Promise<any> => {
      try {
        const hexes: string[] = [
          "01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000",
          "01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000"
        ];

        const result = await bitbox.RawTransactions.sendRawTransaction(hexes);
      } catch (err) {
        assert.hasAllKeys(err, ["error"]);
        assert.include(err.error, "Missing inputs");
      }
    });

    it(`should throw an error for improper single input`, async (): Promise<
      any
    > => {
      try {
        const addr: any = 12345;

        await bitbox.RawTransactions.sendRawTransaction(addr);
        assert.equal(true, false, "Unexpected result!");
      } catch (err) {
        assert.include(
          err.message,
          `Input hex must be a string or array of strings`
        );
      }
    });

    it(`should throw error on array size rate limit`, async (): Promise<
      any
    > => {
      try {
        const dataMock: string =
          "01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000";
        const data: string[] = [];
        for (let i: number = 0; i < 25; i++) data.push(dataMock);

        await bitbox.RawTransactions.sendRawTransaction(data);
        assert.equal(true, false, "Unexpected result!");
      } catch (err) {
        assert.hasAnyKeys(err, ["error"]);
        assert.include(err.error, "Array too large");
      }
    });
  });
});
