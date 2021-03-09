import React, {Component} from "react";
import {movieApi} from "../shared/sharedConstants";
import {Card, Col, Container, Row} from "react-bootstrap";
import 'swiper/swiper-bundle.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/movies.module.css'
import Slider from "react-slick";


class MovieComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };
    }

    componentDidMount() {
        fetch(movieApi, {
            headers : {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
            }
        }).then(response => {
            return response.json();
            }

        ).then(response => {
            this.setState({movies: response.data})
            // console.log(response.data);
            }
        ).catch(error => {
            // console.log(error);
            return null;
        })
    }

    render() {
        const settings = {
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            accessibility: true,
        };

        return(
            <Container  className={"content-row"}>
                <Row >

                        <Slider {...settings}>
                            { this.state.movies.map( (movie, index) => (
                                <Col key={index} md={{span: 6, offset:3}}>
                                    <Card>
                                    <Card.Img src={movie.attributes.coverImage === null ? movie.attributes.posterImage.original : movie.attributes.coverImage.original } variant="top" />
                                    <Card.Body>
                                        <Card.Title>Title: {movie.attributes.titles.en === undefined ? movie.attributes.titles.en_jp : movie.attributes.titles.en}</Card.Title>
                                        <Card.Text>{movie.attributes.synopsis}</Card.Text>
                                    </Card.Body>
                                    </Card>
                                </Col>
                            ))}

                        </Slider>
                </Row>

           </Container>
        )
    }
}

export default MovieComponent