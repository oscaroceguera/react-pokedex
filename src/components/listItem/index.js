import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    textAlign: "center",
    "&:hover": {
      opacity: "0.9",
      cursor: "pointer",
    },
  },
});

const ListItem = ({ pokemon }) => {
  const classes = useStyles();
  const id = pokemon.url.replace(apiUrl, "").replace("/", "");
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  let history = useHistory();

  const handleClick = () => {
    history.push(`/detail/${id}`);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <img src={image} alt="pokemon" />
        <h3>{pokemon.name}</h3>
        <Button variant="contained" color="primary" onClick={handleClick}>
          detalle
        </Button>
      </CardContent>
    </Card>
  );
};

ListItem.prototype = {
  pokemon: PropTypes.object.isRequired,
};

export default ListItem;
