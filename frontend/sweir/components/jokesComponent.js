import {Card, Col, Container, Row} from "react-bootstrap";
import {jokeApi} from "../shared/sharedConstants";
import React, {Component,} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/index.module.css"

const RenderJoke = ({joke}) => {
    return(
            <Card
                key={joke.id}
                bg={"secondary"}
                text={"white"}
            >
                <Card.Header >
                    <span>Category: {joke.type} </span>
                </Card.Header>
                <Card.Body className={styles.cardBody}>
                    <Card.Title>Joke Setup</Card.Title>
                    <Card.Text>{joke.setup}</Card.Text>
                    <Card.Subtitle>Joke Punchline</Card.Subtitle>
                    <Card.Text>{joke.punchline}</Card.Text>
                </Card.Body>
                <Card.Footer>Joke</Card.Footer>
            </Card>
    )

}

class JokesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: [],
        }
    }

    componentDidMount() {
        fetch(jokeApi).then(response => {
            if (response.ok){
                return Promise.resolve(response.json());
            }
        }).then(data => {
            this.setState({jokes: data});

        }).catch(error => {
            console.log(error);
        })

    }

    render() {
        const settings = {
            dots: true,
            fade: true,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            accessibility: true,
            centerMode: true,
        };

        return(
            <Container>
                <Row>
                    <Col md={{span: 6, offset:3}}>

                        <Slider {...settings}>
                            { this.state.jokes.map( (joke, index) =>
                               <div key={index}> <RenderJoke joke={joke} key={index} /> </div>  )}
                        </Slider>

                    </Col>
                </Row>
            </Container>


        )
    }

}

export default JokesComponent