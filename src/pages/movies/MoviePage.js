import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import appStyles from "../../App.module.css";
import reviewStyles from "../../styles/Review.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Movie from "./Movie";
import Review from "../reviews/Review";

import CreateReviewForm from "../reviews/CreateReviewForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const [reviews, setReviews] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: movie }, { data: reviews }] = await Promise.all([
          axiosReq.get(`/movies/${id}`),
          axiosReq.get(`/reviews/?movie=${id}`),
        ]);
        setMovie({ results: [movie] });
        setReviews(reviews);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Movie {...movie.results[0]} setMovie={setMovie} moviePage />
      </Col>



      <Col lg={4} className={`${appStyles.Content} mt-2 h-100 ${reviewStyles.reviewColumn}`}>
          {currentUser ? (
            <CreateReviewForm
              currentUser={currentUser}
              movie={id}
              setPost={setMovie}
              setReviews={setReviews}
            />
          ) : reviews.results.length ? (
            "Reviews"
          ) : null}
          {reviews.results.length ? (
            reviews.results.map((review) => (
              <Review
              key={review.id}
              {...review}
              setMovie={setMovie}
              setReviews={setReviews}
              />
            ))
          ) : currentUser ? (
            <span>No reviews yet, be the first to comment!</span>
          ) : (
            <span>No reviews... yet</span>
          )}
      </Col>
    </Row>
  );
}

export default MoviePage;