import { createContext, useState } from "react";
import { BASE_URL } from "@env";
import axios from "../config/axios.js";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [operationStatus, setOperationStatus] = useState({
    success: false,
    message: "",
    type: "",
  });
  const [error, setError] = useState(null);

  const baseUrl = BASE_URL;

  // Create todo
  const createTodo = async (title, description, userId) => {
    const body = { title, description, userId };

    try {
      const response = await axios.post(`${baseUrl}/todos/new`, body);

      if (response.data.success) {
        setTodos([...todos, response.data.todo]);
        setOperationStatus({
          success: true,
          message: "New todo created successfully",
          type: "create",
        });
      }
    } catch (error) {
      setError(error.message);
      console.error("Error creating new todo", error);
    }
  };

  // Delete todo
  const deleteTodo = async (todoId) => {
    try {
      const response = await axios.delete(`${baseUrl}/todos/delete/${todoId}`);

      if (response.data.success) {
        setTodos(todos.filter((todo) => todo._id !== todoId));
        setOperationStatus({
          success: true,
          message: "Todo deleted successfully",
          type: "delete",
        });
      }
    } catch (error) {
      setError(error.message);
      console.error("Error deleting todo", error);
    }
  };

  // Find todo
  const findTodo = async (todoId) => {
    try {
      const response = await axios.get(`${baseUrl}/todos/find/${todoId}`);

      if (response.data.success) {
        return response.data.todo;
      }
    } catch (error) {
      setError(error.message);
      console.error("Error finding todo", error);
    }
  };

  // Fetch all todos for a user
  const fetchTodosForUser = async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/todos/all/${userId}`);

      if (response.data.success) {
        setTodos(response.data.todosForUser);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching todos for user", error);
    }
  };

  // Update todo
  const updateTodo = async (todoId, title, description, status) => {
    const body = { title, description, status };

    try {
      const response = await axios.put(`${baseUrl}/todos/edit/${todoId}`, body);

      if (response.data.success) {
        const updatedTodos = todos.map((todo) =>
          todo._id === todoId ? response.data.updatedTodo : todo
        );
        setTodos(updatedTodos);
        setOperationStatus({
          success: true,
          message: "Todo updated successfully",
          type: "update",
        });
      }
    } catch (error) {
      setError(error.message);
      console.error("Error updating todo", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        operationStatus,
        error,
        createTodo,
        deleteTodo,
        findTodo,
        fetchTodosForUser,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
