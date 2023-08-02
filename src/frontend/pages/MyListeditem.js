import { useState, useEffect } from 'react';
import create from '../images/create.png'
import listed from '../images/listed.jpeg';
import { useNavigate, useLocation } from 'react-router-dom';
import Choice from '../components/Choice';
import '../styles/MyNFT.css';

export default function MyListedItems({ marketplace, nft, account }) {

    document.title="OpenLake | Listed"

    const Navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [Filter, setFilter] = useState("All");
    const [choice, setChoice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [listedItems, setListedItems] = useState([]);
    const [soldItems, setSoldItems] = useState([]);
    const loadListedItems = async () => {
        // Load all sold items that the user listed
        const itemCount = await marketplace.itemCount();
        let listedItems = [];
        let soldItems = [];
        for (let indx = 1; indx <= itemCount; indx++) {
            const i = await marketplace.items(indx);
            if (i.seller.toLowerCase() === account) {
                // get uri url from nft contract
                const uri = await nft.tokenURI(i.tokenId);
                // use uri to fetch the nft metadata stored on ipfs
                const response = await fetch(uri);
                const metadata = await response.json();
                // get total price of item (item price + fee)
                const totalPrice = await marketplace.getTotalPrice(i.itemId);
                // define listed item object
                let item = {
                    totalPrice,
                    price: i.price,
                    itemId: i.itemId,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image,
                    category: metadata.category
                };
                
                if (i.sold) 
                {
                    soldItems.push(item);
                }
                else
                {
                    listedItems.push(item);
                }
            }

        }

        const filteredListed = listedItems.filter(item => {
            if (Filter === "All") {
              return true;
            } else {
              return item.category === Filter;
            }
          });

        const filteredSold = soldItems.filter(item => {
            if (Filter === "All") {
              return true;
            } else {
              return item.category === Filter;
            }
        });
        setLoading(false);
        setListedItems(filteredListed);
        setSoldItems(filteredSold);
    };

    useEffect(() => {
        loadListedItems();
    }, [Filter]);

    return (
        <div className='window'>
            <div className='Banner'>
                <img 
                    src={listed}
                    alt="Banner"
                />
            </div>
            <div className='listed'>
                <div className='listed-info'>
                    <h1>NFT Gallery</h1>
                    <p>Listed and Sold Artworks</p>
                </div>
                <div className='choice'>
                    <div>
                        <button
                            onClick={()=>
                            {setChoice(0)}}
                            disabled={choice === 0}
                        >
                            Listed
                        </button>
                        <button
                            onClick={()=>
                            {setChoice(1)}}
                            disabled={choice === 1}
                        >
                            Sold
                        </button>
                    </div>
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
                            <Choice
                               choice={choice}
                               listedItems={listedItems}
                               soldItems={soldItems}
                            />
                        )
                    }
                </div>
                <div className='list-create'>
                    <div className='list-create-info'>
                        <h1>
                            Create Your Own NFTs
                        </h1>
                        <p>
                            Unlock the power of creativity, create your own NFTs and Earn crypto riches
                        </p>
                        <button className='btn brand-btn' onClick={() => Navigate("/create")}>
                            Create
                        </button>
                    </div>
                    <div className='list-image-container'>
                        <img
                            src={create}
                            alt='Loading'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
