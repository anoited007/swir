import styles from '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {CookiesProvider} from "react-cookie";


export default function App({ Component, pageProps }) {

    return (
        <CookiesProvider>
            <Component {...pageProps} />
        </CookiesProvider>

        )

}