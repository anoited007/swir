import Head from 'next/head'
import React from "react";
import {Container, Col, Row } from "react-bootstrap";
import Footer from "../components/footer";
import SignUpForm from "../components/signup";
import styles from "../styles/index.module.css"


const Signup = () => {
    return (
        <>
            <Head>
                <title>Software Engineer in Residence</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Container>
                    <Row>
                        <Col md={{span:5, offset:3}} className={"mt-10"} >
                            <div className={styles.formContainer}>
                                <SignUpForm />
                            </div>

                        </Col>
                    </Row>

                    <Footer />
                </Container>
            </main>
        </>

    )

}

export default Signup;
