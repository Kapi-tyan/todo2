/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';

import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer.jsx';

import './index.css';

const App = () => {
  const [filter, setFilter] = useState('all');
  const [activeTimerId, setActiveTimerId] = useState(null);
  const [timers, setTimers] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  
  const minutesInput = useRef(null);
  const secondsInput = useRef(null);
  const maxId = useRef(1);

  const createTask = (label, minutes = 0, seconds = 0) => {
    return {
      label,
      id: maxId.current++,
      created: new Date(), 
      done: false,
      minutes,
      seconds,
    };
  };
  const [todoData, setTodoData] = useState([
    createTask('eat'),
    createTask('make'),
    createTask('learn'),
  ]);
  const delTask = (id) => {
    setTodoData((prevTodoData) =>{
      const idDel = prevTodoData.findIndex((elem) => elem.id === id);
      const newTodoData = [...prevTodoData.slice(0, idDel), ...prevTodoData.slice(idDel + 1)];
      return newTodoData;
    });
    setTimers((prevTimers) => {
      const newTimers = {...prevTimers};
      clearInterval(prevTimers[id]);
      delete newTimers[id];
      return newTimers;
    });
  };

  const deletedAllTask = () => {
    setTodoData((prevTodoData) =>{
      const activeTasks = prevTodoData.filter((task)=>!task.done);
      setTimers((prevTimers) =>{
        Object.keys(prevTimers).forEach((id) => clearInterval(prevTimers[id]));
        return {};
      });
      setActiveTimerId(null);
      setIsRunning(false);
      return activeTasks;
    });
  };

  const addedTask = (text, minutes, seconds) => {
    const newTask = createTask(text, minutes, seconds);
    setTodoData((prevTodoData)=>{
      return [...prevTodoData, newTask];
    });
  };

  const doneTask = (id) =>{
    setTodoData((prevTodoData) =>{
      const idDone = prevTodoData.findIndex((elem) => elem.id === id);
      const oldTask = prevTodoData[idDone];
      if (!oldTask) {
        return;
      }
      const newTask = {
        ...oldTask,
        done: !oldTask.done,
      };
      const newTodoData = [...prevTodoData.slice(0, idDone), newTask, ...prevTodoData.slice(idDone + 1)];
      return newTodoData;
    });
  };


  const filterTask = (items, filter) => {
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
  const updateTaskText = (id, text) => {
    setTodoData((prevTodoData) => {
      const idTask = prevTodoData.findIndex((elem)=> elem.id === id);
      const oldTask = prevTodoData[idTask];
      const newTask = {...oldTask, label: text};
      const newTodoData = [...prevTodoData.slice(0, idTask), newTask, ...prevTodoData.slice(idTask + 1)];
      return newTodoData;
    });
  };

  const onFilterChange = (filter) => {
    setFilter( filter );
  };
 
  const startTimer = (id) => {
    if (isRunning) return;
    const timerId = setInterval(() => {
      countDown(id);
    }, 1000);
    setTimers((prevTimers) => ({
      ...prevTimers,
      [id]: timerId,
    }));
    setActiveTimerId(id);
    setIsRunning(true);
  };

  
  const countDown = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((task) => task.id === id);
      const task = prevTodoData[idx];
      if (task.seconds === 0 && task.minutes === 0) {
        clearInterval(timers[id]);
        setIsRunning(false);
        setActiveTimerId(null);
        return prevTodoData;
      }
      if (task.done) {
        clearInterval(timers[id]);
        setIsRunning(false);
        setActiveTimerId(null);
        return prevTodoData;
      }

      const newSeconds = task.seconds === 0 ? 59 : task.seconds - 1;
      const newMinutes = task.seconds === 0 ? task.minutes - 1 : task.minutes;

      const updatedTask = {
        ...task,
        minutes: newMinutes,
        seconds: newSeconds,
      };

      const newTodoData = [...prevTodoData.slice(0, idx), updatedTask, ...prevTodoData.slice(idx + 1)];

      return newTodoData;
    });
  };
  const stopTimer = () => {
    if (activeTimerId !== null) {
      clearInterval(timers[activeTimerId]);
      setIsRunning(false);
      setActiveTimerId(null);
    }
  };

  const viewTask = filterTask(todoData, filter);
  const unfilled = todoData.filter((task) => !task.done).length;
  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm addedTask={addedTask} />
        </header>
        <section className="main">
          <TaskList
            todos={viewTask}
            deletedTask={delTask}
            doneTask={doneTask}
            updateTaskText={updateTaskText}
            onClickStart={startTimer}
            onClickStop={stopTimer}
            minutesRef={minutesInput}
            secondsRef={secondsInput}
          />
          <Footer
            toDo={unfilled}
            deletedAllTask={deletedAllTask}
            onFilterChange={onFilterChange}
            filter={filter}
          />
        </section>
      </section>
    </div>
  );
};
export default App;