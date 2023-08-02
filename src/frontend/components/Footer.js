import React from 'react';
import Feature from './Feature';

function Footer() {
    return (
        <div className='foot-container'>
            <div className='foot'>
                <div className='waves'>
                    <div className='wave' id='wave1'></div>
                    <div className='wave' id='wave2'></div>
                    <div className='wave' id='wave3'></div>
                    <div className='wave' id='wave4'></div>
                </div>
                <ul className='social_icon'>
                    <li>
                        <a href='https://www.instagram.com'>
                            <Feature iconName={'FaInstagram'} />
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <Feature iconName={'FaFacebook'} />
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <Feature iconName={'FaLinkedin'} />
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <Feature iconName={'FaSnapchat'} />
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <Feature iconName={'FaTwitter'} />
                        </a>
                    </li>
                    
                </ul>
                <p> OpenLake 2023 | All Right Reserved </p>
            </div>
        </div>
    );
}

export default Footer;
