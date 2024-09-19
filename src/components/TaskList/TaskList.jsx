import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

function TaskList({ todos, deletedTask, doneTask, updateTaskText, onClickStart, onClickStop }) {
  return (
    <ul className="todo-list">
      {todos.map((item) => {
        const { id, minutes, seconds, ...itemProps } = item;
        return (
          <Task
            {...itemProps}
            key={id}
            id={id}
            minutes={minutes}
            seconds={seconds}
            deletedTask={() => deletedTask(id)}
            doneTask={() => doneTask(id)}
            updateTaskText={(text) => updateTaskText(id, text)}
            onClickStart={() => onClickStart(id)}
            onClickStop={() => onClickStop(id)}
          />
        );
      })}
    </ul>
  );
}
TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ),
  deletedTask: PropTypes.func.isRequired,
  doneTask: PropTypes.func.isRequired,
  updateTaskText: PropTypes.func.isRequired,
};
export default TaskList;
