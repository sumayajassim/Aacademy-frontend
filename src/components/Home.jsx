import React, { useEffect, useState } from "react";
import AddTodo from "./todos/AddTodo";
import TodoList from "./todos/TodoList";
import axios from "axios";

function Home() {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");
  const [uncompleted, setUncompleted] = useState([]);
  const [completed, setcompleted] = useState([]);
  const [archived, setArchive] = useState([]);

  const addTaskHandler = (task) => {
    axios
      .post("http://localhost:4000/todo", task, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res.data);
        getAllTodos();
      });
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  useEffect(() => {
    getList();
  }, [todos]);

  const getAllTodos = () => {
    axios
      .get("http://localhost:4000/todo", { headers: { Authorization: token } })
      .then((res) => {
        setTodos(res.data.todos);
      });
  };

  const getList = () => {
    setcompleted([]);
    setUncompleted([]);
    setArchive([]);
    todos.forEach((todo) => {
      if (todo.status === "COMPLETED") {
        setcompleted((completed) => [...completed, todo]);
      } else if (todo.status === "UNCOMPLETED") {
        setUncompleted((uncompleted) => [...uncompleted, todo]);
      } else {
        setArchive((archived) => [...archived, todo]);
      }
    });
  };

  const onChangeHandler = (id, type, data) => {
    if (todos.length > 0) {
      const todo = todos.find((todo) => todo._id === id);
      if (!todo) return;
      let formData;
      if (type === "checkbox") {
        const status =
          todo.status === "COMPLETED" ? "UNCOMPLETED" : "COMPLETED";
        formData = {
          status: status,
        };
      } else {
        formData = data;
      }

      axios
        .put(`http://localhost:4000/todo/${id}`, formData, {
          headers: { Authorization: token },
        })
        .then((res) => {
          getAllTodos();
        });
    }
  };

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:4000/todo/${id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log("Deleted!!");
        getAllTodos();
      });
  };

  return (
    <div>
      <AddTodo addTask={addTaskHandler} />
      <h3>Completed Todos</h3>
      <TodoList
        list={completed}
        updateHandler={onChangeHandler}
        deleteTodoHandler={deleteHandler}
      />
      <h3>Uncompleted Todos</h3>
      <TodoList
        list={uncompleted}
        updateHandler={onChangeHandler}
        deleteTodoHandler={deleteHandler}
      />
      <h3>Archive Todos</h3>
      <TodoList list={archived} deleteTodoHandler={deleteHandler} />
    </div>
  );
}

export default Home;
