import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./editTodo";

const ListTodo = () => {
  // const []

  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsondata = await response.json();
      setTodos(jsondata);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/todos/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonData = await response.json();

      console.log(jsonData);

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodos();
    console.log("onces");
  }, []);

  console.log(todos);

  return (
    <Fragment>
      <div className="container">
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ListTodo;
