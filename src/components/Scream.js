import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from "react-router-dom/"
import PropTypes from 'prop-types'
import ProfileButton from '../utils/ProfileButton';
import DeleteScreamButton from './DeleteScreamButton';

//MUI estilos
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Iconos
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

//DayJs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//Redux
import {connect} from 'react-redux';
import {likeScream, unlikeScream} from '../redux/actions/dataActions';


const styles = {
    card:{
        position: 'relative',
        display: 'flex',
        marginBottom:20
    },
    image:{
        minWidth:200
    },
    content:{
        padding: 25,
        objectFit: 'cover'
    },
    typography:{
        useNextVariants : true
    }
}


 class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);
        let {classes, scream:{body,createdAt,userImage,userHandle,screamId,likeCount,commentCount}, user:{authenticated, handle}}= this.props;
        const likeButton = !authenticated ? (
            <ProfileButton tip="Like">
                <Link to="/login">
                    <FavoriteBorderIcon color="primary"/>
                </Link>
            </ProfileButton>
        ):(
            this.likedScream()? (
                <ProfileButton tip="Undo like" onClick={this.unlikeScream}>
                    <FavoriteIcon color="primary" />
                </ProfileButton>
            ):(
                <ProfileButton tip="Like" onClick={this.likeScream}>
                    <FavoriteIcon color="primary" />
                </ProfileButton>
            )
        );
        const deleteButton = (authenticated && userHandle === handle) && <DeleteScreamButton screamId={screamId}/>
        
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile Image" className={classes.image}></CardMedia>
                <CardContent className={classes.content}>
                    <Typography
                    variant="h5"
                    component={Link}
                    to={`/users/${userHandle}`}
                    color="primary"
                    >
                        {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                       
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1" >
                        {body}
                    </Typography>
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <ProfileButton tip="comments">
                        <ChatIcon color="primary"/>
                    </ProfileButton>
                    <span>{commentCount} Comments</span>
                </CardContent>
            </Card>
        )
    }
    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find((like)=> like.screamId === this.props.scream.screamId )){
            return true;
        } else {
            return false;
        }

    }
    likeScream = ()=>{
        this.props.likeScream(this.props.scream.screamId);
    }
    unlikeScream = ()=>{
        this.props.unlikeScream(this.props.scream.screamId);
    }
}
Scream.propTypes = {
    user : PropTypes.object.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    user: state.user
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream))

