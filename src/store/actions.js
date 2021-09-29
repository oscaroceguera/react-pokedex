import {
  SET_GET_POKEMONS,
  SUCCESS_GET_POKEMOMS,
  ERROR_GET_POKEMONS,
  POKEMON_SELECTED,
  REMOVE_POKEMON,
  REMOVE_ALL_POKEMON,
  REMOVE_ALL_POKEMON_SELECTED,
  SET_POKEDEX,
  SUCCESS_SET_POKEDEX,
  ERROR_SET_POKEDEX,
  CLOSE_NACKBAR,
  SET_POKEMON_DETAIL,
  SUCCESS_SET_POKEMON_DETAIL,
  SET_LOADING,
} from "./actionTypes";

export const setGetPokemons = () => {
  return {
    type: SET_GET_POKEMONS,
  };
};

export const successGetPokemons = (payload) => {
  return {
    type: SUCCESS_GET_POKEMOMS,
    payload,
  };
};

export const errorGetPokemons = (payload) => {
  return {
    type: ERROR_GET_POKEMONS,
    payload,
  };
};

export const pokemonSelected = (payload) => {
  return {
    type: POKEMON_SELECTED,
    payload,
  };
};

export const removePokemon = (payload) => {
  return {
    type: REMOVE_POKEMON,
    payload,
  };
};

export const removeAllPokemon = () => {
  return {
    type: REMOVE_ALL_POKEMON,
  };
};

export const removeAllPokemonSelected = () => {
  return {
    type: REMOVE_ALL_POKEMON_SELECTED,
  };
};

export const setPokedex = () => {
  return {
    type: SET_POKEDEX,
  };
};

export const successSetPokedex = (payload) => {
  return {
    type: SUCCESS_SET_POKEDEX,
    payload,
  };
};

export const errorSetPokedex = (payload) => {
  return {
    type: ERROR_SET_POKEDEX,
    payload,
  };
};

export const closeNackbar = () => {
  return {
    type: CLOSE_NACKBAR,
  };
};

export const setPokemonDetail = () => {
  return {
    type: SET_POKEMON_DETAIL,
  };
};

export const successSetPokemonDdetail = (payload) => {
  return {
    type: SUCCESS_SET_POKEMON_DETAIL,
    payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};
