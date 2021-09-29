import {
  SET_GET_POKEMONS,
  ERROR_GET_POKEMONS,
  SUCCESS_GET_POKEMOMS,
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
