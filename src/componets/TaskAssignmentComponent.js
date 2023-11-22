import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import axios from 'axios';
import styles from './styles.module.css';
import moment from 'moment';

const TaskAssignmentComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(0);
  // Fetch tasks and employees from the server
  const fetchTasks = async () => {
    fetch('http://localhost:8080/api/tasks', {
      method: "GET",
      headers: {
          "accept": "application/json",
          "Access-Control-Allow-Origin": "*"
      }
    })
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error(error));
  };

  const fetchEmployees = async () => {
    fetch('http://localhost:8080/api/employees', {
      method: "GET",
      headers: {
          "accept": "application/json",
          "Access-Control-Allow-Origin": "*"
      }
    })
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const handleAssignTask =async (taskId) => {
    if (taskId && selectedEmployee) {
     /* await axiosInstance.post(`tasks/update/${selectedTask.id}`, {
        assignee: selectedEmployee
      });*/

    const requestOptions = {
        method: 'POST',
        headers: {
          "accept": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ assignee: selectedEmployee })
    };
    const response = await fetch(`http://localhost:8080/api/tasks/update/${taskId}`, requestOptions)
        .then(response => response.json())
        .then(data => setEmployees(data))
        .catch(error => console.error(error));

      // Refresh tasks after assigning
      //fetchTasks();
    }
  };

  const handleUnassignTask = async (taskId) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        "accept": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ assignee: null })
  };
  const response = await fetch(`http://localhost:8080/api/tasks/update/${taskId}`, requestOptions)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error));
    // Refresh tasks after unassigning
    fetchTasks();
  };

  const handleDueDate= async (e, taskId) => {
    const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
    const requestOptions = {
      method: 'POST',
      headers: {
        "accept": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ dueDate: newDate })
  };
  const response = await fetch(`http://localhost:8080/api/tasks/update/${taskId}`, requestOptions)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error));
  };

  return (
    <>
      <h2>Task Assignment</h2>
      <div>
        {tasks.map((task) => (
          <div key={task.id} className={styles.taskRow}>
            <section id="description">Titel: {task.description}</section>
            <section id="dueDate">Due Date: <input id="dueDate" type="date" name="dueDate" defaultValue={task.dueDate} onChange={(e) => handleDueDate(e,task.id)}/></section>
            <section id="assigned">Assigned to: {task.assignee?.name || 'Unassigned'}</section>
            {task.assignee ? (
              <button onClick={() => handleUnassignTask(task.id)}>Unassign</button>
            ) : (
              <div>
                <select onChange={(e) => setSelectedEmployee(e.target.value)}>
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
                <button onClick={handleAssignTask(task.id)}>Assign</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskAssignmentComponent;
