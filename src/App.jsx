import React, { useReducer, useState } from 'react';
import './App.css'; 
import { DeleteOutlined, HeartOutlined, SisternodeOutlined } from '@ant-design/icons';
import { Badge, Space, Switch } from 'antd';

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'DELETE':
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case 'TOGGLE_LIKED':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, liked: !todo.liked } : todo
        ),
      };
    case 'TOGGLE_SAVED':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, saved: !todo.saved } : todo
        ),
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');

  const handleCreate = () => {
    if (inputValue) {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        liked: false,
        saved: false,
      };
      dispatch({ type: 'CREATE', payload: newTodo });
      setInputValue('');
    }
  };

  const handleDelete = id => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const handleToggleLiked = id => {
    dispatch({ type: 'TOGGLE_LIKED', payload: id });
  };

  const handleToggleSaved = id => {
    dispatch({ type: 'TOGGLE_SAVED', payload: id });
  };

  return (
    <div className="container">
      <div className="footer">
        <p>Created Todos: {state.todos.length}</p>
        <p>Liked Todos: {state.todos.filter(todo => todo.liked).length}</p>
        <p>Saved Todos: {state.todos.filter(todo => todo.saved).length}</p>
      </div>
      <h1 className="header">Todo List</h1>
      <div className='inputBtn-wrapper'>
        <input
          className="input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter todo"
        />
        <button className="create-button" onClick={handleCreate}>Create</button>
      </div>

      <ul className="todo-list">
        {state.todos.map(todo => (
          <li className="todo-item" key={todo.id}>
            <span>{todo.text}</span>
            <div>
              <button className={`button ${todo.liked ? 'liked' : ''}`} onClick={() => handleToggleLiked(todo.id)}>
              <HeartOutlined  style={{ fontSize: '20px' }}/>
              </button>
              <button className="button" onClick={() => handleToggleSaved(todo.id)}>
              <SisternodeOutlined  style={{ fontSize: '20px' }}/>
              </button>
              <button className="button delete-button" onClick={() => handleDelete(todo.id)}>
                <DeleteOutlined style={{ fontSize: '20px' }} />
              </button>
            </div>
          </li>
        ))}
      </ul>


    </div>
  );
};

export default App;
