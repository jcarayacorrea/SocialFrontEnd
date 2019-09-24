import {SET_SCREAMS, SET_SCREAM, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, LOADING_UI, SET_ERRORS, CLEAR_ERRORS, POST_SCREAM, STOP_LOADING_UI, SUBMIT_COMENT} from '../types';
import axios from 'axios';

// GET SCREAM
export const getScreams = () => (dispatch) =>{
    dispatch({ type: LOADING_DATA});
    axios.get('/screams').then((resp)=>{
        dispatch({
            type: SET_SCREAMS,
            payload: resp.data
        })
        }).catch((err)=>{
            dispatch({
             type: SET_SCREAMS,
             payload: null
            })
    })
}

// LIKE SCREAM
export const likeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/like`).then((resp)=>{
        dispatch({
            type: LIKE_SCREAM,
            payload: resp.data
        })
    }).catch((err)=>{
        console.log(err);
    })
        
}

//UNLIKE_SCREAM
export const unlikeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/unlike`).then((resp)=>{
        dispatch({
            type: UNLIKE_SCREAM,
            payload: resp.data
        })
    }).catch((err)=>{
        console.log(err);
    })
        
}

//DELETE SCREAM 

export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`/scream/${screamId}`).then(()=>{
        dispatch({type: DELETE_SCREAM, payload: screamId})
    }).catch((err)=>{console.log(err)})
}

//POST SCREAM
export const postScream = (newScream) => (dispatch)=>{
    dispatch({type: LOADING_UI})
    axios.post('/scream', newScream).then((res)=>{
        dispatch({
            type: POST_SCREAM,
            payload:res.data
        })
        dispatch({type: CLEAR_ERRORS});
    }).catch((err)=>{
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

export const clearErrors = () => (dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
}

export const getScream = (screamId) => (dispatch) =>{
    dispatch({type: LOADING_UI});
    axios.get(`/scream/${screamId}`).then((resp)=>{
        dispatch({
            type: SET_SCREAM,
            payload: resp.data
        });
        dispatch({type:STOP_LOADING_UI})
    }).catch((err)=>{
        dispatch({type:SET_ERRORS,
                  payload: err.response.data  })
    })
}

export const submitComment = (screamId, comentData) => (dispatch)=>{
    axios.post(`/scream/${screamId}/comment`,comentData).then((resp)=>{
        dispatch({type: SUBMIT_COMENT,
                payload: resp.data});
        dispatch(clearErrors());
    }).catch((err)=>{
        dispatch({type: SET_ERRORS,
            payload: err.response.data});
    })
}