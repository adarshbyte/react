import React from 'react';
import { Action, ActionTypes, Task } from '../../types/todos.types';

type Props = {
  setAppState: React.Dispatch<Action>;
};

const Form = ({ setAppState }: Props) => {
  const initialState: Task = {
    id: '',
    title: '',
    notes: '',
    createdAt: '',
    updatedAt: '',
    completed: false,
    priority: 'low',
  };

  const [error, setError] = React.useState('');
  const [formState, setFormState] = React.useState<Task>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!formState.title) {
      setError('Please fill in the required fields');
      return;
    }
    setError('');
    setAppState({ type: ActionTypes.ADD_TASK, payload: formState });
    setFormState(initialState); // reset form after submission
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h3 style={{ marginBottom: '16px', color: '#333' }}>Create New Task</h3>

      {error && (
        <div
          style={{
            color: 'red',
            marginBottom: '12px',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
      )}

      <label style={labelStyle}>Title</label>
      <input
        type='text'
        id='title'
        value={formState.title}
        onChange={handleChange}
        style={inputStyle}
        placeholder="Enter task title"
      />

      <label style={labelStyle}>Notes</label>
      <input
        type='text'
        id='notes'
        value={formState.notes}
        onChange={handleChange}
        style={inputStyle}
        placeholder="Optional notes"
      />

      <label htmlFor='priority' style={labelStyle}>Priority</label>
      <select
        id='priority'
        value={formState.priority}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value='low'>Low</option>
        <option value='med'>Medium</option>
        <option value='high'>High</option>
      </select>

      <button
        onClick={handleSubmit}
        type='button'
        style={{
          marginTop: '16px',
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Create Task
      </button>
    </div>
  );
};

// ✅ Shared Styles
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  marginBottom: '12px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '14px',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '4px',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#444',
};

export default Form;
