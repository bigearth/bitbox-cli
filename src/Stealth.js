import Bitcoin from 'Bitcoinjs-lib';
import bchaddr from 'bchaddrjs';
import sb from 'satoshi-Bitcoin';
import BitcoinMessage from 'Bitcoinjs-message';
import bs58 from 'bs58';
import bip21 from 'bip21';
import bigi from 'bigi';
import ecurve from 'ecurve';

let secp256k1 = ecurve.getCurveByName('secp256k1');
let G = secp256k1.G;
let n = secp256k1.n;

class Stealth {
  // From https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/stealth.js

  // vG = (dG \+ sha256(e * dG)G)
  send (e, Q) {
    var eQ = Q.multiply(e) // shared secret
    var c = bigi.fromBuffer(Bitcoin.crypto.sha256(eQ.getEncoded()))
    var cG = G.multiply(c)
    var vG = new Bitcoin.ECPair(null, Q.add(cG))

    return vG
  }

  // v = (d + sha256(eG * d))
  receive (d, eG) {
    var eQ = eG.multiply(d) // shared secret
    var c = bigi.fromBuffer(Bitcoin.crypto.sha256(eQ.getEncoded()))
    var v = new Bitcoin.ECPair(d.add(c).mod(n))

    return v
  }
  //
  // // d = (v - sha256(e * dG))
  // recoverLeaked (receive, send, receiver) {
  //   let v = receive.d;
  //   let e = send.d;
  //   let Q = receiver.Q;
  //   let eQ = Q.multiply(e); // shared secret
  //   let c = bigi.fromBuffer(Bitcoin.crypto.sha256(eQ.getEncoded()));
  //   let d = new Bitcoin.ECPair(v.subtract(c).mod(n));
  //
  //   return d;
  // }

  // vG = (rG \+ sha256(e * dG)G)
  sendDual (sender, receiver, scan) {
    let e = sender.d;
    let R = receiver.Q;
    let Q = scan.Q;
    let eQ = Q.multiply(e); // shared secret
    let c = bigi.fromBuffer(Bitcoin.crypto.sha256(eQ.getEncoded()));
    let cG = G.multiply(c);
    let vG = new Bitcoin.ECPair(null, R.add(cG));
    return vG;
  }

  // vG = (rG \+ sha256(eG * d)G)
  scanDual (scan, receiver, sender) {
    let d = scan.d;
    let R = receiver.Q;
    let eG = sender.Q;
    let eQ = eG.multiply(d) // shared secret
    let c = bigi.fromBuffer(Bitcoin.crypto.sha256(eQ.getEncoded()));
    let cG = G.multiply(c);
    let vG = new Bitcoin.ECPair(null, R.add(cG));
    return vG;
  }

  // v = (r + sha256(eG * d))
  receiveDual (scan, receiver, send) {
    let d = scan.d;
    let r = receiver.d;
    let eG = send.Q;
    let eQ = eG.multiply(d) // shared secret
    let c = bigi.fromBuffer(Bitcoin.crypto.sha256(eQ.getEncoded()));
    let v = new Bitcoin.ECPair(r.add(c).mod(n));
    return v;
  }

  toCashAddress(stealth) {
    return bchaddr.toCashAddress(stealth.getAddress());
  }

  toLegacyAddress(stealth) {
    return stealth.getAddress();
  }
}

export default Stealth;
