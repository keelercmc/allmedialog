import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

class ListEntry extends Component {

    state = {
        displayEntry: false
    }

    toggleEntryForm = async () => {
        this.setState({displayEntry: !this.state.displayEntry});
    }

    entryForm = () => {
        return <hi>list entry</hi>
    }

    render() {
        return (
            <div>   
                <Button variant="outline-info" onClick={this.toggleEntryForm}>New entry</Button>
                {!this.state.displayEntry ? null : 
                <Formik
                initialValues={{ title: "", creator: "", year: "", rating: "", type: ""}}
                onSubmit={async values => {
                    await axios.post('https://allmedialog.firebaseio.com/example.json', values);
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required("Required"),
                    creator: Yup.string().required("Required"),
                    year: Yup.number().integer().min(1900).required("Required"),
                    rating: Yup.number().integer().min(1).max(10),
                    type: Yup.string().required("Required")
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
                    id="title"
                    placeholder="Title"
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        errors.title && touched.title
                        ? "text-input error"
                        : "text-input"
                    }
                    />
                    {errors.title && touched.title && (
                    <div className="input-feedback">{errors.title}</div>
                    )}

                    <input
                    id="creator"
                    placeholder="Creator"
                    type="text"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        errors.creator && touched.creator
                        ? "text-input error"
                        : "text-input"
                    }
                    />
                    {errors.creator && touched.creator && (
                    <div className="input-feedback">{errors.creator}</div>
                    )}

                    <input
                    id="year"
                    placeholder="Year"
                    type="text"
                    value={values.year}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        errors.year && touched.year
                        ? "text-input error"
                        : "text-input"
                    }
                    />
                    {errors.year && touched.year && (
                    <div className="input-feedback">{errors.year}</div>
                    )}

                    <input
                    id="rating"
                    placeholder="Rating"
                    type="text"
                    value={values.rating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        errors.rating && touched.rating
                        ? "text-input error"
                        : "text-input"
                    }
                    />
                    {errors.rating && touched.rating && (
                    <div className="input-feedback">{errors.rating}</div>
                    )}

                    <select
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        errors.type && touched.type
                        ? "text-input error"
                        : "text-input"
                    }
                    >
                        <option value="" label="Select a type"/>
                        <option value="Anime" label="Anime"/>
                        <option value="Book" label="Book"/>
                        <option value="Game" label="Game"/>
                        <option value="Movie" label="Movie"/>

                    </select>
                    {errors.type && touched.type && (
                    <div className="input-feedback">{errors.type}</div>
                    )}
        
                    <Button variant="outline-info" type="submit" disabled={isSubmitting}>
                    Add
                    </Button>
 
                </form>
        );
      }}
                </Formik>
    }
            </div>
            
        );
    }
}

export default ListEntry;