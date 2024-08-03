import FilteredTable from "../../components/table/FilteredTable";
import SideBar from "../../components/SideBar";
import { Box } from "@mui/material";
import AuthLayout from "../../components/AuthLayout";
const Dashboard = () => {
  return (
    <AuthLayout>
      <Box
        style={{ padding: 20, backgroundColor: "white" }}
        sx={{ marginTop: "80px", marginLeft: { md: "250px" } }}
      >
        <FilteredTable />
      </Box>
      <SideBar />
    </AuthLayout>
  );
};

export default Dashboard;
