import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import Loading from "../../components/loading";
import Error from "../../components/error";
import EmptyList from "../../components/emptyList";
import PokedexListItem from "../../components/pokedexListItem";
import { pokedexApi } from "../../helpers/constants";

import { useOwnContext } from "../../store/storeApi";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: "20px",
  },
}));

const PokedexList = () => {
  const classes = useStyles();
  const {
    loading,
    error,
    data,
    open,
    setGetPokemons,
    successGetPokemons,
    errorGetPokemons,
    closeNackbar,
    setLoading,
  } = useOwnContext();

  const fetchData = async () => {
    setGetPokemons();
    try {
      const data = await axios.get(pokedexApi).then((res) => res.data);
      successGetPokemons(data);
    } catch (error) {
      errorGetPokemons("Ocurrio un error!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removePokemon = async (id) => {
    setGetPokemons();
    try {
      await axios.delete(`${pokedexApi}/${id}`);
      setLoading(false);
      fetchData();
    } catch (error) {
      errorGetPokemons("Ocurrio un error!");
    }
  };

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
    <div>
      {data.length === 0 && <EmptyList />}
      <div className={classes.root}>
        {data.map((pokemon) => {
          return (
            <PokedexListItem
              key={pokemon.name}
              pokemon={pokemon}
              removePokemon={removePokemon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PokedexList;
