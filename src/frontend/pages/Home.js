import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import { useLocation } from 'react-router-dom';
import '../styles/Home.css';
import Email from '../components/Email';
import Trending from '../components/Trending';

const Home = ({ marketplace, nft }) => {

    document.title="OpenLake - NFT MarketPlace"

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='home'>
            <Hero />
            <Trending marketplace={marketplace} nft={nft} />
            <Email />
        </div>
    );
};
export default Home;
