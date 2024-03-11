import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Simulating data fetching
    const fetchData = async () => {
      // Assume fetching data from an API
      const data = await fetch('https://jsonplaceholder.typicode.com/todos');
      const json = await data.json();
      
      // Update tasks with fetched data
      setTasks(json.slice(0, 5)); // Limiting to 5 tasks for simplicity
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const addTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, title: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTaskStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            toggleTaskStatus={toggleTaskStatus}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
