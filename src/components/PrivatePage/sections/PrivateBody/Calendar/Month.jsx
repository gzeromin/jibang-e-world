import React, { memo, useContext } from 'react';
import { PrivateContext } from '../../../private_context';
import Week from './Week';

function Month() {

  const { firstDate, lastDate } = useContext(PrivateContext);

  const renderWeeks = () => {
    const weeksCount = Math.ceil((firstDate.getDay() + lastDate.getDate()) / 7);
    return [...Array(weeksCount)].map((v,i) => {
      const week = i;
      return <Week key={`week-${week}`} week={week} />
    });
  }

  return (
    <tbody>
      {firstDate && lastDate &&
        renderWeeks()
      }
    </tbody>
  )
}

export default memo(Month);
