import React from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router-dom'
import Root from './root'

export function render(req, store, context){
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Root/>
      </StaticRouter>
    </Provider>
  )
}

