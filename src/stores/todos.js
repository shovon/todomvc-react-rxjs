import { ReplaySubject } from 'rx';
import { intent as todoActions } from '../actions/todoActions';
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

const model = new ReplaySubject(1);

const callbacks = {
  [INSERT_TODO]: (state, { todo }) => state.push(new ImmutableMap(todo)),

  [MARK_TODO]: (state, { todo }) => {
    const todoIndex = state.findIndex(t => t.get('id') === todo.id);
    return state.set(todoIndex, new ImmutableMap(todo));
  },

  [REMOVE_TODO]: (state, { todoId }) =>
    state.filter(todo => todo.get('id') !== todoId),

  [MARK_ALL]: (state, { todos }) => fromJS(todos),

  [CLEAR_COMPLETED]: (state, { todos }) => fromJS(todos),

  [EDIT_TODO]: (state, { todo }) => {
    const todoIndex = state.findIndex(t => t.get('id') === todo.id);
    return state.set(todoIndex, new ImmutableMap(todo));
  },

  [LOAD_TODOS]: (state, { todos }) => {
    return fromJS(todos);
  }
};

todoActions
  .scan(
    new List(),
    (state, payload) =>
      callbacks[payload.type](state, payload)
        .filter(todo => todo.get('text'))
  )
  .subscribe(state => {
    model.onNext(state);
  });

export default model;
