import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./component/TodoForm";
import TodoItem from "./component/TodoItem";
import { Box, Button, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";

const App = () => {
  const [dialogProps, setDialogProps] = useState(false);
  const [todos, setTodos] = useState({
    new: [],
    ongoing: [],
    done: [],
  });

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const handleAddTodo = (title, description, date) => {
    const newTodo = { id: Date.now(), title, description, date, status: "new" };
    setTodos({ ...todos, new: [...todos.new, newTodo] });
  };

  const moveTodo = (id, targetStatus) => {
    const updatedTodos = { ...todos };
    let sourceStatus = "";

    if (updatedTodos.new.some((todo) => todo.id === id)) {
      sourceStatus = "new";
    } else if (updatedTodos.ongoing.some((todo) => todo.id === id)) {
      sourceStatus = "ongoing";
    } else if (updatedTodos.done.some((todo) => todo.id === id)) {
      sourceStatus = "done";
    }

    if (sourceStatus !== "") {
      const todoToMove = updatedTodos[sourceStatus]?.find((todo) => todo.id === id);
      todoToMove.status = targetStatus;
      updatedTodos[targetStatus] = [...updatedTodos[targetStatus], todoToMove];
      updatedTodos[sourceStatus] = updatedTodos[sourceStatus].filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
  };
  return (
    <div>
      <Box sx={{ fontSize: "1.8rem", fontWeight: "600", textAlign: "center" }} mb={2}>
        To-Do App
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              padding: "5px",
            }}
          >
            <Box mb={1} textAlign="center" fontSize="1.4rem">
              New
            </Box>
            {todos.new.map((todo) => (
              <TodoItem key={todo.id} todo={todo} moveTodo={moveTodo} />
            ))}
          </Box>

          {dialogProps && <TodoForm onAddTodo={handleAddTodo} onCancel={() => setDialogProps(false)} />}
          <Button
            variant="text"
            size="small"
            onClick={() => setDialogProps(true)}
            sx={{
              marginTop: "10px",
            }}
          >
            <Add /> Create New Task
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              padding: "5px",
            }}
          >
            <Box mb={1} textAlign="center" fontSize="1.4rem">
              Ongoing
            </Box>
            {todos.ongoing.map((todo) => (
              <TodoItem key={todo.id} todo={todo} moveTodo={moveTodo} />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              padding: "5px",
            }}
          >
            <Box mb={1} textAlign="center" fontSize="1.4rem">
              Done
            </Box>
            {todos.done.map((todo) => (
              <TodoItem key={todo.id} todo={todo} moveTodo={moveTodo} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
