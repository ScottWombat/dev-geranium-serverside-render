import React from 'react';
import Root from './root';
import HomePage from './pages/home';
import NotFoundPage from './pages/notfound';


export default [
  {
    ...Root,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...NotFoundPage
      }
    ]
  }
];