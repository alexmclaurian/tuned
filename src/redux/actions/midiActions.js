import { SET_MIDI } from "../types";
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
