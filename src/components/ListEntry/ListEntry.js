import React from 'react';

import Button from 'react-bootstrap/Button';

import { Formik } from 'formik';
import * as Yup from 'yup';

const listEntry = (props) => {
    return (
        <Formik
            initialValues={{ title: '', creator: '', year: '', score: '', type: ''}}
            onSubmit={async (values, {resetForm}) => {
                await props.add(values);
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
                        <input
                            id='title'
                            placeholder='Title'
                            type='text'
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.title && touched.title ? 'text-input error' : 'text-input'}
                        />
                        {errors.title && touched.title && (<div className='input-feedback'>{errors.title}</div>)}

                        <input
                            id='creator'
                            placeholder='Author, creator, studio'
                            type='creator'
                            value={values.creator}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.creator && touched.creator ? 'text-input error' : 'text-input'}
                        />
                        {errors.creator && touched.creator && (<div className='input-feedback'>{errors.creator}</div>)}

                        <input
                            id='year'
                            placeholder='Year completed'
                            type='year'
                            value={values.year}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.year && touched.year ? 'text-input error' : 'text-input'}
                        />
                        {errors.year && touched.year && (<div className='input-feedback'>{errors.year}</div>)}

                        <input
                            id='score'
                            placeholder='Score (out of 10)'
                            type='score'
                            value={values.score}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.score && touched.score ? 'text-input error' : 'text-input'}
                        />
                        {errors.score && touched.score && (<div className='input-feedback'>{errors.score}</div>)}

                        <select
                            name='type'
                            value={values.type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.type && touched.type ? 'text-input error' : 'text-input'}
                        >
                            <option value='' label='Select a type'/>
                            <option value='Anime' label='Anime'/>
                            <option value='Book' label='Book'/>
                            <option value='Game' label='Game'/>
                            <option value='Movie' label='Movie'/>
                        </select>
                        {errors.type && touched.type && (<div className='input-feedback'>{errors.type}</div>)}
    
                        <Button variant='outline-info' type='submit' disabled={isSubmitting}>
                            Add
                        </Button>
                    </form>
                );
             }}
        </Formik>
    );
}

export default listEntry;