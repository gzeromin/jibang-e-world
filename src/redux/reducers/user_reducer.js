import {
  SET_USER,
  CLEAR_USER,
  UPLOAD_PHOTO
} from '../actions/types';

const initialUserState = {
  userData: null,
}

export default function (state = initialUserState, action) {
  
  switch(action.type) {
    case SET_USER:
      return { ...state, userData: action.payload };
    case CLEAR_USER:
      return { ...state, userData: null };
    case UPLOAD_PHOTO:
      return { ...state, userData: {
        ...state.userData, 
        photoURL: action.payload
      }};
    default:
      return state;
  }
}