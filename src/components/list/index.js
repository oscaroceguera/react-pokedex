import React from "react";
import PropTypes from "prop-types";
import ListItem from "../listItem";

const List = ({
  pokemon,
  selectPokemon,
  pokemonsSelected,
  removePokemon,
  pokemonsPokedex,
}) => {
  return (
    <ListItem
      pokemon={pokemon}
      selectPokemon={selectPokemon}
      pokemonsSelected={pokemonsSelected}
      removePokemon={removePokemon}
      pokemonsPokedex={pokemonsPokedex}
    />
  );
};

List.propTypes = {
  pokemon: PropTypes.object.isRequired,
  selectPokemon: PropTypes.func.isRequired,
  pokemonsSelected: PropTypes.array.isRequired,
  removePokemon: PropTypes.func.isRequired,
  pokemonsPokedex: PropTypes.array.isRequired,
};

export default List;
