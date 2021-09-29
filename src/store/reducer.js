import { useReducer } from "react";
import Context from "./context";

import {
  SET_GET_POKEMONS,
  ERROR_GET_POKEMONS,
  SUCCESS_GET_POKEMOMS,
} from "./actionTypes";

const INITIAL_STATE = {
  loading: false,
  error: null,
  pokemons: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_GET_POKEMONS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SUCCESS_GET_POKEMOMS:
      return {
        ...state,
        loading: false,
        pokemons: action.payload,
      };
    case ERROR_GET_POKEMONS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      throw new Error();
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
