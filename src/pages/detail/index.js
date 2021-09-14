import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Loading from "../../components/loading";
import Error from "../../components/error";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    margin: "50px auto",
    "& small": {
      color: "#596275",
    },
    "& small::after": {
      content: "':'",
    },
  },
  container: {
    padding: "24px",
    "& h1": {
      textAlign: "center",
      color: "#303952",
    },
  },
  abilities: {
    margin: "0",
    color: "#303952",
    "&::after": {
      content: "'/'",
      height: 60,
    },
    "&:last-child::after": {
      content: "''",
    },
  },
  info: {
    margin: "0",

    color: "#303952",
  },
}));

const Detail = () => {
  const classes = useStyles();
  let { pokemonId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setOpen(false);
      try {
        const data = await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
          .then((res) => res.data);
        setLoading(false);
        setData(data);
      } catch (error) {
        setLoading(false);
        setError("Ocurrio un error!");
        setOpen(true);
      }
    };
    fetchData();
  }, [pokemonId]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // TODO: controlar el handlerClose y open
  if (error)
    return <Error open={open} handleClose={handleClose} error={error} />;

  if (loading) return <Loading />;

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        {data ? (
          <div className={classes.container}>
            <h1>{data.name}</h1>
            <div>
              <img
                src={data?.sprites.front_default}
                alt="front"
                width="200px"
              />
              <img src={data.sprites.back_default} alt="back" width="200px" />
            </div>
            <small>Habilidades</small>
            <div style={{ display: "flex" }}>
              {data.abilities.map(({ ability }) => (
                <h3 className={classes.abilities} key={ability.name}>
                  {ability.name}
                </h3>
              ))}
            </div>
            <small>Experiencia</small>
            <h3 className={classes.info}>{data.base_experience}</h3>
            <small>Altura</small>
            <h3 className={classes.info}>{data.height}</h3>
            <small>Peso</small>
            <h3 className={classes.info}>{data.weight}</h3>
            <small>Especie</small>
            <h3 className={classes.info}>{data.species.name}</h3>
            <small>Tipo</small>
            <div style={{ display: "flex" }}>
              {data.types.map(({ type }) => (
                <h3 className={classes.abilities} key={type.name}>
                  {type.name}
                </h3>
              ))}
            </div>
          </div>
        ) : null}
      </Paper>
    </div>
  );
};

export default Detail;
