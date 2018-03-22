import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import configureStore from '../shared/store/configureStore';
import Routes from '../shared/routesConfig';
import ConnectedIntlProvider from '../shared/common/intlProvider';

//console.log(window.__REDUX_STATE__);

const store = configureStore(window.__REDUX_STATE__,true);
store.subscribe(() =>{
    const state = store.getState();
    //console.log("DDD")
    //console.log(state)
   
});


/*

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app')
);
*/


ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedIntlProvider>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
    </ConnectedIntlProvider>
  </Provider>,
  document.querySelector('#app')
);