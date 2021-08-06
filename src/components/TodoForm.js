import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function TodoForm({ addTodo }) {
  /** define state to keep track of input from user */
  const [todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false,
  });

  const inputRef = useRef(null);

  /** sets cursor to form "focus" */
  useEffect(() => {
    inputRef.current.focus();
  });

  /** handles user input to keep track in state */
  function handleChange(e) {
    setTodo({ ...todo, task: e.target.value });
  }

  /** add form from state to list, & generates random id for task using uuid */
  function handleSubmit(e) {
    e.preventDefault();
    if (todo.task.trim()) {
      addTodo({ ...todo, id: uuidv4() });
      // resets the task input
      setTodo({ ...todo, task: "" });
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        name="task"
        type="text"
        value={todo.task}
        onChange={handleChange}
        ref={inputRef}
        className="todo-input"
      />
      <button className="todo-button" type="submit">
        Add to List
      </button>
    </form>
  );
}

export default TodoForm;
