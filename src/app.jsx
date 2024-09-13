/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer.jsx';

import './index.css';

class App extends Component {
  maxId = 1;

  constructor() {
    super();
    this.state = {
      todoData: [this.createTask('eat'), this.createTask('make'), this.createTask('learn')],
      filter: 'all',
      activeTimerId: null,
      timers: {},
      isRunning: false,
    };
    this.minutesInput = React.createRef();
    this.secondsInput = React.createRef();
  }

  createTask(label, minutes = 0, seconds = 0) {
    return {
      label: label,
      id: this.maxId++,
      done: false,
      created: new Date(),
      minutes: minutes,
      seconds: seconds,
    };
  }

  delTask = (id) => {
    this.setState(({ todoData, timers }) => {
      const idDel = todoData.findIndex((elem) => elem.id === id);
      const newTodoData = [...todoData.slice(0, idDel), ...todoData.slice(idDel + 1)];
      clearInterval(timers[id]);
      const newTimers = { ...timers };
      delete newTimers[id];
      return {
        todoData: newTodoData,
        timers: newTimers,
      };
    });
  };

  deletedAllTask = () => {
    this.setState(({ todoData, timers }) => {
      const activeTasks = todoData.filter((task) => !task.done);
      Object.keys(timers).forEach((id) => clearInterval(timers[id]));
      return {
        todoData: activeTasks,
        timers: {},
        activeTimerId: null,
        isRunning: false,
      };
    });
  };

  addedTask = (text, minutes, seconds) => {
    const newTask = this.createTask(text, minutes, seconds);
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newTask],
    }));
  };

  doneTask = (id) => {
    this.setState(({ todoData }) => {
      const idDone = todoData.findIndex((elem) => elem.id === id);
      const oldTask = todoData[idDone];
      if (!oldTask) {
        return;
      }
      const newTask = {
        ...oldTask,
        done: !oldTask.done,
      };
      const newTodoData = [...todoData.slice(0, idDone), newTask, ...todoData.slice(idDone + 1)];
      return {
        todoData: newTodoData,
      };
    });
  };

  filterTask = (items, filter) => {
    switch (filter) {
    case 'all':
      return items;
    case 'active':
      return items.filter((elem) => !elem.done);
    case 'completed':
      return items.filter((elem) => elem.done);
    default:
      return items;
    }
  };

  updateTaskText = (id, text) => {
    this.setState(({ todoData }) => {
      const idTask = todoData.findIndex((elem) => elem.id === id);
      const oldTask = todoData[idTask];
      const newTask = { ...oldTask, label: text };
      const newTodoData = [...todoData.slice(0, idTask), newTask, ...todoData.slice(idTask + 1)];
      return {
        todoData: newTodoData,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  convertToSeconds = (hours, minutes, seconds) => {
    return seconds + minutes * 60 + hours * 60 * 60;
  };

  startTimer = (id) => {
    if (this.state.isRunning) return;
    const timerId = setInterval(() => {
      this.countDown(id);
    }, 1000);
    this.setState({
      activeTimerId: id,
      timers: {
        [id]: timerId,
      },
      isRunning: true,
    });
  };

  countDown = (id) => {
    this.setState(({ todoData, timers, activeTimerId }) => {
      if (activeTimerId !== id) return;

      const idx = todoData.findIndex((task) => task.id === id);
      const task = todoData[idx];
      if (task.seconds === 0 && task.minutes === 0) {
        clearInterval(timers[id]);
        return {
          isRunning: false,
          activeTimerId: null,
        };
      }
      if (task.done) {
        clearInterval(timers[id]);
        return {
          isRunning: false,
          activeTimerId: null,
        };
      }

      const newSeconds = task.seconds === 0 ? 59 : task.seconds - 1;
      const newMinutes = task.seconds === 0 ? task.minutes - 1 : task.minutes;

      const updatedTask = {
        ...task,
        minutes: newMinutes,
        seconds: newSeconds,
      };

      const newTodoData = [...todoData.slice(0, idx), updatedTask, ...todoData.slice(idx + 1)];

      return { todoData: newTodoData };
    });
  };

  stopTimer = () => {
    const { activeTimerId, timers } = this.state;
    if (activeTimerId !== null) {
      clearInterval(timers[activeTimerId]);
      this.setState({
        isRunning: false,
        activeTimerId: null,
      });
    }
  };

  resumeTimer = () => {
    const { activeTimerId } = this.state;
    if (activeTimerId === null) return;
    this.startTimer(activeTimerId);
  };

  resetTimer = () => {
    this.setState({
      minutes: 0,
      seconds: 0,
    });
    this.minutesInput.current.value = 0;
    this.secondsInput.current.value = 0;
    this.stopTimer();
  };

  render() {
    const { todoData, filter } = this.state;
    const viewTask = this.filterTask(todoData, filter);
    const unfilled = this.state.todoData.filter((task) => !task.done).length;
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>Todos</h1>
            <NewTaskForm addedTask={this.addedTask} />
          </header>
          <section className="main">
            <TaskList
              todos={viewTask}
              deletedTask={this.delTask}
              doneTask={this.doneTask}
              updateTaskText={this.updateTaskText}
              onClickStart={this.startTimer}
              onClickStop={this.stopTimer}
              minutes={this.state.minutes}
              seconds={this.state.seconds}
            />
            <Footer
              toDo={unfilled}
              deletedAllTask={this.deletedAllTask}
              onFilterChange={this.onFilterChange}
              filter={filter}
            />
          </section>
        </section>
      </div>
    );
  }
}
export default App;
