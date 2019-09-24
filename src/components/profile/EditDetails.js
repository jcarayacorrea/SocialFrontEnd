import React, { Component, Fragment } from 'react'
//import {Link} from 'react-router-dom/Link'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import ProfileButton from '../../utils/ProfileButton';

//Redux
import {connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';
//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
//Iconos
import EditIcon from '@material-ui/icons/Edit'
import { Tooltip } from '@material-ui/core';

const styles = (customTheme) => ({
    ...customTheme.toSpread
})

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    componentDidMount(){
        const { credentials} = this.props;
        this.mapUserDetailsToState(credentials);
    }
  render() {
      const { classes} = this.props;
    return (
        <Fragment>
            
            <ProfileButton tip="Editar detalle perfil" onClick={this.handleOpen} btnClassName="button">
                <EditIcon color="primary"/>
            </ProfileButton>
            <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edita tu prefil</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField name="bio"
                            type="text"
                            label="Bio"
                            multiline rows="3"
                            placeholder="Breve descripcion sobre ti"
                            className={classes.TextField}
                            value={this.state.bio} onChange={this.handleChange} fullWidth />
                        <TextField name="website"
                            type="text"
                            label="Website"
                            
                            placeholder="Tu pagina web"
                            className={classes.TextField}
                            value={this.state.website} onChange={this.handleChange} fullWidth />
                        <TextField name="location"
                            type="text"
                            label="Location"
                            
                            placeholder="Donde vives"
                            className={classes.TextField}
                            value={this.state.location} onChange={this.handleChange} fullWidth />

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">Cancel</Button>
                    <Button onClick={this.handleSubmit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
  }

  handleChange = (event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleOpen = () =>{
      this.setState({open:false});
      
  }

  handleClose = () =>{
    this.setState({open:true});
    this.mapUserDetailsToState(this.props.credentials);
}
  
  handleSubmit= () =>{
      const userDetails = {
          bio: this.state.bio,
          website: this.state.website,
          location: this.state.location

      }
    this.props.editUserDetails(userDetails);
    this.handleClose();
  }


  mapUserDetailsToState = (credentials) =>{
    this.setState({
        bio: (credentials.bio) ? credentials.bio : '',
        website: (credentials.website) ? credentials.website : '',
        location: (credentials.location) ? credentials.location : ''
    })
  }
}

const mapStateToProps = (state)=>({
    credentials: state.user.credentials
})

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}


export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));
