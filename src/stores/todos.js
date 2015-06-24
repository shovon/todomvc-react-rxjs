import { ReplaySubject } from 'rx';
import { todoActions as intent } from '../actions/todoActions';
import {
  INSERT_TODO,
  MARK_TODO,
  MARK_ALL,
  REMOVE_TODO,
  CLEAR_COMPLETED
} from './constants';
import { List, Map as ImmutableMap } from 'immutable';

const model = new ReplaySubject(1);

let state = new List();

const callbacks = {
  [INSERT_TODO]: payload => {
    const latest = state.get(state.count() - 1);
    const todo = new ImmutableMap({
      id: typeof latest === 'undefined' ? 0 : latest.get('id') + 1,
      text: payload.text,
      done: false
    });
    state = state.push(todo);
    model.onNext(state);
  },

  [MARK_TODO]: payload => {
    const todoIndex = state
      .findIndex(todo => todo.get('id') === payload.todoId);
    const todo = state.get(todoIndex);
    state = state.set(todoIndex, todo.set('done', payload.isCompleted));
    model.onNext(state);
  },

  [REMOVE_TODO]: payload => {
    state = state.filter(todo => todo.get('id') !== payload.todoId);
    model.onNext(state);
  },

  [MARK_ALL]: () => {
    if (state.every(todo => todo.get('done'))) {
      state = state.map(todo => todo.set('done', false));
    } else {
      state = state.map(todo => todo.set('done', true));
    }
    model.onNext(state);
  },

  [CLEAR_COMPLETED]: () => {
    state = state.filter(todo => !todo.get('done'));
    model.onNext(state);
  }
};

intent.subscribe(payload => {
  callbacks[payload.type](payload);
});

model.onNext(state);

export default model;
