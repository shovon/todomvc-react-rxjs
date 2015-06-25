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

export const intent = new ReplaySubject(1);

export function insertTodo(text) {
  remoteInsertTodo(text).then(todo => {
    intent.onNext({
      todo,
      type: INSERT_TODO,
    });
  });
}

export function markTodo(todoId, isCompleted) {
  remoteMarkTodo(todoId, isCompleted).then(todo => {
    intent.onNext({
      todo,
      type: MARK_TODO
    });
  });
}

export function removeTodo(todoId) {
  remoteRemoveTodo(todoId).then(() => {
    intent.onNext({
      todoId,
      type: REMOVE_TODO
    });
  });
}

export function markAll() {
  remoteMarkAll().then(todos => {
    intent.onNext({
      todos,
      type: MARK_ALL,
    });
  });
}

export function clearCompleted() {
  remoteClearCompleted().then(todos => {
    intent.onNext({ todos, type: CLEAR_COMPLETED });
  });
}

export function editTodo(todoId, text) {
  remoteEditTodo(todoId, text).then(todo => {
    intent.onNext({
      todo,
      type: EDIT_TODO
    });
  });
}

export function loadTodos() {
  remoteLoadTodos().then(todos => {
    intent.onNext({
      todos,
      type: LOAD_TODOS
    });
  });
}
