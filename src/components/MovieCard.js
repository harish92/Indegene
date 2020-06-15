import React from "react";

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './MovieCard.css'


const MovieCard = props => (
    <ul className="movie-list">
        {props.data && props.data.map(movie => {
            return(
                <li className="movie-b" key={movie.imdbID}>
                    <Card>
                        <CardImg top width="100%" style={{height: '250px'}} src={movie.Poster} alt={movie.Poster}/>
                        <CardBody>
                            <CardTitle> Name: {movie.Title}</CardTitle>
                            <CardSubtitle>  Type: {movie.Type}</CardSubtitle>
                            <CardText> Year: {movie.Year}</CardText>
                            <Button className="primary" onClick={() => props.onClick(movie.imdbID)}>View Info</Button>
                        </CardBody>
                    </Card>
                </li>
            )
        })}
    </ul>
)

export default MovieCard;
