import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

function Task({ deletedTask, doneTask, label, done, created }) {
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(label);
  const [date, setDate] = useState(formatDistanceToNow(created, { addSuffix: true, includeSeconds: true }));
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(formatDistanceToNow(created));
    }, 1000);
    return () => clearInterval(interval);
  }, [created]);

  const editedTask = () => {
    setEdit(true);
  };

  const handleEditChange = (x) => {
    setEditValue(x.target.value);
  };
  const handleEditSubmit = (x) => {
    if (x.key === 'Enter') {
      setEdit(false);
    }
  };

  let classNames = '';
  if (done) {
    classNames += ' completed';
  }
  if (setEdit) {
    classNames += ' editing';
  }

  return (
    <li className={classNames} onClick={doneTask}>
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
            <input className="toggle" type="checkbox" checked={done} onChange={doneTask} onClick={doneTask} />
            <label>
              <span className="description">{editValue}</span>
              <span className="created">created {date}</span>
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
}

Task.propTypes = {
  todos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    done: PropTypes.bool.isRequired,
  }),
  doneTask: PropTypes.func.isRequired,
  deletedTask: PropTypes.func.isRequired,
};

export default Task;
