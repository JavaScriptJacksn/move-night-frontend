/* eslint-disable */
import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/ReviewCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";

import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

function CreateReviewForm(props) {
  const { movie, setMovie, setReviews} = props;
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/reviews/", {
        body,
        rating,
        movie,
      });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: [data, ...prevReviews.results],
      }));
      setMovie((prevMovie) => ({
        results: [
          {
            ...prevMovie.results[0],
            reviews_count: prevMovie.results[0].reviews_count + 1,
          },
        ],
      }));
      setBody("");
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Form.Control
            className={styles.Form}
            placeholder="leave a review..."
            as="textarea"
            value={body}
            onChange={handleBodyChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group>
      <Typography component="legend">Rating</Typography>
        <Rating value={rating} onChange={handleRatingChange} max={5}/>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!body.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CreateReviewForm;