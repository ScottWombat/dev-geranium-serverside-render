import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './combinedReducers'

import {appMiddleware} from './appMiddleware';


const middleware = [appMiddleware,thunk,]

var configureStore = function(initial_state) {

  const store = createStore(
    rootReducer,initial_state,
    compose(
        applyMiddleware(...middleware)
    )
    
  )
  return store;
}
module.exports = configureStore;