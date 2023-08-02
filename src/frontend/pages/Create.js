import React, { useState, useEffect } from 'react'
import Steps from '../components/Steps'
import Notification from '../components/Notification';
import { Buffer } from "buffer";
import { ethers } from "ethers"
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useLocation } from 'react-router-dom';
import mint  from '../images/mint.png';

import '../styles/Create.css';

window.Buffer = window.Buffer || Buffer;

const projectId = process.env.REACT_APP_ID;
const projectSecretKey = process.env.REACT_APP_SECERET_KEY;
const auth = `Basic ` + Buffer.from(projectId + ":" + projectSecretKey).toString('base64')

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const Create = ({ marketplace, nft }) => {

  document.title="OpenLake | Create"

  const { pathname } = useLocation();

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);

  const [active, setActive] = useState(false);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');

  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add({ content: file })
        console.log(result)
        setImage(`/ipfs/${result.path}`)
      } catch (error){
        console.log("ipfs image upload error: ", error)
        setTitle("Alert")
        setMessage("Error while Uploading Image");
      }
    }
  }
  const createNFT = async () => {
    if (!image || !price || !name || !description || !category) {
      setTitle("Alert")
      setMessage("Fill all details");
      return
    }
    try{
      const result = await client.add(JSON.stringify({image, price, name, description, category}))
      const uri = `/ipfs/${result.path}`
      // mint nft 
      await(await nft.mint(uri)).wait()
      // get tokenId of new nft 
      const id = await nft.tokenCount()
      // // approve marketplace to spend nft
      await(await nft.setApprovalForAll(marketplace.address, true)).wait()
      // // add nft to marketplace
      const listingPrice = ethers.utils.parseEther(price.toString())
      await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
      
      setTitle("Success")
      setMessage("NFT Created Successfully")
    } catch(error) {
      console.log("ipfs uri upload error: ", error)
      setTitle("Alert")
      setMessage("Something went wrong");
    }
  }

  const clearMsg = () => {
    setTitle('')
    setMessage('');
  }

  const handleActive = () => {
    setActive(!active);
  }

  const handleCategory = (e) => {
    setCategory(e.currentTarget.dataset.value)
    handleActive();
  }

  return (
    <>
      {message && title ? <Notification  msg={message} clearMsg={clearMsg} title={title} /> : null }
      <Steps />
      <div className="minting">
        <div className="minting-info">
          <img src={mint} alt='loading' />
        </div>
        <div className="uploadNFT">
          <div className="uploadNFT_box">
            <div className="uploadNFT_box_form">
              <div className="Form_box_input">
                <label htmlFor="price">Select a File</label>
                <input
                  id='price'
                  type="file"
                  className="Form_box_input_file"
                  onChange={uploadToIPFS}
                  min="0"
                />
                <p>
                File types supported: JPG, PNG, GIF, SVG, WEBP.<br></br> 
                Max size: 5 MB
                </p>
              </div>
              <div className="Form_box_input">
                <label htmlFor="nft">Item Name</label>
                <input
                  id='nft'
                  type="text"
                  placeholder='example: "xyz123"'
                  maxLength={16}
                  className="Form_box_input_userName"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="Form_box_input">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                  maxLength={300}
                  placeholder="something about nft in few words (max Character 300)"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <p>
                  The description will be included on the NFT's Card  
                </p>
              </div>
              <div className="Form_box_input">
                <label>Category</label>
                <div id='category' className="select-menu">
                  <div className={active ? 'select-btn-active' : 'select-btn'} onClick={handleActive}>
                    {
                      category ?
                        <span>{category}</span>
                        :
                        <span style={{color : "#c0c0c0"}}>Select an Option</span>
                    }
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                  <ul className='options' style={{ display: active ? 'block' : 'none' }}>
                    <li className='option' data-value="Art" onClick={handleCategory}>
                      <span>Art</span>
                    </li>
                    <li className='option' data-value="Gaming" onClick={handleCategory}>
                      <span>Gaming</span>
                    </li>
                    <li className='option' data-value="Meme" onClick={handleCategory}>
                      <span>Meme</span>
                    </li>
                    <li className='option' data-value="Music" onClick={handleCategory}>
                      <span>Music</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Form_box_input">
                <label htmlFor="price">Price</label>
                <input
                  id='price'
                  type="number"
                  placeholder="Price in ETH"
                  className="Form_box_input_userName"
                  onChange={(e) => setPrice(e.target.value)}
                  min="1"
                  step="1"
                />
              </div>
              <button className="btn create-btn" onClick={createNFT}>
                Create & List NFT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create