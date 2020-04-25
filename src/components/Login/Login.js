import React, {Component } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import Key from './Key';


class Login extends Component {

    state = {
        url: ''
    }

    setURL = param => {
        const login = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + Key;
        const register = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + Key;
   
        this.setState({url: param === 'login' ? login : register});
    }

    render() {
        return (
            <Formik
                initialValues={{ email: "", password: "", returnSecureToken: true }}
                onSubmit={async values => {
                    axios.post(this.state.url, values);
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email().required("Required"),
                    password: Yup.string().min(8).required("Required")
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
                    <input
                    id="email"
                    placeholder="Enter your email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        errors.email && touched.email
                        ? "text-input error"
                        : "text-input"
                    }
                    />

                    {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                    )}
                    <input
                    id="password"
                    placeholder="Enter your password"
                    type="text"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        errors.email && touched.email
                        ? "text-input error"
                        : "text-input"
                    }
                    />

                    {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                    )}
        
                    <button type="submit" onClick={() => this.setURL('login')} disabled={isSubmitting}>
                    Login
                    </button>

                    <button type="submit" onClick={() => this.setURL('register')} disabled={isSubmitting}>
                    Register
                    </button>
 
                </form>
        );
      }}
    </Formik>
        );
    }
}

export default Login;