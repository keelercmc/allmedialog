import React, {Component } from 'react';

import Button from 'react-bootstrap/Button';

import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AuthContext from '../../context/auth-context';

import Key from './Key';


class Login extends Component {

    state = {
        url: '',
        errorMessage: ''
    }

    static contextType = AuthContext;

    setURL = param => {
        const loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + Key;
        const registerURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + Key;
   
        this.setState({url: param === 'login' ? loginURL : registerURL});
    }

    errorHandler = error => {
        if (error.includes('Required'))
            error = 'Required.';
        if (error.includes('valid'))
            error = 'Email must be valid.';
        if (error.includes('characters'))
            error = 'Password must contain 8 or more characters.';
        return error;
    }

    render() {
        return (  
            <Formik
                initialValues={{ email: '', password: '', returnSecureToken: true }}
                onSubmit={async values => { 
                    axios.post(this.state.url, values)
                    .then(response => response.status === 200 ? this.props.login(response.data) : null) 
                    .catch(err => err.response.data ? this.setState({errorMessage: err.response.data.error.message}):null);
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
                                className={errors.email && touched.email ? 'text-input LoginInput error' : ('text-input LoginInput')}
                            />
                            {errors.email && touched.email && (<div className='input-feedback'>{this.errorHandler(errors.email)}</div>)}
                            <input
                                id='password'
                                placeholder='Enter your password'
                                type='text'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.password && touched.password ? 'text-input LoginInput error' : 'text-input LoginInput'}
                            />
                            {errors.password && touched.password && (<div className='input-feedback'>{this.errorHandler(errors.password)}</div>)}
            
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