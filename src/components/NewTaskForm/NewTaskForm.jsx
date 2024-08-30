import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueForm: '',
    };
  }

  handleChange = (evt) => {
    this.setState({ valueForm: evt.target.value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { valueForm } = this.state;
    const { addedTask } = this.props;
    if (valueForm.trim() !== '') {
      addedTask(valueForm);
      this.setState({ valueForm: '' });
    }
  };

  render() {
    const { valueForm } = this.state;

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
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  addedTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
