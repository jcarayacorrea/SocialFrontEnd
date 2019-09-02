import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileButton from '../utils/ProfileButton';
//Material - UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//Iconos
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';


//redux
import {connect} from 'react-redux';



export class NavBar extends Component {
    render() {
        const { authenticated} = this.props;
        return (
            
                <AppBar position="static">
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <ProfileButton tip="Escribe algo....">
                                <AddIcon color="primary"/>
                            </ProfileButton>
                            <Link to="/">
                            <ProfileButton tip="Inicio">
                                <HomeIcon color="primary"/>
                            </ProfileButton>
                            </Link>
                            <ProfileButton tip="Notificaciones">
                                <Notifications color="primary"/>
                            </ProfileButton>
                        </Fragment>
                    )
                    :(
                        <Fragment>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                        </Fragment>
                        
                    )}
                
                </Toolbar>
            </AppBar>
            
        )
    }
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(NavBar)
