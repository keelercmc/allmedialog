import React from 'react';

const item = (props) => {
    return <li>{props.title} by {props.creator} ({props.year}) - {props.score}</li>
}

export default item;