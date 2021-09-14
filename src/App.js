import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "./pages/dashboard";
import Detail from "./pages/detail";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    color: "#fff",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <h1 className={classes.title}>Pokedex</h1>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/detail/:pokemonId">
            <Detail />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
