import {Nav, Navbar} from "react-bootstrap";
import {withRouter} from "next/router";
import {loggedIn} from "../pages/jokes";
import {withCookies} from "react-cookie";

const CustomNavbar = (props) => {
    // console.log(props)
    const handleLogout = () => {
        if (loggedIn(props)){
            props.cookies.remove('user');
            return props.router.push('/')
        }

        else {
            return props.router.push('/')
        }
    }

    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#">SWEIR</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse >

                <Nav className="ml-auto mr-5">
                    <Nav.Link href={"/jokes"} className={props.router.pathname === props.asPath ? "active" : ""}>Jokes</Nav.Link>
                    <Nav.Link href={"/movies"} className={props.router.pathname === props.asPath ? "active" : ""}>Movies</Nav.Link>
                    <Nav.Link href="#" onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default withCookies(withRouter(CustomNavbar));