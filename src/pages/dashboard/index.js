import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import Loading from "../../components/loading";
import Error from "../../components/error";
import List from "../../components/list";
import EmptyList from "../../components/emptyList";
import Pokedex from "../pokedex";

import { useOwnContext } from "../../store/storeApi";

import { pokemonApi, pokedexApi } from "../../helpers/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: "20px",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const {
    loading,
    error,
    data,
    pokemonsSelected,
    open,
    setGetPokemons,
    successGetPokemons,
    errorGetPokemons,
    setPokedex,
    successSetPokedex,
    errorSetPokedex,
    closeNackbar,
  } = useOwnContext();

  const fetchData = async () => {
    setGetPokemons();
    try {
      const data = await axios.get(pokemonApi).then((res) => res.data);
      successGetPokemons(data.results);
    } catch (error) {
      errorGetPokemons("Ocurrio un error!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchDataPokedex = async () => {
    setPokedex();
    try {
      const data = await axios.get(pokedexApi).then((res) => res.data);
      successSetPokedex(data);
    } catch (error) {
      errorSetPokedex("Ocurrio un error!");
    }
  };

  useEffect(() => {
    fetchDataPokedex();
  }, [pokemonsSelected]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    closeNackbar();
  };

  if (error)
    return <Error open={open} handleClose={handleClose} error={error} />;

  if (loading) return <Loading />;

  return (
    <>
      {data.length === 0 && <EmptyList />}
      <div className={classes.root}>
        {data.map((pokemon) => {
          return <List key={pokemon.name} pokemon={pokemon} />;
        })}
      </div>
      <Pokedex />
    </>
  );
};

export default Dashboard;
