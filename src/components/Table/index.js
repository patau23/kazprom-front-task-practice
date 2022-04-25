import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const defaultColumns = [
  { field: "id", headerName: "ID", width: 170 },
  { field: "name", headerName: "Full name", width: 160 },
  { field: "username", headerName: "Username", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phone", headerName: "Phone", width: 200 },
];

export default function DataTable({ rows, columns = defaultColumns, action }) {
  return (
    <>
      <p>используйте ctrl + click, чтобы убрать выбор на строке</p>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          //   checkboxSelection
          onSelectionModelChange={(item) => action(item)}
        />
      </div>
    </>
  );
}
