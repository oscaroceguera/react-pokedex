import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Loading from "../../components/loading";
import Error from "../../components/error";

import { useOwnContext } from "../../store/storeApi";
import { apiUrl } from "../../helpers/constants";

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
  const {
    loading,
    error,
    pokemon,
    open,
    setPokemonDetail,
    successSetPokemonDdetail,
    closeNackbar,
    errorGetPokemons,
  } = useOwnContext();
  let { pokemonId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setPokemonDetail();
      try {
        const data = await axios
          .get(`${apiUrl}${pokemonId}`)
          .then((res) => res.data);
        successSetPokemonDdetail(data);
      } catch (error) {
        errorGetPokemons("Ocurrio un error!");
      }
    };
    fetchData();
  }, [pokemonId]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    closeNackbar();
  };

  if (error)
    return <Error open={open} handleClose={handleClose} error={error} />;

  if (loading) return <Loading />;

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        {pokemon ? (
          <div className={classes.container}>
            <h1>{pokemon.name}</h1>
            <div>
              <img
                src={pokemon?.sprites.front_default}
                alt="front"
                width="200px"
              />
              <img
                src={pokemon.sprites.back_default}
                alt="back"
                width="200px"
              />
            </div>
            <small>Habilidades</small>
            <div style={{ display: "flex" }}>
              {pokemon.abilities.map(({ ability }) => (
                <h3 className={classes.abilities} key={ability.name}>
                  {ability.name}
                </h3>
              ))}
            </div>
            <small>Experiencia</small>
            <h3 className={classes.info}>{pokemon.base_experience}</h3>
            <small>Altura</small>
            <h3 className={classes.info}>{pokemon.height}</h3>
            <small>Peso</small>
            <h3 className={classes.info}>{pokemon.weight}</h3>
            <small>Especie</small>
            <h3 className={classes.info}>{pokemon.species.name}</h3>
            <small>Tipo</small>
            <div style={{ display: "flex" }}>
              {pokemon.types.map(({ type }) => (
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
