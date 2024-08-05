import React, { useState } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NotificationCard from "../NotificationCard";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import StudentFormModal from "../StudentFormModal";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import UpdateStudentForm from "../UpdateStudentForm";
import { useRemoveStudentMutation } from "../../lib/redux/services/Api";

const DynamicTable = ({ headers = [], data = [], displayHeders }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");

  const cultureCode = useSelector((state) => state.language.cultureCode);

  const [removeStudent] = useRemoveStudentMutation();

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSortData = (data) => {
    return data.slice().sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedData = handleSortData(data);

  const handelRemoveStudent = async (id) => {
    try {
      await toast.promise(removeStudent(id).unwrap(), {
        pending: "pending",
        success: "resolved ",
        error: "rejected ",
      });
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  return (
    <TableContainer sx={{ width: "full", borderRadius: "10px" }}>
      <Table>
        <TableHead sx={{ bgcolor: "#1f7bf4", borderRadius: "50%" }}>
          <TableRow sx={{ borderRadius: "50%" }}>
            {displayHeders.map((header) => (
              <TableCell key={header} sx={{ color: "white" }}>
                <TableSortLabel
                  sx={{
                    color: orderBy === header ? "lightblue" : "white",
                    "&.Mui-active": {
                      color: "white",
                      fontWeight: "bold",
                    },
                    "& .MuiTableSortLabel-icon": {
                      color: orderBy === header ? "white" : "inherit",
                    },
                  }}
                  active={orderBy === header}
                  direction={orderBy === header ? order : "asc"}
                  onClick={() => handleRequestSort(header)}
                >
                  {header}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell sx={{ color: "white" }}>
              <TableSortLabel>
                {cultureCode == "0" ? "Actions" : "الاحداث"}
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ borderRadius: "10px" }}>
          {sortedData.length ? (
            sortedData.map((row, i) => (
              <TableRow
                sx={{
                  bgcolor: i % 2 === 0 ? "white" : "#eef5f9",
                  borderRadius: "10px",
                }}
                key={row.id}
              >
                {headers.map((header) => (
                  <TableCell key={header}>
                    {header === "gender" || header === "grade"
                      ? row[header]?.translations[0]?.cultureCode ===
                        cultureCode
                        ? row[header]?.translations[0]?.name
                        : row[header]?.translations[1]?.name
                      : row[header] !== undefined
                      ? header === "birthDate"
                        ? new Date(row[header]).toISOString().split("T")[0]
                        : row[header]
                      : "N/A"}
                  </TableCell>
                ))}
                <TableCell>
                  <Stack alignItems={"center"} direction={"row"}>
                    <NotificationCard
                      logo={
                        <ErrorOutlineIcon
                          sx={{
                            color: "white",
                            fontSize: "50px",
                            marginTop: 5,
                          }}
                        />
                      }
                      studentId={row.id}
                      title={
                        cultureCode == "0" ? "Are You Sure?" : "هل أنت متأكد؟"
                      }
                      paragraph={
                        cultureCode == "0"
                          ? "Are you sure you want to delete this student information?"
                          : "هل أنت متأكد أنك تريد حذف معلومات الطالب هذه؟"
                      }
                      color="red"
                      cardBtnText={cultureCode == "0" ? "Delete" : "حذف"}
                      btnIcon={
                        <DeleteIcon
                          sx={{
                            fontSize: "20px",
                            marginX: 1,
                            paddingX: 0,
                            color: "red",
                          }}
                        />
                      }
                      fun={handelRemoveStudent}
                    />
                    <StudentFormModal
                      color="#1f7bf4"
                      FormComponent={UpdateStudentForm}
                      studentId={row.id}
                      btnIcon={
                        <EditIcon sx={{ fontSize: "20px", marginX: 1 }} />
                      }
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length + 1}
                sx={{ textAlign: "center" }}
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
