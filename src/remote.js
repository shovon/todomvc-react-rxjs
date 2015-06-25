// Try to pretend that a all of this code is running on a server.
//
// So, if you feel that there is code redundancy with `todoActions`, `todos`,
// and the code in this file, bear in mind the following code is just for data
// storage, where as `todoAction` is what notifies both the stores and the
// the remote that some event has occurred.

const localStorageKey = 'todomvc-react-rjxs';

function getFromStorage() {
  const fromStorage = localStorage.getItem(localStorageKey);
  return JSON.parse(fromStorage || '[]');
}

function toLocalStorage(data) {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
}

export function insertTodo(text) {
  if (text.trim().length <= 0) {
    return new Promise((resolve, reject) => {
      reject(new Error('Invalid text'));
    });
  }
  const data = getFromStorage();
  const latestId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
  const todo = {
    id: latestId,
    text: text,
    done: false
  };
  const newData = data.concat([todo]);
  toLocalStorage(newData);
  return Promise.resolve(todo);
}

export function markTodo(todoId, isCompleted) {
  const data = getFromStorage();
  const todoIndex = data.findIndex(t => t.id === todoId);
  if (todoIndex <= -1) {
    return new Promise((resolve, reject) => {
      reject(new Error(`Todo of ID ${todoId} doesn't exist`));
    });
  }
  const newData = data.map((todo, i) =>
    i !== todoIndex ?
      todo : { ...todo, done: !!isCompleted }
  );
  toLocalStorage(newData);
  return Promise.resolve(newData[todoIndex]);
}

export function removeTodo(todoId) {
  const data = getFromStorage();
  toLocalStorage(data.filter(todo => todo.id === todoId));
  return Promise.resolve(null);
}

export function markAll() {
  const data = getFromStorage();
  const isAllDone = data.every(todo => todo.done);
  const newData = data.map(todo => ({...todo, done: isAllDone}));
  toLocalStorage(newData);
  return Promise.resolve(data);
}

export function clearCompleted() {
  const data = getFromStorage().filter(({done}) => !done);
  toLocalStorage(data);
  return Promise.resolve(data);
}

export function editTodo(todoId, text) {
  const data = getFromStorage();
  const todoIndex = data.findIndex(t => t.id === todoId);
  if (todoIndex <= -1) {
    return new Promise((resolve, reject) => {
      reject(new Error(`Todo of ID ${todoId} doesn't exist`));
    });
  }
  const newData = data.map((todo, i) =>
    i !== todoIndex ?
      todo : { ...todo, text: text }
  );
  toLocalStorage(newData);
  return Promise.resolve(newData[todoIndex]);
}

export function loadTodos() {
  return Promise.resolve(getFromStorage());
}
