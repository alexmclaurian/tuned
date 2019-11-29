import { SET_TUNE, LOADING_DATA, LIKE_TUNE, UNLIKE_TUNE } from "../types";
import axios from "axios";

// Get all tune
export const getTunes = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/tunes")
    .then(res => {
      dispatch({
        type: SET_TUNES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_TUNES,
        payload: []
      });
    });
};

// Like a tune
export const likeTune = tuneId => dispatch => {
  axios
    .get(`/tune/${tuneId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_TUNE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Unlike a tune
export const unlikeTune = tuneId => dispatch => {
  axios
    .get(`/tune/${tuneId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_TUNE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
