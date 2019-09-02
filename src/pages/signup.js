import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Icono
import AppIcon from '../images/pregunta-icono.png';

//Axios
import axios from 'axios';

//Redux stuff
import {connect } from 'react-redux';
import { signupUser} from '../redux/actions/userActions';

//Router
import {Link} from "react-router-dom/"


const styles = (customTheme)=>({...customTheme.toSpread});



class Signup extends Component {
  
  loginUrl= 'http://localhost:5001/socialmediademo-354f6/us-east1/api/login'
  constructor(){
    super();
    this.state = {
      email: '',
      password:'',
      confirmPassword:'',
      handle: '',
      errors: {}
    }
  }
  render() {
    const {classes, UI:{loading}} = this.props;
    const {errors} = this.state
    console.log(this.state)
    return (
      <Grid container className={classes.form}>
        <Grid item sm/>
        <Grid item sm>
          <img src={AppIcon} alt="It's me Marioooooooo!!!!!!!" className={classes.image}/>
          <Typography variant="h2" className={classes.pageTitle}>
              Sign Up
             
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField id="email" name="email" type="email" label="Ingrese correo" className={classes.textField} helperText={errors.email} error={errors.email ? true:false}
            value={this.state.email} onChange={this.handleChange} fullWidth/>
            <TextField id="password" name="password" type="password" label="Contraseña" className={classes.textField} helperText={errors.password} error={errors.password ? true:false}
            value={this.state.password} onChange={this.handleChange} fullWidth/>
            <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirma Contraseña" className={classes.textField} helperText={errors.confirmPassword} error={errors.confirmPassword ? true:false}
            value={this.state.password} onChange={this.handleChange} fullWidth/>
            <TextField id="handle" name="handle" type="text" label="Ingrese correo" className={classes.textField} helperText={errors.handle} error={errors.handle ? true:false}
            value={this.state.email} onChange={this.handleChange} fullWidth/>
            {errors.error && (
              <Typography variant="body2" className={classes.customError}>
                {errors.error}
              </Typography>
            )}
            
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={this.state.loading}>
              Login  {loading && <CircularProgress className={classes.progress} size={30}/>}
              </Button>
            <br/>
            <small>Ya eres parte nuestra ingresa <Link to="/login"> aqui</Link></small>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    );
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({errors: nextProps.UI.errors});
    }
    
  }
  handleSubmit = (event)=>{
    event.preventDefault();
    this.setState({
      loading:true
    })
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }
    this.props.signupUser(newUserData, this.props.history);
    
  }
  handleChange = (event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
}

Signup.propTypes = {
  classes : PropTypes.object.isRequired,
  user : PropTypes.object.isRequired,
  UI : PropTypes.object.isRequired,
  signupUser : PropTypes.func.isRequired

}

const mapStateToProps = (state) => ({
  user: state.user,
  UI : state.UI
})
export default connect(mapStateToProps,{signupUser})(withStyles(styles)(Signup));
