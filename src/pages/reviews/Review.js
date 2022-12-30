/* eslint-disable */
import {React, useState} from 'react';
import Rating from '@mui/material/Rating';

import styles from '../../styles/Review.module.css';
import { Media } from 'react-bootstrap';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import ReviewEditForm from './ReviewEditForm';

const Review = (props) => {
    const { rating, editor, updated_on, body, setMovie, setReviews, id } = props;

    const currentUser = useCurrentUser();
    const is_editor = currentUser?.username === editor;
    const [showEditForm, setShowEditForm] = useState(false);

    const handleDelete =async () => {
        try {
            await axiosRes.delete(`/reviews/${id}`)

            setMovie(prevMovie => ({
                results : [{
                    ...prevMovie.results[0],
                    reviews_count: prevMovie.results[0].reviews_count - 1
                }]
            }))

            setReviews(prevReviews => ({
                ...prevReviews,
                results: prevReviews.results.filter((review) => review.id !== id)
            }))

        } catch(err){
          // console.log(err)
        }
    }
    
    return (
        <div>
        <hr/>
        <Media>
            <Media.Body className="align-self-center ml-2">
            <span className={styles.Owner}>{editor}</span>
            <span className={styles.Date}>{updated_on}</span>
            <br/>
            {showEditForm ? (
            <ReviewEditForm
            id={id}
            content={body}
            setReviews={setReviews}
            setShowEditForm={setShowEditForm}
          />
          ) : (
            <>
            <Rating value={parseInt(rating)}></Rating>
            <p>{body}</p>
            </>
          )}
            </Media.Body>
            {is_editor && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
        </Media>
        </div>
    );
    };

export default Review