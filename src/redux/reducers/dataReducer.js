import { SET_TUNES, LIKE_TUNE, UNLIKE_TUNE, LOADING_DATA } from "../types";

const initialState = {
  tunes: [],
  tune: {},
  loading: false
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_TUNES:
      return {
        ...state,
        tunes: actions.payload,
        loading: false
      };
    default:
      return state;
  }
}
