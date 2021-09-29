import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import Loading from "../../components/loading";
import Error from "../../components/error";
import EmptyList from "../../components/emptyList";
import PokedexListItem from "../../components/pokedexListItem";
import { pokedexApi } from "../../helpers/constants";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setOpen(false);
    try {
      const data = await axios.get(pokedexApi).then((res) => res.data);
      setLoading(false);
      setData(data);
    } catch (error) {
      setLoading(false);
      setError("Ocurrio un error!");
      setOpen(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removePokemon = async (id) => {
    setLoading(true);
    setError(null);
    setOpen(false);
    try {
      await axios.delete(`${pokedexApi}/${id}`);
      setLoading(false);
      fetchData();
    } catch (error) {
      setLoading(false);
      setError("Ocurrio un error!");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
