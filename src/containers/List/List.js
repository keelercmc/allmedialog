import React, { Component } from 'react';
import ListEntry from '../ListEntry/ListEntry';
import axios from 'axios';

class List extends Component {

    state = {
        title: 'title',
        creator: 'author',
        year: 'year',
        rating: 'rating',
        type: 'type',
        list: []
    }

    componentDidMount = () => {
        this.updateList();
    }

    updateList = async () => {
        await axios.get('https://allmedialog.firebaseio.com/example.json').then(response => {
            const list = Object.keys(response.data).map(keyName => response.data[keyName]);
            this.setState({list: list});
            this.renderList();
        });
    }

    renderList = () => {
        const list = this.state.list.map((list) =>
            <div>
                <li>{list.title}</li>
            </div>
            
        );
        return (
            <ul>{list}</ul>
        );
    }

    render() {
        return (
            <div>
                <ListEntry/>
                {this.renderList()}
            </div>
        );
    }
}

export default List;