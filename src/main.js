import 'babel/polyfill';

import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css';

import React from 'react';
import MainComponent from './components/MainComponent';
import Router, { Route } from 'react-router';
import { loadTodos } from './actions/todoActions';

// As evident by the name of this file (`main.js`), this is the entry point to
// the application. Below, two things are happening:
//
// 1. the renderer is being initialized
// 2. "store" attaching event listener to "action"
//
// In the first case, not only is the DOM structure being layed out, but the
// component are attaching listeners to the stores. The `Router.run` call
// triggers the DOM structuring logic (as well as other stuff).
//
// Underneath the `Router.run` call, there is a `loadTodos` call that bootstraps
// the UI with the data. That call triggers an action, which results in
// requesting data from the "remote" (which, is just localStorage for now), and
// the response is then propagated to the store.

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
