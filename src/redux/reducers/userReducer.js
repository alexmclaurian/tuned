import {
  SET_USER,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LIKE_TUNE,
  UNLIKE_TUNE,
  MARK_NOTIFICATIONS_READ
} from "../types";

const initialState = {
  loading: false,
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  userName: ""
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        userName: action.payload.credentials.userName,
        midiFiles: action.payload.midifiles,
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_TUNE:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userName: state.credentials.userName,
            tuneId: action.payload.tuneId
          }
        ]
      };
    case UNLIKE_TUNE:
      return {
        ...state,
        likes: state.likes.filter(like => like.tuneId !== action.payload.tuneId)
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(not => (not.read = true));
      return {
        ...state
      };
    default:
      return state;
  }
}
