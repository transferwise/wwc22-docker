import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import { Form } from "../Form";
import { FilterButton } from "../FilterButton";
import { Todo } from "../Todo";
import { nanoid } from "nanoid";


interface ITask { 
  id: string;
  name: string;
  completed: boolean; 
} 

function usePrevious<T>(
  value: T,
): MutableRefObject<T | undefined>['current'] {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const FILTER_MAP: any = {
  All: () => true,
  Active: (task: ITask) => !task.completed,
  Completed: (task: ITask) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props: { tasks: ITask[]; }) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  function toggleTaskCompleted(id: any) {
    const updatedTasks = tasks.map((task: ITask) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }


  function deleteTask(id: any) {
    const remainingTasks = tasks.filter((task: { id: any; }) => id !== task.id);
    setTasks(remainingTasks);
  }


  function editTask(id: any, newName: any) {
    const editedTaskList = tasks.map((task: ITask) => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task: ITask) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name: string) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }


  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef<HTMLHeadingElement>(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength! === -1) {
      listHeadingRef.current!.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex={parseInt("-1")} ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
