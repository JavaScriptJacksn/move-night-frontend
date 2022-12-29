import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Movie.module.css';

import { Card, Media} from "react-bootstrap";
import { Link } from "react-router-dom";
import { MoreDropdown } from '../../components/MoreDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosRes } from '../../api/axiosDefaults';

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
    const history = useHistory();


    const handleEdit = () => {
      history.push(`/posts/${id}/edit`);
    };
  
    const handleDelete = async () => {
      try {
        await axiosRes.delete(`/movies/${id}`);
        history.goBack();
      } catch (err) {
        console.log(err);
      }
    };

  return (
      <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <span>{editor} | {lastupdated}</span>
            </div>
          <div className="d-flex align-items-center ">
            <span className={styles.threeDots}>{is_editor && <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete}/>}</span>
          </div>
        </Media>
      </Card.Body>
      <Link to={`/movies/${id}`} className={moviePage ? styles.smallImageContainer : undefined}>
        <Card.Img src={poster} alt={title} className={moviePage ? styles.smallImage : undefined}/>
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        
        {plot && moviePage && <>
        <Card.Text>{plot}</Card.Text>
        <small>Rated</small><Card.Text>{rated}</Card.Text>
        <small>Runtime</small><Card.Text>{runtime} minutes</Card.Text>
        <small>Year</small><Card.Text>{year}</Card.Text>
        </>}
        
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