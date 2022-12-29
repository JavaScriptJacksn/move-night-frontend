import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import Movie from "./Movie";

function PostPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(
    {
      results : []
    }
  )

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{data: movie}] = await Promise.all([
          axiosReq.get(`/movies/${id}`)
        ])
        setMovie({results: [movie]})
        console.log(movie)
      } catch(err){
        console.log(err);
      }
    }

    handleMount();
  }, [id])


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Movie {...movie.results[0]} setMovie={setMovie} moviePage />
      </Col>
      <Col lg={4} className={`${appStyles.Content} mt-2 h-100`}>
        Reviews 

      </Col>
    </Row>
  );
}

export default PostPage;