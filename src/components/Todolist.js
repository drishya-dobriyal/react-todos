import { useEffect, useState } from "react";
import Todo from "./Todo";

const {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} = require("./apiRequest");

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async function () {
    try {
      const req = {
        url: "https://jsonplaceholder.typicode.com/todos",
      };
      const data = await getRequest(req);
      setLoading(false);
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async function (event) {
    if (event.key === "Enter") {
      const req = {
        url: "https://jsonplaceholder.typicode.com/posts",
        body: {
          title: newTodo,
          body: "Todo",
          userId: 1,
          completed: false,
          id: todos.length + 1,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const response = await postRequest(req);
      setNewTodo("");
      setTodos((prevTodos) => {
        return [...prevTodos, response];
      });
    }
  };

  const deleteTodo = async function (todoId) {
    try {
      await deleteRequest({
        url: `https://jsonplaceholder.typicode.com/posts/${todoId}`,
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleTask = async function (todoId) {
    try {
      const todoIndex = todos.findIndex((todo) => todo.id === todoId);
      const currTodo = todos[todoIndex];
      const response = await putRequest({
        url: `https://jsonplaceholder.typicode.com/posts/${todoId}`,
        body: { ...currTodo, completed: !currTodo.completed },
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === todoId) {
            return response;
          }
          return todo;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitle = async function (todoId, updatedTitle) {
    try {
      const todoIndex = todos.findIndex((todo) => todo.id === todoId);
      const currTodo = todos[todoIndex];
      const req = {
        url: `https://jsonplaceholder.typicode.com/posts/${todoId}`,
        body: { title: updatedTitle },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const updatedTodo = await putRequest(req);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === todoId) {
            return updatedTodo;
          }
          return todo;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
              updateTitle={updateTitle}
              toggleTask={toggleTask}
              deleteTodo={deleteTodo}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
