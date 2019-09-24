import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from "react-router-dom/"
import PropTypes from 'prop-types'
import ProfileButton from '../../utils/ProfileButton';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

//redux
import { connect} from 'react-redux';
import {deleteScream} from '../../redux/actions/dataActions';

const styles = {
    deleteButton:{
        position: 'absolute',
        top:'10%',
        left: '90%'
    }
 }
class DeleteScreamButton extends Component {
    state = {
        open: false
    }
  render() {
    const {classes} = this.props;
    return (
      <Fragment>
          <ProfileButton tip="delete scream"
          onClick={this.handleOpen}
          btnClassName = {classes.deleteButton}>
              <DeleteOutline color="secundary"/>
          </ProfileButton>
          <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
              <DialogTitle>
                  Desea eliminar comentario?
              </DialogTitle>
              <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                      Cancel
                  </Button>
                  <Button onClick={this.deleteScream} color="secondary">
                      Delete
                  </Button>
              </DialogActions>
          </Dialog>
      </Fragment>
    );
  }
  handleOpen = ()=>{
      this.setState({open:true});
  }
  handleClose = ()=>{
    this.setState({open:false});
}
  deleteScream = ()=>{
    this.props.deleteScream(this.props.screamId)
    this.setState({open:false});
}
}

DeleteScreamButton.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}


export default connect(null, {deleteScream})(withStyles(styles)(DeleteScreamButton))