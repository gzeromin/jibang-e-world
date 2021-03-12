import { createContext } from 'react';

const getFirstDate = (year, month) => {
  return new Date(year, month, 1);
}

const getLastDate = (year, month) => {
  return new Date(year, month + 1, 0);
}

export const PrivateContext = createContext({
  selectedYear: 0,
  selectedMonth: 0,
  firstDate: getFirstDate(2021, 2),
  lastDate: getLastDate(2021, 2),
  dispatch: () => {}
});

//types
export const SET_YEAR = 'set_year';
export const SET_MONTH = 'set_month';

let date = new Date();
const thisYear = date.getFullYear();
const thisMonth = date.getMonth();

export const privateInitialState = {
  selectedYear: thisYear,
  selectedMonth: thisMonth,
  firstDate: getFirstDate(thisYear, thisMonth),
  lastDate: getLastDate(thisYear, thisMonth)
}

export const reducer = (state = privateInitialState, action) => {
  switch (action.type) {
    case SET_YEAR:
      return {
        ...state,
        selectedYear: action.payload,
        firstDate: getFirstDate(action.payload, state.selectedMonth),
        lastDate: getLastDate(action.payload, state.selectedMonth)
      }
    case SET_MONTH:
      return {
        ...state,
        selectedMonth: action.payload,
        firstDate: getFirstDate(state.selectedYear, action.payload),
        lastDate: getLastDate(state.selectedYear, action.payload)
      }
    default:
      return state;
  }
}
