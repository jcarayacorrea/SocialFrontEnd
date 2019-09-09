import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom/Link'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
//redux
import { connect} from 'react-redux';
import { logoutUser, uploadImage} from '../redux/actions/userActions';
//Mui
import { Paper, Typography, Button } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import EditDetails from './EditDetails'

import dayjs from 'dayjs';
import ProfileButton from '../utils/ProfileButton';

const styles = (customTheme)=>({
    ...customTheme.toSpread,
    button:{
        float: 'right'
    }
})
 class Profile extends Component {
    render() {
        const { classes, user: { credentials: {handle, createdAt,imageUrl, bio, website, location}, loading, authenticated}} = this.props;
        console.log(this.props);
        let profileMarkup = !loading ? ((authenticated ? (
            
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden"/>
                        
                        <ProfileButton tip="Editar imagen del perfil" onClick={this.handleEditPicture} btnClassName="button">
                            <EditIcon color="primary"/>
                        </ProfileButton>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                                <LocationOn color="primary"/>
                            <hr/>
                            </Fragment>
                            
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary"/>
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                        <CalendarToday color="primary" />{' '}<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                       
                        <ProfileButton tip="Cerrar sesion" onClick={this.handleLogOut} >
                            <KeyboardReturn color="primary"/>
                        </ProfileButton>   
                        <EditDetails/> 
                </div>
            </Paper>
        ):(
            <Paper className={classes.paper}>
                <Typography variant="body" align="center">
                    No se encontro perfil, por favor logearse nuevamente
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Login
                        </Button>
                        <Button variant="contained" color="secundary" component={Link} to="/signup">
                            Sign Up
                        </Button>
                    </div>
                </Typography>
            </Paper>
        ))): (<p>Cargando....</p>)
        return profileMarkup;
    }
    handleImageChange = (event) => {
        console.log(event);
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);

    }
    handleEditPicture = () =>{
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }
    handleLogOut = () => {
        this.props.logoutUser();
    }
}

const mapStateToProps = (state) =>({
    user: state.user
})

const mapActionsToProps = { logoutUser, uploadImage};

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user : PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
