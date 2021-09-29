import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Modal from "./CartModal";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: "16px",
    right: "16px",
  },
}));

const Pokedex = ({
  pokemonsSelected,
  savePokemon,
  pokemonsPokedex,
  removeAllPokemon,
}) => {
  const classes = useStyles();
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const closeModal = () => {
    setShowCart(false);
  };

  return (
    <>
      <Modal
        isOpened={showCart}
        onClose={closeModal}
        pokemonsSelected={pokemonsSelected.length}
        savePokemon={savePokemon}
        pokemonsPokedex={pokemonsPokedex.length}
        removeAllPokemon={removeAllPokemon}
      />
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

Pokedex.defaultProps = {
  pokemonsSelected: [],
  pokemonsPokedex: [],
};

Pokedex.propTypes = {
  pokemonsSelected: PropTypes.array.isRequired,
  savePokemon: PropTypes.func,
  pokemonsPokedex: PropTypes.array,
  removeAllPokemon: PropTypes.func,
};

export default Pokedex;
