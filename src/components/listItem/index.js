import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import useStyles from "./styled";

import { apiUrl } from "../../helpers/constants";

const ListItem = ({
  pokemon,
  selectPokemon,
  pokemonsSelected,
  removePokemon,
  pokemonsPokedex,
}) => {
  const classes = useStyles();
  const id = pokemon.url.replace(apiUrl, "").replace("/", "");
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  let history = useHistory();

  const handleClick = () => {
    history.push(`/detail/${id}`);
  };

  const handleSelectPokemon = () => {
    selectPokemon({ ...pokemon, id });
  };
  const handleRemovePokemon = () => {
    removePokemon(id);
  };

  const isAdded = pokemonsSelected.find((item) => item.id === id);
  const inPokedex = pokemonsPokedex.find((item) => item.id === id);

  return (
    <Card className={classes.root}>
      <CardContent>
        <img src={image} alt="pokemon" />
        <h3>{pokemon.name}</h3>
        {inPokedex && <h4 style={{ color: "#27ae60" }}>GUARDADO</h4>}

        <div className={classes.btnContainer}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            detalle
          </Button>
          <Button
            variant="contained"
            classes={{
              root: isAdded ? classes.btnDelete : classes.btnAdd,
            }}
            onClick={isAdded ? handleRemovePokemon : handleSelectPokemon}
            disabled={!!inPokedex}
          >
            {isAdded ? "eliminar" : "agregar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

ListItem.defaultProps = {
  pokemonsSelected: [],
};

ListItem.propTypes = {
  pokemon: PropTypes.object.isRequired,
  selectPokemon: PropTypes.func.isRequired,
  pokemonsSelected: PropTypes.array,
  removePokemon: PropTypes.func.isRequired,
  pokemonsPokedex: PropTypes.array.isRequired,
};

export default ListItem;
