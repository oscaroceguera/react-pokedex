import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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

const List = ({ pokemon }) => {
  const classes = useStyles();
  const id = pokemon.url.replace(apiUrl, "").replace("/", "");
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Card className={classes.root}>
      <CardContent>
        <img src={image} alt="pokemon" />
        <h3>{pokemon.name}</h3>
      </CardContent>
    </Card>
  );
};

export default List;
