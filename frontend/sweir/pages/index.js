import Head from 'next/head'
import {Container, Col, Row, Form, Button} from "react-bootstrap";
import {remote, remoteBackend, localBackend} from '../shared/sharedConstants'
import React, { Component } from 'react';
import {useRouter} from "next/router";

class Home extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            usernameReg: '',
            email: '',
            passwordReg: '',
            passwordRegConf: '',
            touched: {
                username: false,
                password: false,
                usernameReg: false,
                email: false,
                passwordReg: false,
                passwordRegConf: false
            }
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validate = this.validate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this)
    }

    handleBlur = (field) => () => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }

    validate(username, password, usernameReg, email, passwordReg, passwordRegConf ){
        const errors = {
            username: '',
            password: '',
            usernameReg: '',
            email: '',
            passwordReg: '',
            passwordRegConf: ''
        };

        if (this.state.touched.username && username.trim().length < 3)
            errors.username = 'Username should be >= 3 characters';

        if (this.state.touched.password && password.trim().length < 8)
            errors.password = 'Password should be >= 10 characters';

        if (this.state.touched.usernameReg && usernameReg.trim().length < 3)
            errors.usernameReg = 'Username should be >= 3 characters';

        if (this.state.touched.passwordReg && passwordReg.trim().length < 8)
            errors.passwordReg = 'Password should be >= 10 characters';

        if(this.state.touched.passwordReg && passwordRegConf !== passwordReg)
            errors.email = 'Passwords do not match. Enter the same password you entered in the previous field';

        return errors;
    }

     handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
          [name]: target.value
        });
    }


    handleLogin = (event) => {
        const baseUrl = remote ? remoteBackend : localBackend;
        event.preventDefault();
        const user = {
            "username": this.state.username,
            "password": this.state.password
        }
        fetch(baseUrl + 'jwt/create/', {
            method: 'POST',
            body: JSON.stringify(
                 user
            ),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin"
        }).then(response => {
           let responseJson = response.json();
            console.log(responseJson);
           window.localStorage.setItem("active", "True");

        })
    }

    handleSignup = (event) => {
        const baseUrl = remote ? remoteBackend : localBackend;
        event.preventDefault();
        const user = {
            "username": this.state.usernameReg,
            "email": this.state.email,
            "password": this.state.passwordReg
        }

        fetch(baseUrl + 'users/', {
            method: 'POST',
            body: JSON.stringify(
                user
            ),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin"

        }).then(response => {
            if (response.ok){
                return response;
            }

            else {
                throw new Error("Error: " + response.status + ": " + response.statusText);
            }
        }).then(

        ).catch(

        )

    }


     render() {
        const errors = this.validate(this.state.username, this.state.password, this.state.usernameReg, this.state.email, this.state.passwordReg, this.state.passwordRegConf)

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
                                <Form id="signin" onSubmit={this.handleLogin}>
                                    <Form.Group controlId="formGroupUsername">
                                        <Form.Control type="text" placeholder="Username" name="username" required
                                                      value={this.state.username}
                                                      onBlur={this.handleBlur("username")}
                                                      onChange={this.handleInputChange} />
                                        <Form.Control.Feedback> {errors.username}</Form.Control.Feedback>
                                        <Form.Text className="text-muted">
                                            Enter the username you used when signing up
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="forGroupPassword">
                                        <Form.Control type="password" placeholder="Password" name="password" required
                                                      value={this.state.password}
                                                      onBlur={this.handleBlur("password")}
                                                      onChange={this.handleInputChange}/>
                                        <Form.Control.Feedback> {errors.password}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Button type="submit" variant="primary" className="mb-5"> Login </Button>
                                </Form>

                                <h4>Not yet registered?</h4>
                                <h5>Sign Up</h5>

                                <Form id="signup" onSubmit={this.handleSignup}>
                                    <Form.Group controlId="forGroupUsernameReg">
                                        <Form.Control type="text" placeholder="Username" name="usernameReg" required
                                                      value={this.state.usernameReg}
                                                      onBlur={this.handleBlur("usernameReg")}
                                                      onChange={this.handleInputChange}/>
                                        <Form.Text className="text-muted">
                                            You will use this to login in the future.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="forGroupEmail">
                                        <Form.Control type="email" placeholder="Email Address" name="email" required
                                                      value={this.state.email}
                                                      onBlur={this.handleBlur("email")}
                                                      onChange={this.handleInputChange}/>
                                        <Form.Text className="text-muted">
                                            We will send updates to this email address
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="forGroupPasswordReg">
                                        <Form.Control type="password" placeholder="Enter Password" name="passwordReg" required
                                                      value={this.state.passwordReg}
                                                      onBlur={this.handleBlur("passwordReg")}
                                                      onChange={this.handleInputChange}/>
                                    </Form.Group>

                                    <Form.Group controlId="forGroupPasswordRegConf">
                                        <Form.Control type="password" placeholder="Verify Password" name="passwordRegConf" required
                                                      value={this.state.passwordRegConf}
                                                      onBlur={this.handleBlur("passwordRegConf")}
                                                      onChange={this.handleInputChange}/>
                                    </Form.Group>

                                    <Button type="submit" variant="primary"> Sign Up </Button>

                                </Form>

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


}

export default Home;
