import React from 'react';
import App from '../client/containers/app';
import HomePage from '../client/containers/home';
import NotFoundPage from '../client/containers/notfound';
import Products from '../client/containers/products';
import Steps from '../client/containers/steps';
import PageNotFound from '../client/containers/pageNotFound';
import Summary from '../client/containers/summary';
import ComingSoon from '../client/containers/coming_soon'
export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...Products,
        path: '/products/:productType'
      },
      {
        ...Steps,
        path: '/steps'
      },
      {
        ...NotFoundPage
      }
    ]
  }
];