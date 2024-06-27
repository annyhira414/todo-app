import { Add } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import React, { useState } from 'react';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import CustomDialog from './baseUI/CustomDialog';

const displayFormattedDate = (dateStr) => {
  if (!dateStr) return dateStr;

  let date;

  if (dateStr instanceof Date) date = dateStr;
  else date = new Date(dateStr);

  if (date.toString() === 'Invalid Date') return dateStr;

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  let day = date.getDate();
  if (day < 10) day = `0${day}`;

  return `${day}/${month}/${year}`;
};

const TodoForm = ({ onAddTodo, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState({ startDate: '', endDate: '' });

  const handleSubmit = (e) => {
    onAddTodo(title, description, date);
    setTitle('');
    setDescription('');
    setDate('');
  };

  return (
    <CustomDialog
      title='Create Task'
      okProps={{
        label: 'Submit',
        type: 'submit',
        formId: 'task_create_form',
      }}
      cancelProps={{
        label: 'Cancel',
        onClick: onCancel,
      }}
    >
      <form onSubmit={handleSubmit} id='task_create_form'>
        <TextField
          size='small'
          label='Title'
          variant='outlined'
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          sx={{
            marginY: '8px',
          }}
        />
        <TextField
          size='small'
          label='Description'
          variant='outlined'
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateRangePicker']}>
            <DateRangePicker
              value={date}
              onChange={(newValue) =>
                setDate({
                  ...date,
                  startDate: displayFormattedDate(newValue[0]),
                  endDate: displayFormattedDate(newValue[1]),
                })
              }
              localeText={{ start: 'Start Date', end: 'End Date' }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </form>
    </CustomDialog>
  );
};

export default TodoForm;
