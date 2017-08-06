import ActionTypes from '../constants/ActionTypes';

// Initial store state for ATM
const initialState = {
  pin: null,
  balance: null,
}

// Redux reducers
export const handlers = {
  [ActionTypes.SET_PIN](state, action) {
    return Object.assign({}, state, {
      pin: action.payload.pin
    })
  },

  [ActionTypes.SET_BALANCE](state, action) {
    return Object.assign({}, state, {
      balance: action.payload.balance
    })
  }
}

const createReducer = (initState, reduceHandlers) => function reducer(state = initState, action) {
    if (action && Object.prototype.hasOwnProperty.call(reduceHandlers, action.type)) {
      return reduceHandlers[action.type](state, action);
    }
    return state;
  }

export default createReducer(initialState, handlers)