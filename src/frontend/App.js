import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marketplace from './pages/Marketplace.js';
import Home from './pages/Home';
import Create from './pages/Create';
import MyListedItems from './pages/MyListeditem';
import MyPurchases from './pages/MyPurchases';
import MarketplaceAbi from './contractsData/Marketplace.json';
import MarketplaceAddress from './contractsData/Marketplace-address.json';
import NFTAbi from './contractsData/NFT.json';
import NFTAddress from './contractsData/NFT-address.json';
import { useState } from 'react';
import { ethers } from 'ethers';

import './styles/App.css';
import SharedLayout from './components/SharedLayout';
import About from './pages/About';
import Connect from './pages/Connect';

function App() {
    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState(null);
    const [nft, setNFT] = useState({});
    const [marketplace, setMarketplace] = useState({});
    // MetaMask Login/Connect
    const web3Handler = async () => {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
        // Get provider from Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Set signer
        const signer = provider.getSigner();

        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        });

        window.ethereum.on('accountsChanged', async function (accounts) {
            setAccount(accounts[0]);
            await web3Handler();
        });
        loadContracts(signer);
    };
    const loadContracts = async (signer) => {
        // Get deployed copies of contracts
        const marketplace = new ethers.Contract(
            MarketplaceAddress.address,
            MarketplaceAbi.abi,
            signer
        );
        setMarketplace(marketplace);
        const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
        setNFT(nft);
        setLoading(false);
    };

    return (
        <BrowserRouter>
            <div className='App'>
                <div>
                    {loading ? (
                        <Connect web3Handler={web3Handler}/>
                    ) : (
                        <Routes>
                            <Route path='/' element={<SharedLayout web3Handler={web3Handler} account={account} />}>
                                <Route 
                                    index 
                                    element={
                                        <Home 
                                            marketplace={marketplace} 
                                            nft={nft}
                                        />
                                    } 
                                />
                                <Route
                                    path='/marketplace'
                                    element={
                                        <Marketplace
                                            marketplace={marketplace}
                                            nft={nft}
                                            account={account}
                                        />
                                    }
                                />
                                <Route
                                    path='/about'
                                    element={
                                        <About
                                            marketplace={marketplace}
                                            nft={nft}
                                        />
                                    }
                                />
                                <Route
                                    path='/create'
                                    element={
                                        <Create
                                            marketplace={marketplace}
                                            nft={nft}
                                        />
                                    }
                                />
                                <Route
                                    path='/listed'
                                    element={
                                        <MyListedItems
                                            marketplace={marketplace}
                                            nft={nft}
                                            account={account}
                                        />
                                    }
                                />
                                <Route
                                    path='/purchased'
                                    element={
                                        <MyPurchases
                                            marketplace={marketplace}
                                            nft={nft}
                                            account={account}
                                        />
                                    }
                                />
                            </Route>
                        </Routes>
                    )}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
