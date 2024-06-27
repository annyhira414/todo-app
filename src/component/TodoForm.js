import { Add } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import React, { useState } from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import CustomDialog from "./baseUI/CustomDialog";
import { displayFormattedDate } from "./baseUI/utils";
import dayjs from "dayjs";

const TodoForm = ({ dialogProps, onAddTodo, onCancel }) => {
  const [title, setTitle] = useState(`${dialogProps?.type === "EDIT" ? dialogProps?.data[0]?.title : ""}`);
  const [description, setDescription] = useState(
    `${dialogProps?.type === "EDIT" ? dialogProps?.data[0]?.description : ""}`
  );
  const [date, setDate] = useState({
    startDate: `${dialogProps?.type === "EDIT" ? dayjs(dialogProps?.data[0]?.date?.startDate) : ""}`,
    endDate: `${dialogProps?.type === "EDIT" ? dayjs(dialogProps?.data[0]?.date?.endDate) : ""}`,
  });

  const handleSubmit = (e) => {
    onAddTodo(title, description, date, dialogProps?.data[0]?.id, dialogProps?.type);
    setTitle("");
    setDescription("");
    setDate("");
  };

  return (
    <CustomDialog
      title={dialogProps?.type === "EDIT" ? "Update Task" : "Create Task"}
      okProps={{
        label: `${dialogProps?.type === "EDIT" ? "Update" : "Submit"}`,
        type: "submit",
        formId: "task_create_form",
      }}
      cancelProps={{
        label: "Cancel",
        onClick: onCancel,
      }}
    >
      <form onSubmit={handleSubmit} id="task_create_form">
        <TextField
          size="small"
          label="Title"
          variant="outlined"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          sx={{
            marginY: "8px",
          }}
        />
        <TextField
          size="small"
          label="Description"
          variant="outlined"
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangePicker"]}>
            <DateRangePicker
              value={date}
              onChange={(newValue) =>
                setDate({
                  ...date,
                  startDate: displayFormattedDate(newValue[0]),
                  endDate: displayFormattedDate(newValue[1]),
                })
              }
              localeText={{ start: "Start Date", end: "End Date" }}
              slotProps={{
                textField: {
                  required: true,
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </form>
    </CustomDialog>
  );
};

export default TodoForm;
