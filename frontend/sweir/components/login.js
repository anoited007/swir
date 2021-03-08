import {Button, Card, Form} from "react-bootstrap";
import {Formik} from "formik";
import React from "react";
import {localBackend, remote, remoteBackend} from "../shared/sharedConstants";
import * as yup from 'yup';
import {useCookies} from "react-cookie";
import {useToasts} from "react-toast-notifications";
import Link from 'next/link';
import {withRouter} from "next/router";

const LoginForm = (props) => {
    var attrib = props;
    let requiredMsg = 'This field is required';
    const validation = yup.object({
        username: yup.string().required(requiredMsg).min(4, 'Username should be at lest 4 characters'),
        password: yup.string().required(requiredMsg).min(8, 'Password must be at least 8 characters')
    })

    const [cookie, setCookie] = useCookies(['user'])
    const {addToast} = useToasts();


    const handleLogin = (values) => {
        const baseUrl = remote ? remoteBackend : localBackend;
        event.preventDefault();
        const user = {
            "username": values.username,
            "password": values.password
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
            if (response.ok){
               return  response.json().then(data =>{
                   // console.log(data);
                   setCookie('user', data, {
                       path: "/",
                       maxAge: 3600,
                       sameSite: true,
                   })
                   return attrib.router.push('/jokes');
               });
            }
            else {
                throw new Error(response.statusText + ";" + response.status);
            }
        }).catch(error => {
            let status = error.message.split(';')[1];
            console.log(status)
            let message = ''
            switch (status){
                case "401":
                    message = 'Invalid login credentials. Try again.'
                    addToast(message, {
                        appearance:'error',
                        autoDismiss: true,
                    })
                    return;

                case "500":
                    message = 'Unknown error occurred on server.'
                    addToast(message, {
                        appearance:'error',
                        autoDismiss: true,
                    })
                    return;

                default:
                    message = 'Unknown error occurred.'
                    addToast(message, {
                        appearance:'error',
                        autoDismiss: true,
                    })
                    return;
            }
        })
    }
    return(

        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            onSubmit={handleLogin}
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
                        <Card.Header as={"h3"}>
                            <span className="text-center">Sign In</span>
                        </Card.Header>
                        <Card.Body>
                            <Form method="POST" onSubmit={handleSubmit}>
                                <Form.Group controlId="formGroupUsername">
                                    <Form.Control type="text" placeholder="Username" name="username" required
                                                  value={values.username}
                                                  onChange={handleChange}
                                                  isInvalid={errors.username}
                                    />
                                    <Form.Control.Feedback type="invalid"> {errors.username}</Form.Control.Feedback>
                                    <Form.Text className="text-muted">
                                        Enter the username you used when signing up
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="forGroupPassword">
                                    <Form.Control type="password" placeholder="Password" name="password" required
                                                  value={values.password}
                                                  onChange={handleChange}
                                                  isInvalid={errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid"> {errors.password}</Form.Control.Feedback>
                                </Form.Group>

                                <Button type="submit" variant="primary" className="mb-5"> Login </Button>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <span> Don't have an account? <Link href={"/signup"}>
                                <a>Signup</a>
                            </Link></span>

                        </Card.Footer>

                    </Card>
                );
            }
        }

        </Formik>

    )
}

export default withRouter(LoginForm);
