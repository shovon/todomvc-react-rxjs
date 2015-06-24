export default class MainComponent {
  render() {
    const { todos: state } = this.state;

    return (
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
          <section
            style={{display: state.count() > 0 ? 'block' : 'none'}}
            className='main'>
            <input
              checked={state.every(todo => todo.get('done'))}
              onChange={onMarkAllChange}
              className='toggle-all'
              type='checkbox' />
            <label htmlFor='toggle-all'>
              Mark all as complete
            </label>
            <ul className={classnames('todo-list')}>
              {state.map(todo =>
                <TodoItem key={todo.get('id')} todo={todo} />
              )}
            </ul>
          </section>
          <footer
            style={{display: state.count() > 0 ? 'block' : 'none'}}
            className='footer'>
            <span className="todo-count"></span>
            <ul className='filters'>
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
            <button
              onClick={onClearCompletedClick}
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

  onKeyDown(event) {
    if (event.keyCode === 13) {
      insertTodo(event.target.value);
      event.target.value = '';
    }
  }

  onMarkAllChange() {
    markAll();
  }

  onClearCompletedClick() {
    clearCompleted();
  }
}
