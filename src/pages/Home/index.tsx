import { useState, useEffect } from 'react'
import * as anchor from '@project-serum/anchor';
import { useConnection, useWallet, useAnchorWallet  } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { 
  PublicKey,
  SystemProgram,
  Keypair,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import { useToasts } from 'react-toast-notifications'
import { AccountLayout, Token, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EggBox from "../../components/EggBox";
import ProgressBar from "../../components/ProgressBar";
import { SolanaClient, SolanaClientProps } from '../../helpers/sol';
import { 
  COMMITMENT,
  CLUSTER_API, 
  PROGRAM_ID,
  ARTE_TOKEN_VAULT,
  ARTE_TOKEN_MINT,
  POOL_KEY_SEEDS,
  POOL_SIGNER_SEEDS,
  ARTE_VAULT_SEEDS,
  INTERVAL,
  ARTPUNK_UPDATE_AUTHORITY,
  ACHIEVEMENT_UPDATE_AUTHORITY,
  TOTAL_ARTPUNK,
  TOTAL_ACHIEVEMENT,
  POOL_DATA_SEEDS,
  DECIMAL,
  DAYTIME
} from '../../config/main.js';
import { IDL } from '../../constants/idl'
import './index.css';
import { getAccountInfo, getBlockTime, getRecentBlockHash, getTokenAccountByOwner } from '../../api/api';
import { sendTransactions } from '../../helpers/sol/connection';

import SwiperCore, {
  Navigation,
  Pagination
} from 'swiper';
import { delay } from '../../utils/Helper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

function HomePage() {
  const walletState = useWallet();
  const wallet = useAnchorWallet();

  const { connection } = useConnection();
  const solanaClient = new SolanaClient({ rpcEndpoint: CLUSTER_API } as SolanaClientProps);

  const { addToast } = useToasts()

  const [artPunks, setArtPunks] = useState([
    {
      image: '',
      mint: '',
      tokenAccount: '',
      name: '',
      token_type: -1,
      attribute: -1
    },
  ]);
  const [achievements, setAchievements] = useState([
    {
      image: '',
      mint: '',
      tokenAccount: '',
      name: '',
      token_type: -1,
      attribute: -1
    },
  ]);

  const [claimArtPunks, setClaimArtPunks] = useState([
    {
      image: '',
      mint: '',
      tokenAccount: '',
      name: '',
      attribute: -1,
      token_type: -1,
      current: 0
    },
  ]);
  const [claimAchievements, setClaimAchievements] = useState([
    {
      image: '',
      mint: '',
      tokenAccount: '',
      name: '',
      attribute: -1,
      token_type: -1,
      current: 0
    },
  ]);

  const [loading, setLoading] = useState(-1);
  const [loadingText, setLoadingText] = useState('Claiming...');
  const [arteCount, setArteCount] = useState(0)
  const [totalStakedArtpunk, setTotalStakedArtpunk] = useState(0);
  const [totalStakedAchievement, setTotalStakedAchievement] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  useEffect(() => {
    (async () => {
      if (!walletState.connected) return;
      setArtPunks([]);
      setAchievements([]);
      setClaimArtPunks([]);
      setClaimAchievements([]);
      await reload();
      const provider = getProvider();
      const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
      let [poolData, _nonce] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(POOL_DATA_SEEDS)],
        program.programId
      );
      const data = await program.account.data.fetch(poolData);
      setTotalStakedArtpunk(data.artpunk);
      setTotalStakedAchievement(data.achivement);
    })()
  }, [walletState.connected]);

  const reload = async () => {
    if (walletState.connected) {
      setLoading(0);
      setLoadingText('Loading...')
      //For staking 
      const pubKey = walletState.publicKey?.toString() || '';
      if (!walletState.publicKey) {
        return;
      }

      let [pool_signer, _nonce_signer] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(POOL_SIGNER_SEEDS), walletState.publicKey.toBuffer()],
        new PublicKey(PROGRAM_ID)
      );
      
      let walletAchievements: any[] = [];
      let walletArtpunks: any[] = [];
      let poolAchievements: any[] = [];
      let poolArtpunks: any[] = [];
      let result = await solanaClient.getAllCollectibles([pubKey], [
        { updateAuthority: ARTPUNK_UPDATE_AUTHORITY, collectionName: 'ArtPunk' } ,
        { updateAuthority: ACHIEVEMENT_UPDATE_AUTHORITY, collectionName: '' },
      ]);
      if (result[pubKey]) {
        result[pubKey].forEach((res: any) => {
          if (res.updateAuthority == ARTPUNK_UPDATE_AUTHORITY && res.name.indexOf('ArtPunk') >= 0) {
            let level = res?.attributes?.find((attr: any) => attr.trait_type === 'Restoration Grade');
            let value = 0;
            switch(level?.value) {
              case 'None':
                value = 0;
                break;
              case 'Standard':
                value = 1;
                break;
              case 'Excellent':
                value = 2;
                break;
              default:
                break;
            }
            walletArtpunks.push({
              ...res,
              token_type: 0,
              attribute: value,
              current: 0
            });
          }

          if (res.updateAuthority == ACHIEVEMENT_UPDATE_AUTHORITY) {
            let type = res?.attributes?.find((attr: any) => attr.trait_type === 'Achievement type');
            let value = 0;
            switch(type?.value) {
              case 'Metal':
                value = 0;
                break;
              case 'Bronze':
                value = 1;
                break;
              case 'Silver':
                value = 2;
                break;
              case 'Gold':
                value = 3;
                break;
              case 'Diamond':
                value = 4;
                break;
              default:
                break;
            }
            walletAchievements.push({
              ...res,
              token_type: 1,
              attribute: value,
              current: 0
            });
          }
        })
        
      }
      result = await solanaClient.getAllCollectibles([pool_signer.toString()], [
        { updateAuthority: ARTPUNK_UPDATE_AUTHORITY, collectionName: 'ArtPunk' } ,
        { updateAuthority: ACHIEVEMENT_UPDATE_AUTHORITY, collectionName: '' },
      ]);
      if (result[pool_signer.toString()]) {
        result[pool_signer.toString()].forEach((res: any) => {
          if (res.updateAuthority === ARTPUNK_UPDATE_AUTHORITY && res.name.indexOf('ArtPunk') >= 0) {
            let level = res?.attributes?.find((attr: any) => attr.trait_type === 'Restoration Grade');
            let value = 0;
            switch(level?.value) {
              case 'None':
                value = 0;
                break;
              case 'Standard':
                value = 1;
                break;
              case 'Excellent':
                value = 2;
                break;
              default:
                break;
            }
            poolArtpunks.push({
              ...res,
              token_type: 0,
              attribute: value,
              current: 0
            });
          }

          if (res.updateAuthority === ACHIEVEMENT_UPDATE_AUTHORITY) {
            let type = res?.attributes?.find((attr: any) => attr.trait_type === 'Achievement type');
            let value = 0;
            switch(type?.value) {
              case 'Metal':
                value = 0;
                break;
              case 'Bronze':
                value = 1;
                break;
              case 'Silver':
                value = 2;
                break;
              case 'Gold':
                value = 3;
                break;
              case 'Diamond':
                value = 4;
                break;
              default:
                break;
            }
            poolAchievements.push({
              ...res,
              token_type: 1,
              attribute: value,
              current: 0
            });
          }
        })
        await updateCurrentRewards(poolArtpunks, poolAchievements);
      }

      setArtPunks([...walletArtpunks]);
      setAchievements([...walletAchievements]);
      setClaimArtPunks([...poolArtpunks]);
      setClaimAchievements([...poolAchievements]);

      if (walletState.publicKey) {
        getTokenAccountByOwner(walletState.publicKey?.toString(), ARTE_TOKEN_MINT).then(result => {
          const { value } = result.result;
          if (value.length > 0) {
            let total_arte = 0;
            value.forEach((v: any) => {
              total_arte += v.account?.data?.parsed?.info?.tokenAmount?.uiAmount;
            })
            setArteCount(total_arte);
          }
        })
      }
      await getArteToken();
      
      setLoading(-1);
      window.clearInterval(intervalId);
      const interval = window.setInterval(async() => {
        await updateCurrentRewards(poolArtpunks, poolAchievements);
      }, INTERVAL);
      setIntervalId(interval);
    }
  }

  const updateCurrentRewards = async (artpunkList?: any[], achievementList?: any[]) => {
    let newClaimedArtpunks: any[] = artpunkList || claimArtPunks, newClaimedAchievements: any[] = achievementList || claimAchievements;
    let blockhash = await getRecentBlockHash();
    let currentTime = await getBlockTime(blockhash.result.context.slot);
    const provider = getProvider();
    const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
    let [poolKey, _nonce] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(POOL_KEY_SEEDS), walletState.publicKey!.toBuffer()],
      program.programId
    );

    let [poolData, _nonceData] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(POOL_DATA_SEEDS)],
      program.programId
    );

    const curPoolData = await program.account.data.fetch(poolData);
    const data = await program.account.poolKey.fetch(poolKey);
    const poolInfo = await program.account.pool.fetch(data.key);
    const poolNfts:any = poolInfo.nfts;
    for (let i = 0; i < newClaimedArtpunks.length; i ++) {
      const poolNft = poolNfts.find((nft: any) => nft.mint.toString() === newClaimedArtpunks[i].mint);
      if (poolNft) {
        newClaimedArtpunks[i] = {
          ...newClaimedArtpunks[i],
          current: poolNft.reward * (currentTime.result - poolNft.lastTime) / DECIMAL / DAYTIME
        }
      }
    }

    for (let i = 0; i < newClaimedAchievements.length; i ++) {
      const poolNft = poolNfts.find((nft: any) => nft.mint.toString() === newClaimedAchievements[i].mint);
      if (poolNft) {
        newClaimedAchievements[i] = {
          ...newClaimedAchievements[i],
          current: poolNft.reward * (currentTime.result - poolNft.lastTime) / DECIMAL / DAYTIME
        }
      }
    }

    setClaimArtPunks([...newClaimedArtpunks]);
    setClaimAchievements([...newClaimedAchievements]);
    setTotalStakedArtpunk(curPoolData.artpunk);
    setTotalStakedAchievement(curPoolData.achivement);
  }
  
  const getAttributeName = (token_type: number, attribute: number) => {
    if (token_type === 0) {
      switch(attribute) {
        case 0:
          return 'None';
        case 1:
          return 'Standard';
        case 2:
          return 'Excellent';
        default:
          break;
      }
    }
    else if (token_type === 1) {
      switch(attribute) {
        case 0:
          return 'Metal';
        case 1:
          return 'Bronze';
        case 2:
          return 'Silver';
        case 3:
          return 'Gold';
        case 4:
          return 'Diamond';
        default:
          break;
      }
    }
  }
  
  const getRewardFromAttribute = (token_type: number, attribute: number) => {
    if (token_type === 0) {
      switch(attribute) {
        case 0: return 5;
        case 1: return 10;
        case 2: return 20;
      }
    }
    else if (token_type === 1) {
      switch(attribute) {
        case 0: return 0.05;
        case 1: return 0.25;
        case 2: return 1;
        case 3: return 5;
        case 4: return 20;
      }
    }
    return 0;
  }

  const stake = async (nft: any) => {
    setLoadingText('Staking...');
    setLoading(1);
		const provider = getProvider();
		const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
    try {
      if (!walletState.publicKey) {
        addToast("Connect your wallet!", {
          appearance: 'warning',
          autoDismiss: true,
        })
        setLoading(-1)
        return;
      }

      let instructionSet= [], signerSet = [];
      let [poolKey, _nonce] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(POOL_KEY_SEEDS), walletState.publicKey.toBuffer()],
        program.programId
      );
      let [poolSigner, _nonceSigner] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(POOL_SIGNER_SEEDS), walletState.publicKey.toBuffer()],
        program.programId
      );
      let [poolData, _nonceData] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(POOL_DATA_SEEDS)],
        program.programId
      );
      const { result } = await getAccountInfo(poolKey.toBase58());
      let pool:PublicKey, data:any;
      if (!result.value) {
        let transaction = [];
        const total_token = 500;
        const poolSpace = 42 + 54 * total_token + 8;
        const poolAccountRent = await provider!.connection.getMinimumBalanceForRentExemption(
          poolSpace
        );
        const poolKeypair = new Keypair();
        pool = poolKeypair.publicKey;
        transaction.push(SystemProgram.createAccount({
          fromPubkey: provider!.wallet.publicKey,
          newAccountPubkey: poolKeypair.publicKey,
          lamports: poolAccountRent,
          space: poolSpace,
          programId: program.programId
        }))
        transaction.push(program.instruction.createPool(_nonce, _nonceSigner, {
          accounts: {
            pool: pool,
            poolKey: poolKey,
            poolSigner: poolSigner,
            user: walletState.publicKey,
            systemProgram: SystemProgram.programId
        }}));
        instructionSet.push(transaction);
        signerSet.push([poolKeypair]);
      }
      else {
        data = await program.account.poolKey.fetch(poolKey);
        pool = data.key;
      }

      if (!nft) {
        let nfts: any[] = [];
        artPunks.forEach(art => {
          nfts.push({
            ...art,
          })
        })
        achievements.forEach(achive => {
          nfts.push({
            ...achive,
          })
        })
        for (let i = 0; i < nfts.length; i ++) {
          let newTx: any = await makeTransaction(program, poolSigner, pool, poolData, nfts[i]);
          instructionSet.push(newTx.transaction);
          signerSet.push(newTx.signers);
        }
        await sendTransactions(connection, walletState, instructionSet, signerSet)
        await delay(1000);
        await reload();
      }
      else {
        let newTx:any = await makeTransaction(program, poolSigner, pool, poolData, nft);
        instructionSet.push(newTx.transaction);
        signerSet.push(newTx.signers);
        await sendTransactions(connection, walletState, instructionSet, signerSet);
        
        await delay(1000);
        await reload();
      }
      data = await program.account.pool.fetch(pool);
      setLoading(-1);
      addToast("Staking success!", {
        appearance: 'success',
        autoDismiss: true,
      })
    }
    catch (error) {
      addToast("Staking failed!", {
        appearance: 'error',
        autoDismiss: true,
      })
      setLoading(-1)
    }
  }

  const claim = async (nft: any, mode: number) => {

    try {
      if (mode === 0) {
        setLoadingText('Claiming...');
      }
      else if (mode === 1) {
        setLoadingText('Unstaking...');
      }
      setLoading(1);
      if (!walletState.publicKey) {
        addToast("Connect your wallet!", {
          appearance: 'warning',
          autoDismiss: true,
        })
        return;
      }
      const provider = getProvider();
      const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
     

      let [poolKey, _nonce] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(POOL_KEY_SEEDS), walletState.publicKey.toBuffer()],
        program.programId
      );
      let [poolSigner, _nonceSigner] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(POOL_SIGNER_SEEDS), walletState.publicKey.toBuffer()],
          program.programId
      );
  
      let [poolData, _nonceData] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(POOL_DATA_SEEDS)],
        program.programId
      );
      
      let [vault, _nonceVault] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from(ARTE_VAULT_SEEDS)],
          program.programId
      );
      let data: any = await program.account.poolKey.fetch(poolKey);
      const pool = data.key;
      const { result } = await getAccountInfo(pool.toBase58());
      let instructionSet = [];
      let signerSet = [];
      let transaction = [];
      let signers = [];
      if (result.value) {
        let tokenResult = await getTokenAccountByOwner(walletState.publicKey.toString(), ARTE_TOKEN_MINT);
        if (tokenResult.result.value.err) {
          addToast(`${mode === 1 ? 'Unstaking failed!' : 'Claiming failed!'}`, {
            appearance: 'error',
            autoDismiss: true,
          })
          setLoading(-1)
          return;
        }
        let token_to = '';
        let claimedDrakes: any[] = [];
        if (tokenResult.result.value.length === 0) {
          const aTokenAccount = new Keypair();
          const aTokenAccountRent = await connection.getMinimumBalanceForRentExemption(
            AccountLayout.span
          )
          transaction.push(SystemProgram.createAccount({
              fromPubkey: walletState.publicKey,
              newAccountPubkey: aTokenAccount.publicKey,
              lamports: aTokenAccountRent,
              space: AccountLayout.span,
              programId: TOKEN_PROGRAM_ID
          }));
          transaction.push(
            Token.createInitAccountInstruction(
              TOKEN_PROGRAM_ID,
              new PublicKey(ARTE_TOKEN_MINT),
              aTokenAccount.publicKey,
              walletState.publicKey
          ));
          signers.push(aTokenAccount);
          instructionSet.push(transaction);
          signerSet.push(signers);
          token_to = aTokenAccount.publicKey.toString();
        }
        else {
          token_to = tokenResult.result.value[0].pubkey;
        }
        const makeTransaction = async (nft: any, mode: number) => {
          const transaction = [];
          let tokenResult = await getTokenAccountByOwner(walletState.publicKey!.toString(), nft.mint);
          const nftTo = tokenResult.result.value[0].pubkey;
          if (mode === 0) {
            transaction.push(
              program.instruction.claim(_nonceVault, {
                accounts: {
                  pool: pool,
                  user: walletState.publicKey!,
                  mint: new PublicKey(nft.mint),
                  vault: vault,
                  tokenFrom: new PublicKey(ARTE_TOKEN_VAULT),
                  tokenTo: new PublicKey(token_to),
                  tokenProgram: TOKEN_PROGRAM_ID
              }
            }));
          }
          else if (mode === 1) {
            transaction.push(
              program.instruction.unstake(_nonceSigner, _nonceVault, {
                accounts: {
                  pool: pool,
                  poolSigner: poolSigner,
                  poolData: poolData,
                  user: walletState.publicKey!,
                  mint: new PublicKey(nft.mint),
                  vault: vault,
                  nftFrom: new PublicKey(nft.tokenAccount),
                  nftTo: new PublicKey(nftTo),
                  tokenFrom: new PublicKey(ARTE_TOKEN_VAULT),
                  tokenTo: new PublicKey(token_to),
                  tokenProgram: TOKEN_PROGRAM_ID
              }
            }));
          }
          return transaction;
        }
        if (!nft) {
          let nfts: any[] = [];
          claimArtPunks.forEach(art => {
            nfts.push({
              ...art,
              token_type: 0
            })
          })
          claimAchievements.forEach(achive => {
            nfts.push({
              ...achive,
              token_type: 1
            })
          })
          for (let i = 0; i < nfts.length; i ++) {
            transaction = await makeTransaction(nfts[i], mode); 
            instructionSet.push(transaction);
            signerSet.push([]);
            claimedDrakes.push(i);
          }
          await sendTransactions(connection, walletState, instructionSet, signerSet);
          if (mode === 0) {
            setClaimArtPunks(claimArtPunks.map(artpunk => {
              return {
                ...artpunk,
                current: 0
              }
            }))
            setClaimAchievements(claimAchievements.map(achivement => {
              return {
                ...achivement,
                current: 0
              }
            }))
          }
         
        }
        else {
          transaction = await makeTransaction(nft, mode); 
          instructionSet.push(transaction);
          signerSet.push([]);
          await sendTransactions(connection, walletState, instructionSet, signerSet);
          if (mode === 0) {
            setClaimArtPunks(claimArtPunks.map(artpunk => {
              if (artpunk.mint == nft.mint) {
                return {
                  ...artpunk,
                  current: 0
                }
              }
              else {
                return {
                  ...artpunk
                }
              }
            }))

            setClaimAchievements(claimAchievements.map(achievement => {
              if (achievement.mint == nft.mint) {
                return {
                  ...achievement,
                  current: 0
                }
              }
              else {
                return {
                  ...achievement
                }
              }
            }))
          }
          
        }
      }
      else {
        addToast(`${mode === 1 ? 'Unstaking failed!' : 'Claiming failed!'}`, {
          appearance: 'error',
          autoDismiss: true,
        })
        setLoading(-1)
        return;
      }
      if (mode === 1) {
        await delay(1000);
        await reload();
      }
      else {
        await getArteToken();
      }
      setLoading(-1);
      addToast(`${mode === 1 ? 'Unstaking success!' : 'Claming success!'}`, {
        appearance: 'success',
        autoDismiss: true,
      })
      data = await program.account.pool.fetch(pool);
    }
    catch (error) {
      addToast(`${mode === 1 ? 'Unstaking failed!' : 'Claiming failed!'}`, {
        appearance: 'error',
        autoDismiss: true,
      })
      setLoading(-1)
    }
  }

  const makeTransaction = async (program: anchor.Program<any>, poolSigner: PublicKey, pool: PublicKey, poolData: PublicKey, nft: any) => {
    const aTokenAccount = new Keypair();
    const aTokenAccountRent = await connection.getMinimumBalanceForRentExemption(
      AccountLayout.span
    )
    let transaction = [];
    let signers:any[] = [];
    if (!walletState.publicKey)
      return;
    
    transaction.push(SystemProgram.createAccount({
      fromPubkey: walletState.publicKey,
      newAccountPubkey: aTokenAccount.publicKey,
      lamports: aTokenAccountRent,
      space: AccountLayout.span,
      programId: TOKEN_PROGRAM_ID
    }));
    transaction.push(Token.createInitAccountInstruction(
      TOKEN_PROGRAM_ID,
      new PublicKey(nft.mint),
      aTokenAccount.publicKey,
      poolSigner
    ));
    
    signers.push(aTokenAccount);
    
    transaction.push(program.instruction.stake(nft.token_type, nft.attribute, {
      accounts: {
        user: walletState.publicKey,
        mint: nft.mint,
        pool: pool,
        poolData: poolData,
        from: new PublicKey(nft.tokenAccount),
        to: aTokenAccount.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId, 
        rent: SYSVAR_RENT_PUBKEY
      },
      signers
    }));
    return { transaction, signers };
  }

  const getProvider = () => {
    if (wallet)
		  return new anchor.Provider(connection, wallet, COMMITMENT as anchor.web3.ConfirmOptions);
	}

  const getArteToken = async () => {
    if (walletState.publicKey) {
      const result: any = await getTokenAccountByOwner(walletState.publicKey?.toString(), ARTE_TOKEN_MINT);
      const { value } = result.result;
      if (value.length > 0) {
        let total_arte = 0;
        value.forEach((v: any) => {
          total_arte += v.account?.data?.parsed?.info?.tokenAmount?.uiAmount;
        })
        setArteCount(total_arte);
      }
    }
  }

  const stakeAll = async () => {
    await stake(null);
  }

  const claimAll = async () => {
    await claim(null, 0);
  }

  const unstakeAll = async () => {
    await claim(null, 1);
  }
  
  return (
    <div className="div">
      {
        loading >= 0 ?
          <div id="preloader"> 
            { loading === 1 && <div style={{paddingTop: '150px', fontSize: '50px'}}>{loadingText}</div>}
          </div> :
          <div id="preloader" style={{display: 'none'}}></div>
      }
      <div className="home">
          <Header />
          <div className="status">
              <div className="font_72">
                {(claimArtPunks.length > 0 || claimAchievements.length > 0) && <>
                  <p>{ `How will`}</p>
                  <p>{ `you spend`}</p>
                  <p>{ `your $ARTE?`}</p></>
                } 
                {(claimArtPunks.length < 1 && claimAchievements.length < 1 ) && <>
                  <p>{ `Ready to`}</p>
                  <p>{ `Stake?`}</p></>
                }

              </div>
              <div className="btn_group ml_150"> 

                  { walletState.connected && 
                      // <Button value="STAKE ALL" style={{ width: 169, height: 50, marginLeft: 28 }} onClick={() => stake(null)} dark />
                    <div className="balance-btn d_flex justify_content_center">
                      <div className="d_flex content_center align_items_center">
                        <div>
                        <p style={{lineHeight: 1}}>Balance: {arteCount.toFixed(2)}</p>
                        {(claimArtPunks.length > 0 || claimAchievements.length > 0)  && <p className='is_staked text_right' style={{lineHeight: 1}}>$ARTE</p>}
                        </div>
                      </div>

                    </div>                      
                  }
                  <WalletMultiButton className='wallet-btn'/>
                  
              </div>

              {/* <div className="total">
                  <div className="font_24">
                      TOTAL <br /> $ARTE
                  </div>
                  <div className="font_52">
                      {arteCount}
                  </div>
              </div> */}
          </div>
          {(claimArtPunks.length < 1 && claimAchievements.length < 1 ) &&
          <div className='mt_50'>
            <p>Earn $Arte by staking your Artpunks and Achievements.</p>
            <p>Artpunks and Achievements are waiting to be staked</p>
          </div>
          }

          <div className="mt_150 pt_100 progress">
            <div className="d_flex align_items_center justify_content_between">
              <div>
                <p className='font_600'>Artpunk Staked</p>
                <p className='font_40 light_blue font_600'>{`${Number(totalStakedArtpunk / TOTAL_ARTPUNK * 100).toFixed(2)}%`}</p>
              </div>
              <div>
                <p className='font_25 light_blue font_600'>
                  { `${totalStakedArtpunk} / ${TOTAL_ARTPUNK}`}
                </p>
              </div>
            </div>
            <div className='mt_10'>
              <ProgressBar bgcolor={'#6a1b9a'} completed={totalStakedArtpunk / TOTAL_ARTPUNK * 100} />
            </div>
          </div>

          <div className="mt_20 pt_100 progress">
            <div className="d_flex align_items_center justify_content_between">
              <div>
                <p className='font_600'>Achievement Staked</p>
                <p className='font_40 light_blue font_600'>{`${Number(totalStakedAchievement / TOTAL_ACHIEVEMENT * 100).toFixed(2)}%`}</p>
              </div>
              <div>
                <p className='font_25 light_blue font_600'>
                  { `${totalStakedAchievement} / ${TOTAL_ACHIEVEMENT}`}
                </p>
              </div>
            </div>
            <div className='mt_10'>
              <ProgressBar bgcolor={'#6a1b9a'} completed={totalStakedAchievement / TOTAL_ACHIEVEMENT * 100} />
            </div>
          </div>

          <div className='mt_50 d_flex justify_content_center'>
            <div className="balance-btn d_flex justify_content_center align_items_center" onClick={stakeAll}>Stake All</div>
            <div className="balance-btn d_flex justify_content_center align_items_center" onClick={claimAll}>Claim All</div>
            <div className="balance-btn d_flex justify_content_center align_items_center" onClick={unstakeAll}>Unstake All</div>
          </div>
          <div className="nft-container">
            <div className="nft-collection">
              <div className="nft-title text_center font_600">Staked Artpunks</div> 
              <div className="mt_50 mb_20 text_center">
                {claimArtPunks.length < 1 &&
                  <span className='no_staked'>
                    You have no Artpunks staked, let's change that!
                  </span>
                }
              </div>
              <div className="eggs">
                {claimArtPunks.length > 2 && 
                  <Swiper
                    style={{backgroundColor: '#101922'}}
                    spaceBetween={90}
                    navigation={true} 
                    observer={true}
                    observeParents={true}
                    parallax={true}
                    pagination={{
                      type: "progressbar",
                    }}
                  slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    >
                    {claimArtPunks.map((item, index) => {
                        return (
                        <SwiperSlide key={index}>
                        <EggBox 
                        img={item.image} 
                        key={index} 
                        name={item.name}
                        type={0}
                        attribute={getAttributeName(0, item?.attribute)}
                        day = {getRewardFromAttribute(0, item?.attribute)}
                        current = {item?.current}
                        onClicks={[async () => await claim(item, 0), async () => await claim(item, 1)]}
                        values={["Claim", "Unstake"]}
                        loop={false}
                        />
                        </SwiperSlide>)        
                    })}
                  </Swiper>                
                }
                {claimArtPunks.length < 3 && <>
                  {claimArtPunks.map((item, index) => {
                  return (<EggBox 
                    img={item.image} 
                    key={index} 
                    name={item.name}
                    type={0}
                    attribute={getAttributeName(0, item?.attribute)}
                    day = {getRewardFromAttribute(0, item?.attribute)}
                    current = {item?.current}
                    onClicks={[async () => await claim(item, 0), async () => await claim(item, 1)]}
                    id={index} 
                    values={["Claim", "Unstake"]}
                    loop={true}
                    /> )
                  })}        
                </>}
              </div>
            </div>
            <div className="nft-collection">
              <div className="nft-title text_center font_600">Available Artpunks for staking</div>
              <div className="eggs">
                {artPunks.length > 2 && 
                  <Swiper
                    style={{backgroundColor: '#101922'}}
                    spaceBetween={90}
                    navigation={true} 
                    observer={true}
                    observeParents={true}
                    parallax={true}
                    pagination={{
                      type: "progressbar",
                    }}
                    slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    >
                    {artPunks.map((item, index) => {
                        return <SwiperSlide key={index}>
                          <EggBox 
                        img={item.image} 
                        key={index} 
                        name={item.name}
                        type={0}
                        attribute={getAttributeName(0, item?.attribute)}
                        day = {getRewardFromAttribute(0, item?.attribute)}
                        onClicks={[async () => await stake(item)]} id={index} 
                        values={["Stake"]}
                        loop={false}
                        />
                        </SwiperSlide>            
                    })}
                  </Swiper>                
                }
                {artPunks.length < 3 && <>
                  {artPunks.map((item, index) => {
                  return (<EggBox 
                    img={item.image} 
                    key={index} 
                    name={item.name}
                    type={0}
                    attribute={getAttributeName(0, item?.attribute)}
                    day = {getRewardFromAttribute(0, item?.attribute)}
                    onClicks={[async () => await stake(item)]} id={index} values={["Stake"]}
                    loop={true}
                    /> )
                  })}        
                </>}
              </div>
            </div>

            <div className="nft-collection">
              <div className="nft-title text_center font_600">Staked Achievements</div> 
              <div className="mt_50 mb_20 text_center">
                {claimAchievements.length < 1 &&
                  <span className='no_staked'>
                    You have no Achievements staked, let's change that!
                  </span>
                }
              </div>
              <div className="eggs">
                {claimAchievements.length > 2 && 
                  <Swiper
                    style={{backgroundColor: '#101922'}}
                    spaceBetween={90}
                    navigation={true} 
                    observer={true}
                    observeParents={true}
                    parallax={true}
                    pagination={{
                      type: "progressbar",
                    }}
                    slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    >
                    {claimAchievements.map((item, index) => {
                        return <SwiperSlide key={index}>
                          <EggBox 
                        img={item.image} 
                        key={index} 
                        name={item.name}
                        type={1}
                        attribute={getAttributeName(1, item?.attribute)}
                        day = {getRewardFromAttribute(1, item?.attribute)}
                        current = {item?.current}
                        onClicks={[async () => await claim(item, 0), async () => await claim(item, 1)]}
                        values={["Claim", "Unstake"]}
                        loop={false}
                        />
                        </SwiperSlide>            
                    })}
                  </Swiper>                
                }
                {claimAchievements.length < 3 && <>
                  {claimAchievements.map((item, index) => {
                  return (<EggBox 
                    img={item.image} 
                    key={index} 
                    name={item.name}
                    type={1}
                    attribute={getAttributeName(1, item?.attribute)}
                    day = {getRewardFromAttribute(1, item?.attribute)}
                    current = {item?.current}
                    onClicks={[async () => await claim(item, 0), async () => await claim(item, 1)]}
                    id={index} 
                    values={["Claim", "Unstake"]}
                    loop={true}
                    /> )
                  })}        
                </>}
              </div>
            </div>
            <div className="nft-collection">
              <div className="nft-title text_center font_600">Available Achievements for staking</div>
              <div className="eggs">
                {achievements.length > 2 && 
                  <Swiper
                    style={{backgroundColor: '#101922'}}
                    spaceBetween={90}
                    navigation={true} 
                    observer={true}
                    observeParents={true}
                    parallax={true}
                    pagination={{
                      type: "progressbar",
                    }}
                    slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    >
                    {achievements.map((item, index) => {
                        return <SwiperSlide key={index}>
                          <EggBox 
                        img={item.image} 
                        key={index} 
                        name={item.name}
                        type={1}
                        attribute={getAttributeName(1, item?.attribute)}
                        day = {getRewardFromAttribute(1, item?.attribute)}
                        onClicks={[async () => await stake(item)]} id={index} 
                        values={["Stake"]}
                        loop={false}
                        />
                        </SwiperSlide>            
                    })}
                  </Swiper>                
                }
                {achievements.length < 3 && <>
                  {achievements.map((item, index) => {
                  return (<EggBox 
                    img={item.image} 
                    key={index} 
                    name={item.name}
                    type={1}
                    attribute={getAttributeName(1, item?.attribute)}
                    day = {getRewardFromAttribute(1, item?.attribute)}
                    onClicks={[async () => await stake(item)]} id={index} values={["Stake"]}
                    loop={true}
                    /> )
                  })}        
                </>}
              </div>
            </div>
          </div>

          <Footer />
      </div>
    </div>
  )
}

export default HomePage;
