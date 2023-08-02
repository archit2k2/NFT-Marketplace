import React, { useState } from "react";
import Listing from "./Listing";
import Overlay from "./Overlay";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";
import '../styles/Card.css';

const Card = ({ data, buyMarketItem, val }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Listing data={data} open={openModal} />
      <AnimatePresence>
        {open && (
          <Overlay>
            <Modal data={data} close={closeModal} buyMarketItem={buyMarketItem} val={val} />
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Card;
