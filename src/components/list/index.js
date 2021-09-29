import React from "react";
import PropTypes from "prop-types";
import ListItem from "../listItem";

const List = ({ pokemon }) => {
  return <ListItem pokemon={pokemon} />;
};

List.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default List;
