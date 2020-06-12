import React from 'react';

import classes from './Toolbar.module.css';
import bookLogo from '../../../assets/images/logo.png';
import Button from 'react-bootstrap/Button';

const Toolbar = props => {

    return (
        <header className={classes.Toolbar}>
            <a className={classes.Logo} href='/'><img src={bookLogo} alt="Book Logo"/></a>
            <div className={classes.Buttons}>
                {!props.auth ? <Button href="/" variant="light">Login</Button> :
                <Button onClick={() => props.logout(360)}variant="light">Logout</Button>}
            </div>    
        </header>
    );
}

export default Toolbar;