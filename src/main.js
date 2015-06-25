import 'babel/polyfill';

import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css';

import React from 'react';
import MainComponent from './components/MainComponent';
import Router, { Route } from 'react-router';
import { loadTodos } from './actions/todoActions';

Router.run(
  <Route path='*' handler={MainComponent} ignoreScrollBehavior></Route>,
  Route.HashLocation,
  (Root, state) => {
    React.render(
      <Root path={state.path} />,
      document.getElementById('somewhere')
    );
  }
);

loadTodos();
