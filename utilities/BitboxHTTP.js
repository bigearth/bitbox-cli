import axios from 'axios';

export const BitboxHTTP = axios.create({
  baseURL: `http://localhost:8332/`
});
