import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {
  /** array destructure syntax */
  const [todos, setTodos] = useState([]);

  /** populates todos when app initializes */
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  /** saves data using local storage */
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  /** adds a task */
  function addTodo(todo) {
    setTodos([todo, ...todos]);
  }

  /** wip */
  function updateTodo(todoId, newValue) {
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  }

  /** checks if task is completed */
  function toggleComplete(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  }

  /** removes task */
  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>My To Do List</h3>
        <TodoForm addTodo={addTodo} />
      </header>
      <div className="todo-app">
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </div>
    </div>
  );
}

export default App;
