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
    <TableContainer sx={{ width: "full" }}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header: string) => (
              <TableCell>
                <TableSortLabel>{header}</TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
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
