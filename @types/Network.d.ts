import axios from 'axios';
export default class Network {
  constructor(restURL:string);

  addNode(node:string, command:string):any;

  clearBanned():any;

  disconnectNode(configuration:object):any; 

  getAddedNodeInfo(node?:string):any;

  getConnectionCount():any;

  getNetTotals():any;

  getNetworkInfo():any;

  getPeerInfo():any;
  //
  // listBanned() {
  //   // List all banned IPs/Subnets.
  //   return axios.get(`${this.restURL}network/listBanned`)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return JSON.stringify(error.response.data.error.message);
  //   });
  // }

  ping():any;
  //
  // setBan(subnet, command, bantime, absolute) {
  //   // Attempts add or remove a IP/Subnet from the banned list.
  //   //
  //   // Arguments:
  //   // 1. "subnet"       (string, required) The IP/Subnet (see getpeerinfo for nodes ip) with a optional netmask (default is /32 = single ip)
  //   // 2. "command"      (string, required) 'add' to add a IP/Subnet to the list, 'remove' to remove a IP/Subnet from the list
  //   // 3. "bantime"      (numeric, optional) time in seconds how long (or until when if [absolute] is set) the ip is banned (0 or empty means using the default time of 24h which can also be overwritten by the -bantime startup argument)
  //   // 4. "absolute"     (boolean, optional) If set, the bantime must be a absolute timestamp in seconds since epoch (Jan 1 1970 GMT)
  //
  //   return axios.post(`${this.baseurl}network/setban/${subnet}/${command}`)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return JSON.stringify(error.response.data.error.message);
  //   });
  // }
  //
  // setNetworkActive(state) {
  //   // Disable/enable all p2p network activity.
  //   //
  //   // Arguments:
  //   // 1. "state"        (boolean, required) true to enable networking, false to disable
  //
  //   return axios.post(`${this.baseurl}network/setNetworkActive/${state}`)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return JSON.stringify(error.response.data.error.message);
  //   });
  // }
}