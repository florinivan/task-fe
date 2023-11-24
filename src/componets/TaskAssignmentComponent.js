import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import axios from 'axios';
import TaskDetail from './TaskDetail';
import {header} from './constants'


const TaskAssignmentComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [employees, setEmployees] = useState([]);

  // Fetch tasks and employees from the server
  const fetchTasks = async () => {
    fetch('http://localhost:8080/api/tasks', {
      method: "GET",
      headers: header
    })
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error(error));
  };

  const fetchEmployees = async () => {
    fetch('http://localhost:8080/api/employees', {
      method: "GET",
      headers: header
    })
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  return (
    <>
      <h2>Task Assignment</h2>
      <TaskDetail tasks={tasks} employees={employees} fetchTasks={fetchTasks} fetchEmployees={fetchEmployees}></TaskDetail>
    </>
  );
};

export default TaskAssignmentComponent;
