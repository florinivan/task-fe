import React, { useState, useEffect }  from 'react';
import styles from './styles.module.css';
import {header} from './constants';
import moment from 'moment';


const TaskDetail = ({tasks, employees, fetchTasks, fetchEmployees}) => {
  const [selectedEmployee, setSelectedEmployee] = useState(0);

  const handleAssignTask = async (taskId) => {
    if (taskId && selectedEmployee) {
      /* await axiosInstance.post(`tasks/update/${selectedTask.id}`, {
         assignee: selectedEmployee
       });*/

      const requestOptions = {
        method: 'PATCH',
        headers: header,
        body: JSON.stringify({ assignee: selectedEmployee })
      };
      const response = await fetch(`http://localhost:8080/api/tasks/update/${taskId}`, requestOptions)
        .then(response => response.json())
        .then(data => fetchTasks())
        .catch(error => console.error(error));
    }
  };

  const handleUnassignTask = async (taskId) => {
    const requestOptions = {
      method: 'PATCH',
      headers: header,
      body: JSON.stringify({ assignee: null })
    };
    const response = await fetch(`http://localhost:8080/api/tasks/update/${taskId}`, requestOptions)
      .then(response => response.json())
      .then(data => fetchTasks())
      .catch(error => console.error(error));
      fetchEmployees();
  };

  const handleDueDate = async (e, taskId) => {
    const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
    const requestOptions = {
      method: 'PATCH',
      headers: header,
      body: JSON.stringify({ dueDate: newDate })
    };
    const response = await fetch(`http://localhost:8080/api/tasks/update/${taskId}`, requestOptions)
      .then(response => response.json())
      .then(data => fetchTasks())
      .catch(error => console.error(error));
  };
  return (<div>
    {tasks.map(task => <div key={task.id} className={styles.taskRow}>
      <section id="description">Titel: {task.description}</section>
      <section id="dueDate">Due Date: <input id="dueDate" type="date" name="dueDate" defaultValue={task.dueDate} onChange={e => handleDueDate(e, task.id)} /></section>
      <section id="assigned">Assigned to: {task.assignee?.name || 'Unassigned'}</section>
      {task.assignee ? <button onClick={() => {handleUnassignTask(task.id)}}>Unassign</button> : 
        <div>
        <select onChange={e => {setSelectedEmployee(e.target.value)}}>
          <option value="">Select Employee</option>
          {employees.map(employee => <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>)}
        </select>
        <button onClick={() => {handleAssignTask(task.id)}}>Assign</button>
      </div>}
    </div>)}
  </div>);
};

export default TaskDetail;
