import { list as ListData } from '../data/list';
import { useState } from 'react';

export const Form = ({ tasks, setTasks }) => {
  const handleAddTask = () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;

    const newTask = {
      title,
      description,
      date,
      priority,
    };

    setTasks([...tasks, newTask]);

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    document.getElementById('priority').value = 'High';
  };

  return (
    <div>
      <h1>Dodaj zadanie</h1>

      <strong>Title </strong>
      <input type='text' id='title' />
      <br></br>
      <strong>Description </strong>
      <input type='text' id='description' />
      <br></br>
      <strong>Date </strong>
      <input type='date' id='date' />
      <br></br>
      <strong>Priority </strong>
      <select id='priority'>
        <option value='High'>High</option>
        <option value='Medium'>Medium</option>
        <option value='Low'>Low</option>
      </select>
      <br></br>
      <button onClick={handleAddTask}>Dodaj</button>
    </div>
  );
};
