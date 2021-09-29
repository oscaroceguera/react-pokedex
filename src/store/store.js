import { useReducer, useContext } from "react";
import Context from "./context";

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
  SUCCESS_SET_POKEMON_DETAIL,
  SET_POKEMON_DETAIL,
  SET_LOADING,
} from "./actionTypes";

const INITIAL_STATE = {
  loading: true,
  error: null,
  data: [],
  pokemonsSelected: [],
  pokemonsPokedex: [],
  open: false,
  pokemon: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_POKEMON_DETAIL:
      return {
        ...state,
        loading: true,
        error: null,
        open: false,
      };
    case SUCCESS_SET_POKEMON_DETAIL:
      return {
        ...state,
        loading: false,
        pokemon: action.payload,
      };
    case SET_GET_POKEMONS:
      return {
        ...state,
        loading: true,
        error: null,
        open: false,
      };
    case SUCCESS_GET_POKEMOMS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case ERROR_GET_POKEMONS:
      return {
        ...state,
        loading: false,
        error: action.payload,
        open: true,
      };
    case POKEMON_SELECTED:
      return {
        ...state,
        pokemonsSelected: [...state.pokemonsSelected, action.payload],
      };
    case REMOVE_POKEMON:
      const newList = state.pokemonsSelected.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        pokemonsSelected: newList,
      };
    case REMOVE_ALL_POKEMON:
      return {
        ...state,
        pokemonsSelected: [],
      };
    case REMOVE_ALL_POKEMON_SELECTED:
      return {
        ...state,
        pokemonsSelected: [],
        loading: false,
      };
    case SET_POKEDEX:
      return {
        ...state,
        error: null,
        open: false,
      };
    case SUCCESS_SET_POKEDEX:
      return {
        ...state,
        loading: false,
        pokemonsPokedex: action.payload,
      };
    case ERROR_SET_POKEDEX:
      return {
        ...state,
        loading: false,
        error: action.payload,
        open: true,
      };
    case CLOSE_NACKBAR:
      return {
        ...state,
        open: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const useStore = () => useContext(Context);
