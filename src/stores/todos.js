import { ReplaySubject } from 'rx';
import { intent } from '../actions/todoActions';
import {
  INSERT_TODO,
  MARK_TODO,
  MARK_ALL,
  REMOVE_TODO,
  CLEAR_COMPLETED,
  EDIT_TODO,
  LOAD_TODOS
} from '../constants';
import { fromJS, List, Map as ImmutableMap } from 'immutable';

const localStorageKey = 'todomvc-react-rjxs';

const model = new ReplaySubject(1);

const callbacks = {
  [INSERT_TODO]: (state, payload) => {
    const latest = state.get(state.count() - 1);
    const todo = new ImmutableMap({
      id: typeof latest === 'undefined' ? 0 : latest.get('id') + 1,
      text: payload.text.trim(),
      done: false
    });
    return state.push(todo);
  },

  [MARK_TODO]: (state, payload) => {
    const todoIndex = state
      .findIndex(todo => todo.get('id') === payload.todoId);
    const todo = state.get(todoIndex);
    return state.set(todoIndex, todo.set('done', payload.isCompleted));
  },

  [REMOVE_TODO]: (state, payload) => {
    return state.filter(todo => todo.get('id') !== payload.todoId);
  },

  [MARK_ALL]: state => {
    if (state.every(todo => todo.get('done'))) {
      return state.map(todo => todo.set('done', false));
    }
    return state.map(todo => todo.set('done', true));
  },

  [CLEAR_COMPLETED]: state => {
    return state.filter(todo => !todo.get('done'));
  },

  [EDIT_TODO]: (state, payload) => {
    const todoIndex = state
      .findIndex(todo => todo.get('id') === payload.todoId);
    const todo = state.get(todoIndex);
    return state.set(todoIndex, todo.set('text', payload.text.trim()));
  },

  [LOAD_TODOS]: () => {
    return fromJS(JSON.parse(localStorage.getItem(localStorageKey)) || []);
  }
};

// `reduce` used as a hack for maintaining state. Will do for now.
intent.reduce((state, payload) => {
  const result = callbacks[payload.type](state, payload)
    .filter(todo => !!todo.get('text'));
  if (payload.type !== LOAD_TODOS) {
    localStorage.setItem(localStorageKey, JSON.stringify(result.toJSON()));
  }
  model.onNext(result);
  return result;
}, new List()).subscribe();

export default model;
