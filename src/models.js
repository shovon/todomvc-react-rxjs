import { ReplaySubject } from 'rx';
import { intent } from './intents';
import { INSERT_TODO } from './constants';
import { List, Map as ImmutableMap } from 'immutable';

const model = new ReplaySubject(1);

let state = new List();

intent.subscribe(payload => {
  switch (payload.type) {
  case INSERT_TODO:
    const latest = state.get(state.count() - 1);
    const todo = new ImmutableMap({
      id: typeof latest === 'undefined' ? 0 : latest.get('id') + 1,
      text: payload.text,
      done: false
    });
    state = state.push(todo);
    model.onNext(state);
    break;
  }
});

model.onNext(state);

export default model;
