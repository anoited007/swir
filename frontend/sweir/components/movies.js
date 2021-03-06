import React, {Component} from "react";
import {movieApi} from "../shared/sharedConstants";
import {SwiperSlide, Swiper} from "swiper/react";
import {Card, Col, Container, Row} from "react-bootstrap";
import 'swiper/swiper-bundle.min.css'
import SwiperCore, {Navigation, Pagination} from "swiper";
import styles from './movies.module.css'


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
            console.log(response.data);
            }
        ).catch(error => {
            console.log(error);
        })
    }

    render() {
        SwiperCore.use([Navigation, Pagination ]);
        return(
            <Container fluid={"md"} className={styles.containerMd}>


                        <Swiper
                            className={"row"}
                            spaceBetween={50}
                            slidesPerView={3}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                        >
                            { this.state.movies.map( (movie, index) => (
                                <Col key={index}>
                                <SwiperSlide key={index}    >
                                    <Card className={styles.card}>
                                    <Card.Img src={movie.attributes.coverImage === null ? movie.attributes.posterImage.original : movie.attributes.coverImage.original } variant="top" />
                                    <Card.Body>
                                        <Card.Title>Title: {movie.attributes.titles.en}</Card.Title>
                                        <Card.Text>{movie.attributes.synopsis}</Card.Text>
                                    </Card.Body>
                                    </Card>
                                </SwiperSlide>
                                </Col>
                            ))}

                        </Swiper>




           </Container>
        )
    }
}

export default MovieComponent