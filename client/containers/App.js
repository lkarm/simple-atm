import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ATM from './ATM';
import createReducer from '../reducers/atm';

// create initial redux store for the app
const store = createStore(createReducer);

const App = () => (
  <Provider store={store}>
    <ATM />
  </Provider>
)

export default App;