import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import MovieCreateForm from "./pages/movies/MovieCreateForm";
import MoviePage from "./pages/movies/MoviePage";
import MainMoviePage from "./pages/movies/MainMoviePage";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <MainMoviePage message="No results found."/>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/movies/create" render={() => <MovieCreateForm/>}></Route>
          <Route exact path="/movies/:id" render={() => <MoviePage/>}></Route>
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;