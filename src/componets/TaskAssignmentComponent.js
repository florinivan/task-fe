import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import axios from 'axios';

const TaskAssignmentComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    // Fetch tasks and employees from the server
    const fetchTasks = async () => {
      try {
        const tasksResponse = await axiosInstance.get('/tasks');
        setTasks(tasksResponse.data);
      } catch (err) {
        console.log('Login Err ', err);
      }
    };

    const fetchEmployees = async () => {
      const employeesResponse = await axiosInstance.get('/employees');
      setEmployees(employeesResponse.data);
    };

    fetchTasks();
    fetchEmployees();
  }, []);

  const handleAssignTask = async () => {
    if (selectedTask && selectedEmployee) {
      await axios.post('/assign-task', {
        taskId: selectedTask.id,
        employeeName: selectedEmployee,
      });

      // Refresh tasks after assigning
      const tasksResponse = await axios.get('/tasks');
      setTasks(tasksResponse.data);
    }
  };

  const handleUnassignTask = async (taskId) => {
    await axios.post(`tasks/update/${taskId}`);

    // Refresh tasks after unassigning
    const tasksResponse = await axios.get('/tasks');
    setTasks(tasksResponse.data);
  };

  return (
    <div>
      <h2>Task Assignment</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description} - Assigned to: {task.assignee.name || 'Unassigned'}
            {task.assignedTo ? (
              <button onClick={() => handleUnassignTask(task.id)}>Unassign</button>
            ) : (
              <div>
                <select onChange={(e) => setSelectedEmployee(e.target.value)}>
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee} value={employee}>
                      {employee}
                    </option>
                  ))}
                </select>
                <button onClick={handleAssignTask}>Assign</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskAssignmentComponent;
