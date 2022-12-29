import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Movie.module.css';

import { Card, Media} from "react-bootstrap";
import { Link } from "react-router-dom";

const Movie = (props) => {
  
    const {
        id,
        editor,
        plot,
        runtime,
        rated,
        poster,
        title,
        year,
        lastupdated,
        is_editor,
        reviews,
        reviews_count,
        moviePage,
    }    = props;

    const currentUser = useCurrentUser();


  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <span>{editor} {lastupdated}</span>
            {is_editor && moviePage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/movies/${id}`}>
        <Card.Img src={poster} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        
        {plot && moviePage && <Card.Text>{plot}</Card.Text>}
        
        <div className={styles.PostBar}>
          <Link to={`/movies/${id}`}>
            <i className="fas fa-star-half-alt"></i>
          </Link>
          {reviews_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Movie