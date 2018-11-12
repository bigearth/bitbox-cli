import Web3bch from "web3bch.js"

class Wallet {
  constructor(walletProvider) {
    this.web3bch = new Web3bch(walletProvider)
  }

  setWalletProvider(walletProvider) {
    this.web3bch.walletProvider = walletProvider
  }

  getAddress(changeType, index, dAppId) {
    return this.web3bch.getAddress(changeType, index, dAppId)
  }

  getAddressIndex(changeType, dAppId) {
    return this.web3bch.getAddressIndex(changeType, dAppId)
  }

  getAddresses(changeType, startIndex, size, dAppId) {
    return this.web3bch.getAddresses(changeType, startIndex, size, dAppId)
  }

  getRedeemScript(p2shAddress, dAppId) {
    return this.web3bch.getRedeemScript(p2shAddress, dAppId)
  }

  getRedeemScripts(dAppId) {
    return this.web3bch.getRedeemScripts(dAppId)
  }

  addRedeemScript(redeemScript, dAppId) {
    return this.web3bch.addRedeemScript(redeemScript, dAppId)
  }

  getUtxos(dAppId) {
    return this.web3bch.getUtxos(dAppId)
  }

  getBalance(dAppId) {
    return this.web3bch.getBalance(dAppId)
  }

  sign(address, dataToSign) {
    return this.web3bch.sign(address, dataToSign)
  }

  buildTransaction(outputs, dAppId) {
    return this.web3bch.buildTransaction(outputs, dAppId)
  }

  getProtocolVersion() {
    return this.web3bch.getProtocolVersion()
  }

  getNetwork() {
    return this.web3bch.getNetwork()
  }

  getFeePerByte() {
    return this.web3bch.getFeePerByte()
  }

  getDefaultDAppId() {
    return this.web3bch.getDefaultDAppId()
  }

  setDefaultDAppId(dAppId) {
    return this.web3bch.setDefaultDAppId(dAppId)
  }
}

export default Wallet