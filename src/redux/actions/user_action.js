import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER
} from "./types";
import firebase from '../../firebase';

export function loginUser(dataToSubmit) {
  const request = firebase.auth().signInWithEmailAndPassword(
    dataToSubmit.email,
    dataToSubmit.password
  );
  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function registerUser(dataToSubmit) {
}

export function auth(dataToSubmit) {
  
}
