import { todos as todosModel } from '../stores';
import classnames from 'classnames';
import { insertTodo, markAll, clearCompleted } from '../actions/todoActions';
import { Component } from 'react';
import TodoItem from './TodoItem';
import { Link } from 'react-router';
import { PropTypes } from 'react';

export default class MainComponent extends Component {
  static propTypes = {
    path: PropTypes.string
  }

  componentWillMount() {
    todosModel.subscribe(state => {
      this.setState({todos: state});
    });
  }

  _filterTodosGivenPath() {
    const { todos } = this.state;
    const { path } = this.props;

    switch (path) {
    case '/active': return todos.filter(todo => !todo.get('done'));
    case '/completed': return todos.filter(todo => todo.get('done'));
    default: return todos;
    }
  }

  render() {
    const { todos } = this.state;
    const filteredTodos = this._filterTodosGivenPath();
    const activeClassName = 'selected';

    return (
      <div>
        <section className='todoapp'>
          <header>
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done ?"
              onKeyDown={::this._onKeyDown}
              autofocus />
          </header>
          <section
            style={{display: filteredTodos.count() > 0 ? 'block' : 'none'}}
            className='main'>
            <input
              checked={filteredTodos.every(todo => todo.get('done'))}
              onChange={::this._onMarkAllChange}
              className='toggle-all'
              type='checkbox' />
            <label htmlFor='toggle-all'>
              Mark all as complete
            </label>
            <ul className={classnames('todo-list')}>
              {filteredTodos.map(todo =>
                <TodoItem key={todo.get('id')} todo={todo} />
              )}
            </ul>
          </section>
          <footer
            style={{display: todos.count() > 0 ? 'block' : 'none'}}
            className='footer'>
            <span className="todo-count"></span>
            <ul className='filters'>
              <li>
                <Link to='/' activeClassName={activeClassName}>
                  All
                </Link>
              </li>
              <li>
                <Link to='/active' activeClassName={activeClassName}>
                  Active
                </Link>
              </li>
              <li>
                <Link to='/completed' activeClassName={activeClassName}>
                  Completed
                </Link>
              </li>
            </ul>
            <button
              onClick={::this._onClearCompletedClick}
              className='clear-completed'>Clear Completed</button>
          </footer>
        </section>
        <footer className='info'>
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
      </div>
    );
  }

  _onKeyDown(event) {
    if (event.keyCode === 13) {
      insertTodo(event.target.value);
      event.target.value = '';
    }
  }

  _onMarkAllChange() {
    markAll();
  }

  _onClearCompletedClick() {
    clearCompleted();
  }
}
