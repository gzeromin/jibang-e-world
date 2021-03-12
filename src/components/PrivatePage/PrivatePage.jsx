import React, { useMemo, useReducer } from 'react';
import PrivateBody from './sections/PrivateBody/PrivateBody';
import PrivateComment from './sections/PrivateComment/PrivateComment';
import PrivateForm from './sections/PrivateForm/PrivateForm';
import PrivateHeader from './sections/PrivateHeader';
import { PrivateContext, reducer, privateInitialState } from './private_context';

function PrivatePage() {
  const [state, dispatch] = useReducer(reducer, privateInitialState);
  const {
    selectedYear,
    selectedMonth,
    firstDate,
    lastDate
  } = state;
  
  const value = useMemo(() => ({
    selectedYear, 
    selectedMonth,
    firstDate,
    lastDate,
    dispatch
  }),[]);

  return (
    <div className='private'>
      <PrivateContext.Provider
        value={value}
      >
        <PrivateHeader/>
        <PrivateBody />
        <PrivateForm/>
        <PrivateComment/>
      </PrivateContext.Provider>
    </div>
  )
}

export default PrivatePage;
