import React, { useRef, useState, memo } from 'react';
import {Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';
import md5 from 'md5';
import { Loading } from '../../store';

function RegisterPage() {
  const {register, watch, errors, handleSubmit } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState('');
  const password = useRef();
  password.current = watch('password');

  console.log('register');
  const onSubmit = async (data) => {
    try {
      Loading.setIsLoading(true);
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
        console.log('createdUser', createdUser);

      await createdUser.user.updateProfile({
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
      });

      // save in firebase database
      await firebase.database().ref('users').child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL
      });
    } catch (error) {
      console.log(error);
      setErrorFromSubmit(error.message);
      setTimeout(() => {
        setErrorFromSubmit('');
      }, 5000);
    } finally {
      Loading.setIsLoading(false);
    }
  }

  return (
    <div
      className='auth-wrapper'
    >
      <div className='title'>
        Register
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name='email'
          type='email'
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This email field is required</p>}

        <label>Name</label>
        <input
          name='name'
          ref={register({ required: true, maxLength: 10 })}
        />
        {errors.name && errors.name.type === 'required' && <p>This name field is required</p>}
        {errors.name && errors.name.type === 'maxLength' && <p>Your input exceed maximum length</p>}
        <label>Password</label>
        <input
          name='password'
          type='password'
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === 'required' && <p>This password field is required</p>}
        {errors.password && errors.password.type === 'maxLength' && <p>Password must have at least 6 characters</p>}
        <label>Password Confirm</label>
        <input
          name='password_confirm'
          type='password'
          ref={register({ 
            required: true, 
            validate: (value) =>
              value === password.current
          })}
        />
        {errors.password_confirm && errors.password_confirm.type === 'required' && <p>This password confirm field is required</p>}
        {errors.password_confirm && errors.password_confirm.type === 'maxLength' && <p>The passwords do not match</p>}

        {errorFromSubmit && <p> { errorFromSubmit } </p>}
        <input type='submit' />
        <Link
          style={{ color: 'gray', textDecoration: 'none'}}
          to='/login'
        >
          If you have already ID...
        </Link>
      </form>
    </div>
  )
}

export default memo(RegisterPage);
