/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
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
import StudentFormModal from "../StudentFormModal";
import AddStudentForm from "../AddStudentForm";
const FilteredTable = ({ data }) => {
  const [rows, setRows] = useState();

  const [filteredRows, setFilteredRows] = useState(rows);
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<dayjs.Dayjs | null>(null);
  const [dateCondition, setDateCondition] = useState("equal");

  useEffect(() => {
    if (data) {
      setRows(data);
      setFilteredRows(data);
    }
    console.log(filteredRows);
  }, [data, rows]);

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
          row.firstName.toLowerCase().includes(name) ||
          row.lastName.toLowerCase().includes(name);

        const rowDate = dayjs(row.birthDate);
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
    "firstName",
    "lastName",
    "birthDate",
    "city",
    "country",
    "phone",
    "gender",
    "grade",
    "remarks",
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

        <StudentFormModal
          btnIcon={<AddIcon />}
          btnText={"Add Student"}
          color="#1f7bf4"
          FormComponent={AddStudentForm}
        />
      </Stack>

      <Stack
        justifyItems={{ md: "center" }}
        justifyContent={{ md: "center" }}
        alignItems={{ md: "center" }}
        direction={{ md: "row", sm: "column" }}
        spacing={2}
        marginBottom={2}
      >
        <Typography paragraph sx={{ width: "120px", color: "#1f7bf4" }}>
          Filter By :
        </Typography>
        <TextField
          label="Search by first name and last name"
          variant="outlined"
          margin="normal"
          onChange={handleNameFilterChange}
          sx={{
            width: { md: "500px" },
            "& .MuiInputBase-root": {
              height: 40,
            },
            "& .MuiInputLabel-root": {
              top: -8, // Adjust label position if needed
            },
          }}
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
                  height: 40,
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
                height: "20px",
                paddingTop: "13px",
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
                    height: 40,
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
