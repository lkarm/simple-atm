import ActionTypes from '../constants/ActionTypes';

// Redux actions for the ATM
export const setPin = pin => ({
  type: ActionTypes.SET_PIN,
  payload: {
    pin,
  },
});

export const setBalance = balance => ({
  type: ActionTypes.SET_BALANCE,
  payload: {
    balance,
  }
})