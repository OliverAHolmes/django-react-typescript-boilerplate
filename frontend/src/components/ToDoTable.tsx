import * as React from "react";
import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ToDoTable = () => {
  const [rows, setRows] = React.useState<GridValidRowModel[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [newListName, setNewListName] = React.useState<string>("");
  const apiKey = localStorage.getItem("apiKey");
  const apiURL = "http://127.0.0.1:8000";
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(apiURL + "/todo/lists/", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${apiKey}`,
        },
      });
      const data = await response.json();

      console.log(data);

      const rows = data.map((element: { id: number; name: string }) => ({
        id: element.id,
        name: element.name,
      }));

      setRows(rows);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleView = (id: number) => {
    navigate(`/todo/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${apiURL}/todo/lists/${id}/`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `${apiKey}`,
        },
      });

      if (response.ok) {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        console.log("Deleted todo list with id:", id);
      } else {
        console.error("Failed to delete todo list with id:", id);
      }
    } catch (error) {
      console.error("Error deleting todo list:", error);
    }
  };

  const handleAddList = async () => {
    try {
      const response = await fetch(`${apiURL}/todo/lists/`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${apiKey}`,
        },
        body: JSON.stringify({ name: newListName }),
      });

      if (response.ok) {
        const newList = await response.json();
        setRows((prevRows) => [
          ...prevRows,
          { id: newList.id, name: newList.name },
        ]);
        setNewListName("");
        setOpen(false);
      } else {
        console.error("Failed to add new list");
      }
    } catch (error) {
      console.error("Error adding new list:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleView(params.row.id)}
            style={{ marginRight: 10 }}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add List
        </Button>
      </Box>
      <DataGrid
        slots={{
          noRowsOverlay: () => <div style={{ padding: 24 }}> No lists</div>,
        }}
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="List Name"
            type="text"
            fullWidth
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddList} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
