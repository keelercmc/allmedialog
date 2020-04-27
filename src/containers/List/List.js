import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import axios from 'axios';

import Item from '../../components/Item/Item';
import FormEntry from '../../components/FormEntry/FormEntry';


class List extends Component {

    state = {
        hideEntryForm: true,
        list: []
    }

    componentDidMount = () => {
        this.updateList();
    }

    componentDIdUpdate = () => {
        this.updateList();
    }

    toggleEntryForm = () => {
        this.setState({hideEntryForm: !this.state.hideEntryForm});
    }

    addToList = async param => {
        await axios.post('https://allmedialog.firebaseio.com/example.json', param);
    }

    updateList = async () => {
        await axios.get('https://allmedialog.firebaseio.com/example.json').then(response => {
            const list = Object.keys(response.data).map(key => response.data[key]);
            this.setState({list: list});
            this.renderList();
        });
    }

    renderList = () => {
        const list = this.state.list.map((list) => 
            <Item title={list.title} creator={list.creator} year={list.year} score={list.score} type={list.type} key={1}/>);
        return <ul>{list}</ul>;
    }

    render() {
        return (
            <div>
                <Button variant='outline-info' onClick={this.toggleEntryForm}>New</Button>
                <Button variant='outline-info'>Statistics</Button>
                
                {this.state.hideEntryForm ? null : 
                    <FormEntry add={this.addToList} update={this.updateList}/>
                }

                {this.renderList()}
            </div>
        );
    }
}

export default List;