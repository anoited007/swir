import {Formik} from "formik";
import {Button, Card, Col, Form} from "react-bootstrap";
import React from "react";
import {localBackend, remote, remoteBackend} from "../shared/sharedConstants";
import * as yup from "yup";
import Link from 'next/link'
import { withRouter } from "next/router";
import {useToasts} from "react-toast-notifications";

const SignUpForm = (props) => {
    var attrib = props;
    const {addToast} = useToasts();
    let requiredMsg = 'This field is required';
    const validation = yup.object({
        usernameReg: yup.string().required(requiredMsg).min(4, 'Username should be at lest 4 characters'),
        email: yup.string().required(requiredMsg).email('Enter a valid email address'),
        passwordReg: yup.string().required(requiredMsg).min(8, 'Password must be at least 8 characters'),
        passwordRegConf: yup.string().required().oneOf([yup.ref('passwordReg'), null], 'Passwords must match')
    })
   const handleSignup = (values) => {
        const baseUrl = remote ? remoteBackend : localBackend;
        event.preventDefault();
        const user = {
            "username": values.usernameReg,
            "email": values.email,
            "password": values.passwordReg
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
           let message = 'Account has been created successfully'
            if (response.ok){
                 response.json().

                 then(response => {
                     addToast(message, {
                         appearance:'success',
                         autoDismiss: true,
                     })
                     return attrib.router.push('/signin')
                 });

            }
            else {
                throw new Error(response.statusText + ";" + response.status);
            }

        }).catch(error => {
            let status = error.message.split(';')[1];
            console.log(status)
            let message = '';
            switch (status){
                case '500':
                    message = 'Unable create account. An unknown error occurred'
            }
           }
        )

    }
    return(
        <Formik
            initialValues={{
                usernameReg: '',
                email: '',
                passwordReg: '',
                passwordRegConf: '',
            }}
            onSubmit={handleSignup}
            validationSchema={validation}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors,
            }) => {
                return(
                    <Card className="card-margin"
                    bg={"dark"}
                    >
                        <Card.Header as={"h5"}>
                            <span>Create an account</span>
                        </Card.Header>
                        <Card.Body>
                            <Form method="POST" onSubmit={handleSubmit}>
                                <Form.Group controlId="forGroupUsernameReg">
                                    <Form.Control type="text" placeholder="Username" name="usernameReg" required
                                                  value={values.usernameReg}
                                                  onChange={handleChange}
                                                  isInvalid={errors.usernameReg}
                                    />
                                    <Form.Control.Feedback type="invalid"> {errors.usernameReg}</Form.Control.Feedback>
                                    <Form.Text className="text-muted">
                                        You will use this to login in the future.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="forGroupEmail">
                                    <Form.Control type="email" placeholder="Email Address" name="email" required
                                                  value={values.email}
                                                  onChange={handleChange}
                                                  isInvalid={errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid"> {errors.email}</Form.Control.Feedback>

                                    <Form.Text className="text-muted">
                                        We will send updates to this email address
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="forGroupPasswordReg">
                                    <Form.Control type="password" placeholder="Enter Password" name="passwordReg" required
                                                  value={values.passwordReg}
                                                  onChange={handleChange}
                                                  isInvalid={errors.passwordReg}
                                    />
                                    <Form.Control.Feedback type="invalid"> {errors.passwordReg}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="forGroupPasswordRegConf">
                                    <Form.Control type="password" placeholder="Verify Password" name="passwordRegConf" required
                                                  value={values.passwordRegConf}
                                                  onChange={handleChange}
                                                  isInvalid={errors.passwordRegConf}
                                    />
                                    <Form.Control.Feedback type="invalid"> {errors.passwordRegConf}</Form.Control.Feedback>
                                </Form.Group>

                                <Button type="submit" variant="primary"> Sign Up </Button>

                            </Form>

                            <Card.Footer>
                                <span>Already have an account? <Link href={"/"}>
                                    <a>Sign In</a>
                                </Link>
                                </span>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                )
            }
        }


        </Formik>
    )
}
export default withRouter(SignUpForm);
