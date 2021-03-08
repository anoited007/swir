import Head from 'next/head'
import React from "react";
import {Container, Col, Row } from "react-bootstrap";
import LoginForm from "../components/login";
import Footer from "../components/footer";
import styles from "../styles/index.module.css"

const Home = () => {
        return (
            <>
                <Head>
                    <title>Software Engineer in Residence</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <Container>
                        <Row>
                            <Col md={{span:5, offset:3}} >
                                <div className={styles.formContainer}>
                                    <LoginForm />
                                </div>
                            </Col>
                        </Row>

                        <Footer />
                    </Container>
                </main>
            </>

        )

}

export default Home;
