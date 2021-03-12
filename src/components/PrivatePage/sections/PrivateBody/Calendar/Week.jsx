import React, { memo, useContext } from 'react';
import { PrivateContext } from '../../../private_context';
import Day from './Day';

function Week({week}) {
  
  const { firstDate, lastDate } = useContext(PrivateContext);

  const renderDays = () => {
    return [...Array(7)].map((v,i) => {
      const day = 7 * week + (i + 1) - firstDate.getDay();
      return <Day key={`day-${day}`} day={day} />
    });
  }

  return (
    <tr>
      { firstDate && lastDate &&
        renderDays()
      }
    </tr>
  )
}

export default memo(Week);
