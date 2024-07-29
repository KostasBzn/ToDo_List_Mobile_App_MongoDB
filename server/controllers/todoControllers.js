import Todo from "../models/todoSchema.js";

//Create new Todo
export const newTodo = async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    if (!userId || !title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing" });
    }

    const newTodo = new Todo({
      title,
      description,
      author: userId,
    });

    await newTodo.save();

    res
      .status(200)
      .json({ success: true, message: "New todo created", todo: newTodo });
  } catch (error) {
    console.error("Error creating new todo");
    res.status(500).json({ success: false, error: error.message });
  }
};

//Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    if (!todoId) {
      return res
        .status(400)
        .json({ success: false, message: "Todo ID is required" });
    }

    // find and delete todo from the database
    const result = await Todo.findByIdAndDelete(todoId);

    // Check if a todo was deleted
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting the todo", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// find todo
export const findTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    if (!todoId) {
      return res
        .status(400)
        .json({ success: false, message: "Todo ID is required" });
    }

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({ success: true, todo });
  } catch (error) {
    console.error("Error finding the todo", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// find todos for user by
export const findTodosForUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const todosForUser = await Todo.find({ author: userId });

    res.status(200).json({ success: true, todosForUser });
  } catch (error) {
    console.error("Error finding todos for the user", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// update todo
export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { title, description, status } = req.body;

    if (!todoId) {
      return res
        .status(400)
        .json({ success: false, message: "Todo ID is required" });
    }

    if (!title && !description && !status) {
      return res.status(400).json({
        success: false,
        message: "Title, description, or status is missing",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      updatedTodo,
    });
  } catch (error) {
    console.error("Error updating the todo", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
