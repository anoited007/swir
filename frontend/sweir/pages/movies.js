import Layout from "../components/layout";
import MovieComponent from "../components/movies";
import 'swiper/swiper-bundle.min.css'
import {loggedIn} from "./jokes";
import Home from "./index";
import {withCookies} from "react-cookie";
import CustomJumbotron from "../components/jumbotron";
import {useEffect, useState} from "react";

const Movies = (props) => {
    const [hasMounted, setMounted] = useState(false)
    const content = "Check out some of the anime with rating of PG and were released in winter."

    useEffect( () => {
        setMounted(true);
    }, [])


    if (hasMounted && loggedIn(props)){
        return(
            <Layout>
                <CustomJumbotron content={content} />
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