import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

const DynamicTable = ({ headers, data }) => {
  return (
    <TableContainer sx={{ width: "full", borderRadius: "10px" }}>
      <Table>
        <TableHead sx={{ bgcolor: "#1f7bf4", borderRadius: "50%" }}>
          <TableRow sx={{ borderRadius: "50%" }}>
            {headers.map((header: string) => (
              <TableCell sx={{ color: "white" }}>
                <TableSortLabel>{header}</TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ borderRadius: "10px" }}>
          {data.map((row, i) => (
            <TableRow
              sx={{
                bgcolor: i % 2 == 0 ? "white" : "#eef5f9",
                borderRadius: "10px",
              }}
              key={row.id}
            >
              {Object.keys(row).map((prop, propIndex) => {
                if (prop != "id")
                  return (
                    <TableCell>
                      {prop == "date"
                        ? new Date(row.date).toISOString().split("T")[0]
                        : row[prop]}
                    </TableCell>
                  );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
