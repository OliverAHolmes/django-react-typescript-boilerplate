import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "Username", width: 100 },
  { field: "first_name", headerName: "First name", width: 100 },
  { field: "last_name", headerName: "Last name", width: 100 },
  { field: "email", headerName: "Email", width: 130 },
  {
    field: "birth_date",
    headerName: "Date of birth",
    type: "number",
    width: 120,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 100,
    valueGetter: (value, row) =>
      `${row.first_name || ""} ${row.last_name || ""}`,
  },
];

export const DataTable = () => {
  const [rows, setRows] = React.useState<unknown[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/users/?format=json"
        );
        const data = await response.json();

        console.log(data);

        const rows = data.map(
          (element: {
            id: number;
            username: string;
            first_name: string;
            last_name: string;
            email: string;
            birth_date: number;
          }) => ({
            id: element.id,
            username: element.username,
            first_name: element.first_name,
            last_name: element.last_name,
            email: element.email,
            birth_date: element.birth_date,
          })
        );

        setRows(rows);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        slots={{
          noRowsOverlay: () => <div style={{ padding: 24 }}> No users</div>,
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
        checkboxSelection
      />
    </div>
  );
};
