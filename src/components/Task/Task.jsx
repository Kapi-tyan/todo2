import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editValue: props.label,
      date: formatDistanceToNow(props.created, { addSuffix: true, includeSeconds: true }),
    };
  }

  taskCompleted() {
    this.interval = setInterval(() => {
      this.setState({
        date: formatDistanceToNow(this.props.created),
      });
    }, 1000);
  }

  taskDeleted() {
    clearInterval(this.interval);
  }

  editedTask = () => {
    this.setState({ edit: true });
  };

  handleEditChange = (event) => {
    this.setState({ editValue: event.target.value });
  };

  handleEditSubmit = (event) => {
    if (event.key === 'Enter') {
      this.setState({ edit: false });
      this.props.updateTaskText(this.state.editValue);
    }
  };

  render() {
    const { id, done, deletedTask, doneTask } = this.props;
    const { edit, editValue, date } = this.state;
    const taskClassNames = classNames({
      completed: done,
      editing: edit,
    });

    return (
      <li className={taskClassNames}>
        {edit ? (
          <input
            type="text"
            className="edit"
            value={editValue}
            onChange={this.handleEditChange}
            onKeyDown={this.handleEditSubmit}
          />
        ) : (
          <div>
            <div>
              <input
                className="toggle"
                type="checkbox"
                id={`task-${editValue}`}
                checked={done}
                onChange={() => doneTask(id)}
              />
              <label htmlFor={`task-${editValue}`}>
                <span className="description">{editValue}</span>
                <span className="created">created {date} </span>
              </label>
            </div>
            <div>
              <button className="icon icon-edit" onClick={this.editedTask}></button>
              <button className="icon icon-destroy" onClick={deletedTask}></button>
            </div>
          </div>
        )}
      </li>
    );
  }
}

Task.propTypes = {
  done: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  doneTask: PropTypes.func.isRequired,
  deletedTask: PropTypes.func.isRequired,
  updateTaskText: PropTypes.func.isRequired,
};

export default Task;
