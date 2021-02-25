import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  SET_USER,
  CLEAR_USER,
  UPLOAD_PHOTO
} from "./types";
import firebase from '../../firebase';
import { Loading, Dialog } from '../../store';
import md5 from 'md5';

export async function loginUser(dataToSubmit) {
  try {
    Loading.setIsLoading(true);
    const request = await firebase.auth().signInWithEmailAndPassword(
      dataToSubmit.email,
      dataToSubmit.password
    )
    return {
      type: LOGIN_USER,
      payload: request ? request.user : null
    }
  } catch (error) {
    Dialog.openDialog(Dialog.DANGER, error.message);
    return {
      type: 'login_failure',
      paylod: dataToSubmit
    }
  } finally {
    Loading.setIsLoading(false);
  }
}

export async function registerUser(dataToSubmit) {
  try {
    Loading.setIsLoading(true);
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password);
      console.log('createdUser', createdUser);

    await createdUser.user.updateProfile({
      displayName: dataToSubmit.name,
      photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
    });

    // save in firebase database
    await firebase.database().ref('users').child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      image: createdUser.user.photoURL
    });
    return {
      type: REGISTER_USER,
      payload: createdUser.user
    }
  } catch (error) {
    Dialog.openDialog(Dialog.DANGER, error.message);
    return {
      type: 'regist_failure',
      paylod: dataToSubmit
    }
  } finally {
    Loading.setIsLoading(false);
  }
}

export function logoutUser() {
  firebase.auth().signOut();
  return {
    type: LOGOUT_USER,
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  }
}

export function clearUser() {
  return {
    type: CLEAR_USER
  }
}

export function uploadPhoto(file, metadata) {
  return async (dispatch, getState) => {
    const { user } = getState();
    const { userData } = user;
    try {
      Loading.setIsLoading(true);
      // save file in storage
      let uploadTaskSnapshot = await firebase.storage().ref()
        .child(`user_image/${userData.uid}`)
        .put(file, metadata);
      
      let downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

      // modify profile image
      await firebase.auth().currentUser.updateProfile({
        photoURL: downloadURL
      });
      dispatch({
        type: UPLOAD_PHOTO,
        payload: downloadURL
      });
      await firebase.database().ref('users')
        .child(userData.uid)
        .update({ image: downloadURL });
    } catch (error) {
      Dialog.openDialog(Dialog.DANGER, null, error.message);
    } finally {
      Loading.setIsLoading(false);
    }
  }
}