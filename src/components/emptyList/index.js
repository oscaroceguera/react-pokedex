import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import emptyIcon from "./psyduck.png";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid yellow",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  message: {
    color: "#fff",
  },
}));

const EmptyList = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={emptyIcon} alt="empty" />
      <br />
      <h2 className={classes.message}>Ups, no tenemos pokemons que mostar.</h2>
    </div>
  );
};

export default EmptyList;
