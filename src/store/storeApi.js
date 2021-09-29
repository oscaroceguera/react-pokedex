import { useStore } from "./store";
import {
  setGetPokemons,
  successGetPokemons,
  errorGetPokemons,
  pokemonSelected,
  removePokemon,
  removeAllPokemon,
  removeAllPokemonSelected,
  setPokedex,
  successSetPokedex,
  errorSetPokedex,
  closeNackbar,
  setPokemonDetail,
  successSetPokemonDdetail,
  setLoading,
} from "./actions";

export const useOwnContext = () => {
  const { state, dispatch } = useStore();

  return {
    loading: state.loading,
    error: state.error,
    data: state.data,
    pokemonsSelected: state.pokemonsSelected,
    pokemonsPokedex: state.pokemonsPokedex,
    open: state.open,
    pokemon: state.pokemon,
    setGetPokemons: (payload) => dispatch(setGetPokemons()),
    successGetPokemons: (payload) => dispatch(successGetPokemons(payload)),
    errorGetPokemons: (payload) => dispatch(errorGetPokemons(payload)),
    pokemonSelected: (payload) => dispatch(pokemonSelected(payload)),
    removePokemon: (payload) => dispatch(removePokemon(payload)),
    removeAllPokemon: () => dispatch(removeAllPokemon()),
    removeAllPokemonSelected: () => dispatch(removeAllPokemonSelected()),
    setPokedex: () => dispatch(setPokedex()),
    successSetPokedex: (payload) => dispatch(successSetPokedex(payload)),
    errorSetPokedex: (payload) => dispatch(errorSetPokedex(payload)),
    closeNackbar: () => dispatch(closeNackbar()),
    setPokemonDetail: () => dispatch(setPokemonDetail()),
    successSetPokemonDdetail: (payload) =>
      dispatch(successSetPokemonDdetail(payload)),
    setLoading: () => dispatch(setLoading()),
  };
};
