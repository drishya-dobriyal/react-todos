function Todo({ todo, toggleTask, deleteTodo }) {
  return (
    <li className="todo-item">
      <div
        className="todo-title"
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.title}
      </div>

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
