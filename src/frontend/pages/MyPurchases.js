import { useState, useEffect } from 'react';
import Card from '../components/Card';
import discover from '../images/discover.png'
import { useNavigate, useLocation } from 'react-router-dom';
import purchased from '../images/purchased.jpg';
import '../styles/MyNFT.css';


export default function MyPurchases({ marketplace, nft, account }) {

    document.title="OpenLake | Purchased"

    const Navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [Filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [purchases, setPurchases] = useState([]);

    const loadPurchasedItems = async () => {
        // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
        const filter =  marketplace.filters.Bought(null,null,null,null,null,account)
        const results = await marketplace.queryFilter(filter)
        //Fetch metadata of each nft and add that to listedItem object.
        const purchases = await Promise.all(results.map(async i => {
        // fetch arguments from each result
        i = i.args
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId)
        // define listed item object
        let purchasedItem = {
            totalPrice,
            price: i.price,
            itemId: i.itemId,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
            category: metadata.category
        }
        
        return purchasedItem;
        
        }))

        const filteredItems = purchases.filter(item => {
        if (Filter === "All") {
            return true;
        } else {
            return item.category === Filter;
        }
        });

        setLoading(false)
        setPurchases(filteredItems)
    }
    
    useEffect(() => {
        loadPurchasedItems()
    }, [Filter])

    return (
    <div className='window'>
        <div className='Banner'>
            <img 
                src={purchased}
                alt="Banner"
            >
            </img>
        </div>
        <div className='listed'>
                <div className='listed-info'>
                    <h1>NFT Collection</h1>
                    <p>Purchased Artworks</p>
                </div>
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
                <div className='nfts'>
                    {
                        loading ? (
                            <h2>Loading...</h2>
                        ) : (   
                          purchases.length > 0 ? (
                                <div className='listed-item'>
                                    {purchases.map((item, idx) => (
                                        <Card data={item} key={idx} val={0} /> 
                                    ))}
                                </div>
                          ) : (
                            <div className='no-items'>
                                <div>
                                    No Purchases Yet
                                </div>
                            </div>
                          )
                        )
                    }
                </div>
                <div className='list-create'>
                    <div className='list-create-info'>
                        <h1>
                          Grab Your First NFT
                        </h1>
                        <p>
                          Unleash the World of Digital Art: Explore, Buy, and Sell NFTs on our Marketplace!
                        </p>
                        <button className='btn brand-btn' onClick={() => Navigate("/marketplace")}>
                            Explore
                        </button>
                    </div>
                    <div className='list-image-container'>
                        <img
                            src={discover}
                            alt='Loading'
                        />
                    </div>
                </div>
            </div>
    </div>
  );
}