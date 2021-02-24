import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Loading } from '../../../store';
import { observer } from "mobx-react";

function ActionLoading() {
  return (
    <div className={ Loading.isLoading ? 'isLoading' : 'isNotLoading'}>
      <div className='overlay'></div>
      <Spinner 
        className='spinner'
        variant='primary'
        animation="border"
      />
    </div>
  )
}

export default observer(ActionLoading);
