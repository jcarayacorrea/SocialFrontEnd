import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom/Link'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import ProfileButton from '../../utils/ProfileButton';

//MUI
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";


//Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore'

//Redux
import {connect} from "react-redux";
import {getScream, clearErrors} from "../../redux/actions/dataActions";
import dayjs from "dayjs";
import LikeButton from "./LikeButton";
import ChatIcon from "@material-ui/core/SvgIcon/SvgIcon";
import CardContent from "@material-ui/core/CardContent";
import CommentForm from "./CommentForm";

const styles = (customTheme) => ({
    ...customTheme.toSpread,

    profileImage:{
        maxWidth:200,
        height:200,
        borderRadius:'50%',
        objectFit:'cover'
    },
    closeButton:{
        position:'absolute',
        left:'90%'
    },
    expandDialog:{
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv:{
        textAlign: 'center',
        marginTop:50,
        marginBottom:50
    }
})

class ScreamDialog extends Component {
    state = {
        open: false
    }
    handleOpen = ()=>{
        this.setState({open:true})
        this.props.getScream(this.props.screamId)
    }
    handleClose = ()=>{
        this.setState({open:false})
        this.props.clearErrors();
    }
    render() {
        const { classes,
        scream:{
            screamId,
            body,
            createdAt,
            likeCount,
            commentCount,
            userHandle,
            userImage,
            comments
        },
        UI:{loading}}   = this.props;
        const dialogMarkup = loading ? (
            <div className="spinnerDiv">
                <CircularProgress size={200} thickness={2}/>
            </div>

        ):(
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} Likes</span>
                    <ProfileButton tip="comments">
                        <ChatIcon color="primary"/>
                    </ProfileButton>
                    <span>{commentCount} Comments</span>
                </Grid>
                <CommentForm comments={comments}/>
            </Grid>
        )
        return (
            <Fragment>
                <ProfileButton onClick={this.handleOpen} tip="Expande post" tipClassName={classes.expandDialog}>
                    <UnfoldMore color="primary"/>
                </ProfileButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <ProfileButton tip="Cerrar" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </ProfileButton>
                </Dialog>
            </Fragment>

        )
    }

}

ScreamDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    scream: state.data.scream,
    UI:  state.UI
})

const mapActionsToProps = {
    getScream,
    clearErrors
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(ScreamDialog))