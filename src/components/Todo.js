import React, { useState } from "react";

function Todo({ todo, updateTitle, toggleTask, deleteTodo }) {
  const [title, setTitle] = useState(todo.title || "");
  const [editMode, setEditMode] = useState(false);

  const handleTitleBlur = () => {
    if (title.trim() !== "") {
      updateTitle(todo.id, title);
      setEditMode(false);
      setTitle(todo.title);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleTitleBlur();
    }
  };

  return (
    <li className="todo-item">
      {editMode ? (
        <input
          className="todo-title"
          onChange={(event) => setTitle(event.target.value)}
          onBlur={handleTitleBlur}
          onKeyPress={handleKeyPress}
          defaultValue={title ?? ""}
        />
      ) : (
        <div
          className="todo-title"
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
          }}
          onClick={() => setEditMode(true)}
        >
          {todo.title}
        </div>
      )}

      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTask(todo.id)}
      />

      <i
        title="Delete todo"
        className="fas fa-trash-alt"
        onClick={() => deleteTodo(todo.id)}
      ></i>
    </li>
  );
}

export default Todo;
