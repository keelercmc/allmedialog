import React from 'react';

import classes from './Statistics.module.css';


const statistics = (props) => {

    const calculateTotalOfType = type => {
        if (type) {
            let counter = 0;
            props.list.forEach(item => {
                if (item.type === type)
                    counter++;
            });
            return counter;
        }
        else return props.list.length;
    }

    const calculateRatingsOfType = type => {
        let counter = 0;
        props.list.forEach(item => {
            if (item.type === type && item.score > 0) {
                counter++;
            }
        });
        return counter;
    }

    const calculateAverageOfType = type => {
        let sumOfRatings = 0;
        let numOfRatings = 0;

        if (type) 
            numOfRatings = calculateRatingsOfType(type);
        else 
            numOfRatings = props.list.length;
        
        props.list.forEach(item => {
            if (type) {
                if (item.type === type)
                    sumOfRatings += Number(item.score);
            }
            else {
                sumOfRatings += Number(item.score);
            }
        })

        const average = (sumOfRatings / numOfRatings).toFixed(2);
        return (average === 'Infinity' ? 'N/A' : average);
    }

    return (
        <div className={classes.Statistics}>
            <p>Total entries: {calculateTotalOfType()}</p>
            <p>Total anime: {calculateTotalOfType('Anime')}</p>
            <p>Total books: {calculateTotalOfType('Book')}</p>
            <p>Total games: {calculateTotalOfType('Game')}</p>
            <p>Total movies: {calculateTotalOfType('Movie')}</p>
            <p>Average of all entries: {calculateAverageOfType()}</p>
            <p>Average of anime: {calculateAverageOfType('Anime')}</p>
            <p>Average of books: {calculateAverageOfType('Book')}</p>
            <p>Average of games: {calculateAverageOfType('Game')}</p>
            <p>Average of movies: {calculateAverageOfType('Movie')}</p>
        </div>
    );
    
}

export default statistics;