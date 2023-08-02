import Spinner from '../components/Spinner';
import "../styles/Connect.css"

const Connect = ({ web3Handler }) => {
    return (
        <div className='connect'>
            <div className='await-connection'>
                <h1>Awaiting Metamask Connection</h1>
                <span className='await-spinner'>
                    <Spinner />
                </span>
                <button
                    className='connect-btn connect-wallet-btn'
                    onClick={web3Handler}
                >
                    Connect Wallet
                </button>
            </div>
        </div>
    );
};
export default Connect;
