import FilteredTable from "../../components/table/FilteredTable";
import SideBar from "../../components/SideBar";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import AuthLayout from "../../components/AuthLayout";
import { useGetAllStudentsQuery } from "../../lib/redux/services/Api";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
const Dashboard = () => {
  const { data, refetch } = useGetAllStudentsQuery("x");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    refetch();
  }, [data, refetch]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(0);
  };

  const startIndex = currentPage * rowsPerPage;
  const paginatedData = data?.slice(startIndex, startIndex + rowsPerPage);

  const pageCount = Math.ceil(data?.length / rowsPerPage);
  return (
    <AuthLayout>
      <Box
        style={{ padding: 20, backgroundColor: "white" }}
        boxShadow={4}
        sx={{
          marginTop: "100px",
          marginLeft: { md: "250px" },
          marginRight: { md: "20px" },
          borderRadius: "10px",
        }}
      >
        <FilteredTable data={paginatedData} />
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormControl variant="outlined" sx={{ marginBottom: 2 }}>
            <Stack
              alignItems={"center"}
              direction={"row"}
              justifyContent={"start"}
              gap={2}
            >
              <label style={{ color: "gray" }}>Rows per page:</label>
              <Select
                value={rowsPerPage}
                sx={{ paddingY: 0, height: 25 }}
                onChange={handleRowsPerPageChange}
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </Stack>
          </FormControl>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </Stack>
      </Box>

      <SideBar />
    </AuthLayout>
  );
};

export default Dashboard;
