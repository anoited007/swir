import Layout from "../components/layout";
import JokesComponent from "../components/jokesComponent"
import CustomJumbotron from "../components/jumbotron";
import {withCookies} from "react-cookie";
import Home from "./index";

export const loggedIn = (props) => {
    return props.cookies.get('user') !== undefined;
}

const  Jokes = (props) => {
    const content = "Get to know some of the funniest jokes out there. See them below:"

        if(loggedIn(props)){
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