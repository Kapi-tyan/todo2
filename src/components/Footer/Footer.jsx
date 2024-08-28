import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter.jsx';
import './Footer.css';

const Footer = ({ toDo, deletedAllTask, onFilterChange, filter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter onFilterChange={onFilterChange} filter={filter} />
      <button className="clear-completed" onClick={deletedAllTask}>
        Clear completed
      </button>
    </footer>
  );
};
Footer.propTypes = {
  deletedAllTask: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  toDo: PropTypes.number.isRequired,
};
export default Footer;
