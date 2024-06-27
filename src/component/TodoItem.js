import { Dangerous, MoreVert, ReportProblem } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { displayFormattedDate } from './baseUI/utils';

const TodoItem = ({ todo, moveTodo, onDelete, onEdit }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const taskChecker = (d) => {
    const date = new Date();
    const currentDate = displayFormattedDate(date);
    return currentDate > d ? true : false;
  };

  return (
    <div
      className='todo-item'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Box
          sx={{
            textAlign: 'center',
            fontSize: '1.4rem',
            marginBottom: '4px',
          }}
        >
          {todo?.title}
        </Box>
        <Box>
          {' '}
          <b>Description</b>: {todo?.description}
        </Box>

        <Box mt={1}>
          {' '}
          <b>Deadline</b>:{' '}
          {`${todo?.date?.startDate || ''} - ${todo?.date?.endDate || ''}`}
        </Box>
        <Box mt={1}>
          <b>Status</b>: {''}
          <b
            style={{
              color:
                todo?.status === 'new'
                  ? 'blue'
                  : todo?.status === 'ongoing'
                  ? '#f8a604'
                  : '#44981a',
            }}
          >
            {todo?.status === 'new'
              ? 'NEW'
              : todo?.status === 'ongoing'
              ? 'ONGOING'
              : 'DONE'}
          </b>
          {todo?.status === 'ongoing' && (
            <Box>
              {taskChecker(todo?.date?.endDate) ? (
                <Box mt={1} display='flex'>
                  {' '}
                  <ReportProblem color='warning' sx={{ fontSize: 16 }} />
                  The task is overdue!
                </Box>
              ) : (
                <Box mt={1}>The task is not overdue yet.</Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
      <Box>
        <IconButton onClick={(event) => handleClick(event)} size='small'>
          <MoreVert />
        </IconButton>
        {todo?.status === 'new' ? (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => moveTodo(todo?.id, 'ongoing')}>
              Ongoing
            </MenuItem>
            <MenuItem onClick={() => moveTodo(todo?.id, 'done')}>Done</MenuItem>
            <MenuItem onClick={() => onEdit(todo?.id, todo?.status)}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => onDelete(todo?.id, todo?.status)}>
              Delete
            </MenuItem>
          </Menu>
        ) : todo?.status === 'ongoing' ? (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => moveTodo(todo?.id, 'new')}>New</MenuItem>
            <MenuItem onClick={() => moveTodo(todo?.id, 'done')}>Done</MenuItem>
            <MenuItem onClick={() => onDelete(todo?.id, todo?.status)}>
              Delete
            </MenuItem>
          </Menu>
        ) : (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => moveTodo(todo?.id, 'new')}>New</MenuItem>
            <MenuItem onClick={() => moveTodo(todo?.id, 'ongoing')}>
              Ongoing
            </MenuItem>
            <MenuItem onClick={() => onDelete(todo?.id, todo?.status)}>
              Delete
            </MenuItem>
          </Menu>
        )}
      </Box>

      {/* {moveTodo && <button onClick={moveTodo}></button>} */}
    </div>
  );
};

export default TodoItem;
