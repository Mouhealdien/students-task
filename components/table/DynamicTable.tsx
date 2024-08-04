import {
  Button,
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
            <TableCell sx={{ color: "white" }}>
              <TableSortLabel>actions</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ borderRadius: "10px" }}>
          {data?.map((row, i) => (
            <TableRow
              sx={{
                bgcolor: i % 2 == 0 ? "white" : "#eef5f9",
                borderRadius: "10px",
              }}
              key={row.id}
            >
              {headers.map((header) => (
                <TableCell key={header}>
                  {header == "gender" || header == "grade"
                    ? row[header].translations[0].name
                    : row[header] !== undefined
                    ? header == "birthDate"
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
                        sx={{ color: "white", fontSize: "50px", marginTop: 5 }}
                      />
                    }
                    title="Are You Sure?"
                    paragraph="Are you sure you want to delete this student information?"
                    color="red"
                    cardBtnText="Delete"
                    btnIcon={
                      <DeleteIcon
                        sx={{ fontSize: "20px", marginX: 1, color: "red" }}
                      />
                    }
                  />

                  <EditIcon sx={{ fontSize: "20px", marginX: 1 }} />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
