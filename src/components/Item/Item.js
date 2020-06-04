import React from 'react';

import classes from './Item.module.css';

const item = (props) => {
    return (
            <tr>
                <td className={classes.Title}>{props.title}</td>
                <td className={classes.Creator}>{props.creator}</td>
                <td className={classes.Score}>{props.score}</td>
                <td className={classes.Year}>{props.year}</td>
                <td className={classes.Type}>{props.type}</td>
                
                <td>
                    <button onClick={() => props.toggleForm('hideUpdateForm', props.index)}>edit</button>
                </td>
                <td>
                    <button onClick={() => props.remove(props.extra)}>remove</button>
                </td>
                {props.index === props.target ? <h1>update</h1> : null}
            </tr>
    );
}

export default item;