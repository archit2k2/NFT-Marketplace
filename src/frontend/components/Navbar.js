import navItems from '../utils/nav-items';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { useState } from 'react';

const Navbar = ({ web3Handler, account }) => {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const Close = () => setClick(false);

    return (
        <div>
            <div
                className={click ? 'main-container' : ''}
                onClick={() => Close()}
            />
            <nav className='navbar' onClick={(e) => e.stopPropagation()}>
                <NavLink className='logo' to='/'>
                    <Logo />
                </NavLink>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    {navItems.map((item) => {
                        const { id, name, to } = item;

                        return (
                            <li key={id} className='nav-item'>
                                <NavLink to={to}>{name}</NavLink>
                            </li>
                        );
                    })}
                </ul>
                <div>
                    {account ? (
                        <Link
                            to={{
                                pathname: `https://etherscan.io/address/${account}`,
                                target: '_blank',
                            }}
                        >
                            <button className='connect-wallet-btn'>
                                {account.slice(0, 5) +
                                    '...' +
                                    account.slice(38, 42)}
                            </button>
                        </Link>
                    ) : (
                        <button
                            className='connect-wallet-btn'
                            onClick={web3Handler}
                        >
                            Connect Wallet
                        </button>
                    )}
                    <div className='nav-icon' onClick={handleClick}>
                        <i className={click ? 'fa fa-times' : 'fa fa-bars'}></i>
                    </div>
                </div>
            </nav>
        </div>
    );
};
export default Navbar;
