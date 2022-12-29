import React from 'react';
import Rating from '@mui/material/Rating';
import Row from 'react-bootstrap/Row';

import styles from '../../styles/Review.module.css';
import { Media } from 'react-bootstrap';

const Review = (props) => {
    const { rating, editor, updated_on, body } = props;
    
    return (
        <div>
        <hr/>
        <Media>
            <Media.Body className="align-self-center ml-2">
            <span className={styles.Owner}>{editor}</span>
            <span className={styles.Date}>{updated_on}</span>
            <br/>
            <Rating value={rating}></Rating>
            <p>{body}</p>
            </Media.Body>
        </Media>
        </div>
    );
    };

export default Review