import React, {useContext} from 'react';

import classes from './Toolbar.module.css';
import bookLogo from '../../../assets/images/logo.png';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../../context/auth-context';

const Toolbar = props => {

    const authContext = useContext(AuthContext);

    return (
        <header className={classes.Toolbar}>
            <a className={classes.Logo} href='/'><img src={bookLogo} alt="Book Logo"/></a>
            <div className={classes.Buttons}>
                {!authContext.authenticated ? 
                    <Button href='/' variant="light">Login</Button> :
                    <h1>logout</h1>    
            }
            </div>    
        </header>
    );
}

export default Toolbar;