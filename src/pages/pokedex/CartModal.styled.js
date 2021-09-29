import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: "16px",
    right: "16px",
    width: "300px",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  btnAdd: {
    background: "#66bb6a",
    color: "#fff",
    "&:hover": {
      background: "#66bb6a",
    },
  },
  btnDelete: {
    background: "#ef5350",
    color: "#fff",
    "&:hover": {
      background: "#ef5350",
    },
  },
  closeMark: {
    textAlign: "right",
    fontSize: "24px",
    color: "#34495e",
    padding: 0,
    margin: 0,
    "&:hover": {
      cursor: "pointer",
      opacity: "0.6",
    },
  },
  infoContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
  },
  info: {
    margin: "0",
    color: "#2c3e50",
    textAlign: "center",
    fontSize: "32px",
  },
  savedPokemons: {
    "&:hover": {
      color: "#3498db",
      cursor: "pointer",
    },
  },
}));
