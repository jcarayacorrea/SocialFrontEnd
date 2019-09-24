import React, {Component} from 'react'
import ProfileButton from "../../utils/ProfileButton";
import {Link} from 'react-router-dom/Link'
import PropTypes from 'prop-types';
//Redux
import {connect} from 'react-redux';
import {likeScream, unlikeScream} from '../../redux/actions/dataActions';
//iconos
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


class LikeButton extends Component {
    render() {
        const {authenticated} = this.props.user;

        return !authenticated ? (
            <Link  to="/login">
                <ProfileButton tip="Like">
                    <FavoriteBorderIcon color="primary"/>
                </ProfileButton>
            </Link>
        ) : (
            this.likedScream() ? (
                <ProfileButton tip="Undo like" onClick={this.unlikeScream}>
                    <FavoriteIcon color="primary"/>
                </ProfileButton>
            ) : (
                <ProfileButton tip="Like" onClick={this.likeScream}>
                    <FavoriteBorderIcon color="primary"/>
                </ProfileButton>
            )
        );
    }
    likedScream = () => {
        return !!(this.props.user.likes && this.props.user.likes.find((like) => like.screamId === this.props.screamId));

    };
    likeScream = ()=>{
        this.props.likeScream(this.props.screamId);
    };
    unlikeScream = ()=>{
        this.props.unlikeScream(this.props.screamId);
    };

}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = (state) =>({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
};


export default connect(mapStateToProps,mapActionsToProps)(LikeButton)