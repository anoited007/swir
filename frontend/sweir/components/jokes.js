import {Card} from "react-bootstrap";
import {jokeApi} from "../shared/sharedConstants";
import React, {Component,} from "react";
import Carousel from '../external/carousel';

const RenderJoke = ({joke}) => {
    return(
        <Card key={joke.id} className="mb-2" >
            <Card.Header>Category: {joke.type}</Card.Header>
            <Card.Body>
                <Card.Title>Setup</Card.Title>
                <Card.Text>{joke.setup}</Card.Text>
                <Card.Subtitle>Punchline</Card.Subtitle>
                <Card.Text>{joke.punchline}</Card.Text>
            </Card.Body>
            <Card.Footer>Joke</Card.Footer>
        </Card>
    )

}

class Jokes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: []
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
        return(
                this.state.jokes.map( (joke, index) =>
                    <RenderJoke joke={joke} key={index} />
                )
        )
    }

}

export default Jokes