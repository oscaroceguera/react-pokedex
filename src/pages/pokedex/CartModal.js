import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";

import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import { useStyles } from "./CartModal.styled";

const modalContainer = document.querySelector("#modalContainer");

const Modal = ({
  isOpened,
  onClose,
  pokemonsSelected,
  savePokemon,
  pokemonsPokedex,
  removeAllPokemon,
}) => {
  let history = useHistory();
  const classes = useStyles();
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

  return isOpened
    ? ReactDOM.createPortal(
        <Card ref={node} className={classes.root}>
          <CardContent>
            <p className={classes.closeMark}>x</p>
            <div className={classes.infoContainer}>
              <div>
                <h3 className={classes.info}>{pokemonsSelected}</h3>
                <small>Seleccionados</small>
              </div>
              <div>
                <h3
                  className={[classes.info, classes.savedPokemons].join(" ")}
                  onClick={goToPokedex}
                >
                  {pokemonsPokedex}
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
  pokemonsSelected: PropTypes.number.isRequired,
  savePokemon: PropTypes.func,
  pokemonsPokedex: PropTypes.number.isRequired,
};

export default Modal;
