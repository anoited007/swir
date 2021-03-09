import {Nav, Navbar} from "react-bootstrap";

const CustomNavbar = () => {

    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#">SWEIR</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse >

                <Nav className="ml-auto mr-5">
                    <Nav.Link href={"/jokes"} >Jokes</Nav.Link>
                    <Nav.Link href={"/movies"}>Movies</Nav.Link>
                    <Nav.Link href={"logout"} >Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default CustomNavbar;