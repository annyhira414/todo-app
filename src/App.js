import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './component/TodoForm';
import TodoItem from './component/TodoItem';
import { Box, Button, Grid } from '@mui/material';
import { Add } from '@mui/icons-material';

const App = () => {
  const [dialogProps, setDialogProps] = useState(false);
  const [todos, setTodos] = useState({
    new: [],
    ongoing: [],
    done: [],
  });

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const handleAddTodo = (title, description, date, id, type) => {
    if (type === 'EDIT') {
      let _todos = { ...todos };
      const updatedData = { id, title, description, date, status: 'new' };
      _todos.new = _todos.new.map((item) =>
        item.id === id ? updatedData : item
      );
      setTodos({ ...todos, new: _todos.new });
    } else {
      const newTodo = {
        id: Date.now(),
        title,
        description,
        date,
        status: 'new',
      };
      setTodos({ ...todos, new: [...todos.new, newTodo] });
    }
  };

  const moveTodo = (id, targetStatus) => {
    const updatedTodos = { ...todos };
    let sourceStatus = '';

    if (updatedTodos.new.some((todo) => todo.id === id)) {
      sourceStatus = 'new';
    } else if (updatedTodos.ongoing.some((todo) => todo.id === id)) {
      sourceStatus = 'ongoing';
    } else if (updatedTodos.done.some((todo) => todo.id === id)) {
      sourceStatus = 'done';
    }

    if (sourceStatus !== '') {
      const todoToMove = updatedTodos[sourceStatus]?.find(
        (todo) => todo.id === id
      );
      todoToMove.status = targetStatus;
      updatedTodos[targetStatus] = [...updatedTodos[targetStatus], todoToMove];
      updatedTodos[sourceStatus] = updatedTodos[sourceStatus].filter(
        (todo) => todo.id !== id
      );
      setTodos(updatedTodos);
    }
  };

  const onDelete = (id, status) => {
    let _todos = { ...todos };
    _todos[status] = _todos[status].filter((item) => item.id !== id);
    setTodos(_todos);
  };

  const onEdit = (id, status) => {
    let _todos = { ...todos };
    _todos = _todos[status].filter((item) => item.id === id);
    setDialogProps({ type: 'EDIT', data: _todos });
  };
  return (
    <div
      style={{
        padding: '30px',
        backgroundColor: '#f7dede',
      }}
    >
      <Box
        sx={{
          fontSize: '1.8rem',
          fontWeight: '600',
          textAlign: 'center',
        }}
        my={3}
      >
        To-Do App
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              border: '1px solid #fff',
              padding: '5px',
            }}
          >
            <Box mb={1} textAlign='center' fontSize='1.4rem'>
              New Task
            </Box>
            {todos.new.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                moveTodo={moveTodo}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </Box>

          {dialogProps && (
            <TodoForm
              dialogProps={dialogProps}
              onAddTodo={handleAddTodo}
              onCancel={() => setDialogProps(null)}
            />
          )}
          <Button
            variant='text'
            size='small'
            onClick={() => setDialogProps({ type: 'CREATE', data: true })}
            sx={{
              marginTop: '10px',
            }}
          >
            <Add /> Create New Task
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              border: '1px solid #fff',
              padding: '5px',
            }}
          >
            <Box mb={1} textAlign='center' fontSize='1.4rem'>
              Ongoing Task
            </Box>
            {todos.ongoing.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                moveTodo={moveTodo}
                onDelete={onDelete}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              border: '1px solid #fff',
              padding: '5px',
            }}
          >
            <Box mb={1} textAlign='center' fontSize='1.4rem'>
              Done Task
            </Box>
            {todos.done.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                moveTodo={moveTodo}
                onDelete={onDelete}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
