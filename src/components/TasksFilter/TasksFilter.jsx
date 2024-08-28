import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

class TasksFilter extends Component {
  render() {
    const { filter, onFilterChange } = this.props;
    return (
      <ul className="filters">
        <li>
          <button className={filter === 'all' ? 'selected' : ''} onClick={() => onFilterChange('all')}>
            All
          </button>
        </li>
        <li>
          <button className={filter === 'active' ? 'selected' : ''} onClick={() => onFilterChange('active')}>
            Active
          </button>
        </li>
        <li>
          <button className={filter === 'completed' ? 'selected' : ''} onClick={() => onFilterChange('completed')}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
TasksFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
export default TasksFilter;
