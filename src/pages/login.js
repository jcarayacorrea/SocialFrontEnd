import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

//Icono
import AppIcon from '../images/pregunta-icono.png';

//Axios
import axios from 'axios';

//Router
import {Link} from "react-router-dom/"


const styles = (customTheme)=>({...customTheme.toSpread});



class Login extends Component {
  
  //loginUrl= 'http://localhost:5001/socialmediademo-354f6/us-east1/api/login'
  constructor(){
    super();
    this.state = {
      email: '',
      password:'',
      errors: {}
    }
    console.log(styles)
  }
  render() {
    const {classes, UI: {loading}} = this.props;
    const {errors} = this.state
    console.log(this.state)
    return (
      <Grid container className={classes.form}>
        <Grid item sm/>
        <Grid item sm>
          <img src={AppIcon} alt="It's me Marioooooooo!!!!!!!" className={classes.image}/>
          <Typography variant="h2" className={classes.pageTitle}>
              Login
             
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField id="email" name="email" type="email" label="Ingrese correo" className={classes.textField} helperText={errors.email} error={errors.email ? true:false}
            value={this.state.email} onChange={this.handleChange} fullWidth/>
            <TextField id="password" name="password" type="password" label="Contraseña" className={classes.textField} helperText={errors.password} error={errors.password ? true:false}
            value={this.state.password} onChange={this.handleChange} fullWidth/>
            {errors.error && (
              <Typography variant="body2" className={classes.customError}>
                {errors.error}
              </Typography>
            )}
            
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={this.state.loading}>
              Login  {loading && <CircularProgress className={classes.progress} size={30}/>}
              </Button>
            <br/>
            <small>Crea una cuenta <Link to="/signup"> aqui</Link></small>
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
    
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData, this.props.history);
    
    
  }
  handleChange = (event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
}

Login.propTypes = {
  classes : PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  loginUser
}
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Login));
