import Head from 'next/head'
import React from "react";
import {Container, Col, Row } from "react-bootstrap";
import LoginForm from "../components/login";
import SignUpForm from "../components/signup";
import Footer from "../components/footer";

const Home = () => {
        return (
            <>
                <Head>
                    <title>Software Engineer in Residence</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <Container fluid>
                        <Row>
                            <Col md={4}  className={"auth-left"}>
                                <p>Demo Application for SWEIR</p>
                            </Col>

                            <Col md={{ span: 4, offset: 2 }} className={"auth-right"}>
                                <h4>Do you already have an account?</h4>
                                <h5>Sign In</h5>
                                <LoginForm />

                                <h4>Not yet registered?</h4>
                                <h5>Sign Up</h5>
                                <SignUpForm />

                            </Col>
                        </Row>

                        <Footer />

                    </Container>

                </main>
            </>

        )

}

export default Home;
