import React, { useState } from 'react';
import { list as ListData } from '../src/data/list';
import { Form } from '../src/components/form';

function App() {
  const [tasks, setTasks] = useState(ListData);
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPriority, setEditedPriority] = useState('Hight');
  const [editedDate, setEditedDate] = useState('');

  const handleDeleteTask = index => {
    const newTask = [...tasks];
    newTask.splice(index, 1);
    setTasks(newTask);
    setEdit(false);
  };

  const handleFinishTask = index => {
    const newTask = [...tasks];
    newTask[index].finished = true;
    setTasks(newTask);
  };

  const checkPriority = data => {
    if (data.priority === 'Hight') {
      return { color: 'red' };
    } else if (data.priority === 'Medium') {
      return { color: 'orange' };
    } else {
      return { color: 'green' };
    }
  };

  const handleEditToggle = index => {
    setEditIndex(index);
    setEdit(!edit);

    if (edit && editIndex === index) {
      setEditedTitle('');
      setEditedDescription('');
      setEditedPriority('Hight');
      setEditedDate('');
    } else {
      setEditedTitle(tasks[index].title);
      setEditedDescription(tasks[index].description);
      setEditedPriority(tasks[index].priority);
      setEditedDate(tasks[index].date);
    }
  };

  const handleEditTask = index => {
    const newTask = [...tasks];
    newTask[index].title = editedTitle;
    newTask[index].description = editedDescription;
    newTask[index].priority = editedPriority;
    newTask[index].date = editedDate;

    setTasks(newTask);
    setEdit(false);
  };

  const [expandedDescriptions, setExpandedDescriptions] = useState([]);

  const handleToggleDescription = index => {
    const updatedExpanded = [...expandedDescriptions];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpandedDescriptions(updatedExpanded);
  };

  return (
    <div>
      <Form tasks={tasks} setTasks={setTasks}></Form>

      <ul>
        {tasks.map((task, index) => {
          const truncatedDescription = task.description.substring(0, 10);
          const isExpanded = expandedDescriptions[index];

          return (
            <li key={index} style={{ textDecoration: task.finished ? 'line-through' : '' }}>
              <span>
                <strong>Tytuł: </strong>
                {edit && editIndex === index ? (
                  <input type='text' value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
                ) : (
                  <span>{task.title}</span>
                )}
              </span>
              <br />
              <span>
                <strong>Opis: </strong>
                {edit && editIndex === index ? (
                  <input type='text' value={editedDescription} onChange={e => setEditedDescription(e.target.value)} />
                ) : (
                  <span>
                    {isExpanded ? task.description : truncatedDescription}
                    <br />
                    <button onClick={() => handleToggleDescription(index)}>{isExpanded ? 'Zwiń' : 'Rozwiń'}</button>
                  </span>
                )}
              </span>
              <br />
              <span>
                {edit && editIndex === index ? (
                  <select value={editedPriority} onChange={e => setEditedPriority(e.target.value)}>
                    <option value='Hight'>Hight</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                  </select>
                ) : (
                  <span style={checkPriority(task)}>
                    <strong>Priorytet:</strong> {task.priority}
                  </span>
                )}
              </span>
              <br />
              <strong>
                {edit && editIndex === index ? (
                  <input type='date' value={editedDate} onChange={e => setEditedDate(e.target.value)} />
                ) : (
                  task.date
                )}
              </strong>
              <br />
              <button onClick={() => handleDeleteTask(index)}>Usuń</button>
              <button onClick={() => handleFinishTask(index)}>Ukończ</button>
              <br />
              <span>Edytuj</span>
              <input type='checkbox' checked={edit && editIndex === index} onChange={() => handleEditToggle(index)} />
              <button
                style={{ visibility: edit && editIndex === index ? 'visible' : 'hidden' }}
                onClick={() => handleEditTask(index)}>
                Edytuj
              </button>
              <br />
              <br />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
