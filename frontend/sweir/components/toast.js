import {Button, Col, Row} from "react-bootstrap";
import {useState} from "react";

const Toast = ({message}) => {
    const [show, setShow] = useState(false);
    return(
        <Row>
            <Col xs={6}>
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Body> {message} </Toast.Body>
                </Toast>
            </Col>
            <Col xs={6}>
                <Button onClick={() => setShow(true)}>Show Toast</Button>
            </Col>
        </Row>
    )

}
export default Toast;