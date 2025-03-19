import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskItem = {
        id: tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
        text: newTask,
        completed: false
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="container">
      <div className="todo-card">
        <div className="input-group">
          <input
            type="text"
            className="task-input"
            placeholder="Enter"
            value={newTask}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="add-button"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        
        <h2 className="title">TODAY'S TASKS</h2>
        
        <div className="task-list">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className="task-item"
            >
              <label className="task-label">
                <div 
                  className={`checkbox ${task.completed ? 'checkbox-completed' : ''}`}
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  {task.completed && (
                    <svg className="checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                <span className={task.completed ? 'task-text completed' : 'task-text'}>
                  {task.text}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;