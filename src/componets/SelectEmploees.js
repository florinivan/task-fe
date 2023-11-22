import React from 'react';

const SelectEmploees = (props) => {
  return (<div>
    <select onChange={e => props.setSelectedEmployee(e.target.value)}>
      <option value="">Select Employee</option>
      {props.employees.map(employee => <option key={employee.id} value={employee.id}>
        {employee.name}
      </option>)}
    </select>
    <button onClick={props.handleAssignTask(props.id)}>Assign</button>
  </div>);
};

export default SelectEmploees;