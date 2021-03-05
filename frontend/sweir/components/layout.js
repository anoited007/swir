import  styles from './layout.module.css'
import CustomNavbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
    return (
        <>
        <CustomNavbar/>
        {children}

        < Footer/>
      </>
    )
}