import React, {Component} from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from "react-router-dom/"
import PropTypes from 'prop-types'

//Redux
import {connect} from 'react-redux';
import {submitComment} from '../../redux/actions/dataActions';
import {Grid, Button, TextField} from "@material-ui/core";


const styles = (customTheme) => ({
    ...customTheme.toSpread
})

class CommentForm extends Component {
    state = {
        body:'',
        errors:{}
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body:''});
        }
    }

    render() {
        const { classes, authenticated} = this.props;
        const errors = this.state.errors;

        const  commentFormMarkup = authenticated && (
            <Grid item sm={12} style={{textAlign:'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField name="body" type="text" label="Commentar posteo" error={errors.comment ? true:false}
                               helperText={errors.comments} value={this.state.body} onChange={this.handleChange} fullWidth className={classes.textField}/>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>Comentar</Button>
                </form>
                <hr className={classes.visibleSeparator}/>
            </Grid>

        )
        return commentFormMarkup;
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});

    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, {body: this.state.body});
    }

}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes : PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) =>({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps,{submitComment})(withStyles(styles)(CommentForm))