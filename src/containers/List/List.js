import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import axios from 'axios';

import Item from '../../components/Item/Item';
import ListEntry from '../../components/ListEntry/ListEntry';
import Statistics from '../../components/Statistics/Statistics';
import Login from '../Login/Login';


class List extends Component {

    state = {
        hideEntryForm: true,
        hideStats: true,
        hideUpdateForm: true,
        hideTestLogin: true,
        targetIndex: null,
        list: [{
            creator: '',
            index: 0,
            score: 0,
            style: '',
            title: '',
            type: '',
            year: 0
        }],
        keys: []
    }

    componentDidMount = () => {
        this.updateList();
    }

    toggleForm = (param, index) => {
        if (index) {
            if (index === this.state.targetIndex) {
                index = 0;
            }
            this.setState({[param]: !this.state[param], targetIndex: index});
        }
        else {
            this.setState({[param]: !this.state[param]});
        }
    }

    addItem = async value => {
        await axios.post('https://allmedialog.firebaseio.com/example.json', value);
        this.updateList();
    }

    removeItem = async index => {
        await axios.delete('https://allmedialog.firebaseio.com/example/' + this.state.keys[index-1] + '.json');
        this.updateList();
    }

    updateItem = async index => {
        return;
    }

    updateList = async () => {
        await axios.get('https://allmedialog.firebaseio.com/example.json').then(response => {
            const keys = Object.keys(response.data)
            const list = keys.map(key => response.data[key]);
            this.setState({list: list, keys: keys});
            this.renderList();
        });
    }

    sortList = filter => {
        const sortedList = [].concat(this.state.list);

        if (filter.target.value === 'score') 
            sortedList.sort((a, b) => a[filter.target.value] < b[filter.target.value] ? 1 : -1);
        else 
            sortedList.sort((a, b) => a[filter.target.value] > b[filter.target.value] ? 1 : -1);

        this.setState({list: sortedList});
    }

    renderList = () => {
        let counter = 0;
        this.state.list.forEach(item => {
            item.index = ++counter;
            item.style = this.findStyle(item.type);
        });

        const list = this.state.list.map((list) => 
            <div>
                <Item 
                    title={list.title} creator={list.creator} year={list.year} score={list.score} type={list.type}
                    index={list.index} key={list.index} style={list.style} hideForm={this.state.hideUpdateForm}
                    target={this.state.targetIndex} remove={this.removeItem} toggleForm={this.toggleForm}/>
            </div>
            );
        return (<div><ul>{list}</ul></div>);
    }

    findStyle = type => {
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
                <Button variant='outline-info' onClick={() => this.toggleForm('hideEntryForm')}>New</Button>
                <Button variant='outline-info' onClick={() => this.toggleForm('hideStats')}>Statistics</Button>

                <select className='SortSelect' onChange={this.sortList}>
                    <option value='title'>Title</option>
                    <option value='creator'>Creator</option>
                    <option value='year'>Year</option>
                    <option value='score'>Score</option>
                    <option value='type'>Type</option>
                </select>
                
                {this.state.hideEntryForm ? null : 
                    <ListEntry add={this.addItem} update={this.updateList}/>
                }

                {this.state.hideStats ? null : 
                    <Statistics list={this.state.list}/>
                }

                {this.renderList()}

                <Button variant='outline-info' onClick={() => this.toggleForm('hideTestLogin')}>Login 2</Button>

                {this.state.hideTestLogin ? null : 
                    <Login/>
                }
            </div>
        );
    }
}

export default List;