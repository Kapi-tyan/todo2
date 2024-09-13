import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueForm: '',
      minutes: 0,
      seconds: 0,
    };
    this.minutesInput = React.createRef();
    this.secondsInput = React.createRef();
  }

  handleChange = (evt) => {
    this.setState({ valueForm: evt.target.value });
  };

  handleMinuteChange = (e) => {
    this.setState({ minutes: parseInt(e.target.value, 10) || 0 });
  };

  handleSecondChange = (e) => {
    this.setState({ seconds: parseInt(e.target.value, 10) || 0 });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { valueForm, minutes, seconds } = this.state;
    const { addedTask } = this.props;
    if (valueForm.trim() !== '') {
      addedTask(valueForm, minutes, seconds);
      this.setState({ valueForm: '', minutes: 0, seconds: 0 });
    }
  };

  render() {
    const { valueForm, minutes, seconds } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          name="valueForm"
          value={valueForm}
          onChange={this.handleChange}
          autoFocus
          required
        />
        <input
          className="new-todo-form__timer"
          ref={this.minutesInput}
          type="number"
          placeholder="Min"
          value={minutes}
          onChange={this.handleMinuteChange}
        />
        <input
          className="new-todo-form__timer"
          ref={this.secondsInput}
          type="number"
          placeholder="Sec"
          value={seconds}
          onChange={this.handleSecondChange}
        />
        <button type="submit"></button>
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  addedTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
