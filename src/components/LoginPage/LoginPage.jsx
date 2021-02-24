import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/user_action';
import { GiClover } from 'react-icons/gi';

function LoginPage() {
  const dispatch = useDispatch();
  let history = useHistory();
  const {register, errors, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    dispatch(loginUser(data)).then(res => {
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
        <h3><GiClover style={{ color: 'green' }}/></h3>
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
        {errors.password && errors.password.type === 'minLength' && <p>Password must have at least 6 characters</p>}
        <input type='submit' value='Login'/>
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
