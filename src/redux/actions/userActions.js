import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, LOADING_USER} from '../types';
import axios from 'axios';

export const loginUser = (userData,history) =>(dispatch)=> {
    dispatch({type: LOADING_UI});
    axios.post('/login',userData).then((resp)=>{
        setAuthorizationHeader(resp.data.token);
        dispatch(getUserData());
        
        dispatch({type: CLEAR_ERRORS});
        history.push('/');
        }).catch((err)=>{
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const getUserData = () => (dispatch) =>{
    dispatch({type: LOADING_USER});
    axios.get('/user').then((resp)=>{
        dispatch({
            type: SET_USER,
            payload: resp.data
        })
    }).catch((err)=>{ console.log(err)});
}

export const signupUser = (newUserData,history) =>(dispatch)=> {
    dispatch({type: LOADING_UI});
    axios.post('/signup',newUserData).then((resp)=>{
        setAuthorizationHeader(resp.data);
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS});
        history.push('/');
        }).catch((err)=>{
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const uploadImage = (formData)=>(dispatch)=>{
    dispatch({type: LOADING_USER});
    axios.post('/user/image', formData).then(()=>{
        dispatch(getUserData());
    }).catch((err)=>{
        console.error(err);
    })
}

export const logoutUser = () =>(dispatch)=> {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_AUTHENTICATED});
}

export const editUserDetails = (userDetails) =>(dispatch)=> {
    dispatch({type: LOADING_USER});
    axios.post('/user',userDetails).then(()=>{
        dispatch(getUserData());
    }).catch((err)=>{
        console.log(err)
    })
}


const setAuthorizationHeader = (token) =>{
    const FBIdToken = `Bearer ${token}`;
        localStorage.setItem('FBIdToken',FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;

}