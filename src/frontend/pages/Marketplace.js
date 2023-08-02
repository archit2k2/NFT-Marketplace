import { useState, useEffect } from 'react';
import Notification from '../components/Notification';
import { useLocation } from 'react-router-dom';
import '../styles/Marketplace.css'
import Card from '../components/Card';
import Video from '../components/Video';

const Marketplace = ({ marketplace, nft, account }) => {

    document.title="OpenLake | Marketplace"

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [Filter, setFilter] = useState("All");

    const loadMarketplaceItems = async () => {
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

        const filteredItems = items.filter(item => {
            if (Filter === "All") {
                return true;
            } else {
                return item.category === Filter;
            }
        });

        setLoading(false);
        setItems(filteredItems);
    };

    const buyMarketItem = async (item) => {
        try{
            await (
                await marketplace.purchaseItem(item.itemId, {
                    value: item.totalPrice,
                })
            ).wait();
            setTitle("Success");
            setMessage("NFT Purchased Successfully");
            loadMarketplaceItems();
        }
        catch(error)
        {
            console.log(error);
            setTitle("Alert");
            setMessage("Something went Wrong");
        }
    };

    const clearMsg = () => {
        setTitle('');
        setMessage('');
      }

    useEffect(() => {
        loadMarketplaceItems();
    }, [Filter]);
    
    return (
        <>
            {message && title ? <Notification  msg={message} clearMsg={clearMsg} title={title} /> : null }
            <Video />
            <div className='marketplace'>
                <h1>Marketplace</h1>
                <p>Discover and Collect Unique NFT Treasures</p>
                <div className='choice'>
                    <div>
                        <button
                            onClick={()=>
                            {setFilter("All")}}
                            disabled={Filter === "All"}
                        >
                            All
                        </button>
                        <button
                            onClick={()=>
                            {setFilter("Art")}}
                            disabled={Filter === "Art"}
                        >
                            Art
                        </button>
                        <button
                            onClick={()=>
                            {setFilter("Gaming")}}
                            disabled={Filter === "Gaming"}
                        >
                            Gaming
                        </button>
                        <button
                            onClick={()=>
                            {setFilter("Meme")}}
                            disabled={Filter === "Meme"}
                        >
                            Meme
                        </button>
                        <button
                            onClick={()=>
                            {setFilter("Music")}}
                            disabled={Filter === "Music"}
                        >
                            Music
                        </button>
                    </div>
                </div>
                <div className='nft'>
                    {
                        loading ? (
                            <h3>loading...</h3>
                        ) : (   
                            items.length > 0 ? (
                                <div className='listed-item'>
                                    {items.map((item, idx) => (
                                        (item.seller.toLowerCase() === account) ?
                                            <Card data={item} key={idx} buyMarketItem={() => buyMarketItem(item)} val={0} />
                                            :
                                            <Card data={item} key={idx} buyMarketItem={() => buyMarketItem(item)} val={1} /> 
                                    ))}
                                </div>
                          ) : (
                            <div className='no-items'>
                                <div>
                                    No Item Listed
                                </div>
                            </div>
                          )
                        )
                    }
                </div>
            </div>
        </>
        
    );
};
export default Marketplace;
