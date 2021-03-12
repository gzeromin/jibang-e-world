import React, { memo, useContext } from 'react';
import { PrivateContext } from '../../../private_context';
import { GiClover } from 'react-icons/gi';
function Day({day}) {

  const { firstDate, lastDate } = useContext(PrivateContext);
  const date = 
    firstDate.getDate() <= day &&
    day <= lastDate.getDate() &&
    day;
  return (
    <td style={{ position: 'relative' }}>
      { date } 
      <GiClover
        style={{ position: 'absolute', top: '50px', left: '100px'}}
        size='30px'
        color='green'
      />
    </td>
  )
}

export default memo(Day);
