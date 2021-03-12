import React, { memo } from 'react';
import Month from './Month';

function Calendar() {
  return (
    <table id='calendar'>
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <Month />
    </table>
  )
}

export default memo(Calendar);
