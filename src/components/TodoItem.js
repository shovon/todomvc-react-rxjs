import React, { Component } from 'react';
import classnames from 'classnames';
import { PropTypes } from 'react';
import { editTodo, markTodo, removeTodo } from '../actions/todoActions';

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired
  }

  constructor() {
    super();

    this.state = {
      editMode: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.todo.get('text') !== nextProps.todo.get('text')) {
      this.setState({
        editMode: false
      });
    }
  }

  componentDidUpdate() {
    if (this.state.editMode) {
      React.findDOMNode(this.refs.editor).focus();
    }
  }

  render() {
    const { todo } = this.props;
    return (
      <li
        onDoubleClick={::this._onDoubleClick}
        key={todo.get('id')}
        className={classnames({
          completed: todo.get('done'),
          editing: this.state.editMode
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
        <input
          ref='editor'
          onKeyDown={::this._onEditKeyDown}
          onBlur={::this._onEditLeft}
          className='edit'
          defaultValue={todo.get('text')} />
      </li>
    );
  }

  _onDoubleClick() {
    this.setState({
      editMode: true
    });
  }

  _editValue(value) {
    editTodo(this.props.todo.get('id'), value);
  }

  _onEditKeyDown({ keyCode, target }) {
    if (keyCode === 13) {
      this._editValue(target.value);
    }
  }

  _onEditLeft({ target }) {
    if (target.value !== this.props.todo.get('text')) {
      this._editValue(target.value);
    } else {
      this.setState({
        editMode: false
      });
    }
  }

  _onChange(event) {
    markTodo(this.props.todo.get('id'), event.target.checked);
  }

  _onRemove() {
    removeTodo(this.props.todo.get('id'));
  }
}
