import Layout from "../components/layout";
import Jokes from "../components/jokes"
import {jokeApi} from "../shared/sharedConstants";


export default function Dashboard () {

    return (
       <Layout>
           <Jokes />

       </Layout>
    )
}