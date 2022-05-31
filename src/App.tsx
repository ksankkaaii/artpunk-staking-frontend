import './App.css';

import React, { useMemo } from 'react';
import Modal  from 'react-modal';
import {
  BrowserRouter,
  Routes,
  Route, 
  Navigate
} from 'react-router-dom';

import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getLedgerWallet,
} from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ToastProvider } from 'react-toast-notifications'

import Home from './pages/Home';
import { CLUSTER_API } from './config/dev.js'
require('@solana/wallet-adapter-react-ui/styles.css');

Modal.setAppElement('#root');

const AppWithProvider = () => {
  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet()],
    []
  );
  return (
      <ConnectionProvider endpoint={CLUSTER_API}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <ToastProvider>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/' element={<Navigate to='Home' />}/>
                </Routes>
              </BrowserRouter>
            </ToastProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
  )
}
export default AppWithProvider;