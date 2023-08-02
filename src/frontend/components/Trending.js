import React, { useState, useEffect } from 'react'
import Card from '../components/Card';

function Trending({ marketplace, nft }) {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    const loadtrendingItems = async () => {
        // Load all unsold items
        const itemCount = await marketplace.itemCount();
        let items = [];
        for (let i = 1; i <= itemCount; i++) {
            const item = await marketplace.items(i);
            if (!item.sold) {
                // get uri url from nft contract
                const uri = await nft.tokenURI(item.tokenId);
                // use uri to fetch the nft metadata stored on ipfs
                const response = await fetch(uri);
                const metadata = await response.json();
                // get total price of item (item price + fee)
                const totalPrice = await marketplace.getTotalPrice(item.itemId);
                // Add item to items array
                items.push({
                    totalPrice,
                    itemId: item.itemId,
                    seller: item.seller,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image,
                    category: metadata.category
                });
            }
        }

        items.sort((a, b) => b.totalPrice - a.totalPrice);
        const top3Items = items.slice(0, 3);
    
        setLoading(false);
        setItems(top3Items);
    };

    useEffect(() => {
        loadtrendingItems();
    }, []);

    return (
        <div className='trending'>
            <h1>Trending</h1>
            <div className='nfts trend'>
                {
                    loading ? (
                        <h2>Loading...</h2>
                    ) : (   
                      items.length > 0 ? (
                            <div className='listed-item'>
                                {items.map((item, idx) => (
                                    <Card data={item} key={idx} val={0} />
                                ))}
                            </div>
                        ) : (
                        <div className='no-items'>
                            <div>
                                No NFTs Listed 
                            </div>
                        </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Trending
