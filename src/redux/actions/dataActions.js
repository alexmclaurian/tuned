import {
  SET_MIDI,
  SET_TUNES,
  LOADING_DATA,
  STOP_LOADING_UI,
  LOADING_UI,
  LIKE_TUNE,
  UNLIKE_TUNE,
  DELETE_TUNE,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_TUNE,
  SET_TUNE,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";

// Post midi
export const postMidi = formData => dispatch => {
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  const config = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  };

  axios.post("/midi", formData, config).then(res => {
    dispatch({
      type: SET_MIDI,
      payload: res.data
    });
  });
};

// Get all tunes
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

// get tune
export const getTune = tuneId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/tune/${tuneId}`)
    .then(res => {
      dispatch({ type: SET_TUNE, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

// Post tune
export const postTune = newTune => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/tune/", newTune)
    .then(res => {
      dispatch({ type: POST_TUNE, payload: res.data });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

// Like a tune
export const likeTune = tuneId => dispatch => {
  axios
    .get(`/tune/${tuneId}/like`)
    .then(res => {
      // console.log("likeTune payload: ", res.data);
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

// Submit a comment
export const submitComment = (tuneId, commentData) => dispatch => {
  axios
    .post(`/tune/${tuneId}/comment`, commentData)
    .then(res => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

// Delete a tune
export const deleteTune = tuneId => dispatch => {
  axios
    .delete(`/tune/${tuneId}`)
    .then(() => {
      dispatch({ type: DELETE_TUNE, payload: tuneId });
    })
    .catch(err => console.log(err));
};

export const getUserData = userName => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userName}`)
    .then(res => {
      dispatch({ type: SET_TUNES, payload: res.data.tunes });
    })
    .catch(() => {
      console.log("uh oh ", userName);
      dispatch({ type: SET_TUNES, payload: null });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
