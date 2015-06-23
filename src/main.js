import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css';

import models from './models';
import { insertTodo } from './intents';
import React from 'react';

function onKeyDown(event) {
  if (event.keyCode === 13) {
    insertTodo(event.target.value);
    event.target.value = '';
  }
}

models.subscribe(state => {
  React.render(
    <div>
      <section className='todoapp'>
        <header>
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done ?"
            onKeyDown={onKeyDown}
            autofocus />
        </header>
        <section>
          <ul>
            {state.map(todo =>
              <li key={todo.get('id')} className={todo.get('done')}>
                <div className='view'>
                  <input className='toggle' type='checkbox' checked={todo.checked} />
                  <label>{todo.get('text')}</label>
                  <button className='destroy'></button>
                </div>
              </li>
            ).toJSON()}
          </ul>
        </section>
      </section>
      <footer>
        <span id="todo-count"></span>
        <ul>
          <li>
            <a href='#/' className='selected'>All</a>
          </li>
          <li>
            <a href='#/active'>Active</a>
          </li>
          <li>
            <a href='#/completed'>Completed</a>
          </li>
        </ul>
        <button>Clear Completed</button>
      </footer>
      <footer>
        <p>Double-click to edit a todo</p>
        <p>
          Created by {' '}
          <a href='http://twitter.com/oscargodson'>Oscar Godson</a>
        </p>
        <p>
          Refactored by {' '}
          <a href='https://github.com/cburgmer'>Christoph Burgmer</a>
        </p>
        <p>Part of <a href='http://todomvc.com'>TodoMVC</a></p>
      </footer>
    </div>,
    document.getElementById('somewhere')
  );
});
