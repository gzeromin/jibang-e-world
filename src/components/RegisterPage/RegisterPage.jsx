import React, { useRef, memo } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions/user_action';

function RegisterPage() {
  const dispatch = useDispatch();
  let history = useHistory();

  const {register, watch, errors, handleSubmit } = useForm();
  const password = useRef();
  password.current = watch('password');

  const onSubmit = async (data) => {
    dispatch(registerUser(data)).then(res => {
      if (res.type.indexOf('failure') === -1) {
        history.push('/');
      }
    })
  }

  return (
    <div
      className='auth-wrapper'
    >
      <div style={{ textAlign: 'center' }}>
        <h3>
          Happy Stamp
        </h3>
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
        {errors.password && errors.password.type === 'minLength' && <p>Password must have at least 6 characters</p>}
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

        <input type='submit' value='Register' />
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
