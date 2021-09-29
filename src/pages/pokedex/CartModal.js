import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";

import { useOwnContext } from "../../store/storeApi";
import { pokedexApi } from "../../helpers/constants";

import { useStyles } from "./CartModal.styled";

const modalContainer = document.querySelector("#modalContainer");

const Modal = ({ isOpened, onClose }) => {
  let history = useHistory();
  const classes = useStyles();
  const {
    pokemonsSelected,
    pokemonsPokedex,
    removeAllPokemon,
    errorSetPokedex,
    removeAllPokemonSelected,
    setPokedex,
  } = useOwnContext();
  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e) => {
    if (node.current && !node.current.contains(e.target)) {
      onClose();
    }
  };

  const goToPokedex = () => {
    history.push("/pokedex");
  };

  const savePokemon = async () => {
    setPokedex();
    try {
      for await (const res of pokemonsSelected.map((i) => i)) {
        await axios.post(pokedexApi, res);
      }
      removeAllPokemonSelected();
    } catch (error) {
      errorSetPokedex("Ocurrio un error!");
    }
  };

  return isOpened
    ? ReactDOM.createPortal(
        <Card ref={node} className={classes.root}>
          <CardContent>
            <p className={classes.closeMark} onClick={onClose}>
              x
            </p>
            <div className={classes.infoContainer}>
              <div>
                <h3 className={classes.info}>{pokemonsSelected.length}</h3>
                <small>Seleccionados</small>
              </div>
              <div>
                <h3
                  className={[classes.info, classes.savedPokemons].join(" ")}
                  onClick={goToPokedex}
                >
                  {pokemonsPokedex.length}
                </h3>
                <small>Guardados</small>
              </div>
            </div>
            <div className={classes.btnContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.btnDelete}
                onClick={removeAllPokemon}
              >
                cancelar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.btnAdd}
                onClick={savePokemon}
              >
                guardar
              </Button>
            </div>
          </CardContent>
        </Card>,
        modalContainer
      )
    : null;
};

Modal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
