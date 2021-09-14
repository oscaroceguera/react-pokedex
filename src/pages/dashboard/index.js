import React, { useEffect, useState } from "react";
import axios from "axios";

import Loading from "../../components/loading";
import Error from "../../components/error";
import List from "../../components/list";
import EmptyList from "../../components/emptyList";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: "20px",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setOpen(false);
      try {
        const data = await axios
          .get("https://pokeapi.co/api/v2/pokemon?limit=600")
          .then((res) => res.data);
        setLoading(false);
        setData(data.results);
      } catch (error) {
        setLoading(false);
        setError("Ocurrio un error!");
        setOpen(true);
      }
    };
    fetchData();
  }, []);

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
    <>
      {data.length === 0 && <EmptyList />}
      <div className={classes.root}>
        {data.map((pokemon) => {
          return <List key={pokemon.name} pokemon={pokemon} />;
        })}
      </div>
    </>
  );
};

export default Dashboard;
