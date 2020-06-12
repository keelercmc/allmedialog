import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import axios from 'axios';

import Toolbar from '../../components/Nav/Toolbar/Toolbar';
import Item from '../../components/Item/Item';
import ItemLabels from '../../components/Item/ItemLabels/ItemLabels';
import ListEntry from '../../components/ListEntry/ListEntry';
import Statistics from '../../components/Statistics/Statistics';
import Login from '../Login/Login';
import AuthContext from '../../context/auth-context';


class List extends Component {

    state = {
        authenticated: false,
        name: null,
        hideEntryForm: true,
        hideStats: true,
        hideUpdateForm: true,
        targetIndex: null,
        list: null,
        filters: [],
        logoutTimer: 3600000
    }

    static contextType = AuthContext;

    componentDidMount = async () => {
        this.updateList();
        this.updateLoginStatus();
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
        value.date = new Date();
        await axios.post('https://allmedialog.firebaseio.com/' + this.state.name + '.json', value);
        this.updateList();
    }

    removeItem = async index => {
        await axios.delete('https://allmedialog.firebaseio.com/' + this.state.name + '/' + index + '.json');
        this.updateList();
    }

    updateItem = async (value, index) => {
        await axios.put('https://allmedialog.firebaseio.com/' + this.state.name + '/' + index + '.json', value);
        this.updateList();
    }

    updateList = async () => {
        await axios.get('https://allmedialog.firebaseio.com/' + this.state.name +'.json').then(response => {
            if (response.data) {
                const keys = Object.keys(response.data)
                const list = keys.map(key => response.data[key]);
                list.forEach((item, index) => item.key = keys[index]);
                this.setState({list: list});
                this.renderList();
            }  
            else {
                this.setState({list: null});
            }
        });
    }

    sortList = filter => {
        const sortedList = [].concat(this.state.list);

        if (filter.target)
            filter = filter.target.value;
        const filters = this.state.filters;
        filters.push(filter);

        if (filter === 'score') 
            sortedList.sort((a, b) => b[filter] - a[filter]);
        else 
            sortedList.sort((a, b) => a[filter] > b[filter] ? 1 : -1);

        if (filters[filters.length-1] === filters[filters.length-2]) 
            sortedList.reverse();
            
        this.setState({list: sortedList, filters: filters});
    }

    renderList = () => {
        if (this.state.list) {
            let counter = 0;
            this.state.list.forEach(item => {
                item.index = ++counter;
                item.style = this.findStyle(item.type);
            });
            const list = this.state.list.map((list) => 
                <Item 
                    title={list.title} creator={list.creator} year={list.year} score={list.score} type={list.type}
                    index={list.index} key={list.key} extra={list.key} style={list.style} target={this.state.targetIndex}
                    add={this.addItem} submit={this.updateItem} remove={this.removeItem} toggleForm={this.toggleForm} item={list}/>
                );
            return (<div><ul><ItemLabels sort={this.sortList}/>{list}</ul></div>);
        }  
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

    login = async (res) => {
        this.context.authenticated = true;
        this.context.id = res.localId;
        this.context.name = res.email.slice(0, res.email.indexOf("@")) + 
            '---' + res.email.slice(res.email.indexOf("@")+1, res.email.indexOf("."));
        await axios.delete('https://allmedialog.firebaseio.com/login.json');
        await axios.post('https://allmedialog.firebaseio.com/login.json', this.context);
        this.updateLoginStatus();
        this.logout(this.state.logoutTimer, res);
    }

    logout = (logoutTimer, res) => {
        setTimeout(async () => {
            await axios.delete('https://allmedialog.firebaseio.com/login.json');
            this.context.authenticated = false;
            this.context.id = '';
            this.context.name = '';
            this.updateLoginStatus();
        }, logoutTimer);
    }

    updateLoginStatus = async () => {
        await axios.get('https://allmedialog.firebaseio.com/login.json').then(response => {
            if (response.data) {
                const token = Object.keys(response.data).map(key => response.data[key]);
                this.setState({authenticated: token[0].authenticated, name: token[0].name});
                this.updateList();
                this.logout(this.state.logoutTimer);
            }
            else {
                this.setState({authenticated: false, name: ''});
            }
        });
    }

    render() {
        return (
            <div>
                <Toolbar auth={this.state.authenticated} logout={this.logout}/>
                {!this.state.authenticated ?
                        <Login login={this.login}/>
                    :<div> 

                        {this.renderList()}
                    
                        <Button variant='outline-info' size='sm' onClick={() => this.toggleForm('hideEntryForm')}>New Item</Button>
                        {this.state.list ? 
                        <Button variant='outline-info' size='sm' onClick={() => this.toggleForm('hideStats')}>Statistics</Button> 
                        : null}                  

                        {this.state.hideEntryForm ? null : 
                            <ListEntry submit={this.addItem} update={this.updateList}/>
                        }

                        {this.state.hideStats ? null : 
                            <Statistics list={this.state.list}/>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default List;