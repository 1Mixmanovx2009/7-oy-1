import React, { useReducer, useState } from 'react';
import './App.css'; 
import { DeleteOutlined, HeartOutlined, SisternodeOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Input, Button } from 'antd';

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
    case 'UPDATE':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        ),
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // Modalni ko‘rsatish holati
  const [editTodo, setEditTodo] = useState(null); // Tahrirlanayotgan todo holati
  const [editedText, setEditedText] = useState(''); // Modalda tahrirlanayotgan matn

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

  const showEditModal = (todo) => {
    setEditTodo(todo);
    setEditedText(todo.text);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (editTodo) {
      dispatch({ type: 'UPDATE', payload: { id: editTodo.id, text: editedText } });
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
                <HeartOutlined style={{ fontSize: '20px' }}/>
              </button>
              <button className="button" onClick={() => handleToggleSaved(todo.id)}>
                <SisternodeOutlined style={{ fontSize: '20px' }}/>
              </button>
              <button className="button" onClick={() => showEditModal(todo)}>
                <EditOutlined style={{ fontSize: '20px' }} />
              </button>
              <button className="button delete-button" onClick={() => handleDelete(todo.id)}>
                <DeleteOutlined style={{ fontSize: '20px' }} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for editing */}
      <Modal
        title="Edit Todo"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
      >
        <Input value={editedText} onChange={(e) => setEditedText(e.target.value)} />
      </Modal>
    </div>
  );
};

export default App;
