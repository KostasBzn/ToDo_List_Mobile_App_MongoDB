import express from "express";
import {
  deleteTodo,
  findTodo,
  findTodosForUser,
  newTodo,
  updateTodo,
} from "../controllers/todoControllers.js";

const todoRoutes = express.Router();

todoRoutes.post("/new", newTodo);
todoRoutes.delete("/delete/:todoId", deleteTodo);
todoRoutes.put("/edit/:todoId", updateTodo);
todoRoutes.get("/find/:todoId", findTodo);
todoRoutes.get("/all/:userId", findTodosForUser);

export default todoRoutes;
