import React from 'react'
import Card from './Card';

function Choice({ choice, listedItems, soldItems }) {

  return (
    <>
        {
            !choice ? (
                listedItems.length > 0 ? 
                    <div className='listed-item'>
                        {listedItems.map((item, idx) => (
                            <Card data={item} key={idx} val={0} />
                        ))}
                    </div>
                :   <div className='no-items'>
                        <div>
                            No NFTs Listed
                        </div>
                    </div>
            ) : (
                soldItems.length > 0 ?
                    <div className='listed-item'>
                        {soldItems.map((item, idx) => (
                            <Card data={item} key={idx} val={0} />
                        ))}
                    </div>
                :   <div className='no-items'>
                        <div>
                            No NFTs Sold
                        </div>
                    </div>
            )
        }
    </>
  )
}

export default Choice

