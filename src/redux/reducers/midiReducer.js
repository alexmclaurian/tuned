import { SET_MIDI } from "../types";

const initialState = {
  tunes: [],
  tune: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MIDI:
      return {
        ...state,
        midi: action.payload
      };
    default:
      return state;
  }
}
