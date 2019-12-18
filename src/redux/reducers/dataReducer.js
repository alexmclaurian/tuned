import {
  SET_MIDI,
  SET_TUNES,
  LIKE_TUNE,
  UNLIKE_TUNE,
  LOADING_DATA,
  DELETE_TUNE,
  POST_TUNE,
  SET_TUNE,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  tunes: [],
  tune: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_MIDI:
      console.log(`setmidi ${action.payload}`);
      return {
        ...state,
        midi: action.payload
      };
    case SET_TUNES:
      return {
        ...state,
        tunes: action.payload,
        loading: false
      };
    case SET_TUNE:
      return {
        ...state,
        tune: action.payload
      };
    case LIKE_TUNE:
    case UNLIKE_TUNE:
      let index = state.tunes.findIndex(
        tune => tune.tuneId === action.payload.tuneId
      );
      state.tunes[index] = action.payload;
      let likes = state.tune.likeCount;
      if (state.tune.tuneId === action.payload.tuneId) {
        likes = action.payload.likeCount;
      }
      return {
        ...state,
        tune: {
          ...state.tune,
          likeCount: likes
        }
      };
    case DELETE_TUNE:
      let index1 = state.tunes.findIndex(
        tune => tune.tuneId === action.payload
      );
      state.tunes.splice(index1, 1);
      return {
        ...state
      };
    case POST_TUNE:
      return {
        ...state,
        tunes: [action.payload, ...state.tunes]
      };
    case SUBMIT_COMMENT:
      state.tune = {
        ...state.tune,
        comments: [action.payload, ...state.tune.comments]
      };
      return {
        ...state
      };
    default:
      return state;
  }
}
