import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './combinedReducers'

import {appMiddleware} from './appMiddleware';


export default function configureStore(initial_state,serverSide) {
  let store;
  if(serverSide ){
      console.log("server side id"+ serverSide)
    const middleware = [thunk,]
    store = createStore(
        rootReducer,initial_state,
        compose(
            applyMiddleware(...middleware)
        )
    
    )
  }else{
      console.log("cleint side id"+ serverSide)
    const middleware = [appMiddleware,thunk,]
    store = createStore(
        rootReducer,initial_state,
        compose(
            applyMiddleware(...middleware)
        )
    
    )  
  }
  return store;
}
