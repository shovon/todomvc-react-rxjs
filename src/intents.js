import { ReplaySubject } from 'rx';
import { INSERT_TODO } from './constants';

export const intent = new ReplaySubject(1);

export function insertTodo(text) {
  intent.onNext({
    type: INSERT_TODO,
    text: text
  });
}
