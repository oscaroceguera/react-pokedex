import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Modal from "./CartModal";

import { useOwnContext } from "../../store/storeApi";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: "16px",
    right: "16px",
  },
}));

const Pokedex = () => {
  const classes = useStyles();
  const { pokemonsSelected } = useOwnContext();
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const closeModal = () => {
    setShowCart(false);
  };

  return (
    <>
      <Modal isOpened={showCart} onClose={closeModal} />
      {!showCart && (
        <IconButton
          aria-label="cart"
          onClick={showCartHandler}
          className={classes.root}
        >
          <Badge badgeContent={pokemonsSelected.length} color="secondary">
            <ShoppingCartIcon style={{ color: "#bdc3c7" }} />
          </Badge>
        </IconButton>
      )}
    </>
  );
};

export default Pokedex;
