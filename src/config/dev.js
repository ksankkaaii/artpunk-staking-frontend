import { devnet } from '../constants/cluster';

const CLUSTER_API = devnet;
const CLUSTER = 'devnet';
const CREATOR_ARTPUNK_ADDRESS = 'GtyAfQyhh2jcC3vJWEkiPzzZCK6WG3rUjgxdsdAwCx8i';
const CREATOR_ACHIVEMENT_ADDRESS = 'GtyAfQyhh2jcC3vJWEkiPzzZCK6WG3rUjgxdsdAwCx8i';

const ARTPUNK_UPDATE_AUTHORITY = 'GtyAfQyhh2jcC3vJWEkiPzzZCK6WG3rUjgxdsdAwCx8i';
const ACHIEVEMENT_UPDATE_AUTHORITY = 'HR6C2p1EHXFsL1kqCpdp2EEg1WXpiMUrUJaz8k1ghod1';

const VAULT_PDA = 'hwcUk7a7kbfRYeygtVJnw85jUuc7CtVcJWhcZgrk8DK';
const COMMITMENT = 'confirmed';
const PROGRAM_ID = '5nNtUbv1pWZhrJHm1t41q3gzqcDwGsSx6QXGiQZ29pw1';
const ARTE_TOKEN_VAULT = '2bhXn19fNE1hkLtptqJTynjxv9dRYcLjmPrP3n4FGrjd';
const ARTE_TOKEN_MINT= 'GnBw4qZs3maF2d5ziQmGzquQFnGV33NUcEujTQ3CbzP3';
// const BACKEND_URL= 'http://18.183.136.209/api';
const BACKEND_URL= 'http://localhost:5000/api';
const TWITTER_URL = 'https://www.twitter.com/artpunk';
const DISCORD_URL = 'https://www.discord.gg/artpunk';
const ARTE_VAULT_SEEDS = 'ARTE staking vault';
const POOL_SEEDS = 'artpunk-achivement pool';
const POOL_SIGNER_SEEDS = 'artpunk-achivement pool signer';
const INTERVAL = 10000;
export {
  CLUSTER_API,
  CLUSTER,
  COMMITMENT,
  CREATOR_ARTPUNK_ADDRESS,
  CREATOR_ACHIVEMENT_ADDRESS,
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
  POOL_SEEDS,
  POOL_SIGNER_SEEDS,
  INTERVAL,
}
