import "./App.css";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Movies from "./Components/Movies";
import Favourites from "./Components/Favourites";
import {
  BrowserRouter as Router, Routes, Route, Switch,BrowserRouter
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact render={(props) => (
          <>
            <Banner {...props} />
            <Movies {...props} />
          </>
      )} />
      <Route path='/favourites' component={Favourites} />
      </Switch>
    </Router>
  );
}

export default App;
