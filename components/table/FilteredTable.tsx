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
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import StudentFormModal from "../StudentFormModal";
import AddStudentForm from "../AddStudentForm";
import { useSelector } from "react-redux";
const FilteredTable = ({ data }) => {
  const [rows, setRows] = useState();

  const [filteredRows, setFilteredRows] = useState(rows);
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<dayjs.Dayjs | null>(null);
  const [dateCondition, setDateCondition] = useState("equal");

  const cultureCode = useSelector((state) => state.language.cultureCode);
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

  const ArabicHeadres = [
    "الاسم الأول",
    "الاسم الأخير",
    "تاريخ الميلاد",
    "المدينة",
    "البلد",
    "الهاتف",
    "الجنس",
    "الصف",
    "الملاحظات",
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      <Stack
        justifyItems={"center"}
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
        sx={{ direction: cultureCode == "0" ? "ltr" : " rtl" }}
      >
        <Typography gutterBottom variant="h4">
          {cultureCode == "0" ? "Students Data" : "بيانات الطلاب"}
        </Typography>

        <StudentFormModal
          btnIcon={<AddIcon />}
          btnText={cultureCode == "0" ? "Add Student" : " اضافة طالب"}
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
        sx={{ direction: cultureCode == "0" ? "ltr" : " rtl" }}
      >
        <Typography paragraph sx={{ width: "120px", color: "#1f7bf4" }}>
          {cultureCode == "0" ? " Filter By :" : " فلترة "}
        </Typography>
        <TextField
          label={
            cultureCode == "0"
              ? "Search by first name and last name"
              : "البحث حسب الاسم الأول واسم العائلة "
          }
          variant="outlined"
          margin="normal"
          onChange={handleNameFilterChange}
          sx={{
            width: { md: "500px" },
            "& .MuiInputBase-root": {
              height: 40,
            },
            "& .MuiInputLabel-root": {
              top: -8,
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
                    borderRight:
                      cultureCode == "0" ? "rgba(228, 219, 233, 0.25)" : "",
                    borderLeft:
                      cultureCode == "0" ? "" : "rgba(228, 219, 233, 0.25)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderRight:
                      cultureCode == "0" ? "rgba(228, 219, 233, 0.25)" : "",
                    borderLeft:
                      cultureCode == "0" ? "" : "rgba(228, 219, 233, 0.25)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderRight:
                      cultureCode == "0" ? "rgba(228, 219, 233, 0.25)" : "",
                    borderLeft:
                      cultureCode == "0" ? "" : "rgba(228, 219, 233, 0.25)",
                  },
                  height: 40,
                }}
                value={dateCondition}
                onChange={handleDateConditionChange}
              >
                <MenuItem value="equal">
                  {cultureCode == "0" ? "Equal" : "يساوي"}
                </MenuItem>
                <MenuItem value="greater">
                  {cultureCode == "0" ? "Greater Than" : "اكبر من"}
                </MenuItem>
                <MenuItem value="less">
                  {cultureCode == "0" ? "Less Than" : "اصغر من"}
                </MenuItem>
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
                    borderleft:
                      cultureCode == "0" ? "rgba(228, 219, 233, 0.25)" : "",
                    borderright:
                      cultureCode == "0" ? "" : "rgba(228, 219, 233, 0.25)",
                  },
                }}
              />
            </LocalizationProvider>
          </Stack>
        </FormControl>
      </Stack>
      <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
      <DynamicTable
        displayHeders={cultureCode == 0 ? headers : ArabicHeadres}
        headers={headers}
        data={filteredRows}
      />
      <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
    </div>
  );
};

export default FilteredTable;
