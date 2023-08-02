import React from "react";
import eran from '../images/eran.png'
import { DiJqueryLogo } from "react-icons/di";
import { useNavigate } from 'react-router-dom';

const Brand = () => {
  
    const Navigate = useNavigate();

  return (
    <div className="Brand">
      <div className="Brand_box">
        <div className="Brand_box_left">
          {/* <a href="/">
            <DiJqueryLogo className="Brand_box_left_logo" />
          </a> */}
          <h1>Earn free Crypto with OpenLake</h1>
          <p>A creative agency that lead and inspire.</p>

          <div className="Brand_box_left_btn">
            <button className="btn brand-btn" onClick={() => Navigate("/create")} >
                Create
            </button>
            <button className="btn brand-btn" onClick={() => Navigate("/marketplace")} >
                Discover
            </button>
          </div>
        </div>
        <div className="Brand_box_right">
          <img src={eran} alt="brand logo" />
        </div>
      </div>
    </div>
  );
};

export default Brand;
