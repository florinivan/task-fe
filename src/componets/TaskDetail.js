import React from 'react';
import styles from './styles.module.css';
import SelectEmploees from './SelectEmploees';

const TaskDetail = (props) => {
  return (<div>
    {props.tasks.map(task => <div key={task.id} className={styles.taskRow}>
      <section id="description">Titel: {task.description}</section>
      <section id="dueDate">Due Date: <input id="dueDate" type="date" name="dueDate" defaultValue={task.dueDate} onChange={e => props.handleDueDate(e, task.id)} /></section>
      <section id="assigned">Assigned to: {task.assignee?.name || 'Unassigned'}</section>
      {task.assignee ? <button onClick={() => props.handleUnassignTask(task.id)}>Unassign</button> : <SelectEmploees employees={props.employees} setSelectedEmployee={props.setSelectedEmployee} handleAssignTask={props.handleAssignTask} id={task.id}></SelectEmploees>}
    </div>)}
  </div>);
};

export default TaskDetail;
