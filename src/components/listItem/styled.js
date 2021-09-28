import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
    },
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
});

export default useStyles;
