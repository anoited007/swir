import {Formik} from "formik";
import {Button, Col, Form} from "react-bootstrap";
import React from "react";
import {localBackend, remote, remoteBackend} from "../shared/sharedConstants";
import * as yup from "yup";

const SignUpForm = () => {
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
            if (response.ok){
                return response.json();
            }

        }).catch(response => {
            console.log(response);
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

                )
            }
        }


        </Formik>
    )
}
export default SignUpForm;