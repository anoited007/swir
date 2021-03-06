import React, {Component} from "react";
import {movieApi} from "../shared/sharedConstants";
import {SwiperSlide, Swiper} from "swiper/react";
import {Card} from "react-bootstrap";
import 'swiper/swiper-bundle.min.css'

const RenderMovie = ({movie}) => {
    return (
        <SwiperSlide>
            <p>{movie.attributes.titles.en}</p>
        </SwiperSlide>
    )
}

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
        return(
            this.state.movies.map( (movie, index) => (
                <RenderMovie movie={movie} key={index}/>
            ))
        )
    }
}

export default MovieComponent