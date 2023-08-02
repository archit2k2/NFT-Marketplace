import React from 'react';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';

const Listing = ({ data, open }) => {
    const { image, totalPrice, name } = data;

    return (
        <motion.div
            className='listing'
            onClick={open}
        >
            <div className='listing__content'>
                <div className='listing__image-container'>
                    <img
                        className='listing__image'
                        alt='loading...'
                        src={image}
                    />
                </div>
                <div className='listing__details'>
                    <div className='listing__name'>
                        <span>
                            {name}
                        </span>
                    </div>
                    <div className='listing__price'>
                        {ethers.utils.formatEther(totalPrice)} ETH
                    </div>
                </div>
            </div>
        </motion.div>
    )};

export default Listing;
