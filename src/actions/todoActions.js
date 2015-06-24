import { ReplaySubject } from 'rx';
import {
  INSERT_TODO,
  MARK_TODO,
  MARK_ALL,
  REMOVE_TODO,
  CLEAR_COMPLETED
} from '../constants';

export const intent = new ReplaySubject(1);

export function insertTodo(text) {
  intent.onNext({
    type: INSERT_TODO,
    text: text
  });
}

export function markTodo(todoId, isCompleted) {
  intent.onNext({
    todoId,

    type: MARK_TODO,
    isCompleted: isCompleted
  });
}

export function removeTodo(todoId) {
  intent.onNext({
    todoId,
    type: REMOVE_TODO
  });
}

export function markAll() {
  intent.onNext({ type: MARK_ALL });
}

export function clearCompleted() {
  intent.onNext({ type: CLEAR_COMPLETED });
}
