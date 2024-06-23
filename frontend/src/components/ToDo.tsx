import {
  TextField,
  Button,
  Typography,
  Checkbox,
  List,
  ListItem,
  Container,
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import { styled } from "@mui/system";

const Input = styled(TextField)({
  width: "70%",
  marginBottom: 30,
});

const AddButton = styled(Button)({
  height: 55,
  marginBottom: 30,
});

const CenteredContainer = styled(Container)({
  textAlign: "center",
  marginTop: 100,
});

const TaskList = styled(List)({
  width: "80%",
  margin: "auto",
  justifyContent: "space-around",
  border: "1px solid light-gray",
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

export const ToDo = () => {
  const [inputVal, setInputVal] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [editedId, setEditedId] = useState<number | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const handleClick = () => {
    if (!isEdited) {
      setTodos([
        ...todos,
        { val: inputVal, isDone: false, id: new Date().getTime() },
      ]);
    } else {
      setTodos([
        ...todos,
        { val: inputVal, isDone: false, id: editedId as number },
      ]);
    }
    setInputVal("");
    setIsEdited(false);
  };

  const onDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleDone = (id: number) => {
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodos(updated);
  };

  const handleEdit = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    const editVal = todos.find((todo) => todo.id === id);
    setEditedId(editVal?.id || null);
    setInputVal(editVal?.val || "");
    setTodos(newTodos);
    setIsEdited(true);
  };

  return (
    <CenteredContainer>
      <Input
        variant="outlined"
        onChange={onChange}
        label="type your task"
        value={inputVal}
      />
      <AddButton
        size="large"
        variant={isEdited ? "outlined" : "contained"}
        color="primary"
        onClick={handleClick}
        disabled={inputVal ? false : true}
      >
        {isEdited ? "Edit Task" : "Add Task"}
      </AddButton>
      <TaskList>
        {todos.map((todo) => (
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
    </CenteredContainer>
  );
};
