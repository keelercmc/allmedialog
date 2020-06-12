import React from 'react';

import classes from './Item.module.css';

import Button from 'react-bootstrap/Button';

import ListEntry from './../ListEntry/ListEntry';

const item = (props) => {
    return (
        <div>
            <tr>
                <td className={classes.Title}>{props.title}</td>
                <td className={classes.Creator}>{props.creator}</td>
                <td className={classes.Score}>{props.score}</td>
                <td className={classes.Year}>{props.year}</td>
                <td className={classes.Type}>{props.type}</td>
                
                <td>
                    <Button variant='link' size='sm' onClick={() => props.toggleForm('hideUpdateForm', props.index)}>edit</Button>
                </td>
                <td>
                    <Button variant='link' size='sm' onClick={() => props.remove(props.extra)}>remove</Button>
                </td>
                
            </tr>
                {props.index === props.target ? <ListEntry {...props}></ListEntry>: null}
            </div>
    );
}

export default item;