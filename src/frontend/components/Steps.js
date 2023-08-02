import React from 'react';

function Steps() {
    return (
        <div className='step'>
            <h1>Steps To Mint NFT</h1>
            <div className='step_box'>
                <div className='step_box_item'>
                    <i className='fa-solid fa-wallet'></i>

                    <p className='step_box_item_step'>
                        <span>Step 1</span>
                    </p>
                    <p>Connect The Wallet To The Marketplace</p>
                </div>
                <div className='step_box_item'>
                    <i className='fa-sharp fa-solid fa-folder-open'></i>
                    <p className='step_box_item_step'>
                        <span>Step 2</span>
                    </p>
                    <p>Choose The Digital File</p>
                </div>
                <div className='step_box_item'>
                    <i className='fa-solid fa-file-pen'></i>
                    <p className='step_box_item_step'>
                        <span>Step 3</span>
                    </p>
                    <p>Fill The Other Details</p>
                </div>
                <div className='step_box_item'>
                    <i className='fa-solid fa-shop'></i>
                    <p className='step_box_item_step'>
                        <span>Step 4</span>
                    </p>
                    <p>Put it up For Sale</p>
                </div>
            </div>
        </div>
    );
}

export default Steps;
