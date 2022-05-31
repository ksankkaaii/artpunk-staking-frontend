import axios from 'axios'
import { CLUSTER_API } from '../config/main';

const getAccountInfo = async (pubkey: String) => {
  const result = await axios.post(CLUSTER_API, {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getAccountInfo",
    "params": [
      pubkey,
      {
        "encoding": "jsonParsed"
      }
    ]
  })
  
  return result.data;
}

const getTokenAccountByOwner = async (owner: String, mint: String) => {
  const result = await axios.post(CLUSTER_API, {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getTokenAccountsByOwner",
    "params": [
      owner,
      {
        "mint": mint
      },
      {
        "encoding": "jsonParsed"
      }
    ]
  });
  return result.data;
}

const getRecentBlockHash = async () => {
  const result = await axios.post(CLUSTER_API, {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getRecentBlockhash",
  });
  return result.data;
}

const getBlockTime = async (block: number) => {
  const result = await axios.post(CLUSTER_API, 
    {
      "jsonrpc":"2.0",
      "id":1, 
      "method":"getBlockTime",
      "params":[block]}
    );
  return result.data;
}

export {
  getAccountInfo,
  getTokenAccountByOwner,
  getRecentBlockHash,
  getBlockTime
}