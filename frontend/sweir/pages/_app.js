import styles from '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {CookiesProvider} from "react-cookie";
import {ToastProvider} from "react-toast-notifications";


export default function App({ Component, pageProps }) {

    return (
        <ToastProvider>
            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>
        </ToastProvider>

        )

}