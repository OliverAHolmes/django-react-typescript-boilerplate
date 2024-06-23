import {
  TextField,
  Button,
  Typography,
  Checkbox,
  List,
  ListItem,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import { styled } from "@mui/system";
import { useParams, useNavigate } from "react-router-dom";

const CenteredContainer = styled(Container)({
  textAlign: "center",
});

const TaskList = styled(List)({
  width: "80%",
  margin: "auto",
  justifyContent: "space-around",
  border: "1px solid light-gray",
  marginBottom: 30,
});

const Text = styled(Typography)({
  width: "70%",
});

const ListButtons = styled(Button)({
  marginLeft: 10,
});

interface Todo {
  val: string;
  isDone: boolean;
  id: number;
}

interface TodoList {
  id: number;
  name: string;
  user: number;
  items: Todo[];
}

export const ToDo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoList | null>(null);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [editedId, setEditedId] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const apiKey = localStorage.getItem("apiKey");
  const apiURL = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchList = async () => {
      try {
        const listResponse = await fetch(`${apiURL}/todo/lists/${id}/`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `${apiKey}`,
          },
        });
        const listData = await listResponse.json();

        const itemsResponse = await fetch(
          `${apiURL}/todo/items/?todo_list=${id}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `${apiKey}`,
            },
          }
        );
        const itemsData = await itemsResponse.json();

        if (listResponse.ok && itemsResponse.ok) {
          setTodoList({
            id: listData.id,
            name: listData.name,
            user: listData.user,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            items: itemsData.map((item: any) => ({
              val: item.title,
              isDone: item.completed,
              id: item.id,
            })),
          });
        } else {
          console.error("Failed to fetch list");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchList();
  }, [id, apiKey]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const handleClick = async () => {
    if (todoList !== null) {
      if (!isEdited) {
        try {
          const response = await fetch(`${apiURL}/todo/items/`, {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `${apiKey}`,
            },
            body: JSON.stringify({
              title: inputVal,
              description: "",
              completed: false,
              todo_list: todoList.id,
            }),
          });

          const newItem = await response.json();

          if (response.ok) {
            const updatedList = { ...todoList };
            updatedList.items.push({
              val: newItem.title,
              isDone: newItem.completed,
              id: newItem.id,
            });
            setTodoList(updatedList);
            setInputVal("");
            setOpen(false);
          } else {
            console.error("Failed to add task:", newItem);
          }
        } catch (error) {
          console.error("Error adding task:", error);
        }
      } else {
        try {
          const response = await fetch(`${apiURL}/todo/items/${editedId}/`, {
            method: "PUT",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `${apiKey}`,
            },
            body: JSON.stringify({
              title: inputVal,
              description: "",
              completed: todoList.items.find((item) => item.id === editedId)
                ?.isDone,
              todo_list: todoList.id,
            }),
          });

          const updatedItem = await response.json();

          if (response.ok) {
            const updatedList = { ...todoList };
            const itemIndex = updatedList.items.findIndex(
              (item) => item.id === editedId
            );
            updatedList.items[itemIndex] = {
              val: updatedItem.title,
              isDone: updatedItem.completed,
              id: updatedItem.id,
            };
            setTodoList(updatedList);
            setInputVal("");
            setIsEdited(false);
            setEditedId(null);
            setOpen(false);
          } else {
            console.error("Failed to update task:", updatedItem);
          }
        } catch (error) {
          console.error("Error updating task:", error);
        }
      }
    }
  };

  const onDelete = async (id: number) => {
    if (todoList !== null) {
      try {
        const response = await fetch(`${apiURL}/todo/items/${id}/`, {
          method: "DELETE",
          headers: {
            accept: "application/json",
            Authorization: `${apiKey}`,
          },
        });

        if (response.ok) {
          const updatedList = { ...todoList };
          updatedList.items = updatedList.items.filter(
            (todo) => todo.id !== id
          );
          setTodoList(updatedList);
        } else {
          console.error("Failed to delete task");
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleDone = async (id: number) => {
    if (todoList !== null) {
      const updatedList = { ...todoList };
      const itemIndex = updatedList.items.findIndex((item) => item.id === id);
      const updatedItem = updatedList.items[itemIndex];
      updatedItem.isDone = !updatedItem.isDone;

      try {
        const response = await fetch(`${apiURL}/todo/items/${id}/`, {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${apiKey}`,
          },
          body: JSON.stringify({
            title: updatedItem.val,
            description: "",
            completed: updatedItem.isDone,
            todo_list: todoList.id,
          }),
        });

        const updatedData = await response.json();

        if (response.ok) {
          updatedList.items[itemIndex] = {
            val: updatedData.title,
            isDone: updatedData.completed,
            id: updatedData.id,
          };
          setTodoList(updatedList);
        } else {
          console.error("Failed to update task status:", updatedData);
        }
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };

  const handleEdit = (id: number) => {
    if (todoList !== null) {
      const editVal = todoList.items.find((todo) => todo.id === id);
      setEditedId(editVal?.id || null);
      setInputVal(editVal?.val || "");
      setIsEdited(true);
      setOpen(true);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInputVal("");
    setIsEdited(false);
    setEditedId(null);
  };

  return (
    <CenteredContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Task
        </Button>
      </Box>
      {todoList && (
        <>
          <Typography
            variant="h5"
            style={{ textAlign: "left", width: "80%", margin: "auto" }}
          >
            <b>Name:</b> {todoList.name}
          </Typography>
          <TaskList>
            {todoList.items.map((todo) => (
              <ListItem key={todo.id} divider>
                <Checkbox
                  onClick={() => handleDone(todo.id)}
                  checked={todo.isDone}
                />
                <Text style={{ color: todo.isDone ? "green" : "" }}>
                  {todo.val}
                </Text>
                <ListButtons
                  onClick={() => handleEdit(todo.id)}
                  variant="contained"
                >
                  Edit
                </ListButtons>
                <ListButtons
                  onClick={() => onDelete(todo.id)}
                  color="secondary"
                  variant="contained"
                >
                  delete
                </ListButtons>
              </ListItem>
            ))}
          </TaskList>
        </>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdited ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="task"
            label="Task"
            type="text"
            fullWidth
            value={inputVal}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClick} color="primary">
            {isEdited ? "Edit Task" : "Add Task"}
          </Button>
        </DialogActions>
      </Dialog>
    </CenteredContainer>
  );
};
