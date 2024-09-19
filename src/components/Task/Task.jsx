import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

const Task = ({
  id,
  done,
  label,
  created,
  doneTask,
  deletedTask,
  updateTaskText,
  onClickStart,
  onClickStop,
  minutes,
  seconds,
}) => {
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(label);
  const [date, setDate] = useState(formatDistanceToNow(created, { addSuffix: true, includeSeconds: true }));

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(formatDistanceToNow(created));
    }, 1000);
    return () => clearInterval(interval);
  }, [created]);

  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleEditSubmit = (event) => {
    if (event.key === 'Enter') {
      setEdit(false);
      updateTaskText(editValue);
    }
  };
  const editedTask = () => {
    setEdit(true);
  };

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
          onChange={handleEditChange}
          onKeyDown={handleEditSubmit}
        />
      ) : (
        <div>
          <div>
            <input className="toggle" type="checkbox" id={`task-${id}`} checked={done} onChange={() => doneTask(id)} />
            <label htmlFor={`task-${id}`}>
              <span className="description">{editValue}</span>
              <div className="description__time">
                <button className="icon icon-play" onClick={() => onClickStart(id)}></button>
                <button className="icon icon-pause" onClick={() => onClickStop(id)}></button>
                {minutes} : {seconds}
              </div>
              <span className="created">created {date} </span>
            </label>
          </div>
          <div>
            <button className="icon icon-edit" onClick={editedTask}></button>
            <button className="icon icon-destroy" onClick={deletedTask}></button>
          </div>
        </div>
      )}
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  doneTask: PropTypes.func.isRequired,
  deletedTask: PropTypes.func.isRequired,
  updateTaskText: PropTypes.func.isRequired,
  onClickStart: PropTypes.func.isRequired,
  onClickStop: PropTypes.func.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default Task;
