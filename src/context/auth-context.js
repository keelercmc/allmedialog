import React from 'react';

const authContext = React.createContext({
    authenticated: false,
    id: ''
});

export default authContext;