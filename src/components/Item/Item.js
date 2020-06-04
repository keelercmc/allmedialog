import React from 'react';

import classes from './Item.module.css';

const item = (props) => {
    return (
        <div>
            <li className={classes.Item} style={{backgroundColor: props.style}}>
                {props.index}: {props.title} by {props.creator} ({props.year}) - {props.score}/10
                <a className={classes.Buttons}>
                    <button onClick={() => props.toggleForm('hideUpdateForm', props.index)}>o</button>
                    <button className={classes.Button} onClick={() => props.remove(props.extra)}>x</button>
                </a>
            </li>
            {props.index === props.target ? <h1>update</h1> : null}
        </div>
    );
}

export default item;