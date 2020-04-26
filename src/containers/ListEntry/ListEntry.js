import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class ListEntry extends Component {

    state = {
        displayEntry: false
    }

    toggleEntryForm = async () => {
        this.setState({displayEntry: !this.state.displayEntry});
    }

    entryForm = () => {
        return <hi>list entry</hi>
    }

    render() {
        return (
            <div>   
                <Button variant="outline-info" onClick={this.toggleEntryForm}>Add entry</Button>
                {this.state.displayEntry ? <h1>entry form</h1> : null}
            </div>
            
        );
    }
}

export default ListEntry;