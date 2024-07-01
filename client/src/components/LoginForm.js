import React, { useEffect, useState } from "react";
import { Formik } from 'formik';
import { Button, Container } from '@mui/material';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

function LoginForm({ user, setUser }) {
    const navigate = useNavigate();

    let LoginSchema = yup.object().shape({
        username: yup.string().required('username required').min(6, 'Username must be at least 6 characters'),
        password: yup.string().required('password required').min(8, 'Password must be at least 8 characters')
    })

    const handleSubmit = (values, {setSubmitting}) => {
        console.log("form submitted")
        fetch("/login", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(values)
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
            else {
                alert('Invalid credentials')
            }
        }).then((user) => {
            setUser(user);
            console.log(user)
            setTimeout(() => (navigate("/")), 500);
        });
        setSubmitting (false);
    }

    let initialValues = {
        username: '',
        password: ''
    }

    return (
        
        <Container className="login-container">
            <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, values, handleChange, errors, touched, handleBlur }) => (
                    <Form className="login-form" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                id="username"
                                placeholder="Enter username"
                                name="username"
                                required value={values.username}
                                onChange={handleChange}
                                onBlur= {handleBlur}
                                isInvalid={touched.username && !!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                id='password'
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur= {handleBlur}
                                isInvalid={touched.password && !!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password_hash}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button className="login-button" type="submit">Log In</Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}
export default LoginForm;