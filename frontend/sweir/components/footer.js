import {Col, Container, Row} from "react-bootstrap";
import React from "react";

const Footer = () => {
    return(
            <Container>
                <Row>
                    <Col sm={12}>
                        <footer className={"footer"}>
                            <hr/>
                            <p className="text-center"> Copyright &copy; 2021 Immanuel for SWEIR </p>
                        </footer>
                    </Col>

                </Row>
            </Container>
        )
}

export default Footer;