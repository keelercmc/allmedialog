import React from 'react';

import classes from './Item.module.css';

const item = (props) => {
    return (
        <li className={classes.Item} style={{backgroundColor: props.style}}>
            {props.index}: {props.title} by {props.creator} ({props.year}) - {props.score}/10
            <button className={classes.Button} onClick={() => props.remove(props.index)}>x</button>
        </li>
    );
}

export default item;