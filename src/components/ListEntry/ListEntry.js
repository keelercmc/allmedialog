import React from 'react';

import Button from 'react-bootstrap/Button';

import classes from './ListEntry.module.css';

import { Formik } from 'formik';
import * as Yup from 'yup';

const errorMap = error => {
    if (error.includes('Required'))
        error = 'Required.';
    if (error.includes('NaN'))
        error = 'Please enter a number.';
    return error;
}



const listEntry = (props) => {
    return (
        <Formik
            initialValues={{ title: props.title || '', creator: props.creator || '', year: props.year || '', score: props.score || '', type: props.type || ''}}
            onSubmit={async (values, {resetForm}) => {
                await props.submit(values, props.extra);
                props.update();
                resetForm();
            }}
            validationSchema={Yup.object().shape({
                title: Yup.string().required('Required'),
                creator: Yup.string().required('Required'),
                year: Yup.number().integer().min(0).required('Required'),
                score: Yup.number().min(0).max(10),
                type: Yup.string().required('Required')
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
                        <div className={classes.ItemForm}>
                        <input
                            id='title'
                            placeholder='Title'
                            type='text'
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.title && touched.title ? 'ItemInput error' : 'ItemInput'}
                        />
                        {errors.title && touched.title && (<div className='input-feedback'>{errorMap(errors.title)}</div>)}

                        <input
                            id='creator'
                            placeholder='Author, creator, studio'
                            type='creator'
                            value={values.creator}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.creator && touched.creator ? 'ItemInput error' : 'ItemInput'}
                        />
                        {errors.creator && touched.creator && (<div className='input-feedback'>{errorMap(errors.creator)}</div>)}

                        <input
                            id='year'
                            placeholder='Year completed'
                            type='year'
                            value={values.year}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.year && touched.year ? 'ItemInput error' : 'ItemInput'}
                        />
                        {errors.year && touched.year && (<div className='input-feedback'>{errorMap(errors.year)}</div>)}

                        <input
                            id='score'
                            placeholder='Score (out of 10)'
                            type='score'
                            value={values.score}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.score && touched.score ? 'ItemInput error' : 'ItemInput'}
                        />
                        {errors.score && touched.score && (<div className='input-feedback'>{errorMap(errors.score)}</div>)}

                        <select
                            name='type'
                            value={values.type}
                            onChange={(e) => {handleChange(e); e.target.style.color = '#000'}}
                            onBlur={handleBlur}
                            className={errors.type && touched.type ? 'ItemInput error' : 'ItemInput', touched.type && !errors.type ? classes.MediaSelectTouched : classes.MediaSelect}
                        >
                            <option selected disabled value='' label='Select a type'/>
                            <option value='Anime' label='Anime'/>
                            <option value='Book' label='Book'/>
                            <option value='Game' label='Game'/>
                            <option value='Movie' label='Movie'/>
                        </select>
                        </div>
                        {errors.type && touched.type && (<div className='input-feedback'>{errorMap(errors.type)}</div>)}
                        <div className={classes.AddButton}>
                            <Button variant='outline-info' type='submit' disabled={isSubmitting}>
                                Submit
                            </Button>
                        </div>
                    </form>
                );
             }}
        </Formik>
    );
}

export default listEntry;