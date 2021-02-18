import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';
import { Loading } from '../../store';

function LoginPage() {
  const {register, errors, handleSubmit } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState('');

  const onSubmit = async (data) => {
    try {
      Loading.setIsLoading(true);
      await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    } catch (error) {
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
        Login
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name='email'
          type='email'
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This email field is required</p>}

        <label>Password</label>
        <input
          name='password'
          type='password'
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === 'required' && <p>This password field is required</p>}
        {errors.password && errors.password.type === 'maxLength' && <p>Password must have at least 6 characters</p>}
        {errorFromSubmit && <p> { errorFromSubmit } </p>}
        <input type='submit' />
        <Link
          style={{ color: 'gray', textDecoration: 'none'}}
          to='/register'
        >
          If you don't have ID...
        </Link>
      </form>
    </div>
  )
}

export default LoginPage;
