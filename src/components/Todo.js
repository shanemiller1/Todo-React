import React, { useState } from "react";
import { GrTrash } from "react-icons/gr";
import { HiPencil } from "react-icons/hi";
import Modal from "react-modal";
import TodoForm from "./TodoForm";

Modal.setAppElement("#root");
function Todo({ todo, toggleComplete, removeTodo, updateTodo }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleCheckboxClick() {
    toggleComplete(todo.id);
  }

  function handleRemoveClick() {
    removeTodo(todo.id);
  }

  const [edit, handleEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    handleEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <div style={{ display: "flex" }}>
      <input type="checkbox" onClick={handleCheckboxClick} />
      <li
        className="todo-row"
        style={{
          color: "black",
          textDecoration: todo.completed ? "line-through" : null,
        }}
      >
        {todo.task}
        <div
          className="icons"
          style={{
            color: "black",
          }}
        >
          <HiPencil onClick={() => setModalIsOpen(true)} />
          <GrTrash onClick={handleRemoveClick} />
        </div>
      </li>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Edit Task</h2>
        <div>
          <form>
            <input
              input
              name="task"
              type="text"
              value={handleEdit.value}
              onChange={handleEdit}
              className="todo-input"
            />
            <button
              onClick={() =>
                submitUpdate({ id: todo.id, value: handleEdit.value })
              }
            >
              Save
            </button>
          </form>
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default Todo;
