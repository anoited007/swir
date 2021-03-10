import Layout from "../components/layout";
import JokesComponent from "../components/jokesComponent"
import CustomJumbotron from "../components/jumbotron";
import {withCookies} from "react-cookie";
import Home from "./index";
import {useEffect, useState} from "react";

export const loggedIn = (props) => {
    return props.cookies.get('user') !== undefined;
}

const  Jokes = (props) => {
    //fix nav bar issues after reload. Caused by Server Side Rendering
    const [hasMounted, setMounted] = useState(false)
    const content = "Get to know some of the funniest jokes out there. See them below:"

    useEffect( () => {
        setMounted(true);
    }, [])

        if(hasMounted && loggedIn(props)){
            return(
                    <Layout>
                        <CustomJumbotron content={content} />
                        <div className="mt-5">
                            <JokesComponent />
                        </div>

                    </Layout>
                )
        }

        else {
            return (
                <Home/>
            )
        }

}

export default withCookies(Jokes)