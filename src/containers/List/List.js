import React, { Component } from 'react';
import ListEntry from '../ListEntry/ListEntry';
import axios from 'axios';

class List extends Component {

    state = {
        title: 'title',
        creator: 'author',
        year: 'year',
        rating: 'rating',
        type: 'type'
    }

    render() {
        return (
            <div>
                <ListEntry/>
                <h1>{this.state.title}, {this.state.creator}, {this.state.year}, {this.state.rating}, {this.state.type}</h1>
            </div>
        );
    }
}

export default List;