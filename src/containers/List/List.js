import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import axios from 'axios';

import Item from '../../components/Item/Item';
import ListEntry from '../../components/ListEntry/ListEntry';


class List extends Component {

    state = {
        hideEntryForm: true,
        list: [{
            creator: '',
            index: 0,
            score: 0,
            style: '',
            title: '',
            type: '',
            year: 0
        }],
        stats: {
            average: 0,
            averageAnime: 0,
            averageBooks: 0,
            averageGames: 0,
            averageMovies: 0,
            total: 0,
            totalAnime: 0,
            totalBooks: 0,
            totalGames: 0,
            totalMovies: 0
        }
    }

    componentDidMount = () => {
        this.updateList();
    }

    toggleEntryForm = () => {
        this.setState({hideEntryForm: !this.state.hideEntryForm});
    }

    addItem = async param => {
        await axios.post('https://allmedialog.firebaseio.com/example.json', param);
        this.updateList();
    }

    removeItem = async index => {
        await axios.delete('https://allmedialog.firebaseio.com/example/' + this.state.keys[index-1] + '.json');
        this.updateList();
    }

    updateList = async () => {
        await axios.get('https://allmedialog.firebaseio.com/example.json').then(response => {
            const keys = Object.keys(response.data)
            const list = keys.map(key => response.data[key]);
            this.setState({list: list, keys: keys});
            this.renderList();
        });
    }

    calculateStatistics = async () => {
        const stats = {
            average: 0,
            averageAnime: 0,
            averageBooks: 0,
            averageGames: 0,
            averageMovies: 0,
            test: 0,
            total: this.state.list.length,
            totalAnime: 0,
            totalBooks: 0,
            totalGames: 0,
            totalMovies: 0
        }

        this.state.list.forEach(item => {
            stats.test += Number(item.score);
        })
        stats.average = stats.test / this.state.list.length;
        await this.setState({stats: stats});
        console.log(this.state.stats);
    }

    renderList = () => {
        let counter = 0;
        this.state.list.forEach(item => {
            item.index = ++counter;
            item.style = this.findColor(item.type);
        });

        const list = this.state.list.map((list) => 
            <div>
                <h6>#</h6>
                <Item 
                    title={list.title} creator={list.creator} year={list.year} score={list.score} type={list.type}
                    index={list.index} key={list.index} style={list.style} remove={this.removeItem}/>
            </div>
            );
        return (<div><ul>{list}</ul></div>);
    }

    findColor = type => {
        let color;
        switch (type) {
            case 'Anime':
                color = '#FFB6B6';
                break;
            case 'Book':
                color = '#FDE2E2';
                break;
            case 'Game':
                color = '#AACFCF';
                break;
            case 'Movie':
                color = '#679B9B';
                break;
            default:
                color = '';
                break;
        }
        return color;
    }

    render() {
        return (
            <div>
                <Button variant='outline-info' onClick={this.toggleEntryForm}>New</Button>
                <Button variant='outline-info' onClick={this.calculateStatistics}>Statistics</Button>
                
                {this.state.hideEntryForm ? null : 
                    <ListEntry add={this.addItem} update={this.updateList}/>
                }

                {this.renderList()}
            </div>
        );
    }
}

export default List;