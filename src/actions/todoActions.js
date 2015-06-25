import { ReplaySubject } from 'rx';
import {
  INSERT_TODO,
  MARK_TODO,
  MARK_ALL,
  REMOVE_TODO,
  CLEAR_COMPLETED,
  EDIT_TODO,
  LOAD_TODOS
} from '../constants';
import {
  insertTodo as remoteInsertTodo,
  markTodo as remoteMarkTodo,
  removeTodo as remoteRemoveTodo,
  markAll as remoteMarkAll,
  clearCompleted as remoteClearCompleted,
  editTodo as remoteEditTodo,
  loadTodos as remoteLoadTodos
} from '../remote';

const actions = new ReplaySubject(1);
export default actions;

export function insertTodo(text) {
  remoteInsertTodo(text).then(todo => {
    actions.onNext({
      todo,
      type: INSERT_TODO,
    });
  });
}

export function markTodo(todoId, isCompleted) {
  remoteMarkTodo(todoId, isCompleted).then(todo => {
    actions.onNext({
      todo,
      type: MARK_TODO
    });
  });
}

export function removeTodo(todoId) {
  remoteRemoveTodo(todoId).then(() => {
    actions.onNext({
      todoId,
      type: REMOVE_TODO
    });
  });
}

export function markAll() {
  remoteMarkAll().then(todos => {
    actions.onNext({
      todos,
      type: MARK_ALL,
    });
  });
}

export function clearCompleted() {
  remoteClearCompleted().then(todos => {
    actions.onNext({ todos, type: CLEAR_COMPLETED });
  });
}

export function editTodo(todoId, text) {
  remoteEditTodo(todoId, text).then(todo => {
    actions.onNext({
      todo,
      type: EDIT_TODO
    });
  });
}

export function loadTodos() {
  remoteLoadTodos().then(todos => {
    actions.onNext({
      todos,
      type: LOAD_TODOS
    });
  });
}
