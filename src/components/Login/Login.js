import React, {Component } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import Key from './Key';
import Button from 'react-bootstrap/Button';

class Login extends Component {

    state = {
        url: '',
        session: {
            token: '',
            id: ''
        },
        error: '',
        expirationTime: 3600
    }

    setURL = param => {
        const login = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + Key;
        const register = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + Key;
   
        this.setState({url: param === 'login' ? login : register});
    }

    logout = () => {
        console.log(this.state.session.token);
        setTimeout(() => {
            this.setState({session: {token: 'empty', id: 'empty'}});
            console.log(this.state.session.token);
        }, this.state.expirationTime * 1000);
    }

    render() {
        return (     
            <Formik
                initialValues={{ email: "", password: "", returnSecureToken: true }}
                onSubmit={async values => {
                    axios.post(this.state.url, values).then(response => {
                        const session = {token: response.data.idToken, id: response.data.localId};
                        this.setState({session: session});
                        this.logout();
                    }).catch(err => this.setState({error: err.response.data.error.message}));
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
                        <p>{this.state.error}</p>
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
        
                    <Button variant="outline-info" type="submit" onClick={() => this.setURL('login')} disabled={isSubmitting}>
                    Login
                    </Button>

                    <Button variant="outline-info" type="submit" onClick={() => this.setURL('register')} disabled={isSubmitting}>
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