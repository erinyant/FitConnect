import React, { useContext } from "react";
import { Formik } from 'formik';
import * as yup from 'yup'
import { Container } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";

function ProfileForm({ setUser }) {
    const navigate = useNavigate();
    const useAppContext = () => useContext(AppContext);
    const { user } = useAppContext();

    const profileSchema = yup.object().shape({
        firstName: yup.string().min(4, 'First name too short!').max(15, 'First name too long!'),
        lastName: yup.string().min(1, 'Last name too short!').max(15, 'Last name too long!'),
        email: yup.string().email("Invalid email address"),
        zipCode: yup.number().integer().min(10000, 'Invalid zip code').max(99999, 'Invalid zip code!'),
    })

    const handleFormSubmit = (values, { setSubmitting }) => {
        const endpoint = `/user/${user.id}`
        fetch(endpoint, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(values)
        }).then((resp) => {
            if (resp.ok) {
                return resp.json()
            } else {
                alert('Invalid credentials')
            }
        }).then((user) => {
            setUser(user);
            console.log(user);
            navigate("/");
        });
        setSubmitting(false);
    }

    const handleAccountDelete =(values) => {
        if (!window.confirm("Are you sure you want to delete your account?")){
            return;
        }
        const endpoint = `/user/${user.id}`
        fetch(endpoint, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(values)
        }).then((resp) => {
            if (resp.ok) {
                alert('Your account has been deleted. We are sorry to see you go!')
                setUser(null)
                navigate("/")
            } else {
                alert('Invalid credentials')
            }
        });
    }

    const initialValues = {
        firstName: user === null || user === undefined ? '' : user.first_name,
        lastName: user === null || user === undefined ? '' : user.last_name,
        email: user === null || user === undefined ? '' : user.email,
        zipCode: user === null || user === undefined ? '' : user.zipcode,
    }

    return (
        <Container className="profile-container">
            <Formik enableReinitialize
                initialValues={initialValues}
                validationSchema={profileSchema}
                onSubmit={handleFormSubmit}
            >
                {({ handleSubmit, values, handleChange }) => (
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
                        
                        <div className="button-container-left">
                            <button type='submit'>Submit</button>
                        </div>
                        <div className="button-container-right">
                            <button onClick={() => handleAccountDelete()}>Delete Account</button>
                        </div>
                    </form>
                )}
            </Formik>
        </Container>
    )
}

export default ProfileForm;
