import {Component} from "react";
import {movieApi} from "../shared/sharedConstants";

const RenderMovie = ({movie}) => {
    return null
}

class Movies extends Component {
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

export default Movies