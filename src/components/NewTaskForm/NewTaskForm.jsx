import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({ addedTask }) => {
  const minutesInput = useRef(null);
  const secondsInput = useRef(null);

  const [valueForm, setValueForm] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleValueChange = (event) => {
    setValueForm(event.target.value);
  };

  const handleMinuteChange = (e) => {
    setMinutes(parseInt(e.target.value, 10) || 0);
  };

  const handleSecondChange = (e) => {
    setSeconds(parseInt(e.target.value, 10) || 0);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (valueForm.trim() !== '') {
      addedTask(valueForm, minutes, seconds);
      setValueForm('');
      setMinutes(0);
      setSeconds(0);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        name="valueForm"
        value={valueForm}
        onChange={handleValueChange}
        autoFocus
        required
      />
      <input
        className="new-todo-form__timer"
        ref={minutesInput}
        type="number"
        placeholder="Min"
        value={minutes}
        onChange={handleMinuteChange}
      />
      <input
        className="new-todo-form__timer"
        ref={secondsInput}
        type="number"
        placeholder="Sec"
        value={seconds}
        onChange={handleSecondChange}
      />
      <button type="submit"></button>
    </form>
  );
};

NewTaskForm.propTypes = {
  addedTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
