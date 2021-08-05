import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function TodoForm({ addTodo }) {
  const [todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false,
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  function handleChange(e) {
    setTodo({ ...todo, task: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.task.trim()) {
      addTodo({ ...todo, id: uuidv4() });
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
