import React from 'react';

import classes from '.././Item.module.css';
import sortIcon from '../../../assets/sort.svg';

import Button from 'react-bootstrap/Button';

const itemLabels = (props) => {
    return (
        <tr>
            <th className={classes.Title}>Title 
                <a onClick={() => props.sort('title')}><img className='sortButtons' src={sortIcon} alt='Sort Icon'/></a>
            </th>
            <th className={classes.Creator}>Creator
                <a onClick={() => props.sort('creator')}><img className='sortButtons' src={sortIcon} alt='Sort Icon'/></a>
            </th>
            <th className={classes.Score}>Score
                <a onClick={() => props.sort('score')}><img className='sortButtons' src={sortIcon} alt='Sort Icon'/></a>
            </th>
            <th className={classes.Year}>Year
                <a onClick={() => props.sort('year')}><img className='sortButtons' src={sortIcon} alt='Sort Icon'/></a>
            </th>
            <th className={classes.Type}>Media
                <a onClick={() => props.sort('year')}><img className='sortButtons' src={sortIcon} alt='Sort Icon'/></a>
            </th>
            <th><Button variant='link' size='sm' className={classes.AlignmentButtons}>edit</Button></th>
            <th><Button variant='link' size='sm' className={classes.AlignmentButtons}>remove</Button></th>
        </tr>
    );
}

export default itemLabels;
