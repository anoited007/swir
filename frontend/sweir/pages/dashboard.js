import Layout from "../components/layout";
import Jokes from "../components/jokes"
import Movies from "../components/movies";


export default function Dashboard () {

    return (
       <Layout>
           <Jokes />
           <Movies />
       </Layout>
    )
}