import React, {useState} from "react";
import { Form, Formik } from 'formik';
import * as yup from 'yup'
import { Container } from '@mui/material';
import { useNavigate } from "react-router-dom";

function SignUpForm({ user, setUser }) {
    const [signup, setSignUp] = useState(true);
    const navigate = useNavigate();

    const signupSchema = yup.object().shape({
        firstName: yup.string().min(1, 'First name too short!').max(15, 'First name too long!'),
        lastName: yup.string().min(1, 'Last name too short!').max(15, 'Last name too long!'),
        email: yup.string().email("Invalid email address"),
        phoneNumber: yup.string().min(10, 'Phone number too short!').max(17, 'Phone number too long!'),
        username: yup.string().min(4, 'Username too short!').max(15, 'Username too long!'),
        password: yup.string().min(8,'Password too short!').max(15, 'Password too long!'),
        passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match!'),
        zipCode: yup.number().integer().min(10000, 'Invalid zip code').max(99999, 'Invalid zip code!'),
    })

    function toggleSignup() {
        setSignUp((currentSignup) => !currentSignup)
    }

    const handleFormSubmit = (values, { setSubmitting  }) => {
        const endpoint = "/signup";
        console.log(values)
        fetch (endpoint, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(values)
        }).then((resp) => {
            if (resp.ok) {
                console.log(resp)
                return resp.json()
            }   else {
                alert('Invalid credentials')
            }
        }).then((user) => {
            setUser(user);
            console.log(user);
            navigate("/");
        });
        setSubmitting (false);
    }

    let initialValues={ 
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        username: '', 
        password: '', 
        passwordConfirmation: '',
        zipCode: '',
    }

    return (
        <Container className="signup-container">
            <Formik
                initialValues={initialValues}
                validationSchema={signupSchema}
                onSubmit={handleFormSubmit}
            >
                {({handleSubmit, values, handleChange}) => (
                    <form className='form' onSubmit={handleSubmit}>
                        <div className="left-column">
                            <label htmlFor='firstName'>First Name:</label>
                                <input
                                    id='firstName'
                                    name='firstName'
                                    placeholder='First Name'
                                    required
                                    value={values.firstName}
                                    onChange={handleChange}
                                />
                        </div>
                        <div className="right-column">
                            <label htmlFor='lastName'>Last Name:</label>
                                <input
                                    id='lastName'
                                    name='lastName'
                                    placeholder='Last Name'
                                    required
                                    value={values.lastName}
                                    onChange={handleChange}
                                />
                        </div>
                        <div className="left-column">
                            <label htmlFor='email'>Email:</label>
                                <input
                                    id='email'
                                    name='email'
                                    placeholder='Email'
                                    required
                                    value={values.email}
                                    onChange={handleChange}
                                />
                        </div>
                        <div className="right-column">
                            <label htmlFor='username'>Username:</label>
                                <input
                                    id='username'
                                    name='username'
                                    type='username'
                                    placeholder='Username'
                                    value={values.username}
                                    onChange={handleChange}
                                />
                        </div>
                        <div className="left-column">
                            <label htmlFor='password'>Password:</label>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    placeholder='Password'
                                    value={values.password}
                                    onChange={handleChange}
                                />
                        </div>
                        <div className="right-column">
                            <label htmlFor='passwordConfirmation'>Password Confirmation:</label>
                                <input
                                    id='passwordConfirmation'
                                    name='passwordConfirmation'
                                    type='password'
                                    placeholder='Password Confirmation'
                                    value={values.passwordConfirmation}
                                    onChange={handleChange}
                                />
                        </div>
                        <div className="left-column">
                            <label htmlFor='phoneNumber'>Phone Number:</label>
                                <input
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    placeholder='Phone Number'
                                    required
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                />
                       </div>
                        <div className="right-column">
                            <label htmlFor='zipCode'>Zip Code:</label>
                                <input
                                    id='zipCode'
                                    name='zipCode'
                                    type='zipCode'
                                    placeholder='Zip Code'
                                    value={values.zipCode}
                                    onChange={handleChange}
                                />
                        </div>
                        <div className="button-container">
                            <button className="button-signupform"type='submit'>Submit</button>
                        </div>
                    </form>
                    )}
            </Formik>
        </Container>
    )
}

export default SignUpForm;