import FilteredTable from "../../components/table/FilteredTable";
import SideBar from "../../components/SideBar";
import { Box } from "@mui/material";
import AuthLayout from "../../components/AuthLayout";
import { useGetAllStudentsQuery } from "../../lib/redux/services/Api";
import { useEffect } from "react";
const Dashboard = () => {
  const { data, error, isLoading, refetch } = useGetAllStudentsQuery("x");
  useEffect(() => {
    refetch();
  }, [data, refetch]);

  return (
    <AuthLayout>
      <Box
        style={{ padding: 20, backgroundColor: "white" }}
        sx={{ marginTop: "80px", marginLeft: { md: "250px" } }}
      >
        <FilteredTable data={data} />
      </Box>
      <SideBar />
    </AuthLayout>
  );
};

export default Dashboard;
