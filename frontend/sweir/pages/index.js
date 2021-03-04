import Head from 'next/head'
import React from "react";
import {Container, Col, Row } from "react-bootstrap";
import LoginForm from "../components/login";
import SignUpForm from "../components/signup";

const Home = () => {
        return (
            <>
                <Head>
                    <title>Software Engineer in Residence</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <Container>
                        <Row>
                            <Col md={5} className="auth-left">
                                <p>Hello</p>

                            </Col>

                            <Col md={7} className="auth-right">
                                <h4>Do you already have an account?</h4>
                                <h5>Sign In</h5>
                                <LoginForm />

                                <h4>Not yet registered?</h4>
                                <h5>Sign Up</h5>
                                <SignUpForm />

                            </Col>
                        </Row>
                        <footer>
                            <p className="center"> Copyright Immanuel for SWEIR &copy; 2021</p>
                        </footer>

                    </Container>

                </main>
            </>

        )

}

export default Home;
