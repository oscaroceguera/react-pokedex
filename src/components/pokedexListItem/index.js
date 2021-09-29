import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import useStyles from "./styled";

import { apiUrl } from "../../helpers/constants";

const ListItem = ({ pokemon, removePokemon }) => {
  console.log("🚀 ~ file: index.js ~ line 12 ~ ListItem ~ pokemon", pokemon);
  const classes = useStyles();
  const id = pokemon.url.replace(apiUrl, "").replace("/", "");
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  let history = useHistory();

  const handleClick = () => {
    history.push(`/detail/${id}`);
  };

  const handleRemovePokemon = () => {
    removePokemon(pokemon.objectId);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <img src={image} alt="pokemon" />
        <h3>{pokemon.name}</h3>

        <div className={classes.btnContainer}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            detalle
          </Button>
          <Button
            variant="contained"
            classes={{
              root: classes.btnDelete,
            }}
            onClick={handleRemovePokemon}
          >
            eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

ListItem.propTypes = {
  pokemon: PropTypes.object.isRequired,
  removePokemon: PropTypes.func,
};

export default ListItem;
