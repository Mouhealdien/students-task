/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DynamicTable from "./DynamicTable";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs"; // Import dayjs
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
const FilteredTable = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      Fname: "Alice",
      Lname: "x",
      date: "2024-08-02T15:12:15.400Z",
      age: 25,
    },
    {
      id: 2,
      Fname: "Bob",
      Lname: "y",
      date: "2024-07-02T15:12:15.400Z",
      age: 30,
    },
    {
      id: 4,
      Fname: "xxxxx",
      Lname: "xx",
      date: "2024-07-02T15:12:15.400Z",
      age: 30,
    },
    {
      id: 3,
      Fname: "Charlie",
      Lname: "z",
      date: "2024-10-03T15:12:15.400Z",
      age: 35,
    },
  ]);

  const [filteredRows, setFilteredRows] = useState(rows);
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<dayjs.Dayjs | null>(null);
  const [dateCondition, setDateCondition] = useState("equal");

  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFilter = event.target.value.toLowerCase();
    setNameFilter(newFilter);
    filterRows(newFilter, dateFilter, dateCondition);
  };

  const handleDateFilterChange = (newValue: dayjs.Dayjs | null) => {
    setDateFilter(newValue);
    filterRows(nameFilter, newValue, dateCondition);
  };

  const handleDateConditionChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newCondition = event.target.value as string;
    setDateCondition(newCondition);
    filterRows(nameFilter, dateFilter, newCondition);
  };

  const filterRows = (
    name: string,
    date: dayjs.Dayjs | null,
    condition: string
  ) => {
    setFilteredRows(
      rows.filter((row) => {
        const matchesName =
          row.Fname.toLowerCase().includes(name) ||
          row.Lname.toLowerCase().includes(name);

        const rowDate = dayjs(row.date);
        const inputDate = date ? dayjs(date) : null;

        const matchesDate =
          !inputDate ||
          (condition === "equal" && rowDate.isSame(inputDate, "day")) ||
          (condition === "greater" && rowDate.isAfter(inputDate, "day")) ||
          (condition === "less" && rowDate.isBefore(inputDate, "day"));

        return matchesName && matchesDate;
      })
    );
  };

  const headers = [
    "FName",
    "Lname",
    "age",
    "date",
    "FName",
    "Lname",
    "age",
    "date",
    "age",
    "date",
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      <Stack
        justifyItems={"center"}
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
      >
        <Typography gutterBottom variant="h4">
          Student Data
        </Typography>
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#1f7bf4" }}
          color="primary"
        >
          Add Student <AddIcon />
        </Button>
      </Stack>

      <Stack
        justifyItems={"center"}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
        spacing={2}
        marginBottom={2}
      >
        <Typography paragraph sx={{ width: "fit", color: "#1f7bf4" }}>
          Filter By :
        </Typography>
        <TextField
          label="Search by first name and last name"
          variant="outlined"
          margin="normal"
          onChange={handleNameFilterChange}
          sx={{ width: "500px" }}
        />

        <FormControl variant="outlined" fullWidth margin="normal">
          <Stack direction={"row"} spacing={-0.1}>
            <Box>
              <Select
                sx={{
                  borderRadius: "0",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderRight: "rgba(228, 219, 233, 0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderRight: "rgba(228, 219, 233, 0.25)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderRight: "rgba(228, 219, 233, 0.25)",
                  },
                }}
                value={dateCondition}
                onChange={handleDateConditionChange}
              >
                <MenuItem value="equal">Equal</MenuItem>
                <MenuItem value="greater">Greater Than</MenuItem>
                <MenuItem value="less">Less Than</MenuItem>
              </Select>
            </Box>
            <div
              style={{
                borderLeft: "1px solid lightgray",
                height: "40px",
                paddingTop: "10px",
                paddingBottom: "10px",
                marginTop: "7px",
                marginBottom: "2px",
              }}
            ></div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dateFilter}
                onChange={handleDateFilterChange}
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: 0,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: 0,
                    borderLeft: "rgba(228, 219, 233, 0.25)",
                  },
                }}
              />
            </LocalizationProvider>
          </Stack>
        </FormControl>
      </Stack>
      <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
      <DynamicTable headers={headers} data={filteredRows} />
      <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
    </div>
  );
};

export default FilteredTable;
