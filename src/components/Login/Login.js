import React, {Component } from 'react';

import './Login.css';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Key from './Key';


class Login extends Component {

    state = {
        url: '',
        session: {
            token: '',
            id: ''
        },
        expirationTime: 3600,
        errorMessage: ''
    }

    setURL = param => {
        const loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + Key;
        const registerURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + Key;
   
        this.setState({url: param === 'login' ? loginURL : registerURL});
    }

    setLogoutTimer = () => {
        setTimeout(() => {
            this.setState({session: {token: '', id: ''}});
        }, this.state.expirationTime * 1000);
    }

    render() {
        return (     
            <Formik
                initialValues={{ email: '', password: '', returnSecureToken: true }}
                onSubmit={async values => {
                    axios.post(this.state.url, values).then(response => {
                        const session = {token: response.data.idToken, id: response.data.localId};
                        this.setState({session: session});
                        this.setLogoutTimer();
                    }).catch(err => this.setState({errorMessage: err.response.data.error.message}));
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email().required('Required'),
                    password: Yup.string().min(8).required('Required')
                })}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;
                    return (
                        <form onSubmit={handleSubmit}>

                            <p>{this.state.errorMessage}</p>

                            <input
                                id='email'
                                placeholder='Enter your email'
                                type='text'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.email && touched.email ? 'text-input error' : 'text-input'}
                            />
                            {errors.email && touched.email && (<div className='input-feedback'>{errors.email}</div>)}

                            <input
                                id='password'
                                placeholder='Enter your password'
                                type='text'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.password && touched.password ? 'text-input error' : 'text-input'}
                            />
                            {errors.password && touched.password && (<div className='input-feedback'>{errors.password}</div>)}
            
                            <Button variant='outline-info' type='submit' onClick={() => this.setURL('login')} disabled={isSubmitting}>
                                Login
                            </Button>

                            <Button variant='outline-info' type='submit' onClick={() => this.setURL('register')} disabled={isSubmitting}>
                                Register
                            </Button>
                        </form>
                    );
                }}
            </Formik>
        );
    }
}

export default Login;