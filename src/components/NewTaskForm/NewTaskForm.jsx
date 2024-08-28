import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({ addedTask }) => {
  const [valueForm, setValueForm] = useState('');

  const handleChange = (evt) => {
    setValueForm(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (valueForm.trim() !== '') {
      addedTask(valueForm);
      setValueForm('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        name="valueForm"
        value={valueForm}
        onChange={handleChange}
        autoFocus
        required
      />
    </form>
  );
};
NewTaskForm.propTypes = {
  addedTask: PropTypes.func.isRequired,
};
export default NewTaskForm;
