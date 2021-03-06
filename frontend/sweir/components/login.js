import {Button, Form} from "react-bootstrap";
import {Formik} from "formik";
import React from "react";
import {localBackend, remote, remoteBackend} from "../shared/sharedConstants";
import * as yup from 'yup';
import {useCookies} from "react-cookie";
import {useToasts} from "react-toast-notifications";
import styles from '../styles/login.module.css'

//Todo: Fix error feedback to user
//Todo: fix CSS

const LoginForm = () => {
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
               const data = response.json();
                setCookie('user', data, {
                    path: "/",
                    maxAge: 3600,
                    sameSite: true,
                })
                // return <Redirect location='dashboard'/>

                //resort to native JS redirect since react hooks don't work in this scenario
                window.location.href ='dashboard/'
            }
            else {
                throw new Error(response.statusText)
            }
        }).catch(error => {
            console.log(error.message);
            addToast(error.message, {
                appearance:'error',
                autoDismiss: true,
            })
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
                    <>
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
                    </>
                );
            }
        }

        </Formik>

    )
}

export default LoginForm;