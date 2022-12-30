/* eslint-disable */
import React, { useState } from "react";

import Rating from '@mui/material/Rating';
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/ReviewCreateEditForm.module.css";

function ReviewEditForm(props) {
  const { id, body, rating, setShowEditForm, setReviews } = props;

  const [bodyProp, setBody] = useState(body);
  const [ratingProp, setRating] = useState(rating);

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/reviews/${id}/`, {
        body: bodyProp,
        rating: ratingProp
      });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === id
            ? {
                ...review,
                body: bodyProp,
                rating: ratingProp,
                last_updated: "now",
              }
            : review;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={bodyProp}
          onChange={handleBodyChange}
          rows={2}
        />
      </Form.Group>
      <Form.Group>
        <Rating value={ratingProp} onChange={handleRatingChange} max={5}/>
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default ReviewEditForm;