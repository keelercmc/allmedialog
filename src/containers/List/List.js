import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ListEntry from '../ListEntry/ListEntry';


class List extends Component {

    state = {
        hideEntryForm: true,
        list: []
    }

    componentDidMount = () => {
        this.updateList();
    }

    componentDIdUpdate = () => {
        this.updateList();
    }

    toggleEntryForm = async () => {
        this.setState({hideEntryForm: !this.state.hideEntryForm});
    }

    updateList = async () => {
        await axios.get('https://allmedialog.firebaseio.com/example.json').then(response => {
            const list = Object.keys(response.data).map(key => response.data[key]);
            this.setState({list: list});
            this.renderList();
        });
    }

    renderList = () => {
        const list = this.state.list.map((list) => <li>{list.title}</li>);
        return <ul>{list}</ul>;
    }

    render() {
        return (
            <div>
                <Button variant='outline-info' onClick={this.toggleEntryForm}>New</Button>
                <Button variant='outline-info'>Statistics</Button>
                
                {this.state.hideEntryForm ? null : 
                <Formik
                    initialValues={{ title: '', creator: '', year: '', score: '', type: ''}}
                    onSubmit={async values => axios.post('https://allmedialog.firebaseio.com/example.json', values)}
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
                                    placeholder='Creator'
                                    type='creator'
                                    value={values.creator}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.creator && touched.creator ? 'text-input error' : 'text-input'}
                                />
                                {errors.creator && touched.creator && (<div className='input-feedback'>{errors.creator}</div>)}

                                <input
                                    id='year'
                                    placeholder='Year'
                                    type='year'
                                    value={values.year}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.year && touched.year ? 'text-input error' : 'text-input'}
                                />
                                {errors.year && touched.year && (<div className='input-feedback'>{errors.year}</div>)}

                                <input
                                    id='score'
                                    placeholder='Score'
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
                }
                {this.renderList()}
            </div>
        );
    }
}

export default List;