import React, { Component } from 'react'
import {Link} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';

export class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <ToolBar className="nav-container">
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                </ToolBar>
            </AppBar>
        )
    }
}

export default Navbar
