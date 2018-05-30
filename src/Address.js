import axios from 'axios';
import bchaddr from 'bchaddrjs';
import Bitcoin from 'bitcoinjs-lib';

class Address {
  constructor(restBaseURL) {
    this.restBaseURL = restBaseURL;
  }

  // Translate address from any address format into a specific format.
  toLegacyAddress(address) {
    return bchaddr.toLegacyAddress(address);
  }

  toCashAddress(address, prefix = true) {
    if(prefix) {
      return bchaddr.toCashAddress(address);
    } else {
      return bchaddr.toCashAddress(address).split(':')[1];
    }
  }

  // Test for address format.
  isLegacyAddress(address) {
    return bchaddr.isLegacyAddress(address);
  }

  isCashAddress(address) {
    return bchaddr.isCashAddress(address);
  }

  // Test for address network.
  isMainnetAddress(address) {
    if(address[0] === 'x') {
      return true
    } else if(address[0] === 't') {
      return false
    } else {
      return bchaddr.isMainnetAddress(address);
    }
  }

  isTestnetAddress(address) {
    if(address[0] === 'x') {
      return false
    } else if(address[0] === 't') {
      return true
    } else {
      return bchaddr.isTestnetAddress(address);
    }
  }

  // Test for address type.
  isP2PKHAddress(address) {
    return bchaddr.isP2PKHAddress(address);
  }

  isP2SHAddress(address) {
    return bchaddr.isP2SHAddress(address);
  }

  // Detect address format.
  detectAddressFormat(address) {
    return bchaddr.detectAddressFormat(address);
  }

  // Detect address network.
  detectAddressNetwork(address) {
    if(address[0] === 'x') {
      return 'mainnet'
    } else if(address[0] === 't') {
      return 'testnet'
    } else {
      return bchaddr.detectAddressNetwork(address);
    }
  }

  // Detect address type.
  detectAddressType(address) {
    return bchaddr.detectAddressType(address);
  }

  fromXPub(xpub, path = "0/0") {
    let HDNode = Bitcoin.HDNode.fromBase58(xpub, Bitcoin.networks[this.detectAddressNetwork(xpub)]);
    let address = HDNode.derivePath(path);
    return this.toCashAddress(address.getAddress());
  }

  fromOutputScript(scriptPubKey) {
    return bchaddr.toCashAddress(Bitcoin.address.fromOutputScript(scriptPubKey));
  }

  details(address) {
    if(typeof address !== 'string') {
      address = JSON.stringify(address);
    }
    return axios.get(`${this.restBaseURL}address/details/${address}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }

  utxo(address) {
    if(typeof address !== 'string') {
      address = JSON.stringify(address);
    }
    return axios.get(`${this.restBaseURL}address/utxo/${address}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }

  unconfirmed(address) {
    if(typeof address !== 'string') {
      address = JSON.stringify(address);
    }
    return axios.get(`${this.restBaseURL}address/unconfirmed/${address}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }
}

export default Address
