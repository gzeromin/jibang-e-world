import React, { useEffect } from 'react';
import firebase from '../firebase';
import {
  useHistory
} from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {

  /**
   * option:
   *  null => anyone
   *  true => login user
   *  false => not login user
   * 
   * adminRoute:
   *  true => admin user
   */

  function AuthenticationCheck(props) {
  let history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if(!user) {
        // not login
        if(option) {
          history.push("/login");
        }
      } else {
        // login
        if(adminRoute) {
          props.history.push("/");
        } else {
          if(!option) {
            //props.history.push("/");
          }
        }
      }
    })
  }, []);

    return (
      <SpecificComponent {...props}/>
    )
  }


  return AuthenticationCheck;
}