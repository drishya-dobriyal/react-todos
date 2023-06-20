import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async function () {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setLoading(false);
      setTodos(data);
    } catch (err) {
      console.log(err);
      toast.error("Error in loading todo!");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  /* POST Request */
  const createTodo = async function (event) {
    if (event.key === "Enter") {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              title: newTodo,
              body: "Todo",
              userId: 1,
              completed: false,
              id: todos.length + 1,
            }),
          }
        );
        const data = await response.json();
        setNewTodo("");
        toast.success("Todo created successfully!");
        setTodos((prevTodos) => {
          return [data, ...prevTodos];
        });
      } catch (err) {
        console.log(err);
        toast.error("Error in creating todo!");
      }
    }
  };

  /* Delete Request*/
  const deleteTodo = async function (todoId) {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${todoId}`, {
        method: "DELETE",
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
      toast.success("Todo deleted successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Error in deleting todo!");
    }
  };

  /* PUT Request */
  const toggleTask = async function (todoId) {
    try {
      const todoIndex = todos.findIndex((todo) => todo.id === todoId);
      const currTodo = todos[todoIndex];
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${todoId}`,
        {
          method: "PUT",
          body: JSON.stringify({ ...currTodo, completed: !currTodo.completed }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      toast.success("Todo updated successfully!");
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === todoId) {
            return data;
          }
          return todo;
        })
      );
    } catch (err) {
      console.log(err);
      toast.error("Error in updating todo");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="todo-container">
        <div className="todo-header">
          <h1>All Tasks</h1>
        </div>

        <div className="add-todo-container">
          <input
            type="text"
            placeholder="Add new todo..."
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            onKeyPress={(event) => createTodo(event)}
            id="new-todo"
          ></input>
        </div>

        <ul className="todo-list">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleTask={toggleTask}
                deleteTodo={deleteTodo}
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
}

export default TodoList;
