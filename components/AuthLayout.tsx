import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setToken } from "../lib/redux/features/authSlice";

import { useNavigate } from "react-router-dom";
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
      <div style={{ color: "red", backgroundColor: "blue", height: "500px" }}>
        loading...
      </div>
    );

  return <>{children}</>;
};

export default AuthLayout;
