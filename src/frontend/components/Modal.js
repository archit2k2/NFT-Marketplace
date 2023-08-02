import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { ethers } from 'ethers';

const Modal = ({ data, close, buyMarketItem, val }) => {
  const { image, totalPrice, name, description, category } = data;

  const modalVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.2 },
    },
    closed: { opacity: 0 },
  };

  const imageVariants = {
    open: { opacity: 1, y: "0vh" },
    closed: { opacity: 0, y: "-10vh" },
  };

  const modalInfoVariants = {
    open: { opacity: 1, transition: { staggerChildren: 0.2 } },
    closed: { opacity: 0 },
  };

  const modalRowVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "10%" },
  };

  return (
    <motion.div
      className="modal"
      variants={modalVariants}
      onClick={(e) => {e.stopPropagation()}}
    >
      <motion.div className="modal-container">
        <motion.div className="modal__close-wrapper">
          <motion.div
            onClick={close}
          >
            <IoCloseCircleOutline className="modal__close-icon" />
          </motion.div>
        </motion.div>
        <motion.div className="modal_content">
          <motion.div className="modal-image-container">
            <motion.img
              className="modal__image"
              alt="loading..."
              src={image}
              variants={imageVariants}
            ></motion.img>
          </motion.div>
          <motion.div className="modal__info" variants={modalInfoVariants}>
            <motion.div>
              <motion.div className="modal__row" variants={modalRowVariants}>
                <span className="modal__name">{name}</span>
                <span className="modal__category">{category}</span>
              </motion.div>
              <motion.div>
                <h4 className="modal__description-title">Description</h4>
                <div
                className="modal__description-wrapper"
                variants={modalRowVariants}
                >
                <p className="modal__description">{description}</p>
              </div>
              </motion.div>
            </motion.div>
            <motion.div className="price">
              <motion.div className="modal__price" variants={modalRowVariants}>
                <span>{ethers.utils.formatEther(totalPrice)} ETH</span>
              </motion.div>
              {
                val ?
                  (
                    <motion.button className="btn buy-btn" onClick={buyMarketItem}>
                      <span>
                        BUY
                      </span>
                    </motion.button>
                  ) : null
              }
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
