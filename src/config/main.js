import { mainnet } from '../constants/cluster';

const CLUSTER_API = mainnet;
const CLUSTER = 'mainnet-beta';
const ARTPUNK_UPDATE_AUTHORITY = 'GtyAfQyhh2jcC3vJWEkiPzzZCK6WG3rUjgxdsdAwCx8i';
const ACHIEVEMENT_UPDATE_AUTHORITY = 'HR6C2p1EHXFsL1kqCpdp2EEg1WXpiMUrUJaz8k1ghod1';
const VAULT_PDA = 'BCVUUKNpqWwr5MpdiKRsXgAFruwfAWmiTpCWF7VHwkJz';
const COMMITMENT = 'confirmed';
const PROGRAM_ID = '9KTTmg9ds35Lr2w7Jbq898c9qx4rdES3Qx7EnfCNWjKu';
const ARTE_TOKEN_VAULT = 'BUMwYyuBodLgEH7WUk1xYsFiHAYXCrycNZrSBdsUyVcG';
const ARTE_TOKEN_MINT= '6Dujewcxn1qCd6rcj448SXQL9YYqTcqZCNQdCn3xJAKS';
const BACKEND_URL= 'http://18.183.136.209/api';
// const BACKEND_URL= 'http://localhost:5000/api';
const TWITTER_URL = 'https://www.twitter.com/artpunk';
const DISCORD_URL = 'https://www.discord.gg/artpunk';
const ARTE_VAULT_SEEDS = 'ARTE staking vault';
const POOL_DATA_SEEDS = 'ARTE staking data';
const POOL_KEY_SEEDS = 'artpunk-achivement pool2 key';
const POOL_SIGNER_SEEDS = 'artpunk-achivement pool2 signer';
const INTERVAL = 10000;
const TOTAL_ARTPUNK = 10000;
const TOTAL_ACHIEVEMENT = 2000;
const DECIMAL = 1000000;
const DAYTIME = 86400;

export {
  CLUSTER_API,
  CLUSTER,
  COMMITMENT,
  ARTPUNK_UPDATE_AUTHORITY,
  ACHIEVEMENT_UPDATE_AUTHORITY,
  PROGRAM_ID,
  VAULT_PDA,
  ARTE_TOKEN_VAULT,
  ARTE_TOKEN_MINT,
  BACKEND_URL,
  TWITTER_URL,
  DISCORD_URL,
  ARTE_VAULT_SEEDS,
  POOL_KEY_SEEDS,
  POOL_SIGNER_SEEDS,
  INTERVAL,
  TOTAL_ARTPUNK,
  TOTAL_ACHIEVEMENT,
  POOL_DATA_SEEDS,
  DECIMAL,
  DAYTIME
}
