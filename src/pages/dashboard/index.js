import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import Loading from "../../components/loading";
import Error from "../../components/error";
import List from "../../components/list";
import EmptyList from "../../components/emptyList";
import Pokedex from "../pokedex";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [pokemonsSelected, setPokemonsSelected] = useState([]);
  const [pokemonsPokedex, setPokemonsPokedex] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setOpen(false);
      try {
        const data = await axios.get(pokemonApi).then((res) => res.data);
        setLoading(false);
        setData(data.results);
      } catch (error) {
        setLoading(false);
        setError("Ocurrio un error!");
        setOpen(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setOpen(false);
      try {
        const data = await axios.get(pokedexApi).then((res) => res.data);
        setLoading(false);
        setPokemonsPokedex(data);
      } catch (error) {
        setLoading(false);
        setError("Ocurrio un error!");
        setOpen(true);
      }
    };

    fetchData();
  }, [pokemonsSelected]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const selectPokemon = (pokemon) => {
    setPokemonsSelected([...pokemonsSelected, pokemon]);
  };

  const removePokemon = (id) => {
    const newList = pokemonsSelected.filter((item) => item.id !== id);
    setPokemonsSelected(newList);
  };

  const removeAllPokemon = () => {
    setPokemonsSelected([]);
  };

  const savePokemon = async () => {
    setLoading(true);
    setError(null);
    setOpen(false);
    try {
      for await (const res of pokemonsSelected.map((i) => i)) {
        await axios.post(pokedexApi, res);
      }
      setLoading(false);
      setPokemonsSelected([]);
    } catch (error) {
      setLoading(false);
      setError("Ocurrio un error!");
      setOpen(true);
    }
  };

  if (error)
    return <Error open={open} handleClose={handleClose} error={error} />;

  if (loading) return <Loading />;

  return (
    <>
      {data.length === 0 && <EmptyList />}
      <div className={classes.root}>
        {data.map((pokemon) => {
          return (
            <List
              key={pokemon.name}
              pokemon={pokemon}
              selectPokemon={selectPokemon}
              removePokemon={removePokemon}
              pokemonsSelected={pokemonsSelected}
              pokemonsPokedex={pokemonsPokedex}
            />
          );
        })}
      </div>
      <Pokedex
        pokemonsSelected={pokemonsSelected}
        pokemonsPokedex={pokemonsPokedex}
        savePokemon={savePokemon}
        removeAllPokemon={removeAllPokemon}
      />
    </>
  );
};

export default Dashboard;
