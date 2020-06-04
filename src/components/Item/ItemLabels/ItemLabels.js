import React from 'react';

import classes from '.././Item.module.css';

const itemLabels = (props) => {
    return (
        <tr>
            <th className={classes.Title}>Title</th>
            <th className={classes.Creator}>Creator</th>
            <th className={classes.Score}>Score</th>
            <th className={classes.Year}>Year</th>
            <th className={classes.Type}>Media</th>
        </tr>
    );
}

export default itemLabels;