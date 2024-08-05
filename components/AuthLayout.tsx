import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setToken } from "../lib/redux/features/authSlice";

import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
const AuthLayout = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");

    if (storedToken) {
      dispatch(setToken(storedToken));
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);

  if (!token)
    return (
      <Box sx={{ textAlign: "center", paddingTop: "300px" }}>
        <CircularProgress />
      </Box>
    );

  return <>{children}</>;
};

export default AuthLayout;
