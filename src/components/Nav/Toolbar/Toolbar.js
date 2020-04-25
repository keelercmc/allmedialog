import React from 'react';
import classes from './Toolbar.module.css';
import bookLogo from '../../../assets/images/b2.png';

import Button from 'react-bootstrap/Button';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <a className={classes.Logo} href='/'><img src={bookLogo}/></a>
        <div className={classes.Buttons}>
            <Button href='/login' variant="light">Login</Button>
        </div>
        
    </header>
);

export default toolbar;