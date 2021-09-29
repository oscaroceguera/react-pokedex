import React, { useEffect, useReducer } from "react";
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

const INITIAL_STATE = {
  loading: true,
  error: null,
  data: [],
  pokemonsSelected: [],
  pokemonsPokedex: [],
  open: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_GET_POKEMONS":
      return {
        ...state,
        loading: true,
        error: null,
        open: false,
      };
    case "SUCCESS_GET_POKEMOMS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "ERROR_GET_POKEMONS":
      return {
        ...state,
        loading: false,
        error: action.payload,
        open: true,
      };
    case "POKEMON_SELECTED":
      return {
        ...state,
        pokemonsSelected: [...state.pokemonsSelected, action.payload],
      };
    case "REMOVE_POKEMON":
      const newList = state.pokemonsSelected.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        pokemonsSelected: newList,
      };
    case "REMOVE_ALL_POKEMON":
      return {
        ...state,
        pokemonsSelected: [],
      };
    case "REMOVE_ALL_POKEMON_SELECTED":
      return {
        ...state,
        pokemonsSelected: [],
        loading: false,
      };
    case "SET_POKEDEX":
      return {
        ...state,
        error: null,
        open: false,
      };
    case "SUCCESS_SET_POKEDEX":
      return {
        ...state,
        loading: false,
        pokemonsPokedex: action.payload,
      };
    case "ERROR_SET_POKEDEX":
      return {
        ...state,
        loading: false,
        error: action.payload,
        open: true,
      };
    case "CLOSE_NACKBAR":
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

const Dashboard = () => {
  console.log("RENDER");
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const fetchData = async () => {
    dispatch({ type: "SET_GET_POKEMONS" });
    try {
      const data = await axios.get(pokemonApi).then((res) => res.data);
      dispatch({ type: "SUCCESS_GET_POKEMOMS", payload: data.results });
    } catch (error) {
      dispatch({ type: "ERROR_GET_POKEMONS", payload: "Ocurrio un error!" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "SET_POKEDEX" });

      try {
        const data = await axios.get(pokedexApi).then((res) => res.data);
        dispatch({ type: "SUCCESS_SET_POKEDEX", payload: data });
      } catch (error) {
        dispatch({ type: "ERROR_SET_POKEDEX", payload: "Ocurrio un error!" });
      }
    };

    fetchData();
  }, [state.pokemonsSelected]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: "CLOSE_NACKBAR" });
  };

  const selectPokemon = (pokemon) => {
    dispatch({ type: "POKEMON_SELECTED", payload: pokemon });
  };

  const removePokemon = (id) => {
    dispatch({ type: "REMOVE_POKEMON", payload: id });
  };

  const removeAllPokemon = () => {
    dispatch({ type: "REMOVE_ALL_POKEMON" });
  };

  const savePokemon = async () => {
    dispatch({ type: "SET_POKEDEX" });
    try {
      for await (const res of state.pokemonsSelected.map((i) => i)) {
        await axios.post(pokedexApi, res);
      }
      dispatch({ type: "REMOVE_ALL_POKEMON_SELECTED" });
    } catch (error) {
      dispatch({ type: "ERROR_SET_POKEDEX", payload: "Ocurrio un error!" });
    }
  };

  if (state.error)
    return (
      <Error open={state.open} handleClose={handleClose} error={state.error} />
    );

  if (state.loading) return <Loading />;

  return (
    <>
      {state.data.length === 0 && <EmptyList />}
      <div className={classes.root}>
        {state.data.map((pokemon) => {
          return (
            <List
              key={pokemon.name}
              pokemon={pokemon}
              selectPokemon={selectPokemon}
              removePokemon={removePokemon}
              pokemonsSelected={state.pokemonsSelected}
              pokemonsPokedex={state.pokemonsPokedex}
            />
          );
        })}
      </div>
      <Pokedex
        pokemonsSelected={state.pokemonsSelected}
        pokemonsPokedex={state.pokemonsPokedex}
        savePokemon={savePokemon}
        removeAllPokemon={removeAllPokemon}
      />
    </>
  );
};

export default Dashboard;
