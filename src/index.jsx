/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';

import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer.jsx';

import './index.css';

class App extends Component {
  maxId = 1;

  state = {
    todoData: [this.createTask('eat'), this.createTask('make'), this.createTask('learn')],
    filter: 'all',
  };

  createTask(label) {
    return {
      label: label,
      id: this.maxId++,
      done: false,
      created: new Date(),
    };
  }

  delTask = (id) => {
    this.setState(({ todoData }) => {
      const idDel = todoData.findIndex((elem) => elem.id === id);
      const newTodoData = [...todoData.slice(0, idDel), ...todoData.slice(idDel + 1)];
      return {
        todoData: newTodoData,
      };
    });
  };

  deletedAllTask = () => {
    this.setState(() => {
      const clearTodoData = [];
      return {
        todoData: clearTodoData,
      };
    });
  };

  addedTask = (text) => {
    const newTask = this.createTask(text);
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newTask];
      return {
        todoData: newTodoData,
      };
    });
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
  
  onFilterChange = (filter) => {
    this.setState({ filter });
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
            <TaskList todos={viewTask} deletedTask={this.delTask} doneTask={this.doneTask} />
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
