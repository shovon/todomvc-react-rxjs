import classnames from 'classnames';
import { PropTypes } from 'react';
import { markTodo, removeTodo } from '../intents';

export default class TodoItem {
  static propTypes = {
    todo: PropTypes.object.isRequired
  }

  render() {
    const { todo } = this.props;
    return (
      <li
        key={todo.get('id')}
        className={classnames({
          completed: todo.get('done')
        })}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={todo.get('done')}
            onChange={::this._onChange} />
          <label>{todo.get('text')}</label>
          <button onClick={::this._onRemove} className='destroy'></button>
        </div>
      </li>
    );
  }

  _onChange(event) {
    markTodo(this.props.todo.get('id'), event.target.checked);
  }

  _onRemove() {
    removeTodo(this.props.todo.get('id'));
  }
}
