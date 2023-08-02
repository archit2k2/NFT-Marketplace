import { Link } from 'react-router-dom';
import image from '../images/hero-img2.jpg';
import { FiArrowUpRight } from 'react-icons/fi';

const Hero = () => {
    return (
        <div className='hero'>
            <div className='hero-text'>
                <div className='hero-text-wrapper'>
                    <h1>
                        create, sell and
                        <br /> collect digital NFT's <br /> items.
                    </h1>
                    <p>
                    Welcome to Openlake, the ultimate destination for artists, collectors, 
                    and enthusiasts to explore and engage with the exciting world of 
                    NFT's.
                    </p>
                    <Link to='/marketplace'>
                        <button className='btn explore-now-btn'>
                        Explore Now {' '}
                            <span>
                                <FiArrowUpRight />
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
            <img className='hero-image' src={image} alt='nft' />
        </div>
    );
};
export default Hero;
