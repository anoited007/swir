import Layout from "../components/layout";
import MovieComponent from "../components/movies";
import 'swiper/swiper-bundle.min.css'
import {loggedIn} from "./jokes";
import Home from "./index";
import {withCookies} from "react-cookie";

const Movies = (props) => {
    if (loggedIn(props)){
        return(
            <Layout>
                <MovieComponent />
            </Layout>
        )
    }

    else {
        return(
            <Home/>
        )
    }

}

export default withCookies(Movies);