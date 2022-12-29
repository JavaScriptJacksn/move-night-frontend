import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Movie from "./Movie";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/MainMoviePage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import { Card } from "react-bootstrap";

const MainMoviePage = ({ message, filter=""}) => {

    const [movies, setMovies] = useState({
        results: []
    });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await axiosReq.get(`/movies/?${filter}search=${query}`);
                setMovies(data)
                setHasLoaded(true)
            } catch(err){
                console.log(err)
            }
        }

        setHasLoaded(false)
        
        const timer = setTimeout(() => {
            fetchMovies();
          }, 1000);      
        
          return () => {
            clearTimeout(timer);
          };
    }, [filter, pathname, query])


    console.log(movies.results)
    return (
        <>
        <Row className="d-flex justify-content-center">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="mr-sm-2"
              placeholder="Search movies"
            />
          </Form>
          </Col>
          </Row>
          <Row>
            {hasLoaded ? (
            <>
                {movies.results.length ? (
                    movies.results.map((movie) => (
                <Col className="col-md-4 mb-5 d-flex align-items-stretch" key={movie.id}>
                    <Movie key={movie.id} {...movie} setMovies={setMovies} moviePage={false}/>
                </Col>
                    ))) : (
                <Container className={appStyles.Content}>
                    <Asset src={NoResults} message={message} style={{width:''}} />
                </Container>
                )}
            </>
            ): (
                <Container className={appStyles.Content}>
                    <Asset spinner />
                </Container>
            )}
        </Row>
        </>

    )
}

export default MainMoviePage